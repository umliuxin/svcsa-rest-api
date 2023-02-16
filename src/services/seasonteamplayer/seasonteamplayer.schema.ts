import { player } from './../players/players';
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { seasonSchema } from '../season/season.schema';
import { teamSchema } from '../teams/teams.schema';
import { playerSchema } from './../players/players.schema';
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const seasonteamplayerSchema = Type.Object(
  {
    seasonid: Type.String(),
    teamid: Type.String(),
    playerid: Type.String(),
    playernumber: Type.Number(),
    team: Type.Optional(Type.Ref(teamSchema)),
    season: Type.Optional(Type.Ref(seasonSchema)),
    player: Type.Optional(Type.Ref(playerSchema))
  },
  { $id: 'Seasonteamplayer', additionalProperties: false }
)
export type Seasonteamplayer = Static<typeof seasonteamplayerSchema>
export const seasonteamplayerResolver = resolve<Seasonteamplayer, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, seasonteamplayerSchema);
  }
})

export const seasonteamplayerExternalResolver = resolve<Seasonteamplayer, HookContext>({
  team: virtual(async (seasonteamplayer, context) => {
    return context.app.service('teams').get(seasonteamplayer.teamid)
  }),
  season: virtual(async (seasonteamplayer, context) => {
    return context.app.service('season').get(seasonteamplayer.seasonid)
  }),
  player: virtual(async (seasonteamplayer, context) => {
    return context.app.service('players').get(seasonteamplayer.playerid)
  })
})

// Schema for creating new entries
export const seasonteamplayerDataSchema = Type.Pick(seasonteamplayerSchema, ['teamid', 'playerid', 'seasonid'], {
  $id: 'SeasonteamplayerData'
})
export type SeasonteamplayerData = Static<typeof seasonteamplayerDataSchema>
export const seasonteamplayerDataValidator = getDataValidator(seasonteamplayerDataSchema, dataValidator)
export const seasonteamplayerDataResolver = resolve<Seasonteamplayer, HookContext>({})

// Schema for updating existing entries
export const seasonteamplayerPatchSchema = Type.Pick(seasonteamplayerSchema, ['seasonid', 'teamid', 'playerid'], {
  $id: 'SeasonteamplayerPatch'
})
export type SeasonteamplayerPatch = Static<typeof seasonteamplayerPatchSchema>
export const seasonteamplayerPatchValidator = getDataValidator(seasonteamplayerPatchSchema, dataValidator)
export const seasonteamplayerPatchResolver = resolve<Seasonteamplayer, HookContext>({})

// Schema for allowed query properties
export const seasonteamplayerQueryProperties = Type.Pick(seasonteamplayerSchema, ['teamid', 'seasonid'])
export const seasonteamplayerQuerySchema = Type.Intersect(
  [
    querySyntax(seasonteamplayerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SeasonteamplayerQuery = Static<typeof seasonteamplayerQuerySchema>
export const seasonteamplayerQueryValidator = getValidator(seasonteamplayerQuerySchema, queryValidator)
export const seasonteamplayerQueryResolver = resolve<SeasonteamplayerQuery, HookContext>({})
