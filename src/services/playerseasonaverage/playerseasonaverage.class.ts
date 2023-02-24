// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  Playerseasonaverage,
  PlayerseasonaverageData,
  PlayerseasonaveragePatch,
  PlayerseasonaverageQuery
} from './playerseasonaverage.schema'

export interface PlayerseasonaverageParams extends KnexAdapterParams<PlayerseasonaverageQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PlayerseasonaverageService<
  ServiceParams extends Params = PlayerseasonaverageParams
> extends KnexService<
  Playerseasonaverage,
  PlayerseasonaverageData,
  ServiceParams,
  PlayerseasonaveragePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_seasonplayerstatistics_view',
    id: 'TeamId'
  }
}
