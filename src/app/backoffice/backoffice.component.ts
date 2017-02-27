import {Component} from '@angular/core';
import {ToastComponent} from "../shared/toast/toast.component";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-backoffice',
  templateUrl: 'backoffice.component.html',
  styleUrls: ['backoffice.component.css']
})
export class BackOfficeComponent {
  pays = [];


  constructor(private dataService: DataService,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getPays();
  }

  getPays() {
    this.dataService.getPays().subscribe(
      data => this.pays = data,
      error => console.log(error)
    );
  }

  deletePay(pay) {
    {
      this.dataService.deletePay(pay).subscribe(
        res => {
          let pos = this.pays.map(elem => {
            return elem._id;
          }).indexOf(pay._id);
          this.pays.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
