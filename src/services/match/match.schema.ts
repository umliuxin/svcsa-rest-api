// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve,virtual } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

import { teamSchema } from '../teams/teams.schema';
import { seasonSchema } from '../season/season.schema';
// Main data model schema
export const matchSchema = Type.Object(
  {
    id: Type.Number(),
    teamaid: Type.Number(),
    teambid: Type.Number(),
    scoreteama: Type.Number(),
    scoreteamb: Type.Number(),
    state: Type.Number(),
    starttime: Type.String({ format: 'date-time' }),
    seasonid:Type.Number(),
    court: Type.String(),
    teama: Type.Optional(Type.Ref(teamSchema)),
    teamb: Type.Optional(Type.Ref(teamSchema)),
    season: Type.Optional(Type.Ref(seasonSchema)),
  },
  { $id: 'Match', additionalProperties: false }
)
export type Match = Static<typeof matchSchema>
export const matchResolver = resolve<Match, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, matchSchema);
  }
})

export const matchExternalResolver = resolve<Match, HookContext>({
  teama: virtual(async (match, context) => {
    return context.app.service('teams').get(match.teamaid)
  }),
  teamb: virtual(async (match, context) => {
    return context.app.service('teams').get(match.teambid)
  }),
  season: virtual(async (match, context) => {
    return context.app.service('season').get(match.seasonid)
  })
})

// Schema for creating new entries
export const matchDataSchema = Type.Pick(matchSchema, ['seasonid'], {
  $id: 'MatchData'
})
export type MatchData = Static<typeof matchDataSchema>
export const matchDataValidator = getDataValidator(matchDataSchema, dataValidator)
export const matchDataResolver = resolve<Match, HookContext>({})

// Schema for updating existing entries
export const matchPatchSchema = Type.Pick(matchSchema,['id'], {
  $id: 'MatchPatch'
})
export type MatchPatch = Static<typeof matchPatchSchema>
export const matchPatchValidator = getDataValidator(matchPatchSchema, dataValidator)
export const matchPatchResolver = resolve<Match, HookContext>({})

// Schema for allowed query properties
export const matchQueryProperties = Type.Pick(matchSchema, ['seasonid'])
export const matchQuerySchema = Type.Intersect(
  [
    querySyntax(matchQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MatchQuery = Static<typeof matchQuerySchema>
export const matchQueryValidator = getValidator(matchQuerySchema, queryValidator)
export const matchQueryResolver = resolve<MatchQuery, HookContext>({})
