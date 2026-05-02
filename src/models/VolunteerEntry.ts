export interface VolunteerEntry {
    id: number;

    event_id: number;
    user_id: number;

    hours_worked: number;

    submitted_by: number;

    status_id: number;

    approved_by: number | null;
    approved_at: Date | null;

    created_at: Date;
}
