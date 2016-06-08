# ionic-platform-web-client-angular

Angular 2 integration for the Ionic Platform in your app.

## Installation

```bash
$ npm install --save ionic-platform-web-client-angular
```

```javascript
import ...
import {Auth, User, providers} from 'ionic-platform-web-client-angular';

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

let config = {
  'core': {
    'app_id': 'YOUR-APP-ID'
  }
};

ionicBootstrap(MyApp, providers(config), {});
```

## Issues

This package wraps the [platform client](https://github.com/driftyco/ionic-platform-web-client) to
add Angular integration. Because of this, most issues should be reported in the
[platform client issues](https://github.com/driftyco/ionic-platform-web-client/issues) or the
[platform issues](https://github.com/driftyco/ionic-platform-issues/issues).
