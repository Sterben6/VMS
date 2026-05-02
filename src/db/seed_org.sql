
INSERT INTO School (name, short_name)
VALUES
    ('University of Texas at San Antonio', 'UTSA');

INSERT INTO OrganizationUnit (name, type, org_type_id, parent_id)
VALUES
    ('AAS National', 'national', 1, NULL),
    ('SW National',  'national', 2, NULL);

-- AAS Region IX
INSERT INTO OrganizationUnit (name, type, org_type_id, parent_id)
VALUES (
           'Region IX',
           'region',
           1,
           (SELECT id FROM OrganizationUnit WHERE name = 'AAS National')
       );

-- SW Region IX
INSERT INTO OrganizationUnit (name, type, org_type_id, parent_id)
VALUES (
           'Region IX',
           'region',
           2,
           (SELECT id FROM OrganizationUnit WHERE name = 'SW National')
       );


-- UTSA AAS Squadron
INSERT INTO OrganizationUnit (name, type, org_type_id, school_id, parent_id)
VALUES (
           'UTSA AAS Squadron',
           'squadron',
           1,
           (SELECT id FROM School WHERE short_name = 'UTSA'),
           (SELECT id FROM OrganizationUnit WHERE name = 'Region IX' AND org_type_id = 1)
       );

-- UTSA Silver Wings Chapter
INSERT INTO OrganizationUnit (name, type, org_type_id, school_id, parent_id)
VALUES (
           'UTSA Silver Wings',
           'chapter',
           2,
           (SELECT id FROM School WHERE short_name = 'UTSA'),
           (SELECT id FROM OrganizationUnit WHERE name = 'Region IX' AND org_type_id = 2)
       );
