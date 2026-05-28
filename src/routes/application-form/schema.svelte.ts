import { item, type Item, ValidState, SchemaItemImage, SchemaItemArray, SchemaItem } from "$lib/components/ItemSchema.svelte";
import { CalendarDate } from "@internationalized/date";

export const existingExaminationSchema = {
    existingExaminationTitle: item.string().min(1).max(50),
    existingExaminationRating: item.number().min(0.0).max(100.0),
    existingExaminationDate: item.date(),
    existingExaminationPlace: item.string().min(0).max(100),
};

// The Form Schema for validation during client runtime
// This does not correspond to Database schema
// This is only for the form that the user will submit
export const formSchema = {
    // Page 1
    applicantFirstName: item.string(),
    applicantLastName: item.string(),
    applicantMiddleName: item.string(),
    applicantSex: item.string().min(1).max(6),
    applicantAge: item.number().min(18).max(255),
    applicantBirthdate: item.date(),
    applicantBirthplace: item.string().min(1).max(50),
    applicantCitizenship: item.string().default("Filipino"),
    applicantCivilStatus: item.string().default("S"),
    applicantPhoto: item.image().size(5 * 1024 * 1024), // Limits to 5MB
    applicantSignature: item.image().size(1 * 1024 * 1024), // Limits to 1MB
    applicantMotherMaidenName: item.string(),
    applicantAddress: item.string(),
    applicantMobile: item.number(),
    applicantTelephone: item.string().optional(true),
    applicantEmail: item.string(),

    // Page 2
    isFirstTime: item.boolean().default(null),
    lastExaminationTaken: item.date().conditionallyRequired("isFirstTime", (val) => val === false), // Depends on isFirstTime
    /* FOR CSC Processor Only
    CSCRegionalOffice: item.string(),
    VerifiedAgainst: item.string(),
    */
    PWD: item.string().optional(true),
    isPregnant: item.boolean(),
    isSeniorCitizen: item.boolean(),
    existingExaminations: item.array().default([]),

    // Page 3
    highestEducLevel: item.string().optional(true), // If this is none, then don't display all
    titleOfDegree: item.string().conditionallyRequired("highestEducLevel", (val) => ["College", "Postgraduate"].includes(val)),
    major: item.string().optional(true),
    completion: item.string().min(1).max(2).conditionallyRequired("highestEducLevel", (val) => val !== null),
    graduationDate: item.date().conditionallyRequired("highestEducLevel", (val) => val !== null),
    honorsReceived: item.string().optional(true),
    NGHighestAttain: item.string().conditionallyRequired("completion", (val) => val === "NO"),
    schoolStartYear: item.number().conditionallyRequired("highestEducLevel", (val) => val !== null),
    schoolEndYear: item.number().conditionallyRequired("highestEducLevel", (val) => val !== null),
    schoolName: item.string().conditionallyRequired("highestEducLevel", (val) => val !== null),
    schoolAddress: item.string().conditionallyRequired("highestEducLevel", (val) => val !== null),

    // Page 4
    isEmployed: item.boolean(),
    employmentPosition: item.string().conditionallyRequired("isEmployed", (val) => val === true),
    employmentYears: item.number().min(0).max(100).conditionallyRequired("isEmployed", (val) => val === true),
    employmentStatus: item.string().min(1).max(3).conditionallyRequired("isEmployed", (val) => val === true),
    agencyName: item.string().conditionallyRequired("isEmployed", (val) => val === true),
    agencyAddress: item.string().conditionallyRequired("isEmployed", (val) => val === true),
};

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

    schema.forEach((value, key) => {
        // Ignore any file uploads, these are handled as part of the formData
        if(value.schemaItem instanceof SchemaItemImage)
            return;
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
                const serialized = serialize(mapped);
                allSerialized.push(serialized);
            }

            data[key.toString()] = allSerialized;
            return;
        }

        if(value.value instanceof CalendarDate)
            data[key.toString()] = value.value.toString() ?? null;
        else
            data[key.toString()] = value.value ?? null;
    });

    return data;
}

export function getFileUploads(schema: Map<string, Item<any>>): Record<string, File | null>
{
    // While this might seem inefficient, it's negligible
    let data: Record<string, File | null> = {};

    schema.forEach((value, key) => {
        if(!(value.schemaItem instanceof SchemaItemImage))
            return;

        data[key.toString()] = value.value;
    });

    return data;
}
