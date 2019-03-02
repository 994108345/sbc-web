import {Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'brand-add',
  templateUrl: './demo.add.html',
  styleUrls: ['./demo.add.css'],
  encapsulation: ViewEncapsulation.None
})
export class DemoAddComponent extends AbstractComponent{
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email, Validators.required ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      nickname         : [ null, [ Validators.required ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required ] ],
      website          : [ null, [ Validators.required ] ],
      captcha          : [ null, [ Validators.required ] ],
      agree            : [ false ]
    });
  }
}
