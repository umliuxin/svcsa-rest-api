// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Params } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { Season, SeasonData, SeasonQuery, SeasonService } from './services/season/season'
export type { Season, SeasonData, SeasonQuery }

import type {
  Seasonteam,
  SeasonteamData,
  SeasonteamQuery,
  SeasonteamService
} from './services/seasonteam/seasonteam'
export type { Seasonteam, SeasonteamData, SeasonteamQuery }

import type { Team, TeamData, TeamQuery, TeamService } from './services/teams/teams'
export type { Team, TeamData, TeamQuery }

import type { Player, PlayerData, PlayerQuery, PlayerService } from './services/players/players'
export type { Player, PlayerData, PlayerQuery }

import type { User, UserData, UserQuery, UserService } from './services/users/users'
export type { User, UserData, UserQuery }

import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

const userServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type UserClientService = Pick<UserService<Params<UserQuery>>, typeof userServiceMethods[number]>

const playerServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type PlayerClientService = Pick<PlayerService<Params<PlayerQuery>>, typeof playerServiceMethods[number]>

const teamServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type TeamClientService = Pick<TeamService<Params<TeamQuery>>, typeof teamServiceMethods[number]>

const seasonteamServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type SeasonteamClientService = Pick<
  SeasonteamService<Params<SeasonteamQuery>>,
  typeof seasonteamServiceMethods[number]
>

const seasonServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type SeasonClientService = Pick<SeasonService<Params<SeasonQuery>>, typeof seasonServiceMethods[number]>

export interface ServiceTypes {
  season: SeasonClientService
  seasonteam: SeasonteamClientService
  teams: TeamClientService
  players: PlayerClientService
  users: UserClientService
  //
}

/**
 * Returns a typed client for the svcsa-rest-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client = feathers<ServiceTypes, Configuration>()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))

  client.use('users', connection.service('users'), {
    methods: userServiceMethods
  })
  client.use('players', connection.service('players'), {
    methods: playerServiceMethods
  })
  client.use('teams', connection.service('teams'), {
    methods: teamServiceMethods
  })
  client.use('seasonteam', connection.service('seasonteam'), {
    methods: seasonteamServiceMethods
  })
  client.use('season', connection.service('season'), {
    methods: seasonServiceMethods
  })
  return client
}
