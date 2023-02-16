// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Competition, CompetitionData, CompetitionPatch, CompetitionQuery } from './competition.schema'

export interface CompetitionParams extends KnexAdapterParams<CompetitionQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CompetitionService<ServiceParams extends Params = CompetitionParams> extends KnexService<
  Competition,
  CompetitionData,
  ServiceParams,
  CompetitionPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_competition'
  }
}
