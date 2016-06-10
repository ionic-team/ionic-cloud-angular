import { Injectable, provide, Provider } from '@angular/core';
import {
  ISettings,
  PushOptions,
  EventEmitter as _EventEmitter,
  IonicPlatform as _platform,
  Push as _Push,
  Analytics as _Analytics,
  Auth as _Auth,
  User as _User,
  Deploy as _Deploy,
  Environment as _Environment
} from '@ionic/cloud';

@Injectable()
export class Core {
  init(cfg: ISettings) {
    _platform.init(cfg);
  }
}

@Injectable()
export class EventEmitter extends _EventEmitter {}

@Injectable()
export class Push extends _Push {}

@Injectable()
export class Analytics extends _Analytics {}

@Injectable()
export class Auth extends _Auth {}

@Injectable()
export class User extends _User {}

@Injectable()
export class Deploy extends _Deploy {}

@Injectable()
export class Environment extends _Environment {}

export interface CloudSettings {
  core: ISettings;
  push?: PushOptions;
  analytics?: any;
}

export function provideCloud(settings: CloudSettings): Provider[] {
  let core = new Core();
  core.init(settings.core);

  return [
    provide(EventEmitter, {'useValue': _platform.emitter}),
    provide(Core, {'useValue': core}),
    provide(Push, {'useValue': new Push(settings.push)}),
    provide(Analytics, {'useValue': new Analytics(settings.analytics)}),
    provide(Deploy, {'useValue': new Deploy()}),
    provide(Environment, {'useValue': new Environment()}),
    provide(User, {'useFactory': () => { return User.current(); }})
  ];
}
