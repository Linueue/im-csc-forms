import { CIVIL_STATUS, EMPLOYMENT_STATUS, EMPLOYMENT_TYPE } from "../selection-constants"
import { ValidState, type Item, SchemaItemImage, SchemaItemArray } from "$lib/components/ItemSchema.svelte"
import { CalendarDate } from "@internationalized/date";

export const enum SubmitStatus
{
    None, Submitted, Failed,
};

export function checkAllValidation(schema: Map<String, Item<any>>): boolean
{
    for(const [_, value] of schema)
    {
        value.validateThenSet();
        if(value.validState != ValidState.Valid)
            return false;
    };

    return true;
}

export function serialize(schema: Map<string, Item<any>>)
{
    let data: Record<string, any | null> = {};
    let files: Record<string, File | null> = {};

    schema.forEach((value, key) => {
        if(value.schemaItem instanceof SchemaItemImage)
        {
            files[key.toString()] = value.value;
            return;
        }
        if(value.schemaItem instanceof SchemaItemArray)
        {
            if(!value.value)
            {
                data[key.toString()] = null;
                return;
            }

            let allSerialized: Array<Record<string, any>> = []

            for(const entry of value.value as Array<Record<string, Item<any>>>)
            {
                const mapped = new Map(Object.entries(entry));
                const { data: d, files: f } = serialize(mapped);
                allSerialized.push(d);
                files = { ...files, ...f };
            }

            data[key.toString()] = allSerialized;
            return;
        }

        if(value.value instanceof CalendarDate)
            data[key.toString()] = value.value.toString() ?? null;
        else
            data[key.toString()] = value.value ?? null;
    });

    return { data, files };
}

export function completionLabel(value: string)
{
    switch(value)
    {
        case 'G':
            return "Graduated";
        case 'NO':
            return "Not-Graduated/On-Going";
    }
}

export function civilStatus(value: string)
{
    return CIVIL_STATUS.find((v) => v.value == value)?.label;
}

export function employmentStatus(value: string)
{
    return EMPLOYMENT_STATUS.find((v) => v.value == value)?.label;
}

export function employmentType(value: string)
{
    return EMPLOYMENT_TYPE.find((v) => v.value == value)?.label;
}
