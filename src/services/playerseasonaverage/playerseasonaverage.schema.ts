// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { playerSchema } from './../players/players.schema';
import { seasonSchema } from '../season/season.schema';
import { teamSchema } from '../teams/teams.schema';
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const playerseasonaverageSchema = Type.Object(
  {
    id: Type.Number(),
    foul: Type.Number(),
    points: Type.Number(),
    assist: Type.Number(),
    steal: Type.Number(),
    block: Type.Number(),
    offensiverebound: Type.Number(),
    rebound: Type.Number(),
    '3gp': Type.Number(),
    fgp: Type.Number(),
    ftp: Type.Number(),
    seasonid: Type.String(),
    teamid: Type.String(),
    playerid: Type.String(),
    playernumber: Type.Number(),
    team: Type.Optional(Type.Ref(teamSchema)),
    season: Type.Optional(Type.Ref(seasonSchema)),
    player: Type.Optional(Type.Ref(playerSchema))

  },
  { $id: 'Playerseasonaverage', additionalProperties: false }
)
export type Playerseasonaverage = Static<typeof playerseasonaverageSchema>
export const playerseasonaverageResolver = resolve<Playerseasonaverage, HookContext>({
  team: virtual(async (data, context) => {
    return context.app.service('teams').get(data.teamid)
  }),
  season: virtual(async (data, context) => {
    return context.app.service('season').get(data.seasonid)
  }),
  player: virtual(async (data, context) => {
    return context.app.service('players').get(data.playerid)
  })
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, playerseasonaverageSchema);
  }
})

export const playerseasonaverageExternalResolver = resolve<Playerseasonaverage, HookContext>({})

// Schema for creating new entries
export const playerseasonaverageDataSchema = Type.Pick(playerseasonaverageSchema, ['playerid'], {
  $id: 'PlayerseasonaverageData'
})
export type PlayerseasonaverageData = Static<typeof playerseasonaverageDataSchema>
export const playerseasonaverageDataValidator = getDataValidator(playerseasonaverageDataSchema, dataValidator)
export const playerseasonaverageDataResolver = resolve<Playerseasonaverage, HookContext>({})

// Schema for updating existing entries
export const playerseasonaveragePatchSchema = Type.Pick(playerseasonaverageSchema, ['playerid'], {
  $id: 'PlayerseasonaveragePatch'
})
export type PlayerseasonaveragePatch = Static<typeof playerseasonaveragePatchSchema>
export const playerseasonaveragePatchValidator = getDataValidator(
  playerseasonaveragePatchSchema,
  dataValidator
)
export const playerseasonaveragePatchResolver = resolve<Playerseasonaverage, HookContext>({})

// Schema for allowed query properties
export const playerseasonaverageQueryProperties = Type.Pick(playerseasonaverageSchema, ['id', 'seasonid', 'playerid', 'teamid'])
export const playerseasonaverageQuerySchema = Type.Intersect(
  [
    querySyntax(playerseasonaverageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PlayerseasonaverageQuery = Static<typeof playerseasonaverageQuerySchema>
export const playerseasonaverageQueryValidator = getValidator(playerseasonaverageQuerySchema, queryValidator)
export const playerseasonaverageQueryResolver = resolve<PlayerseasonaverageQuery, HookContext>({})
