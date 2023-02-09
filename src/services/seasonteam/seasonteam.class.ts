// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Seasonteam, SeasonteamData, SeasonteamPatch, SeasonteamQuery } from './seasonteam.schema'

export interface SeasonteamParams extends KnexAdapterParams<SeasonteamQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SeasonteamService<ServiceParams extends Params = SeasonteamParams> extends KnexService<
  Seasonteam,
  SeasonteamData,
  ServiceParams,
  SeasonteamPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_seasonteam',
    id: 'SeasonID'
  }
}
