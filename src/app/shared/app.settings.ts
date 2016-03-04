/**
 * Created by eric on 3/3/16.
 */
import {provide} from 'angular2/core';

export class AppSettings {
    //public static get API_BASE_URL
    static API_BASE_URL: string = 'http://api.steelyardaccess.com/tapi/v2';
}

export var APP_SETTING_PROVIDERS: Array<any> = [
    provide(AppSettings, {useClass: AppSettings})
];