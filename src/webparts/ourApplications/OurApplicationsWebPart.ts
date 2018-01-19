import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OurApplications.module.scss';
import * as strings from 'ourApplicationsStrings';
import { IOurApplicationsWebPartProps } from './IOurApplicationsWebPartProps';
import 'core-js/fn/object/assign';

import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/weak-map';

// Check for native support of Map vs Polyfill
if(Map.toString().indexOf('function Map()') === -1)
{
     Map = undefined;
}
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/reflect';

import 'reflect-metadata';
import pnp from "sp-pnp-js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
require('zone.js');



import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';



export default class OurApplicationsWebPart extends BaseClientSideWebPart<IOurApplicationsWebPartProps> {


  public onInit(): Promise<void> {
    
      return super.onInit().then(_ => {
    
        pnp.setup({
          spfxContext: this.context,
          headers: {
            Accept: 'application/json; odata=verbose'
          }
        });
        
      });
  }

  public render(): void {
    this.domElement.innerHTML = '<widget-app> </widget-app>';
  		platformBrowserDynamic().bootstrapModule(AppModule);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  /*private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }*/

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
