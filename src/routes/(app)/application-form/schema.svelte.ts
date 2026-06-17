import { item, type Item, ValidState } from "$lib/components/ItemSchema.svelte";

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
    applicantFirstName: item.string().page(1),
    applicantLastName: item.string().page(1),
    applicantMiddleName: item.string().page(1),
    applicantSex: item.string().min(1).max(6).page(1),
    applicantAge: item.number().min(18).max(255).page(1),
    applicantBirthdate: item.date().page(1),
    applicantBirthplace: item.string().min(1).max(50).page(1),
    applicantCitizenship: item.string().default("Filipino").page(1),
    applicantCivilStatus: item.string().default("S").page(1),
    applicantPhoto: item.image().size(1 * 1024 * 1024).page(1), // Limits to 1MB
    applicantMotherMaidenName: item.string().page(1),
    applicantAddress: item.string().page(1),
    applicantMobile: item.string().min(11).max(11).page(1),
    applicantTelephone: item.string().optional(true).page(1),
    applicantEmail: item.string().page(1),

    // Page 2
    isFirstTime: item.boolean().default(null).page(2),
    lastExaminationTaken: item.date().conditionallyRequired("isFirstTime", (val) => val === false).page(2), // Depends on isFirstTime
    /* FOR CSC Processor Only
    CSCRegionalOffice: item.string(),
    VerifiedAgainst: item.string(),
    */
    PWD: item.string().optional(true).page(2),
    isPregnant: item.boolean().page(2),
    isSeniorCitizen: item.boolean().page(2),
    existingExaminations: item.array().default([]).page(2),

    // Page 3
    highestEducLevel: item.string().optional(true).page(3), // If this is none, then don't display all
    titleOfDegree: item.string().conditionallyRequired("highestEducLevel", (val) => ["College", "Postgraduate"].includes(val)).page(3),
    major: item.string().optional(true).page(3),
    completion: item.string().min(1).max(2).conditionallyRequired("highestEducLevel", (val) => val !== null && val !== "").page(3),
    graduationDate: item.date().conditionallyRequired("completion", (val) => val === "G").page(3),
    honorsReceived: item.string().optional(true).page(3),
    NGHighestAttain: item.string().conditionallyRequired("completion", (val) => val === "NO").page(3),
    schoolStartYear: item.number().min(1000).max(9999).conditionallyRequired("highestEducLevel", (val) => val !== null && val !== "").page(3),
    schoolEndYear: item.number().conditionallyRequired("highestEducLevel", (val) => val !== null && val !== "").page(3),
    schoolName: item.string().conditionallyRequired("highestEducLevel", (val) => val !== null && val !== "").page(3),
    schoolAddress: item.string().conditionallyRequired("highestEducLevel", (val) => val !== null && val !== "").page(3),

    // Page 4
    employmentType: item.string().page(4),
    employmentPosition: item.string().conditionallyRequired("employmentType", (val) => val !== null && val !== "U").page(4),
    employmentYears: item.number().min(0).max(100).conditionallyRequired("employmentType", (val) => val !== null &&  val !== "U").page(4),
    employmentStatus: item.string().min(1).max(3).conditionallyRequired("employmentType", (val) => val !== null && val !== "U").page(4),
    agencyName: item.string().conditionallyRequired("employmentType", (val) => val !== null && val !== "U").page(4),
    agencyAddress: item.string().conditionallyRequired("employmentType", (val) => val !== null && val !== "U").page(4),

    // Page 5
    signaturePhoto: item.image().size(1 * 1024 * 1024).page(5), // Limits to 1MB
};

export function checkValidation(schema: Map<String, Item<any>>, page: number): boolean
{
    let valid = true;

    for(const [_, value] of schema)
    {
        if(value.schemaItem.pageNum != page)
            continue;

        value.validateThenSet();
        if(value.validState != ValidState.Valid)
            valid = false;
    };

    return valid;
}
