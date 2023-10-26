export class Transaction {
  transactionId: number;
  userId: number;
  createdAt: string | null;
  paymentMethod: string;
  transactionPoint: number;
  amountPaid: number;

  constructor(Transaction: any = {}) {
    this.transactionId = Transaction.transactionId || 0;
    this.userId = Transaction.userId || 0;
    this.createdAt = Transaction.createdAt || null;
    this.paymentMethod = Transaction.paymentMethod || '';
    this.transactionPoint = Transaction.transactionPoint || 0;
    this.amountPaid = Transaction.amountPaid || 0;
  }
}