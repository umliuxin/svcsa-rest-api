// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Season, SeasonData, SeasonPatch, SeasonQuery } from './season.schema'

export interface SeasonParams extends KnexAdapterParams<SeasonQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SeasonService<ServiceParams extends Params = SeasonParams> extends KnexService<
  Season,
  SeasonData,
  ServiceParams,
  SeasonPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_season'
  }
}
