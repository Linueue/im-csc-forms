import { z } from "zod";
 
export const formSchema = z.object({
  regionalOffice: z.string().min(2).max(50).default("NCR"),
  dateOfExaminatioin: z.date(),
  placeOfExamination: z.string().min(2).max(50),
  isFirstTime: z.boolean(),
  lastExaminationTaken: z.date().optional(),
});
 
export type FormSchema = typeof formSchema;
