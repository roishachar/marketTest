import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder}  from '@angular/forms';
import {ToastComponent} from '../shared/toast/toast.component';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addPayForm: FormGroup;
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  creditcard = new FormControl('', Validators.required);

  constructor(private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.addPayForm = this.formBuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      location: this.location,
      creditcard: this.creditcard
    });
  }

  addPay() {
    this.dataService.addPay(this.addPayForm.value).subscribe(
      res => {
        let newPay = res.json();

        this.addPayForm.reset();
        this.toast.setMessage('Payment Completed', 'success');
      },
      error => console.log(error)
    );
  }
}
