export interface EventAttendee {
    readonly eventId: string;
    readonly userId: number;
    readonly joinedAt: string | number | Date;
}