import { Component, OnInit,ViewEncapsulation, ViewContainerRef, TemplateRef} from '@angular/core';
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AppSettings } from './shared/app.settings';
import { IApplicationEntity } from './shared/app.entities';
import { AddApplicationComponent } from './add-application-modal';


import MockHttpClient from '../MockHttpClient';
//import * as pnp from "sp-pnp-js";
import pnp, { Web, List, ListEnsureResult } from "sp-pnp-js";
import 'ng-office-ui-fabric';
//require('ng-office-ui-fabric');

import 'app-style.css';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';



export interface ISPLists {
    value: IApplicationEntity[];
}


@Component({
    selector: 'widget-app', 
    templateUrl: '/sites/DevIntranet/SiteAssets/TeamApplications/app/widgets.html', ///src/webparts/ourApplications/app/widgets.html'/sites/DevIntranet/BPTBranding/SiteAssets/OurApplication/app/widgets.html', 
    styleUrls: [ 'https://cupdev.sharepoint.com/sites/DevIntranet/SiteAssets/OurApplication/app/app-style.css' ], //../SiteAssets/OurApplication/app/app-style.css ~~~ ../src/webparts/ourApplications/app/app-style.css
    styles: ['.close { display:block;float:right;  width:20px;height:20px; background:url(https://cupdev.sharepoint.com/sites/DevIntranet/SiteAssets/TeamApplications/closeicon.png) no-repeat center center;} /*/src/webparts/ourApplications/static/closeicon.png*/'],
    encapsulation: ViewEncapsulation.None
   // providers: [Modal]
})


export class AppComponent implements OnInit {
    private name: string = "Our Applications!";
    private Applications: IApplicationEntity[] = [];
    public loading: string = 'init';
    public test: string = 'test';
    public appArray: IApplicationEntity[] = [];
    
    //bsModalRef: BsModalRef; 
    //constructor(private modalService: BsModalService) {}
    
    ngOnInit(): void {
        
            // Local environment
        if (Environment.type === EnvironmentType.Local) {
            this._getMockListData().then((response) => {
                this.Applications = response.value;
                this.loading = "done";
            });
        }
        else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
             
                let listEnsureResults: ListEnsureResult;

                //Check if list exist
                //pnp.sp.web.lists.ensure("OurApplications").then((ler: ListEnsureResult) => {
                //    listEnsureResults = ler;
                    
                //    if (!ler.created) {
                    pnp.sp.web.lists.filter("Title eq OurApplications").get().then(function(result) 
                    {
                        
                       
                        if (result.length > 0) {
                            console.log("list exists");
                            pnp.sp.web.lists.getByTitle("OurApplications").items.get().then((response) => {
                                console.log("data returned: first call");
                                console.log(response);
                                this.Applications = response;
                                this.loading = "done";
        
                            }).catch((e: any) => {this.loading = "error"});
                         } else {
                            console.log("list doesnt exists");
                         }

                    });    
                  //  }
                  //  else {

                        
                        //console.log(listEnsureResults);
                        //var fieldXML = "<Field DisplayName='ShowInPage' Type='Boolean' Required='FALSE' Name='ShowInPage' />";
                        //pnp.sp.web.lists.getByTitle("OurApplications").fields.createFieldAsXml(fieldXML).then(function(result) {});
                        //pnp.sp.web.lists.getByTitle("OurApplications").fields.addText('AppUrl').then(function(r) { });  
                        //ler.list.fields.addText("AppUrl");
                    //    return ler.list;
                        //return ler.list.fields.addText("PictureUrl"); 
                       // pnp.sp.web.lists.getByTitle("OurApplications").fields.addText('Testing Field');

                        //Create one if it doesnt exist
                         
                         //param 1 - List Title
                         //param 2 - List description
                         //param 3 - List Template ID
                         //param 4 - boolean value for enable or disable content types to list
                         //param 5 - optional, we can pass additional settings for the list
                         //pnp.sp.web.lists.add('OurApplications', 'Description for OurApplications list', 100, false).then(function(result) {
                            // if (result.data.Created){
                                 //console.log('List Created Successfully!');
                                 //pnp.sp.web.lists.getByTitle("OurApplications").fields.addText('PictureUrl').then(function(r) { });  
                                 
                            // }
                        // });
                   // }
                //});
            
              

           
            /*new pnp.Web(AppSettings.SHAREPOINT_SITE_URL).lists.getByTitle('OurApplications').items.get().then((result: any) => {
                console.log(result);
                this.Applications = result;
                this.loading = "done";
            }).catch((e : any) => { this.loading = "error"; });*/
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
            /*new pnp.Web(AppSettings.SHAREPOINT_SITE_URL).lists.getByTitle('OurApplications').items.getById(item.Id).update({
                ShowInPage: false
            }).then(i => {
                console.log(i);
            });*/
            pnp.sp.web.lists.getByTitle("OurApplications").items.getById(item.Id).update({
                ShowInPage : false
            }).then( i => {
                console.log(i);
            })

        }
    }

    public addApp() {
        console.log("Update Items.ShowInPage to True and Close modal");
        console.log(this.appArray);

        this.appArray.forEach(app =>{ 
            if (Environment.type === EnvironmentType.Local) {
                console.log("environment: localhost, change the display to YES ");
                console.log(app.Title);
            }
            else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
               
                pnp.sp.web.lists.getByTitle("OurApplications").items.getById(app.Id).update({
                    ShowInPage : true
                }).then( i => {
                    this.loading = "manage";
                    console.log(i);
                })
                
                /* new pnp.Web(AppSettings.SHAREPOINT_SITE_URL).lists.getByTitle('OurApplications').items.getById(app.Id).update({
                    ShowInPage: true
                }).then(i => {
                    this.loading = "manage";
                    console.log(i);

                });*/
        }

        });
    }

    saveModChange():void {
         this.ngOnInit();
    }

    addRemoveApplication(value: any,event: any) {
        if(event.target.checked){
            this.appArray.push(value);
        }
        else if (!event.target.checked){
            let indexx = this.appArray.indexOf(value);
            this.appArray.splice(indexx,1);
        }
        console.log(this.appArray)
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