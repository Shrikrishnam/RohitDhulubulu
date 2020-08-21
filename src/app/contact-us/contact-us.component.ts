import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../_services';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  constructor(private fb: FormBuilder, private router: Router, private backend: UserService) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phonenumber: ["", [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required]]
    });
  }

  isShow = false;

  toggle(){
    this.isShow = true;
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );

    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );

      this.backend.postfitnessdata(this.contactForm.value).subscribe(data => console.log(data));
      this.contactForm.reset();
    }
  }
}
