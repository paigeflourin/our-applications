import { IApplicationEntity } from './app/shared/app.entities';

export default class MockHttpClient  {

    private static _items: IApplicationEntity[] = [{ Title: 'Lynda', Id: 1, PictureUrl: '/src/webparts/ourApplications/static/lynda@1x.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'Marval', Id: 2, PictureUrl: '/src/webparts/ourApplications/static/Marval.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'SharePoint', Id: 3, PictureUrl: '/src/webparts/ourApplications/static/sharepoint.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'JIRA', Id: 4, PictureUrl: '/src/webparts/ourApplications/static/JIRA.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'Workday', Id: 5, PictureUrl: '/src/webparts/ourApplications/static/Workday.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'IT Training', Id: 6, PictureUrl: '/src/webparts/ourApplications/static/IT%20Training.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'MS Project', Id: 7, PictureUrl: '/src/webparts/ourApplications/static/ms%20project@1x.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'Office 365', Id: 8, PictureUrl: '/src/webparts/ourApplications/static/office%20365@1x.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'X Matters', Id: 9, PictureUrl: '/src/webparts/ourApplications/static/x%20matters@1x.png', ShowInPage: true, AppUrl: '' },
                                        { Title: 'Cignon', Id: 10, PictureUrl: '/src/webparts/ourApplications/static/cignon@1x.jpg', ShowInPage: false, AppUrl: '' },
                                        { Title: 'Docusign', Id: 11, PictureUrl: '/src/webparts/ourApplications/static/docu%20sign@1x.png', ShowInPage: false, AppUrl: '' }
                                    ];
    
    public static get(): Promise<IApplicationEntity[]> {
    return new Promise<IApplicationEntity[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }

    public static hide() {
            
    }
}