import { item, type Item, ValidState, ItemImage } from "$lib/components/ItemSchema.svelte";

// The Form Schema for validation during client runtime
// This does not correspond to Database schema
// This is only for the form that the user will submit
const formSchema = {
    applicantFirstName: item.string(),
    applicantLastName: item.string(),
    applicantMiddleName: item.string(),
    applicantSex: item.string().min(1).max(6),
    applicantAge: item.number().min(18).max(255),
    applicantBirthdate: item.date(),
    applicantBirthplace: item.string().min(1).max(50),
    applicantCitizenship: item.string().default("Filipino"),
    applicantPhoto: item.image().size(5 * 1024 * 1024), // Limits to 5MB
};

export const enum SubmitStatus
{
    None, Submitted, Failed,
};

export function createFormSchema(): Record<string, Item<any>>
{
    return Object.fromEntries(Object.entries(formSchema).map(([key, item]) => [key, item.clone()]));
}

export function checkAllValidation(schema: Map<String, Item<any>>): boolean
{
    for(const [_, value] of schema)
    {
        if(value.validate() != ValidState.Valid)
            return false;
    };

    return true;
}

export function serialize(schema: Map<string, Item<any>>)
{
    let data: Record<string, string | null> = {};

    schema.forEach((value, key) => {
        // Ignore any file uploads, these are handled as part of the formData
        if(value instanceof ItemImage)
            return;

        data[key.toString()] = value.value?.toString() ?? null;
    });

    return JSON.stringify(data);
}

export function getFileUploads(schema: Map<string, Item<any>>): Record<string, File | null>
{
    // While this might seem inefficient, it's negligible
    let data: Record<string, File | null> = {};

    schema.forEach((value, key) => {
        if(!(value instanceof ItemImage))
            return;

        data[key.toString()] = value.value;
    });

    return data;
}
