import { item } from "$lib/components/ItemSchema.svelte";
import { writable } from "svelte/store";

// The Form Schema for validation during client runtime
// This does not correspond to Database schema
// This is only for the form that the user will submit
export const formSchema = $state({
    applicantName: item.string(),
    applicantAge: item.number().min(0).max(255),
    applicantBirthdate: item.date(),
});
