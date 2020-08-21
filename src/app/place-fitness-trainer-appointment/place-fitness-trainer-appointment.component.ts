import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';


export class Fitness {
  constructor(
    public firstname:string,
    public lastname: string,
    public age:number,
    public email: string,
    public streetaddress: string,
    public pincode: number,
    public trainerpreference: string,
    public packages: string,
    public city: string,
    public country: string,
    public phonenumber: number,
    public state: string,
    public inr: number,
    public paisa: number,

  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  @Output() fitnessdata = new EventEmitter<Fitness>();
  fitnessForm: FormGroup;
  public obj: any = {};
  userData: any = {};

  constructor(private fb: FormBuilder, private backend: UserService, private router: Router, private actRoute: ActivatedRoute) { }
  
  
  ngOnInit() {
    let id =  this.actRoute.snapshot.params.id;
    
    if(id && id !=0){
      this.backend.getUserData(id).subscribe(data => {
        this.setData(data);
      });
    }

    this.fitnessForm = this.fb.group({
      firstname : ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastname : ["", [Validators.required,  Validators.pattern("[a-zA-Z ]*")]],
      age : ["", [Validators.required, Validators.min(19), Validators.max(59)]],
      email : ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      streetaddress : ["", [Validators.required]],
      city : ["", [Validators.required]],
      country : ["", [Validators.required]],
      pincode : ["", [Validators.required, Validators.min(100000), Validators.max(999999)]],
      phonenumber : ["", [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      state : ["", [Validators.required]],
      trainerpreference : ["", [Validators.required]],
      packages : ["", [Validators.required]],
      inr : ["", [Validators.required]],
      paisa : ["", [Validators.required]],
    })  
  }

  setData(data: Object){
    this.userData = data;
    this.fitnessForm.setValue({
      firstname : this.userData.firstname,
      lastname : this.userData.lastname,
      age : this.userData.age,
      email : this.userData.email,
      streetaddress : this.userData.streetaddress,
      pincode : this.userData.pincode,
      city : this.userData.city,
      country : this.userData.country,
      phonenumber : this.userData.phonenumber,
      state : this.userData.state,
      trainerpreference : this.userData.trainerpreference,
      packages : this.userData.packages,
      inr : this.userData.packages === "gold" ? 1000 : 500,
      paisa : this.userData.packages === "gold" ? 10 : 5,
    })
  }

  setPrice(inr: number, paisa: number){
    this.fitnessForm.patchValue({inr, paisa});
  }

  onSubmit() {
    this.obj = {...this.fitnessForm.value, ...this.obj};
    this.fitnessForm.value;
    
    if(this.fitnessForm.valid){
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.email,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.state,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.packages,
          this.fitnessForm.value.paisa,
          this.fitnessForm.value.inr,
        )
      );

      //store in database
      if(this.fitnessForm.value.packages === "gold"){
        this.fitnessForm.value.inr = "1000";
        this.fitnessForm.value.paisa = "10";
      }else{
        this.fitnessForm.value.inr = "500";
        this.fitnessForm.value.paisa = "5";
      }
      if(!this.userData.id)  //create new appointment
        this.backend.postfitnessdata(this.fitnessForm.value).subscribe(data => console.log(data));
      else //update existing appointment
        this.backend.updatefitnessdata(this.fitnessForm.value, this.userData.id).subscribe(data => console.log(data));
      
      this.router.navigateByUrl("landing-page")
    }
  }
    
}
