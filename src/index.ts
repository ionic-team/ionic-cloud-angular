export * from '@ionic/cloud';

import { Observable } from 'rxjs';
import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { DIContainer, CloudSettings } from '@ionic/cloud';
import {
  Auth as _Auth,
  Client as _Client,
  Config as _Config,
  Deploy as _Deploy,
  EventHandler,
  IEventEmitter,
  IAuth,
  IClient,
  IDeploy,
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
export class Auth extends _Auth {}

@Injectable()
export class Client extends _Client {}

@Injectable()
export class Config extends _Config {}

@Injectable()
export class Deploy extends _Deploy {}

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

export let container = new DIContainer();

function provideAuth(): IAuth {
  return container.auth;
}

function provideClient(): IClient {
  return container.client;
}

function provideDeploy(): IDeploy {
  return container.deploy;
}

function provideUser(): IUser {
  return container.singleUserService.current();
}

function providePush(): IPush {
  let push = container.push as IPush;
  push.rx = new PushRx(container.eventEmitter);
  return push;
}

@NgModule()
export class CloudModule {
  static forRoot(settings: CloudSettings): ModuleWithProviders {
    let config = container.config;
    config.register(settings);

    let core = container.core;
    core.init();

    let cordova = container.cordova;
    cordova.bootstrap();

    return {
      'ngModule': CloudModule,
      'providers': [
        { 'provide': Auth, 'useFactory': provideAuth },
        { 'provide': Client, 'useFactory': provideClient },
        { 'provide': Config, 'useValue': config },
        { 'provide': Deploy, 'useFactory': provideDeploy },
        { 'provide': Push, 'useFactory': providePush },
        { 'provide': User, 'useFactory': provideUser }
      ]
    };
  }
}
