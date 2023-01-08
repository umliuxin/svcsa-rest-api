// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Player, PlayerData, PlayerPatch, PlayerQuery } from './players.schema'

export interface PlayerParams extends KnexAdapterParams<PlayerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PlayerService<ServiceParams extends Params = PlayerParams> extends KnexService<
  Player,
  PlayerData,
  ServiceParams,
  PlayerPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_player',
    id: 'ID'
  }
}
