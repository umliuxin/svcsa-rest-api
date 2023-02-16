// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Matchlog, MatchlogData, MatchlogPatch, MatchlogQuery } from './matchlog.schema'

export interface MatchlogParams extends KnexAdapterParams<MatchlogQuery> { }

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MatchlogService<ServiceParams extends Params = MatchlogParams> extends KnexService<
  Matchlog,
  MatchlogData,
  ServiceParams,
  MatchlogPatch
> { }

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_log',
    id: 'LogID'
  }
}
