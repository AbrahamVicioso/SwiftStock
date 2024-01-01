CREATE TABLE Users(
    Id SERIAL PRIMARY KEY,  
    Username Text NOT NULL, 
    Email Text UNIQUE NOT NULL, 
    PSW Text NOT NULL,
    URole Text NOT NULL
);

CREATE TABLE Roles(
    R_Id SERIAL PRIMARY KEY,
    R_Name TEXT UNIQUE NOT NULL
);

-- SEQUENCE ARTICLES
CREATE SEQUENCE ArticlesCode
INCREMENT 1
START 01;


CREATE TABLE Articles(
    ar_id SERIAL PRIMARY KEY,
    ar_name TEXT NOT NULL,
    ar_code TEXT UNIQUE,
    ar_brand TEXT NOT NULL,
    ar_year TEXT NOT NULL,
    ar_color Text NOT NULL,
    ar_image Text
);

CREATE FUNCTION art2_code()
RETURNS TRIGGER AS $$
BEGIN
	NEW.ar_code := 	'A'|| SUBSTRING(NEW.ar_brand,1,1) || EXTRACT("year" FROM CURRENT_DATE) || CAST(nextval('articlescode') AS TEXT) || UPPER(SUBSTRING(NEW.ar_name,1,1)) || '-' || UPPER(SUBSTRING(NEW.ar_color,1,1));
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' ;


CREATE TRIGGER create_artcode
	BEFORE INSERT
	ON articles
	FOR EACH ROW
EXECUTE PROCEDURE art2_code();


CREATE TABLE Wharehouses(
    W_id SERIAL PRIMARY KEY,
    W_name TEXT UNIQUE NOT NULL
);