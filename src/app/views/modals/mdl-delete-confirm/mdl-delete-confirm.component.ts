import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mdl-delete-confirm',
  templateUrl: './mdl-delete-confirm.component.html',
  styleUrls: ['./mdl-delete-confirm.component.css']
})
export class MdlDeleteConfirmComponent implements OnInit {

  closeResult: string;

  @Output() onConfirmDelete: EventEmitter<null> = new EventEmitter();
  @Input() rowButton: boolean;
  @Input() buttonText: string = null;
  @Input() buttonState: boolean;
  @Input() buttonDisable: boolean;
  @Input() deleteAllPhoto: boolean;
  private modalRef: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
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

  onClickYes() {
    this.modalRef.close();
    this.onConfirmDelete.emit();
  }

  close() {
    this.modalRef.close();
  }

}
