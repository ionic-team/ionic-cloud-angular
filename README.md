# Ionic Platform Client for Angular 2

Angular 2 integration for the Ionic Platform in your app.

## Installation

```bash
$ npm install --save @ionic/platform-client-angular
```

## Usage

In your `app.ts` file, tell Angular about the platform providers by calling the imported `providers` function with a config and passing it to
[`ionicBootstrap`](http://ionicframework.com/docs/v2/api/config/Config/)
function. Then, use the injectable platform classes (`Auth`, `User`, `Push`, `Deploy`, etc.) in your app's classes just as you would any
other service class.

```javascript
import ...
import {Auth, User, providers} from '@ionic/platform-client-angular';

let platformConfig = {
  'core': {
    'app_id': 'YOUR-APP-ID'
  }
};

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, user: User) {
    platform.ready().then(() => {
      Auth.signup({'email': 'hi@ionic.io', 'password': 'puppies123'}).then(() => {
        // `user` is now the authenticated user
      }, (err) => {
        // something went wrong!
      });
    });
  }
}

ionicBootstrap(MyApp, providers(platformConfig), { /* Ionic Framework Config */ });
```

## Issues

This package wraps the [platform client](https://github.com/driftyco/ionic-platform-web-client) to
add Angular integration. Because of this, most issues should be reported in the
[platform client issues](https://github.com/driftyco/ionic-platform-web-client/issues) or the
[platform issues](https://github.com/driftyco/ionic-platform-issues/issues).
