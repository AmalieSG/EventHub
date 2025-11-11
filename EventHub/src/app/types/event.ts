export interface Event {
  readonly id: string;
  title: string;
  description: string;
  summary: string;
  imageUrl: string;
  category: string;
  address: string;
  eventStart: string | number | Date;
  price: number;
  hostId: number;
  status: "upcoming" | "ongoing" | "ended" | "cancelled";
  createdAt: string | number | Date;
  updatedAt?: string | number | Date | null;
  deletedAt?: string | number | Date | null;
 isCreatedByMe: boolean; 
  isJoinedByMe: boolean; 
  isSavedByMe: boolean;
  isPast: boolean;
  city: string;
  isOnline: boolean;
}