CREATE TABLE Users(
    Id SERIAL PRIMARY KEY,  
    Username Text NOT NULL, 
    Email Text UNIQUE NOT NULL, 
    PSW Text NOT NULL,
    URole Text NOT NULL
);

CREATE TABLE Roles(
    R_ID SERIAL PRIMARY KEY,
    R_Name TEXT UNIQUE NOT NULL
);