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

export class Item<T>
{
    #value: T | null = $state(null);
    isOptional: boolean;
    #validState: ValidState = $state(ValidState.Valid);

    constructor()
    {
        this.isOptional = false;
    }

    clone()
    {
        const newItem = new Item<T>();
        newItem.value = this.value;
        newItem.isOptional = this.isOptional;
        newItem.validState = this.validState;

        return newItem;
    }

    optional(value: boolean)
    {
        this.isOptional = value;
        return this;
    }

    default(value: T | null)
    {
        this.#value = value;
        return this;
    }

    setValue(value: T)
    {
        this.#value = value;
        return this;
    }

    set value(value: T | null)
    {
        this.#value = value;
    }

    set validState(value: ValidState)
    {
        this.#validState = value;
    }

    getValue(): T | null
    {
        return this.#value;
    }

    get value(): T | null
    {
        return this.#value;
    }

    get validState(): ValidState
    {
        return this.#validState;
    }

    hasValue(): boolean
    {
        return true;
    }

    validate(): ValidState
    {
        const value = this.#value;

        if(!this.hasValue() || value == null)
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        return ValidState.Valid;
    }

    validateThenSet()
    {
        this.validState = this.validate();
    }
}

export class ItemString extends Item<string>
{
    minLen: number;
    maxLen: number;

    constructor()
    {
        super();
        this.minLen = 0;
        this.maxLen = Infinity;
    }

    clone()
    {
        const newItem = new ItemString();
        newItem.value = this.value;
        newItem.isOptional = this.isOptional;
        newItem.validState = this.validState;
        newItem.minLen = this.minLen;
        newItem.maxLen = this.maxLen;

        return newItem;
    }

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

    hasValue(): boolean
    {
        if(this.value == null)
            return false;
        return this.value.length != 0;
    }

    validate()
    {
        const value = this.value;

        if(!this.hasValue())
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        assert(value != null);

        const valueLen = value.length;
        const isValid = (valueLen >= this.minLen && valueLen <= this.maxLen);
        return isValid ? ValidState.Valid : ValidState.Invalid;
    }
}

export class ItemNumber extends Item<number>
{
    minNum: number;
    maxNum: number;

    constructor()
    {
        super();
        this.minNum = 0;
        this.maxNum = Infinity;
    }

    clone()
    {
        const newItem = new ItemNumber();
        newItem.value = this.value;
        newItem.isOptional = this.isOptional;
        newItem.validState = this.validState;
        newItem.minNum = this.minNum;
        newItem.maxNum  = this.maxNum;

        return newItem;
    }

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

    validate()
    {
        const value = this.value;

        if(!this.hasValue() || value == null)
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        const isValid = (value >= this.minNum && value <= this.maxNum);
        return isValid ? ValidState.Valid : ValidState.Invalid;
    }
}

export class ItemImage extends Item<File>
{
    sizeNum: number;

    constructor()
    {
        super();
        this.sizeNum = Infinity;
    }

    clone()
    {
        const newItem = new ItemImage();
        newItem.value = this.value;
        newItem.isOptional = this.isOptional;
        newItem.validState = this.validState;
        newItem.sizeNum = this.sizeNum;

        return newItem;
    }

    size(value: number)
    {
        this.sizeNum = value;
        return this;
    }

    validate()
    {
        const value = this.value;

        if(!this.hasValue() || value == null)
        {
            return this.isOptional ? ValidState.Valid : ValidState.Required;
        }

        if(!this.value)
            return ValidState.Invalid;
        if(this.sizeNum <= this.value.size)
            return ValidState.Invalid;

        return ValidState.Valid;
    }
}

export const item = {
    string: () => {
        return new ItemString().default("");
    },
    date: () => {
        return new Item<CalendarDate>().default(null);
    },
    boolean: () => {
        return new Item<boolean>().default(false);
    },
    number: () => {
        return new ItemNumber().default(null);
    },
    image: () => {
        return new ItemImage().default(null);
    },
}
