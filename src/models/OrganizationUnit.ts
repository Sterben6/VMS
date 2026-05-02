import { OrgType, OrgUnitType } from './OrgType';


export interface OrganizationUnit {
    id: number;
    name: string;
    type: OrgUnitType | null;
    school_id: number;

    org_type_id: OrgType;
    parent_id: number | null;
}
