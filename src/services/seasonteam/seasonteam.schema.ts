// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

import { teamSchema } from '../teams/teams.schema';
import { seasonSchema } from '../season/season.schema';

// Main data model schema
export const seasonteamSchema = Type.Object(
  {
    seasonid: Type.Number(),
    teamid: Type.String(),
    team: Type.Optional(Type.Ref(teamSchema)),
    season: Type.Optional(Type.Ref(seasonSchema)),
  },
  { $id: 'Seasonteam', additionalProperties: false }
)
export type Seasonteam = Static<typeof seasonteamSchema>
export const seasonteamResolver = resolve<Seasonteam, HookContext>({})

export const seasonteamExternalResolver = resolve<Seasonteam, HookContext>({

  team: virtual(async (seasonteam, context) => {
    return context.app.service('teams').get(seasonteam.teamid)
  }),
  season: virtual(async (seasonteam, context) => {
    return context.app.service('season').get(seasonteam.seasonid)
  })
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, seasonteamSchema);
  }
})

// Schema for creating new entries
export const seasonteamDataSchema = Type.Pick(seasonteamSchema, ['seasonid'], {
  $id: 'SeasonteamData'
})
export type SeasonteamData = Static<typeof seasonteamDataSchema>
export const seasonteamDataValidator = getDataValidator(seasonteamDataSchema, dataValidator)
export const seasonteamDataResolver = resolve<Seasonteam, HookContext>({})

// Schema for updating existing entries
export const seasonteamPatchSchema = Type.Pick(seasonteamSchema, ['seasonid', 'teamid'], {
  $id: 'SeasonteamPatch'
})
export type SeasonteamPatch = Static<typeof seasonteamPatchSchema>
export const seasonteamPatchValidator = getDataValidator(seasonteamPatchSchema, dataValidator)
export const seasonteamPatchResolver = resolve<Seasonteam, HookContext>({})

// Schema for allowed query properties
export const seasonteamQueryProperties = Type.Pick(seasonteamSchema, ['seasonid'])
export const seasonteamQuerySchema = Type.Intersect(
  [
    querySyntax(seasonteamQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SeasonteamQuery = Static<typeof seasonteamQuerySchema>
export const seasonteamQueryValidator = getValidator(seasonteamQuerySchema, queryValidator)
export const seasonteamQueryResolver = resolve<SeasonteamQuery, HookContext>({})
