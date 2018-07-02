// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAQ1s_WfDg8dRXzNOgf3Ww0pg85J_1lUrs',
    authDomain: 'ng-fitness-tracker-24c55.firebaseapp.com',
    databaseURL: 'https://ng-fitness-tracker-24c55.firebaseio.com',
    projectId: 'ng-fitness-tracker-24c55',
    storageBucket: 'ng-fitness-tracker-24c55.appspot.com',
    messagingSenderId: '794035764833'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
