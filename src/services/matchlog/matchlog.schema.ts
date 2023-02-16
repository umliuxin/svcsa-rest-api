// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const matchlogSchema = Type.Object(
  {
    logid: Type.Number(),
    matchid: Type.String(),
    playerid: Type.Number(),
    event: Type.String(),
    teamid: Type.Number()
  },
  { $id: 'Matchlog', additionalProperties: false }
)
export type Matchlog = Static<typeof matchlogSchema>
export const matchlogResolver = resolve<Matchlog, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, matchlogSchema);
  }
})

export const matchlogExternalResolver = resolve<Matchlog, HookContext>({})

// Schema for creating new entries
export const matchlogDataSchema = Type.Pick(matchlogSchema, ['matchid', 'teamid', 'playerid', 'event'], {
  $id: 'MatchlogData'
})
export type MatchlogData = Static<typeof matchlogDataSchema>
export const matchlogDataValidator = getDataValidator(matchlogDataSchema, dataValidator)
export const matchlogDataResolver = resolve<Matchlog, HookContext>({})

// Schema for updating existing entries
export const matchlogPatchSchema = Type.Partial(matchlogSchema, {
  $id: 'MatchlogPatch'
})
export type MatchlogPatch = Static<typeof matchlogPatchSchema>
export const matchlogPatchValidator = getDataValidator(matchlogPatchSchema, dataValidator)
export const matchlogPatchResolver = resolve<Matchlog, HookContext>({})

// Schema for allowed query properties
export const matchlogQueryProperties = Type.Pick(matchlogSchema, ['matchid', 'teamid'])
export const matchlogQuerySchema = Type.Intersect(
  [
    querySyntax(matchlogQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MatchlogQuery = Static<typeof matchlogQuerySchema>
export const matchlogQueryValidator = getValidator(matchlogQuerySchema, queryValidator)
export const matchlogQueryResolver = resolve<MatchlogQuery, HookContext>({})
