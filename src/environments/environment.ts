// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyAXD7b9o3artypR4AmS4JrZ-tOfeewcj9E",
    authDomain: "angular12-fb-clone.firebaseapp.com",
    projectId: "angular12-fb-clone",
    storageBucket: "angular12-fb-clone.appspot.com",
    messagingSenderId: "303776870862",
    appId: "1:303776870862:web:4f5c62e2ab53f8ca7efb9f"
  },
  local: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
