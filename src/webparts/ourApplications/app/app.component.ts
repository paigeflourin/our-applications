import { Component, OnInit,ViewEncapsulation, ViewContainerRef, TemplateRef} from '@angular/core';
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AppSettings } from './shared/app.settings';
import { IApplicationEntity } from './shared/app.entities';
import { AddApplicationComponent } from './add-application-modal';


import MockHttpClient from '../MockHttpClient';
import * as pnp from "sp-pnp-js";

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import 'ng-office-ui-fabric';

export interface ISPLists {
    value: IApplicationEntity[];
}


@Component({
    selector: 'widget-app', 
    templateUrl: '/sites/DevIntranet/BPTBranding/SiteAssets/OurApplication/app/widgets.html', //'/src/webparts/ourApplications/app/widgets.html', //
    //styleUrls: ['/src/webparts/ourApplications/app/app-style.css'], //src/webparts/ourApplications/app/
    styles: ['.close { display:block;float:right;  width:30px;height:29px; background:url(https://memeburn.com/img/close_button.png) no-repeat center center;}'],
    encapsulation: ViewEncapsulation.None
   // providers: [Modal]
})


export class AppComponent implements OnInit {
    private name: string = "Our Applications!";
    private Applications: IApplicationEntity[] = [];
    public loading: string = 'init';
    public test: string = 'test';

    //bsModalRef: BsModalRef;
    //constructor(private modalService: BsModalService) {}

    ngOnInit() {

            // Local environment
        if (Environment.type === EnvironmentType.Local) {
            this._getMockListData().then((response) => {
                this.Applications = response.value;
                this.loading = "done";
            });
        }
        else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
            new pnp.Web(AppSettings.SHAREPOINT_SITE_URL).lists.getByTitle('OurApplications').items.get().then((result: any) => {
                console.log(result);
                this.Applications = result;
                this.loading = "done";
            }).catch((e : any) => { this.loading = "error"; });
        }

    }

    manageWidgets():void {
        this.loading = "manage";
    }

    hideItem(item: any){
        console.log(item);

        if (Environment.type === EnvironmentType.Local) {
            
        }
        else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
             new pnp.Web(AppSettings.SHAREPOINT_SITE_URL).lists.getByTitle('OurApplications').items.getById(item.Id).update({
                ShowInPage: false
            }).then(i => {

                console.log(i);

            });
        }
    }

    public addApp() {
        console.log("open modal");
/*
        let list = ['Open a modal with component', 'Pass your data', 'Do something else', '...'];
        this.bsModalRef = this.modalService.show(ModalContentComponent);
        this.bsModalRef.content.title = 'Modal with component';
        this.bsModalRef.content.list = list;*/
    }

    saveModChange():void {
         this.ngOnInit();
    }


    private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: IApplicationEntity[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
    }
}


/* This is a component which we pass in modal*/
 /*
@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})

export class ModalContentComponent {
  public title: string;
  public list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}
}*/