export interface EventAttendee {
    readonly eventId: number;
    readonly userId: number;
    readonly joinedAt: string | number | Date;
}