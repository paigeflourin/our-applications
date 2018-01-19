import { Component, OnInit } from '@angular/core';

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

//require('ng-office-ui-fabric');
import 'ng-office-ui-fabric';

export interface ISPLists {
    value: IApplicationEntity[];
}

@Component({
    templateUrl: 'https://campress.sharepoint.com/TeamApplications/app/add-modal.html', //'/sites/DevIntranet/BPTBranding/SiteAssets/OurApplication/app/widgets.html',
})
export class AddApplicationComponent implements OnInit {
    private test: string = "Add Applications!";
    private Applications: IApplicationEntity[] = [];
    public loading: string = 'init';

    constructor(private appSettings: AppSettings) {
     }

    ngOnInit() {
        
        this.test = "opened add add"

                    // Local environment
        if (Environment.type === EnvironmentType.Local) {
            this._getMockListData().then((response) => {
                this.Applications = response.value;
      
            });
        }
        else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
            /*new pnp.Web(AppSettings.SHAREPOINT_SITE_URL).lists.getByTitle('OurApplications').items.get().then((result: any) => {
                console.log(result);
                this.Applications = result;

            }).catch((e : any) => { this.loading = "error"; });*/

            pnp.sp.web.lists.getByTitle("OurApplications").items.get().then((response) => {
                console.log(response);
                this.Applications = response;

            }).catch((e: any) => {this.loading = "error"});
        }


    }

    addItemTolist(item: any) {
        console.log(item.id);
    }

    addItems () {
      console.log("modal is closed");
    }

    private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: IApplicationEntity[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
    }
} 


