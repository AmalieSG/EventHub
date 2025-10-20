export interface Event {
  readonly id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  price: number;
  attendeeIds: number[];
  hostId: number;
  category: string;
  imageUrl: string;
  createdAt: string;
}
