import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-applayout',
  templateUrl: './applayout.component.html'
})
export class ApplayoutComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalService.dismissAll();
  }

}
