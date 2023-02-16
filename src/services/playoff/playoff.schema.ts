// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';
import { competitionSchema } from '../competition/competition.schema'
import { seasonSchema } from '../season/season.schema'

// Main data model schema
export const playoffSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    rule: Type.Number(),
    seasonid: Type.Number(),
    competitionid: Type.Number(),
    season: Type.Optional(Type.Ref(seasonSchema)),
    competition: Type.Optional(Type.Ref(competitionSchema)),
  },
  { $id: 'Playoff', additionalProperties: false }
)
export type Playoff = Static<typeof playoffSchema>
export const playoffResolver = resolve<Playoff, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, playoffSchema);
  }
})

export const playoffExternalResolver = resolve<Playoff, HookContext>({
  competition: virtual(async (playoff, context) => {
    return context.app.service('competition').get(playoff.competitionid)
  }),
  season: virtual(async (playoff, context) => {
    return context.app.service('season').get(playoff.seasonid)
  })
})

// Schema for creating new entries
export const playoffDataSchema = Type.Pick(playoffSchema, ['title', 'rule', 'seasonid', 'competitionid'], {
  $id: 'PlayoffData'
})
export type PlayoffData = Static<typeof playoffDataSchema>
export const playoffDataValidator = getDataValidator(playoffDataSchema, dataValidator)
export const playoffDataResolver = resolve<Playoff, HookContext>({})

// Schema for updating existing entries
export const playoffPatchSchema = Type.Pick(playoffSchema, ['competitionid', 'seasonid'], {
  $id: 'PlayoffPatch'
})
export type PlayoffPatch = Static<typeof playoffPatchSchema>
export const playoffPatchValidator = getDataValidator(playoffPatchSchema, dataValidator)
export const playoffPatchResolver = resolve<Playoff, HookContext>({})

// Schema for allowed query properties
export const playoffQueryProperties = Type.Pick(playoffSchema, ['seasonid', 'competitionid'])
export const playoffQuerySchema = Type.Intersect(
  [
    querySyntax(playoffQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PlayoffQuery = Static<typeof playoffQuerySchema>
export const playoffQueryValidator = getValidator(playoffQuerySchema, queryValidator)
export const playoffQueryResolver = resolve<PlayoffQuery, HookContext>({})
