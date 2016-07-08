export * from '@ionic/cloud';

import { Injectable, provide, Provider } from '@angular/core';
import { DIContainer, ISettings } from '@ionic/cloud';
import {
  Auth as _Auth,
  AuthType,
  Client as _Client,
  Config as _Config,
  Cordova as _Cordova,
  Core as _Core,
  Deploy as _Deploy,
  Device as _Device,
  EventEmitter as _EventEmitter,
  Insights as _Insights,
  Logger as _Logger,
  Push as _Push,
  SingleUserService as _SingleUserService,
  User as _User,
  UserContext as _UserContext
} from '@ionic/cloud';

@Injectable()
export class Auth extends _Auth {}

@Injectable()
export class Client extends _Client {}

@Injectable()
export class Config extends _Config {}

@Injectable()
export class Cordova extends _Cordova {}

@Injectable()
export class Core extends _Core {}

@Injectable()
export class Deploy extends _Deploy {}

@Injectable()
export class Device extends _Device {}

@Injectable()
export class EventEmitter extends _EventEmitter {}

@Injectable()
export class Insights extends _Insights {}

@Injectable()
export class Logger extends _Logger {}

@Injectable()
export class Push extends _Push {}

@Injectable()
export class SingleUserService extends _SingleUserService {}

@Injectable()
export class User extends _User {}

@Injectable()
export class UserContext extends _UserContext {}

export interface CloudSettings extends ISettings {}

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
    provide(Config, {'useValue': config}),
    provide(Cordova, {'useValue': cordova}),
    provide(Core, {'useValue': core}),
    provide(Client, {'useFactory': () => { return container.client; }}),
    provide(Deploy, {'useFactory': () => { return container.deploy; }}),
    provide(Device, {'useFactory': () => { return container.device; }}),
    provide(EventEmitter, {'useFactory': () => { return container.eventEmitter; }}),
    provide(SingleUserService, {'useFactory': () => { return container.singleUserService; }}),
    provide(Logger, {'useFactory': () => { return container.logger; }}),
    provide(Push, {'useFactory': () => { return container.push; }}),
    provide(User, {'useFactory': (singleUserService: SingleUserService) => { return singleUserService.current(); }, 'deps': [SingleUserService]}),
    provide(UserContext, {'useFactory': () => { return container.userContext; }})
  ];
}
