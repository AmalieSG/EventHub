export interface Event {
  readonly id: string;
  title: string;
  description: string;
  summary: string;
  eventStart: string;
  //date: Date;
  //time: string;
  //placeName?: string;
  address: string;
  price: number;
  //attendeeIds: number[];
  hostId: number;
  category: string;
  imageUrl: string;
  //createdAt: Date;
  //updatedAt?: Date;
  //deletedAt?: Date;
  status: "upcoming" | "ongoing" | "ended" | "cancelled";
}
