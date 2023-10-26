import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Cart } from 'app/main/ecommerce/models/cart.viewmodel';
import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { ProductService } from 'app/main/products/service/product.service';
import { User } from 'app/main/user/model/user.viewmodel';
import { UserService } from 'app/main/user/service/user.service';
import { AlertService } from 'app/shared/service/alert/alert.service';
import Stepper from 'bs-stepper';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Transaction } from '../models/transaction.viewmodel';
import { CheckoutValidation } from '../service/checkout-validation.service';

@Component({
  selector: 'app-ecommerce-checkout',
  templateUrl: './ecommerce-checkout.component.html',
  styleUrls: ['./ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceCheckoutComponent implements OnInit, OnDestroy {
  // Public
  public contentHeader: object;
  public user: User;
  public cart = [];
  public total = 0;
  public tax = 0.02;
  public taxedTotal = 0;
  public paymentMethod = ['Credit / Debit / ATM Card','Net Banking','EMI (Easy Installment)','Cash On Delivery']
  public selectedMethod: string = '';
  public address = {
    fullNameVar: '',
    numberVar: '',
    flatVar: '',
    landmarkVar: '',
    cityVar: '',
    pincodeVar: '',
    stateVar: ''
  };

  // Private
  private checkoutStepper: Stepper;

  private _unsubscribeAll: Subject<any>;

  /**
   *  Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService,
    private _alertService: AlertService
    ) {
    this.user = this._userService.currentUserValue
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Stepper Next
   */
  nextStep() {
    this.checkoutStepper.next();
  }
  /**
   * Stepper Previous
   */
  previousStep() {
    this.checkoutStepper.previous();
  }

  /**
   * Validate Next Step
   *
   * @param addressForm
   */
  validateNextStep(addressForm) {
    if (addressForm.valid) {
      this.nextStep();
    }
  }

  sum() {
    const reducer = (prev, cur) => prev + ((cur.productQty || 1) * cur.product?.productPrice);
    this.total = this.cart.reduce(reducer,0)
    this.taxedTotal = this.total + (this.total * this.tax)
  }

  smoothUpdate(d1: Cart[], d2: Cart[]): void {
    d1.forEach((data,index) => {
      data.productQty = d2[index].productQty
    })
  }

  selectMethod(method: string){
    this.selectedMethod = method
  }

  async onCheckout() {
    const data = new Transaction();
    data.userId = this.user.userId
    data.paymentMethod = this.selectedMethod
    data.amountPaid = this.taxedTotal
    const validation: any = new CheckoutValidation(data);
    if(validation.valid()){
      try{
        const res = await this._ecommerceService.addTransaction(data)
        if(res) {
          await this._ecommerceService.getUserCart(this.user.userId)
          await this._productService.getProducts();
          this._alertService.Global_Alert('success', 'Success', res)
        }
      } catch(e){
        this._alertService.Global_Alert('error','Error',e)
      }
    }
    else{
      this._alertService.toastrError("Error",validation.message,2500,'center')
    }

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  /**
   * On init
   */
  async ngOnInit() {
    // content header
    await this._ecommerceService.getUserCart(this.user.userId)
    this._ecommerceService.onCartChange.pipe(distinctUntilChanged(),takeUntil(this._unsubscribeAll)).subscribe((res) => {
      //@ts-ignore
      if (res.length !== this.cart.length) this.cart = [...res]
      else this.smoothUpdate(this.cart,res);
      this.sum();
    })

    this.checkoutStepper = new Stepper(document.querySelector('#checkoutStepper'), {
      linear: false,
      animation: true
    });

    // console.log(this.cart)
    this.contentHeader = {
      headerTitle: 'Checkout',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Shop',
            isLink: false,
          },
          {
            name: 'Checkout',
            isLink: false,
          }
          // {
          //   name: 'Home',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'eCommerce',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'Checkout',
          //   isLink: false
          // }
        ]
      }
    };
  }
}
