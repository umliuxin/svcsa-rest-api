// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  Seasonteamplayer,
  SeasonteamplayerData,
  SeasonteamplayerPatch,
  SeasonteamplayerQuery
} from './seasonteamplayer.schema'

export interface SeasonteamplayerParams extends KnexAdapterParams<SeasonteamplayerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SeasonteamplayerService<
  ServiceParams extends Params = SeasonteamplayerParams
> extends KnexService<Seasonteamplayer, SeasonteamplayerData, ServiceParams, SeasonteamplayerPatch> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_seasonteamplayer',
    id: 'PlayerID'
  }
}
