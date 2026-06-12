import { type CalendarDate } from "@internationalized/date";

function assert(condition: unknown, message = "Assertion failed"): asserts condition
{
    if(!condition)
        throw new Error(message);
}

export const enum ValidState
{
    Invalid,
    Valid,
    Required,
};

type DefaultValueFn<T> = (() => T);

export class SchemaItem<T>
{
    isOptional: boolean = $state(false);
    defaultValue: T | DefaultValueFn<T> | null = null;
    pageNum: number = 0;
    #condition: { sourceKey: string, conditionFn: (value: any) => boolean } | null = null;

    optional(value: boolean)
    {
        this.isOptional = value;
        return this;
    }

    get condition()
    {
        return this.#condition;
    }

    page(page: number)
    {
        this.pageNum = page;
        return this;
    }

    conditionallyRequired(sourceKey: string, conditionFn: (sourceVal: any) => boolean)
    {
        this.#condition = { sourceKey, conditionFn };
        return this;
    }

    default(value: T | DefaultValueFn<T> | null)
    {
        this.defaultValue = value;
        return this;
    }

    hasValue(_: T | null): boolean
    {
        return true;
    }

    validate(value: T | null): ValidState
    {
        if(!this.hasValue(value) || value === null || value === "" || value === undefined)
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        return ValidState.Valid;
    }
}

export class Item<T>
{
    #value: T | null = $state(null);
    schemaItem: SchemaItem<T>;
    #validState: ValidState = $state(ValidState.Valid);

    constructor(schemaItem: SchemaItem<T>)
    {
        this.schemaItem = schemaItem;
        if(typeof schemaItem.defaultValue === "function")
            this.value = (schemaItem.defaultValue as DefaultValueFn<T>)();
        else
            this.value = schemaItem.defaultValue;
    }

    isOptional()
    {
        return this.schemaItem.isOptional;
    }

    set value(value: T | null)
    {
        this.#value = value;
    }

    set validState(value: ValidState)
    {
        this.#validState = value;
    }

    get value(): T | null
    {
        return this.#value;
    }

    get validState(): ValidState
    {
        return this.#validState;
    }

    validateThenSet()
    {
        this.validState = this.schemaItem.validate(this.value);
    }
}

export class SchemaItemString extends SchemaItem<string>
{
    minLen: number = 0;
    maxLen: number = Infinity;

    min(value: number)
    {
        this.minLen = value;
        return this;
    }

    max(value: number)
    {
        this.maxLen = value;
        return this;
    }

    hasValue(value: string | null): boolean
    {
        if(value == null)
            return false;
        return value.length != 0;
    }

    validate(value: string | null)
    {
        if(!this.hasValue(value))
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        assert(value != null);

        const valueLen = value.length;
        const isValid = (valueLen >= this.minLen && valueLen <= this.maxLen);
        return isValid ? ValidState.Valid : ValidState.Invalid;
    }
}

export class SchemaItemNumber extends SchemaItem<number>
{
    minNum: number = 0;
    maxNum: number = Infinity;

    min(value: number)
    {
        this.minNum = value;
        return this;
    }

    max(value: number)
    {
        this.maxNum = value;
        return this;
    }

    validate(value: number | null)
    {
        if(!this.hasValue(value) || value == null)
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        const isValid = (value >= this.minNum && value <= this.maxNum);
        return isValid ? ValidState.Valid : ValidState.Invalid;
    }
}

export class SchemaItemImage extends SchemaItem<File>
{
    sizeNum: number = Infinity;

    size(value: number)
    {
        this.sizeNum = value;
        return this;
    }

    validate(value: File | null)
    {
        if(!this.hasValue(value) || value == null)
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        if(!value)
            return ValidState.Invalid;
        if(this.sizeNum <= value.size)
            return ValidState.Invalid;

        return ValidState.Valid;
    }
}

export class SchemaItemArray extends SchemaItem<Array<Record<string, Item<any>>>>
{
    hasValue(value: Array<Record<string, Item<any>>> | null)
    {
        return value != null && value.length != 0;
    }

    validate(value: Array<Record<string, Item<any>>> | null)
    {
        if(!this.hasValue(value) || value == null)
        {
            return ValidState.Valid;
        }

        for(const val of value)
        {
            for(const [_, v] of Object.entries(val))
            {
                v.validateThenSet();
                if(v.validState != ValidState.Valid)
                    return v.validState;
            }
        }

        return ValidState.Valid;
    }
}

export function mapForm(schema: Record<string, SchemaItem<any>>)
{
    const form = Object.fromEntries(
        Object.entries(schema)
            .map(
                ([key, item]) => [key, new Item(item)]
            )
    );

    for(const [_, item] of Object.entries(form))
    {
        const condition = item.schemaItem.condition;
        if(!condition)
            continue;

        const source = form[condition.sourceKey];
        if(!source)
            continue;

        $effect(() => {
            item.schemaItem.isOptional = !condition.conditionFn(source.value);
        });
    }

    return form;
}

export const item = {
    string: () => {
        return new SchemaItemString().default("");
    },
    date: () => {
        return new SchemaItem<CalendarDate>().default(null);
    },
    boolean: () => {
        return new SchemaItem<boolean>().default(null);
    },
    number: () => {
        return new SchemaItemNumber().default(null);
    },
    array: () => {
        return new SchemaItemArray().default(null);
    },
    image: () => {
        return new SchemaItemImage().default(null);
    },
}
