import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AppSettings } from './shared/app.settings';
import { IApplicationEntity } from './shared/app.entities';
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
    templateUrl: '/src/webparts/ourApplications/app/widgets.html', //'/sites/DevIntranet/BPTBranding/SiteAssets/OurApplication/app/widgets.html'
    styleUrls: ['/src/webparts/ourApplications/app/app-style.css'], //src/webparts/ourApplications/app/
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
    private name: string = "Our Applications!";
    private Applications: IApplicationEntity[] = [];
    //constructor(private appSettings: AppSettings) { }
    public loading: string = 'init';


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