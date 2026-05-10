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

export class SchemaItem<T>
{
    isOptional: boolean = false;
    defaultValue: T | null = null;

    optional(value: boolean)
    {
        this.isOptional = value;
        return this;
    }

    default(value: T | null)
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
        if(!this.hasValue(value) || value == null)
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
        this.value = schemaItem.defaultValue;
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

export function mapForm(schema: Record<string, SchemaItem<any>>)
{
    return Object.fromEntries(
        Object.entries(schema)
            .map(
                ([key, item]) => [key, new Item(item)]
            )
    );
}

export const item = {
    string: () => {
        return new SchemaItemString().default("");
    },
    date: () => {
        return new SchemaItem<CalendarDate>().default(null);
    },
    boolean: () => {
        return new SchemaItem<boolean>().default(false);
    },
    number: () => {
        return new SchemaItemNumber().default(null);
    },
    image: () => {
        return new SchemaItemImage().default(null);
    },
}
