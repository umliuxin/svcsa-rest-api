// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Playoff, PlayoffData, PlayoffPatch, PlayoffQuery } from './playoff.schema'

export interface PlayoffParams extends KnexAdapterParams<PlayoffQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PlayoffService<ServiceParams extends Params = PlayoffParams> extends KnexService<
  Playoff,
  PlayoffData,
  ServiceParams,
  PlayoffPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_playoff'
  }
}
