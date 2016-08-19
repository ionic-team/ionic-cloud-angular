export * from '@ionic/cloud';

import { Injectable, provide, Provider } from '@angular/core';
import { DIContainer, CloudSettings } from '@ionic/cloud';
import {
  Auth as _Auth,
  Client as _Client,
  Config as _Config,
  Deploy as _Deploy,
  EventEmitter as _EventEmitter,
  Insights as _Insights,
  Push as _Push,
  User as _User,
} from '@ionic/cloud';

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
export class Push extends _Push {}

@Injectable()
export class User extends _User {}

export let container = new DIContainer();

export function provideCloud(settings: CloudSettings): Provider[] {
  let config = container.config;
  config.register(settings);

  let core = container.core;
  core.init();

  let cordova = container.cordova;
  cordova.bootstrap();

  return [
    provide(Auth, {'useFactory': () => { return container.auth; }}),
    provide(Client, {'useFactory': () => { return container.client; }}),
    provide(Config, {'useValue': config}),
    provide(Deploy, {'useFactory': () => { return container.deploy; }}),
    provide(EventEmitter, {'useFactory': () => { return container.eventEmitter; }}),
    provide(Push, {'useFactory': () => { return container.push; }}),
    provide(User, {'useFactory': () => { return container.singleUserService.current(); }})
  ];
}
