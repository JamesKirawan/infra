import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { User } from '../../model/user.viewmodel';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit, OnDestroy {
  // Public
  @Input() modal: any
  public avatarImage: string;
  public user: User;
  public env = environment
  public UserForm: FormGroup;
  public passwordTextType: boolean;
  public submitted: boolean = false;
  public imagePath: any = '../../../../../assets/images/avatars/unknown.png'
  private image: any;
  
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
     private _userService: UserService,
     private _fb: FormBuilder,
     private _alertService: AlertService
     ) {
     this._unsubscribeAll = new Subject();
     this.user = this._userService.currentUserValue;
     this.imagePath = (this.user.userAvatar)?(`${this.env.apiUrl}/${this.user.userAvatar}`): this.imagePath
    //  console.log(this.imagePath)
     this.UserForm = this._fb.group({
       userId: [this.user.userId],
       name: [this.user.name, [Validators.required]],
       userName: [this.user.userName, [Validators.required]],
       address: [this.user.address, [Validators.required]],
       email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
       phoneNo: [this.user.phoneNo, Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]*')])],
       oldPassword: ['', [Validators.minLength(8)]],
       newPassword: ['', [Validators.minLength(8)]],
       userAvatar: [this.user.userAvatar]
     })
    //  console.log(this.f.userName)
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.image = event.target.files[0]
      this.f.userAvatar.setValue(this.image.name)
      // console.log(this.image)
      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };
      reader.readAsDataURL(this.image);
    }
  }

  get f() {
    return this.UserForm.controls
  }
  /**
   * Submit
   *
   * @param form
   */
  submit(): any {
    if (this.UserForm.invalid) {
      this.submitted = true;
      return
    }
    this.submitted = false;
    const data = this.UserForm.getRawValue();
    const form = new FormData;
    Object.keys(data).forEach((key) => {
      form.append(key,data[key])
    })
    form.append('file',this.image)
    this._userService.updateUserProfile(data.userId, form).subscribe((res) => {
      if (res.message === 'Profile Updated!') {
        this._alertService.Global_Alert('success','Success',res.message)
        this._userService.reload();
      }
      else this._alertService.Global_Alert('error','Error',res.message)
    },(err) => {
      this._alertService.Global_Alert('error','Error',err)
    })
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
