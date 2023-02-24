// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Params } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type {
  Playerseasonaverage,
  PlayerseasonaverageData,
  PlayerseasonaverageQuery,
  PlayerseasonaverageService
} from './services/playerseasonaverage/playerseasonaverage'
export type { Playerseasonaverage, PlayerseasonaverageData, PlayerseasonaverageQuery }

import type { Teamrank, TeamrankData, TeamrankQuery, TeamrankService } from './services/teamrank/teamrank'
export type { Teamrank, TeamrankData, TeamrankQuery }

import type {
  Playermatchstat,
  PlayermatchstatData,
  PlayermatchstatQuery,
  PlayermatchstatService
} from './services/playermatchstat/playermatchstat'
export type { Playermatchstat, PlayermatchstatData, PlayermatchstatQuery }

import type { Match, MatchData, MatchQuery, MatchService } from './services/match/match'
export type { Match, MatchData, MatchQuery }

import type { Matchlog, MatchlogData, MatchlogQuery, MatchlogService } from './services/matchlog/matchlog'
export type { Matchlog, MatchlogData, MatchlogQuery }

import type {
  Competition,
  CompetitionData,
  CompetitionQuery,
  CompetitionService
} from './services/competition/competition'
export type { Competition, CompetitionData, CompetitionQuery }

import type { Playoff, PlayoffData, PlayoffQuery, PlayoffService } from './services/playoff/playoff'
export type { Playoff, PlayoffData, PlayoffQuery }

import type {
  Seasonteamplayer,
  SeasonteamplayerData,
  SeasonteamplayerQuery,
  SeasonteamplayerService
} from './services/seasonteamplayer/seasonteamplayer'
export type { Seasonteamplayer, SeasonteamplayerData, SeasonteamplayerQuery }

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

const seasonteamplayerServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type SeasonteamplayerClientService = Pick<
  SeasonteamplayerService<Params<SeasonteamplayerQuery>>,
  typeof seasonteamplayerServiceMethods[number]
>

const playoffServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type PlayoffClientService = Pick<PlayoffService<Params<PlayoffQuery>>, typeof playoffServiceMethods[number]>

const competitionServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type CompetitionClientService = Pick<
  CompetitionService<Params<CompetitionQuery>>,
  typeof competitionServiceMethods[number]
>

const matchlogServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type MatchlogClientService = Pick<
  MatchlogService<Params<MatchlogQuery>>,
  typeof matchlogServiceMethods[number]
>

const matchServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type MatchClientService = Pick<MatchService<Params<MatchQuery>>, typeof matchServiceMethods[number]>

const playermatchstatServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type PlayermatchstatClientService = Pick<
  PlayermatchstatService<Params<PlayermatchstatQuery>>,
  typeof playermatchstatServiceMethods[number]
>

const teamrankServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type TeamrankClientService = Pick<TeamrankService, typeof teamrankServiceMethods[number]>

const matchstatServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type MatchstatClientService = Pick<
  MatchstatService<Params<MatchstatQuery>>,
  typeof matchstatServiceMethods[number]
>

const playerseasonaverageServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type PlayerseasonaverageClientService = Pick<
  PlayerseasonaverageService<Params<PlayerseasonaverageQuery>>,
  typeof playerseasonaverageServiceMethods[number]
>

export interface ServiceTypes {
  playerseasonaverage: PlayerseasonaverageClientService
  teamrank: TeamrankClientService
  playermatchstat: PlayermatchstatClientService
  match: MatchClientService
  matchlog: MatchlogClientService
  competition: CompetitionClientService
  playoff: PlayoffClientService
  seasonteamplayer: SeasonteamplayerClientService
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
  client.use('seasonteamplayer', connection.service('seasonteamplayer'), {
    methods: seasonteamplayerServiceMethods
  })
  client.use('playoff', connection.service('playoff'), {
    methods: playoffServiceMethods
  })
  client.use('competition', connection.service('competition'), {
    methods: competitionServiceMethods
  })
  client.use('matchlog', connection.service('matchlog'), {
    methods: matchlogServiceMethods
  })
  client.use('match', connection.service('match'), {
    methods: matchServiceMethods
  })
  client.use('playermatchstat', connection.service('playermatchstat'), {
    methods: playermatchstatServiceMethods
  })
  client.use('teamrank', connection.service('teamrank'), {
    methods: teamrankServiceMethods
  })
  client.use('playerseasonaverage', connection.service('playerseasonaverage'), {
    methods: playerseasonaverageServiceMethods
  })
  return client
}
