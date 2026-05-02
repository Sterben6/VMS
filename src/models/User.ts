import { OrgType } from './OrgType';

export interface User {
    id: number;
    name: string;
    email: string;
    status_id: number;

    org_unit_id: number;
    org_type_id: OrgType;

    role_name: string;
    role_privilege: number;
    global_access: boolean;

    created_at: Date;
}
