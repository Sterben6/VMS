export interface Event {
    id: number;
    name: string;
    description?: string;
    event_date: Date;

    org_unit_id: number;

    created_by: number;
    created_at: Date;
}
