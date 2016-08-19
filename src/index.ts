export * from '@ionic/cloud';

import { Injectable, NgModule, ModuleWithProviders } from '@angular/core';
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

function provideAuth() { return container.auth; }
function provideClient() { return container.client; }
function provideDeploy() { return container.deploy; }
function provideEventEmitter() { return container.eventEmitter; }
function providePush() { return container.push; }
function provideUser() { return container.singleUserService.current(); }

export function provideCloud(settings: CloudSettings): any[] {
  let config = container.config;
  config.register(settings);

  let core = container.core;
  core.init();

  let cordova = container.cordova;
  cordova.bootstrap();

  return [
    { provide: Auth, useFactory: provideAuth },
    { provide: Client, useFactory: provideClient },
    { provide: Config, useValue: config },
    { provide: Deploy, useFactory: provideDeploy },
    { provide: EventEmitter, useFactory: provideEventEmitter },
    { provide: Push, useFactory: providePush },
    { provide: User, useFactory: provideUser }
  ];
}

@NgModule()
export class CloudModule {

  static forRoot(settings: CloudSettings): ModuleWithProviders {
    return {
      ngModule: CloudModule,
      providers: provideCloud(settings)
    };
  }

}
