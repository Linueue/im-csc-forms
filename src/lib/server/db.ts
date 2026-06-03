import mysql from "mysql2/promise";
import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "$env/static/private";

export const pool = mysql.createPool({
    host: DB_HOST,
    // ?? means if DB_PORT is undefined, then use "3306"
    port: parseInt(DB_PORT ?? "3306"),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

async function addSchool(forms: Record<string, string>): Promise<number | null>
{
    if(!forms.schoolName)
        return null;

    const [schools] = await pool.execute<RowDataPacket[]>(
        `
        SELECT SchoolID
        FROM School
        WHERE SchoolName = ? AND SchoolAddress = ?;
        `,
        [
            forms.schoolName,
            forms.schoolAddress
        ],
    );

    if(schools.length > 0)
        return schools[0].SchoolID;

    const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO School(
            SchoolName,
            SchoolAddress
         )
         VALUES (
            ?, ?
         );`,
        [
            forms.schoolName,
            forms.schoolAddress,
        ]
    );

    return result.insertId;
}

async function addExistingExaminations(applicant: number, forms: Record<string, any>)
{
    let existingExaminationsPromise = [];

    for(const [seq, existingExamination] of forms.existingExaminations.entries())
    {
        const promise = pool.execute(`
            INSERT INTO ExistingExamination (
                ApplicantNo,
                ExistingExaminationSeq,
                ExistingExaminationTitle,
                ExistingExaminationRating,
                ExistingExaminationDate,
                ExistingExaminationPlace
            )
            VALUES (
                ?, ?, ?, ?, ?, ?
            );
        `,
        [
            applicant,
            seq + 1,
            existingExamination.existingExaminationTitle,
            existingExamination.existingExaminationRating,
            existingExamination.existingExaminationDate,
            existingExamination.existingExaminationPlace,
        ]);
        existingExaminationsPromise.push(promise);
    }

    await Promise.all(existingExaminationsPromise);
}

async function addAgency(forms: Record<string, any>): Promise<number>
{
    const [agency] = await pool.execute<ResultSetHeader>(`
        INSERT INTO Agency (
            AgencyName,
            AgencyAddress
        )
        VALUES (
            ?, ?
        )`,
        [
            forms.agencyName,
            forms.agencyAddress
        ],
    );

    return agency.insertId;
}

async function addEmployment(applicant: number, forms: Record<string, any>)
{
    if(!forms.isEmployed)
        return;

    const agency = await addAgency(forms);

    await pool.execute(`
        INSERT INTO Employment (
            ApplicantNo,
            AgencyID,
            EmploymentPosition,
            EmploymentYears,
            EmploymentStatus,
        )
        VALUES (
            ?, ?, ?, ?, ?
        )`,
        [
            applicant,
            agency,
            forms.employmentPosition,
            forms.employmentYears,
            forms.employmentStatus,
        ],
    );
}

export async function addApplicant(forms: Record<string, any>)
{
    const name = `${forms.applicantLastName}, ${forms.applicantFirstName} ${forms.applicantMiddleName}`;
    const schoolID = await addSchool(forms);

    const [applicant] = await pool.execute<ResultSetHeader>(`
        INSERT INTO Applicant (
            IsFirstTime,
            LastExaminationTaken,
            CSCRegionalOffice,
            ExaminationDate,
            Examinationplace,
            VerifiedAgainst,
            ApplicantPhotoURL,
            ApplicantSignatureURL,
            ApplicantName,
            Age,
            Birthdate,
            Sex,
            Birthplace,
            Citizenship,
            MotherMaidenName,
            PermanentMailingAddress,
            CivilStatus,
            IsPregnant,
            IsSeniorCitizen,
            PWD,
            MobileNumber,
            Telephone,
            EmailAddress,
            EmploymentType,
            HighestEducLevel,
            Completion,
            GraduationDate,
            HonorsReceived,
            NGHighestAttained,
            TitleOfDegree,
            Major,
            SchoolStartYear,
            SchoolEndYear,
            SchoolID
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );`,
        [
            forms.isFirstTime,
            forms.lastExaminationTaken,
            "I", // CSCRegionalOffice
            "2026-05-03", // ExaminationDate
            "Manila", // ExaminationPlace
            "DIBAR", // VerifiedAgainst
            forms.applicantPhoto,
            forms.signaturePhoto,
            name,
            forms.applicantAge,
            forms.applicantBirthdate,
            forms.applicantSex,
            forms.applicantBirthplace,
            forms.applicantCitizenship,
            forms.applicantMotherMaidenName,
            forms.applicantAddress,
            forms.applicantCivilStatus,
            forms.isPregnant,
            forms.isSeniorCitizen,
            forms.PWD,
            `0${forms.applicantMobile}`,
            forms.applicantTelephone,
            forms.applicantEmail,
            forms.employmentStatus,
            forms.highestEducLevel,
            forms.completion,
            forms.graduationDate,
            forms.honorsReceived,
            forms.NGHighestAttain,
            forms.titleOfDegree,
            forms.major,
            forms.schoolStartYear,
            forms.schoolEndYear,
            schoolID,
        ],
    );

    addExistingExaminations(applicant.insertId, forms);
    addEmployment(applicant.insertId, forms);
}
