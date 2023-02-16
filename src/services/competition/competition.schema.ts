// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const competitionSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    picture: Type.String(),
    description: Type.String(),
  },
  { $id: 'Competition', additionalProperties: false }
)
export type Competition = Static<typeof competitionSchema>
export const competitionResolver = resolve<Competition, HookContext>({
  picture: async (value) => {
    // Return the photo avatar URL
    return `http://svcsa.org/uploads/${value}`;
  }
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, competitionSchema);
  }
})

export const competitionExternalResolver = resolve<Competition, HookContext>({})

// Schema for creating new entries
export const competitionDataSchema = Type.Pick(competitionSchema, ['name'], {
  $id: 'CompetitionData'
})
export type CompetitionData = Static<typeof competitionDataSchema>
export const competitionDataValidator = getDataValidator(competitionDataSchema, dataValidator)
export const competitionDataResolver = resolve<Competition, HookContext>({})

// Schema for updating existing entries
export const competitionPatchSchema = Type.Partial(competitionSchema, {
  $id: 'CompetitionPatch'
})
export type CompetitionPatch = Static<typeof competitionPatchSchema>
export const competitionPatchValidator = getDataValidator(competitionPatchSchema, dataValidator)
export const competitionPatchResolver = resolve<Competition, HookContext>({})

// Schema for allowed query properties
export const competitionQueryProperties = Type.Pick(competitionSchema, ['name'])
export const competitionQuerySchema = Type.Intersect(
  [
    querySyntax(competitionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CompetitionQuery = Static<typeof competitionQuerySchema>
export const competitionQueryValidator = getValidator(competitionQuerySchema, queryValidator)
export const competitionQueryResolver = resolve<CompetitionQuery, HookContext>({})
