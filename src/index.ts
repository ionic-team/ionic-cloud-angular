import { Injectable, provide, Provider } from '@angular/core';
import {
  ISettings,
  Auth as _Auth,
  AuthType,
  Client as _Client,
  CombinedAuthTokenContext as _CombinedAuthTokenContext,
  Config as _Config,
  Cordova as _Cordova,
  Core as _Core,
  Deploy as _Deploy,
  Device as _Device,
  EventEmitter as _EventEmitter,
  Insights as _Insights,
  LocalStorageStrategy,
  Logger as _Logger,
  Push as _Push,
  PushOptions,
  SessionStorageStrategy,
  SingleUserService as _SingleUserService,
  Storage as _Storage,
  User as _User,
  UserContext as _UserContext
} from '@ionic/cloud';

@Injectable()
export class Auth extends _Auth {}

@Injectable()
export class Client extends _Client {}

@Injectable()
export class CombinedAuthTokenContext extends _CombinedAuthTokenContext {}

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
export class Storage extends _Storage {}

@Injectable()
export class User extends _User {}

@Injectable()
export class UserContext extends _UserContext {}

export interface CloudSettings {
  core: ISettings;
  push?: PushOptions;
}

export function provideCloud(settings: CloudSettings): Provider[] {
  let config = new Config();
  config.register(settings.core);

  let emitter = new EventEmitter();
  let logger = new Logger();

  let label = 'ionic_io_auth_' + config.get('app_id');
  let tokenContext = new CombinedAuthTokenContext(label, new LocalStorageStrategy(), new SessionStorageStrategy());
  let client = new Client(tokenContext, config.getURL('api'));

  let core = new Core(config, logger, emitter, client);
  core.init();

  let device = new Device(emitter);
  let cordova = new Cordova({}, device, emitter, logger);
  cordova.bootstrap();

  let authModules = AuthType.createAuthModules(config, client);

  return [
    provide(Auth, {'useFactory': (singleUserService: SingleUserService) => { return new Auth({}, emitter, authModules, tokenContext, singleUserService); }, 'deps': [SingleUserService]}),
    provide(Config, {'useValue': core}),
    provide(Cordova, {'useValue': cordova}),
    provide(Core, {'useValue': core}),
    provide(Client, {'useValue': client}),
    provide(Deploy, {'useFactory': () => { return new Deploy({}, config, emitter, logger); }}),
    provide(Device, {'useValue': device}),
    provide(EventEmitter, {'useValue': emitter}),
    provide(SingleUserService, {'useFactory': (userContext: UserContext) => { return new SingleUserService({}, client, userContext); }, 'deps': [UserContext]}),
    provide(Insights, {'useFactory': (core: Core) => { return core.insights; }, 'deps': [Core]}),
    provide(Logger, {'useValue': logger}),
    provide(Push, {'useFactory': (auth: Auth, storage: Storage) => { return new Push(settings.push, config, auth, device, client, emitter, storage, logger); }, 'deps': [Auth, Storage]}),
    provide(User, {'useFactory': (singleUserService: SingleUserService) => { return singleUserService.current(); }, 'deps': [SingleUserService]}),
    provide(Storage, {'useFactory': () => { return new Storage({}, new LocalStorageStrategy()); }}),
    provide(UserContext, {'useFactory': (storage: Storage) => { return new UserContext(storage, config); }, 'deps': [Storage]})
  ];
}
