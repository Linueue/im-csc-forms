import { item, type Item, ValidState } from "$lib/components/ItemSchema.svelte";

// The Form Schema for validation during client runtime
// This does not correspond to Database schema
// This is only for the form that the user will submit
export const formSchema = $state({
    applicantFirstName: item.string(),
    applicantLastName: item.string(),
    applicantMiddleName: item.string(),
    applicantSex: item.string().min(1).max(6),
    applicantAge: item.number().min(18).max(255),
    applicantBirthdate: item.date(),
    applicantBirthplace: item.string().min(1).max(50),
    applicantCitizenship: item.string().default("Filipino"),
    applicantPhoto: item.image().aspectRatio(3.5 / 4.5).size(5 * 1024 * 1024), // Limits to 5MB
});

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
        data[key.toString()] = value.value?.toString() ?? null;
    });

    return JSON.stringify(data);
}
