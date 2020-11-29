import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {

  private modalRef: NgbModalRef;
  closeResult = null;
  @Input() messageForShow;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
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
