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