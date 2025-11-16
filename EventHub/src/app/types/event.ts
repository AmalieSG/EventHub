export interface Event {
  readonly id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  date: Date;
  time: string;
  location: string;
  price: number;
  attendeeIds: number[];
  hostId: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  isCreatedByMe: boolean; 
  isJoinedByMe: boolean; 
  isSavedByMe: boolean;
  isPast: boolean;
  city: string;
  isOnline: boolean;
}

/*export interface Event {
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
}*/