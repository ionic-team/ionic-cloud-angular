export * from '@ionic/cloud';

import { Observable } from 'rxjs';
import { Injectable, ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';
import {
  Auth as _Auth,
  FacebookAuth as _FacebookAuth,
  GoogleAuth as _GoogleAuth,
  Client as _Client,
  CloudSettings,
  Config as _Config,
  Deploy as _Deploy,
  DIContainer as _DIContainer,
  EventHandler,
  IEventEmitter,
  IAuth,
  IClient,
  IConfig,
  IDeploy,
  IFacebookAuth,
  IGoogleAuth,
  IPush as _IPush,
  IPushMessage,
  IUser,
  Insights as _Insights,
  Push as _Push,
  PushNotificationEvent,
  User as _User,
} from '@ionic/cloud';

export class Rx {
  constructor(protected emitter: IEventEmitter) {}
}

export class PushRx extends Rx {
  notification(): Observable<IPushMessage> {
    return Observable.fromEventPattern<IPushMessage>((h: EventHandler) => {
      return this.emitter.on('push:notification', (data: PushNotificationEvent) => {
        return h(data.message);
      });
    }, (_: Function) => {
      // https://github.com/ReactiveX/rxjs/issues/1900
      // this.emitter.off(signal);
    });
  }
}

export interface IPush extends _IPush {
  rx: PushRx;
}

@Injectable()
export class FacebookAuth extends _FacebookAuth {}

@Injectable()
export class GoogleAuth extends _GoogleAuth {}

@Injectable()
export class Auth extends _Auth {}

@Injectable()
export class Client extends _Client {}

@Injectable()
export class Config extends _Config {}

@Injectable()
export class Deploy extends _Deploy {}

@Injectable()
export class DIContainer extends _DIContainer {}

@Injectable()
export class Insights extends _Insights {}

@Injectable()
export class Push extends _Push implements IPush {

  /**
   * Observables for the push service.
   */
  public rx: PushRx;
}

@Injectable()
export class User extends _User {}

export const CloudSettingsToken = new InjectionToken('CloudSettings');

export function provideContainer(settings: CloudSettings): DIContainer {
  let container = new DIContainer();
  container.config.register(settings);
  container.core.init();
  container.cordova.bootstrap();

  return container;
}

export function provideConfig(container: DIContainer): IConfig {
  return container.config;
}

export function provideAuth(container: DIContainer): IAuth {
  return container.auth;
}

export function provideClient(container: DIContainer): IClient {
  return container.client;
}

export function provideDeploy(container: DIContainer): IDeploy {
  return container.deploy;
}

export function provideUser(container: DIContainer): IUser {
  return container.singleUserService.current();
}

export function providePush(container: DIContainer): IPush {
  let push = container.push as IPush;
  push.rx = new PushRx(container.eventEmitter);
  return push;
}

export function provideFacebookAuth(container: DIContainer): IFacebookAuth {
  return container.facebookAuth;
}

export function provideGoogleAuth(container: DIContainer): IGoogleAuth {
  return container.googleAuth;
}

@NgModule()
export class CloudModule {
  static forRoot(settings: CloudSettings): ModuleWithProviders {
    return {
      ngModule: CloudModule,
      providers: [
        { provide: CloudSettingsToken, useValue: settings },
        { provide: DIContainer, useFactory: provideContainer, deps: [ CloudSettingsToken ] },
        { provide: Auth, useFactory: provideAuth, deps: [ DIContainer ] },
        { provide: Client, useFactory: provideClient, deps: [ DIContainer ] },
        { provide: Config, useFactory: provideConfig, deps: [ DIContainer ] },
        { provide: Deploy, useFactory: provideDeploy, deps: [ DIContainer ] },
        { provide: Push, useFactory: providePush, deps: [ DIContainer ] },
        { provide: User, useFactory: provideUser, deps: [ DIContainer ] },
        { provide: FacebookAuth, useFactory: provideFacebookAuth, deps: [ DIContainer ]},
        { provide: GoogleAuth, useFactory: provideGoogleAuth, deps: [ DIContainer ]}
      ]
    };
  }
}
