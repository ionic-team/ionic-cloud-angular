# Ionic Platform Client for Angular 2

Angular 2 integration for the Ionic Platform in your app.

## Installation

```bash
$ npm install --save @ionic/cloud-angular
```

## Usage

In your `app.ts` file, tell Angular about the Ionic Cloud providers by calling
the imported `provideCloud` function with a config and passing it to
[`ionicBootstrap`](http://ionicframework.com/docs/v2/api/config/Config/)
function. Then, use the injectable cloud classes (`Auth`, `User`, `Push`,
`Deploy`, etc.) in your app's classes just as you would any other service
class.

```javascript
import ...
import {Auth, User, provideCloud} from '@ionic/cloud-angular';

let cloudConfig = {
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

ionicBootstrap(MyApp, provideCloud(cloudConfig));
```

## Issues

This package wraps the [cloud client](https://github.com/driftyco/ionic-cloud) to
add Angular integration. Because of this, most issues should be reported in the
[cloud client issues](https://github.com/driftyco/ionic-cloud/issues) or the
[cloud issues](https://github.com/driftyco/ionic-cloud-issues/issues).
