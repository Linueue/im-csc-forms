import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { type DBClient } from "$lib/server"
import { getToday, getCurrentTime } from "$lib/utils/date"

async function addSchool(connection: DBClient, forms: Record<string, string>): Promise<number | null>
{
    if(!forms.schoolName)
        return null;

    const [schools] = await connection.execute<RowDataPacket[]>(
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

    const [result] = await connection.execute<ResultSetHeader>(
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

async function addExistingExaminations(connection: DBClient, applicant: number, forms: Record<string, any>)
{
    let existingExaminationsPromise = [];

    for(const [seq, existingExamination] of forms.existingExaminations.entries())
    {
        const promise = connection.execute(`
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

async function addAgency(connection: DBClient, forms: Record<string, any>): Promise<number>
{
    const [agency] = await connection.execute<ResultSetHeader>(`
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

async function addEmployment(connection: DBClient, applicant: number, forms: Record<string, any>)
{
    if(forms.employmentType === "U")
        return;

    const agency = await addAgency(connection, forms);

    await connection.execute(`
        INSERT INTO Employment (
            ApplicantNo,
            AgencyID,
            EmploymentPosition,
            EmploymentYears,
            EmploymentStatus
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

export async function addApplicant(connection: DBClient, forms: Record<string, any>)
{
    const name = `${forms.applicantLastName}, ${forms.applicantFirstName} ${forms.applicantMiddleName}`;
    const schoolID = await addSchool(connection, forms);

    const [applicant] = await connection.execute<ResultSetHeader>(`
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
            null, // CSCRegionalOffice
            null, // ExaminationDate
            null, // ExaminationPlace
            null, // VerifiedAgainst
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
            forms.applicantMobile,
            forms.applicantTelephone,
            forms.applicantEmail,
            forms.employmentType,
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

    const examPromise = addExistingExaminations(connection, applicant.insertId, forms);
    const empPromise = addEmployment(connection, applicant.insertId, forms);

    await Promise.all([examPromise, empPromise])
        .catch(err => { throw new Error("Could not add existing examinations, and employment. err: " + err) });
}

export async function addPostDetails(connection: DBClient, forms: Record<string, any>)
{
    const applicantPromise = connection.execute(`
        UPDATE Applicant
        SET VerifiedAgainst = ?,
            ExaminationDate = ?,
            ExaminationPlace = ?,
            CSCRegionalOffice = ?
        WHERE ApplicantNo = ?;
    `, [
        forms.verifiedAgainst,
        forms.examinationDate,
        forms.examinationPlace,
        forms.CSCRegionalOffice,
        forms.applicantNo
    ]);

    const paymentPromise = connection.execute(`
        INSERT INTO Payment(
            ApplicantNo,
            ProcessingORNumber,
            ProcessingDate,
            ProcessingAmount,
            CollectingOfficerID,
            ProcessingIdentification,
            ProcessingActionTaken,
            ProcessingReasonForDisapproval,
            ProcessorID,
            TimeProcessed
        )
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
    `, [
        forms.applicantNo,
        forms.processingORNumber,
        getToday().toString(),
        forms.processingAmount,
        forms.collectingOfficerID,
        forms.processingIdentification,
        forms.processingActionTaken,
        forms.processingReasonForDisapproval,
        forms.processorID,
        getCurrentTime().toString(),
    ]);

    await Promise.all([applicantPromise, paymentPromise]);
}

export async function addCollectingOfficer(connection: DBClient, forms: Record<string, any>)
{
    await connection.execute(`
        INSERT INTO CollectingOfficer(
            CollectingOfficerName
        )
        VALUES ( ? );
    `, [
        forms.collectingOfficerName
    ]);
}

export async function addProcessor(connection: DBClient, forms: Record<string, any>)
{
    await connection.execute(`
        INSERT INTO Processor(
            ProcessorName, ProcessorPosition, ProcessorSignatureURL
        )
        VALUES ( ?, ?, ? );
    `, [
        forms.processorName,
        forms.processorPosition,
        forms.processorSignatureURL,
    ]);
}
