import { Component, OnInit,ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { AppSettings } from './shared/app.settings';
import { IApplicationEntity } from './shared/app.entities';
import MockHttpClient from '../MockHttpClient';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { CustomModal } from './add-application-modal';

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
    templateUrl: '/src/webparts/ourApplications/app/widgets.html', //'/sites/DevIntranet/BPTBranding/SiteAssets/OurApplication/app/widgets.html'
    //styleUrls: ['/src/webparts/ourApplications/app/app-style.css'], //src/webparts/ourApplications/app/
    styles: ['.close { display:block;float:right;  width:30px;height:29px; background:url(http://www.htmlgoodies.com/img/registrationwelcome/close_icon.png) no-repeat center center;}'],
    encapsulation: ViewEncapsulation.None,
    providers: [Modal]
})

export class AppComponent implements OnInit {
    private name: string = "Our Applications!";
    private Applications: IApplicationEntity[] = [];
    //constructor(private appSettings: AppSettings) { }



    public loading: string = 'init';

    constructor(public modal: Modal) {
    }

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

        //hide item from UI then set ShowInPage column to false
        //this.Id
        console.log(item);

        if (Environment.type === EnvironmentType.Local) {
            
        }
        else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
            let list = pnp.sp.web.lists.getByTitle("OurApplications");

            list.items.getById(item.Id).update({
                ShowInPage: false
            }).then(i => {

                console.log(i);

            });
        }
    }

    addApp(): void {
             return this.modal.open(CustomModal );
    }

    saveModChange():void {

    }


    private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: IApplicationEntity[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
    }
}