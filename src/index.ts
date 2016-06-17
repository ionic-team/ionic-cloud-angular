import { Injectable, provide, Provider } from '@angular/core';
import {
  ISettings,
  PushOptions,
  EventEmitter as _EventEmitter,
  IonicCloud as _platform,
  Push as _Push,
  Auth as _Auth,
  User as _User,
  Deploy as _Deploy,
  Environment as _Environment,
  Links as _Links
} from '@ionic/cloud';

interface Newable {
  new(...args: any[]): any;
}

class SingletonContainer {
  public args: any[];
  private instance: any;

  constructor(public cls: Newable, ...args: any[]) {
    this.cls = cls;
    this.args = args;
  }

  getInstance(): any {
    if (!this.instance) {
      this.instance = new this.cls(...this.args);
    }

    return this.instance;
  }
}

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
export class Auth extends _Auth {}

@Injectable()
export class User extends _User {}

@Injectable()
export class Deploy extends _Deploy {}

@Injectable()
export class Environment extends _Environment {}

@Injectable()
export class Links extends _Links {}

export interface CloudSettings {
  core: ISettings;
  push?: PushOptions;
}

export function provideCloud(settings: CloudSettings): Provider[] {
  let core = new Core();
  core.init(settings.core);

  let pushFactory = new SingletonContainer(Push, settings.push);
  let deployFactory = new SingletonContainer(Deploy);

  return [
    provide(Core, {'useValue': core}),
    provide(EventEmitter, {'useValue': _platform.emitter}),
    provide(Environment, {'useValue': new Environment()}),
    provide(User, {'useFactory': () => { return User.current(); }}),
    provide(Push, {'useFactory': () => { return pushFactory.getInstance() }}),
    provide(Deploy, {'useFactory': () => { return deployFactory.getInstance() }})
  ];
}
