-- Organization types, 1 for AAS, 2 for SW
CREATE TABLE OrgType (
    id INT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO OrgType (id, name)
VALUES
    (1, 'AAS'),
    (2, 'SW');

CREATE TABLE School (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    short_name TEXT
);

CREATE TABLE OrganizationUnit (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('national', 'region', 'squadron', 'chapter')),
    school_id INT REFERENCES School(id),
    org_type_id INT REFERENCES OrgType(id),
    parent_id INT REFERENCES OrganizationUnit(id)
);

CREATE TABLE UserStatus (
    id INT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO UserStatus (id, name) VALUES
    (1, 'active'),
    (2, 'inactive'),
    (3, 'alumni'),
    (4, 'candidate'),
    (5, 'honorary'),
    (6, 'probation'),
    (7, 'unpaid');

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status_id INT REFERENCES UserStatus(id) DEFAULT 1 NOT NULL,

    org_unit_id INT REFERENCES OrganizationUnit(id),
    org_type_id INT REFERENCES OrgType(id),

    role_name TEXT NOT NULL,
    role_privilege INT NOT NULL,
    global_access BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,

    org_unit_id INT REFERENCES OrganizationUnit(id),

    created_by INT REFERENCES Users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE EventOrganization (
    event_id INT REFERENCES Events(id) ON DELETE CASCADE,
    org_type_id INT REFERENCES OrgType(id),
    PRIMARY KEY (event_id, org_type_id)
);

CREATE TABLE EntryStatus (
    id INT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO EntryStatus (id, name) VALUES
      (1, 'pending'),
      (2, 'approved'),
      (3, 'rejected');

CREATE TABLE VolunteerEntry (
    id SERIAL PRIMARY KEY,

    event_id INT REFERENCES Events(id),
    user_id INT REFERENCES Users(id),

    hours_worked NUMERIC(5,2) NOT NULL CHECK (hours_worked >= 0),

    submitted_by INT REFERENCES Users(id),

    status_id INT NOT NULL REFERENCES EntryStatus(id) DEFAULT 1,

    approved_by INT REFERENCES Users(id),
    approved_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()
);