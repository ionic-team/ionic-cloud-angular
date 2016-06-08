import { Injectable, provide, Provider } from '@angular/core';
import {
  ISettings,
  PushOptions,
  IonicPlatform as _platform,
  Push as _Push,
  Analytics as _Analytics,
  Auth as _Auth,
  Deploy as _Deploy
} from 'ionic-platform-web-client';

@Injectable()
export class Core {
  init(cfg: ISettings) {
    _platform.init(cfg);
  }
}

@Injectable()
export class Push extends _Push {}

@Injectable()
export class Analytics extends _Analytics {}

@Injectable()
export class Auth extends _Auth {}

@Injectable()
export class Deploy extends _Deploy {}

export interface Settings {
  core: ISettings;
  push?: PushOptions;
  analytics?: any;
}

export function providers(settings: Settings): Provider[] {
  let core = new Core();
  core.init(settings.core);

  return [
    provide(Core, {'useValue': core}),
    provide(Push, {'useValue': new Push(settings.push)}),
    provide(Analytics, {'useValue': new Analytics(settings.analytics)}),
    provide(Deploy, {'useValue': new Deploy()})
  ];
}
