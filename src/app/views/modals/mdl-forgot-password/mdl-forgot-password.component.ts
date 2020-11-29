import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RequestModelsService} from '../../../services/request-models/request-models.service';
import {BaseMethodsService} from '../../../services/base/base-methods.service';
import {ManagementService} from '../../../services/management/management.service';

@Component({
    selector: 'app-mdl-forgot-password',
    templateUrl: './mdl-forgot-password.component.html',
    styleUrls: ['./mdl-forgot-password.component.css']
})
export class MdlForgotPasswordComponent implements OnInit {

    constructor(config: NgbModalConfig, private modalService: NgbModal,
                public managementService: ManagementService,
                private baseCtrl: BaseMethodsService,
                private requestModels: RequestModelsService) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }

    forgotPasswordForm = this.requestModels.forgotPasswordRequest;
    forgotPasssubmitted = false;
    public modalRef: NgbModalRef;

    ngOnInit() {
        this.forgotPasssubmitted = true;
    }

    open(content) {
        this.managementService.setForgotPasswordSuccess = false;
        this.forgotPasssubmitted = false;
        this.modalRef = this.modalService.open(content, this.baseCtrl.smallModalOptions);
    }

    onSubmit() {
        this.forgotPasssubmitted = true;
        const params = this.baseCtrl.checkRequiredFields(this.forgotPasswordForm);
        if (params != false) {
            this.managementService.forgotPassoword(params);
        }
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
