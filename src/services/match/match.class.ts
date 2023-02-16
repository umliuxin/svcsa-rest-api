// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Match, MatchData, MatchPatch, MatchQuery } from './match.schema'

export interface MatchParams extends KnexAdapterParams<MatchQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MatchService<ServiceParams extends Params = MatchParams> extends KnexService<
  Match,
  MatchData,
  ServiceParams,
  MatchPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_match'
  }
}
