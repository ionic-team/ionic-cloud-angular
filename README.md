[![npm](https://img.shields.io/npm/v/@ionic/cloud-angular.svg?maxAge=2592000)](https://www.npmjs.com/package/@ionic/cloud-angular)

# Ionic Cloud Client for Angular 2

Angular 2 integration for the Ionic Cloud in your app.

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
import {Auth, User, CloudSettings, provideCloud} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'YOUR-APP-ID'
  }
};

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, public auth: Auth, public user: User) {
    platform.ready().then(() => {
      let details = {'email': 'hi@ionic.io', 'password': 'puppies123'};
      this.auth.signup(details).then(() => {
        return this.auth.login('basic', details);
      }).then(() => {
        // `this.user` is now the authenticated user
      }, (err) => {
        // something went wrong!
      });
    });
  }
}

// Register the Ionic Cloud in the bootstrap
ionicBootstrap(MyApp, [provideCloud(cloudSettings)]);
```
