import { IApplicationEntity } from './app/shared/app.entities';

export default class MockHttpClient  {

    private static _items: IApplicationEntity[] = [{ Title: 'Lynda', Id: 1, PictureUrl: '/src/webparts/ourApplications/static/lynda@1x.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'Marval', Id: 2, PictureUrl: '/src/webparts/ourApplications/static/Marval.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'SharePoint', Id: 3, PictureUrl: '/src/webparts/ourApplications/static/sharepoint.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'JIRA', Id: 4, PictureUrl: '/src/webparts/ourApplications/static/JIRA.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'Workday', Id: 5, PictureUrl: '/src/webparts/ourApplications/static/Workday.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'IT Training', Id: 6, PictureUrl: '/src/webparts/ourApplications/static/IT%20Training.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'MS Project', Id: 7, PictureUrl: '/src/webparts/ourApplications/static/ms%20project@1x.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'Office 365', Id: 8, PictureUrl: '/src/webparts/ourApplications/static/office%20365@1x.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'X Matters', Id: 9, PictureUrl: '/src/webparts/ourApplications/static/x%20matters@1x.png', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'Cignon', Id: 10, PictureUrl: '/src/webparts/ourApplications/static/cignon@1x.jpg', ShowInPage: "Yes", AppUrl: '' },
                                        { Title: 'Docusign', Id: 11, PictureUrl: '/src/webparts/ourApplications/static/docu%20sign@1x.png', ShowInPage: "Yes", AppUrl: '' }
                                    ];
    
    public static get(): Promise<IApplicationEntity[]> {
    return new Promise<IApplicationEntity[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }

    public static hide() {
            
    }
}