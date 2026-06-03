CREATE TABLE IF NOT EXISTS School(
    SchoolID INT AUTO_INCREMENT PRIMARY KEY,
    SchoolName VARCHAR(100),
    SchoolAddress VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS Applicant (
    ApplicantNo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    IsFirstTime BOOLEAN NOT NULL,
    LastExaminationTaken DATE,
    CSCRegionalOffice VARCHAR(10),
    ExaminationDate DATE,
    Examinationplace VARCHAR(50),
    VerifiedAgainst VARCHAR(10),
    ApplicantPhotoURL VARCHAR(255) NOT NULL,
    ApplicantSignatureURL VARCHAR(255) NOT NULL,
    ApplicantName VARCHAR(100) NOT NULL,
    Age INT NOT NULL,
    Birthdate DATE NOT NULL,
    Sex CHAR(1) NOT NULL,
    Birthplace VARCHAR(50) NOT NULL,
    Citizenship VARCHAR(50) NOT NULL,
    MotherMaidenName VARCHAR(50) NOT NULL,
    PermanentMailingAddress VARCHAR(100) NOT NULL,
    CivilStatus VARCHAR(2) NOT NULL,
    IsPregnant BOOLEAN NOT NULL,
    IsSeniorCitizen BOOLEAN NOT NULL,
    PWD VARCHAR(50),
    MobileNumber VARCHAR(11) NOT NULL,
    Telephone VARCHAR(15),
    EmailAddress VARCHAR(50),
    EmploymentType VARCHAR(3),
    HighestEducLevel VARCHAR(50),
    Completion VARCHAR(2),
    GraduationDate DATE,
    HonorsReceived VARCHAR(20),
    NGHighestAttained VARCHAR(25),
    TitleOfDegree VARCHAR(50),
    Major VARCHAR(50),
    SchoolStartYear INT,
    SchoolEndYear INT,
    SchoolID INT,
    FOREIGN KEY(SchoolID) REFERENCES School(SchoolID)
);

CREATE TABLE IF NOT EXISTS ExistingExamination(
    ApplicantNo INT NOT NULL,
    ExistingExaminationSeq INT NOT NULL,
    ExistingExaminationTitle VARCHAR(50) NOT NULL,
    ExistingExaminationRating DECIMAL(5,2) NOT NULL,
    ExistingExaminationDate DATE NOT NULL,
    ExistingExaminationPlace VARCHAR(100) NOT NULL,
    PRIMARY KEY(ApplicantNo, ExistingExaminationSeq),
    FOREIGN KEY(ApplicantNo) REFERENCES Applicant(ApplicantNo)
);

CREATE TABLE IF NOT EXISTS Agency(
    AgencyID INT AUTO_INCREMENT PRIMARY KEY,
    AgencyName VARCHAR(100),
    AgencyAddress VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS Employment(
    ApplicantNo INT NOT NULL PRIMARY KEY,
    AgencyID INT NOT NULL,
    EmploymentPosition VARCHAR(50),
    EmploymentYears INT,
    EmploymentStatus VARCHAR(3),
    FOREIGN KEY(ApplicantNo) REFERENCES Applicant(ApplicantNo),
    FOREIGN KEY(AgencyID) REFERENCES Agency(AgencyID)
);

CREATE TABLE IF NOT EXISTS CollectingOfficer(
    CollectingOfficerID INT AUTO_INCREMENT PRIMARY KEY,
    CollectingOfficerName VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Processor(
    ProcessorID INT AUTO_INCREMENT PRIMARY KEY,
    ProcessorName VARCHAR(50) NOT NULL,
    ProcessorPosition VARCHAR(50) NOT NULL,
    ProcessorSignatureURL VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Payment(
    ApplicantNo INT NOT NULL PRIMARY KEY,
    ProcessingORNumber CHAR(15) NOT NULL UNIQUE,
    ProcessingDate DATE NOT NULL,
    ProcessingAmount DECIMAL(10, 2) NOT NULL,
    CollectingOfficerID INT NOT NULL,
    ProcessingIdentification VARCHAR(50) NOT NULL,
    ProcessingActionTaken CHAR(1) NOT NULL,
    ProcessingReasonForDisapproval VARCHAR(100),
    ProcessorID INT NOT NULL,
    TimeProcessed TIME,
    FOREIGN KEY(ApplicantNo) REFERENCES Applicant(ApplicantNo),
    FOREIGN KEY(CollectingOfficerID) REFERENCES CollectingOfficer(CollectingOfficerID),
    FOREIGN KEY(ProcessorID) REFERENCES Processor(ProcessorID)
);
