import { item } from "$lib/components/ItemSchema.svelte";
import { writable } from "svelte/store";

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
});
