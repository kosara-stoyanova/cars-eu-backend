export interface Offer {
  _id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  createdAt: number;
  updatedAt?: number;
  closed: boolean;
}

export type CreateOfferData = Pick<
  Offer,
  "title" | "description" | "price" | "author"
>;
