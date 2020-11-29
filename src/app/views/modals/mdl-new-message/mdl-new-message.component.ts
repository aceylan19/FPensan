import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mdl-new-message',
  templateUrl: './mdl-new-message.component.html',
  styleUrls: ['./mdl-new-message.component.css']
})
export class MdlNewMessageComponent implements OnInit {
  closeResult = null;
  modalRef = null;
  fromModal = true;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'x-sm',
      backdrop: 'static',
      keyboard: true
    });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  close() {
    this.modalRef.close();
  }

}
