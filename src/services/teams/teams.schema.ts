// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const teamSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    shortname: Type.String(),
    captain: Type.String(),
    email: Type.String(),
    tel: Type.String(),
    wechat: Type.String(),
    logosrc: Type.String(),
    photosrc: Type.String(),
    description: Type.Optional(Type.String()),

  },
  { $id: 'Team', additionalProperties: false }
)
export type Team = Static<typeof teamSchema>
export const teamResolver = resolve<Team, HookContext>({
  photosrc: async (value) => {
    // Return the photo avatar URL
    return `http://svcsa.org/uploads/${value}`;
  },
  logosrc: async (value) => {
    // Return the photo avatar URL
    return `http://svcsa.org/uploads/${value}`;
  },

}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, teamSchema)
  }
})

export const teamExternalResolver = resolve<Team, HookContext>({})

// Schema for essential data
export const teamEssentialSchema = Type.Pick(teamSchema, ['name', 'logosrc', 'shortname'], {
  $id: 'TeamData'
})
export type TeamEssential = Static<typeof teamEssentialSchema>

// Schema for creating new entries
export const teamDataSchema = Type.Pick(teamSchema, ['name'], {
  $id: 'TeamData'
})
export type TeamData = Static<typeof teamDataSchema>
export const teamDataValidator = getDataValidator(teamDataSchema, dataValidator)
export const teamDataResolver = resolve<Team, HookContext>({})

// Schema for updating existing entries
export const teamPatchSchema = Type.Partial(teamSchema, {
  $id: 'TeamPatch'
})
export type TeamPatch = Static<typeof teamPatchSchema>
export const teamPatchValidator = getDataValidator(teamPatchSchema, dataValidator)
export const teamPatchResolver = resolve<Team, HookContext>({})

// Schema for allowed query properties
export const teamQueryProperties = Type.Pick(teamSchema, ['id', 'name'])
export const teamQuerySchema = Type.Intersect(
  [
    querySyntax(teamQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TeamQuery = Static<typeof teamQuerySchema>
export const teamQueryValidator = getValidator(teamQuerySchema, queryValidator)
export const teamQueryResolver = resolve<TeamQuery, HookContext>({})
