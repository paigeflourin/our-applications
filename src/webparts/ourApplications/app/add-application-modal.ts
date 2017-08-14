import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';



@Component({
    selector: 'modal-app', 
    templateUrl: '/src/webparts/ourApplications/app/add-modal.html', //'/sites/DevIntranet/BPTBranding/SiteAssets/OurApplication/app/widgets.html'
})



export class CustomModal implements OnInit {
     private test: string = "Our Applications!";

    ngOnInit() {


    }
}