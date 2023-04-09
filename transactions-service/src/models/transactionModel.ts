export interface Transaction {
  id: string;
  offerId: string;
  title: string;
  description: string;
  amount: number;
  sender: string;
  recipient: string;
  createdAt: number;
  success?: boolean;
  updatedAt?: number;
}

export type CreateTransactionData = Pick<
  Transaction,
  "offerId" | "title" | "description" | "amount" | "sender" | "recipient"
>;
