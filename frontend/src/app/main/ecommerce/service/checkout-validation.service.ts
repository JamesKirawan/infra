import { Transaction } from "../models/transaction.viewmodel";

export class CheckoutValidation {
  data: Transaction;
  public status: boolean = false
  public message: string = ''
  constructor(data: Transaction) {
    this.data = data
  }

  valid(): any {
    if(this.data.amountPaid <= 0) {
      this.message = 'Cart is empty!'
    }
    else if(this.data.paymentMethod === ''){
      this.message = 'Please select payment method'
    }
    else{
      this.status = true
    }
    return this.status;
  }
}