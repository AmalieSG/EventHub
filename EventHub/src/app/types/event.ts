export interface Event {
  readonly id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  attendees: number;
  host: string;
  category: string;
  createdAt: string;
}
