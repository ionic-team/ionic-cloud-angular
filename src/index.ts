export * from '@ionic/cloud';

import { Observable } from 'rxjs';
import { Injectable, provide, Provider } from '@angular/core';
import { DIContainer, CloudSettings } from '@ionic/cloud';
import {
  Auth as _Auth,
  FacebookAuth as _FacebookAuth,
  GoogleAuth as _GoogleAuth,
  Client as _Client,
  Config as _Config,
  Deploy as _Deploy,
  EventEmitter as _EventEmitter,
  EventHandler,
  IEventEmitter,
  IPush as _IPush,
  IPushMessage,
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
export class EventEmitter extends _EventEmitter {}

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

function buildPush(): IPush {
  let push = container.push as IPush;
  push.rx = new PushRx(container.eventEmitter);
  return push;
}

export function provideCloud(settings: CloudSettings): Provider[] {
  let config = container.config;
  config.register(settings);

  let core = container.core;
  core.init();

  let cordova = container.cordova;
  cordova.bootstrap();

  return [
    provide(Auth, {'useFactory': () => { return container.auth; }}),
    provide(FacebookAuth, {'useFactory': () => { return container.facebookAuth; }}),
    provide(GoogleAuth, {'useFactory': () => { return container.googleAuth; }}),
    provide(Client, {'useFactory': () => { return container.client; }}),
    provide(Config, {'useValue': config}),
    provide(Deploy, {'useFactory': () => { return container.deploy; }}),
    provide(EventEmitter, {'useFactory': () => { return container.eventEmitter; }}),
    provide(Push, {'useFactory': buildPush}),
    provide(User, {'useFactory': () => { return container.singleUserService.current(); }})
  ];
}
