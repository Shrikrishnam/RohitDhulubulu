import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  allAppointments: any = [];

  constructor(private backend: UserService, private router: Router) {}

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
    this.backend.getfitnessdata().subscribe(data =>{
      this.allAppointments = data;
      this.allAppointments  = this.allAppointments.filter(item => {
        if(!item.message) return item;
      }) 
    });
  }

  cancelAppointment(id: number){
    if(confirm("Cancel the appointment?")){
      this.backend.deleteData(id);
      this.ngOnInit();
}
  }

  editDetails(id: number){
    this.router.navigateByUrl('place-fitness-trainer-appointment/' + id);
  }

}
