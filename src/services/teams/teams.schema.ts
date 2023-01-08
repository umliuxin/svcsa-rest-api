// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const teamSchema = {
  $id: 'Team',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: {
      type: 'number'
    },
    text: {
      type: 'string'
    }
  }
} as const
export type Team = FromSchema<typeof teamSchema>
export const teamResolver = resolve<Team, HookContext>({})
export const teamExternalResolver = resolve<Team, HookContext>({})

// Schema for creating new data
export const teamDataSchema = {
  $id: 'TeamData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: {
      type: 'string'
    }
  }
} as const
export type TeamData = FromSchema<typeof teamDataSchema>
export const teamDataValidator = getValidator(teamDataSchema, dataValidator)
export const teamDataResolver = resolve<TeamData, HookContext>({})

// Schema for updating existing data
export const teamPatchSchema = {
  $id: 'TeamPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...teamSchema.properties
  }
} as const
export type TeamPatch = FromSchema<typeof teamPatchSchema>
export const teamPatchValidator = getValidator(teamPatchSchema, dataValidator)
export const teamPatchResolver = resolve<TeamPatch, HookContext>({})

// Schema for allowed query properties
export const teamQuerySchema = {
  $id: 'TeamQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(teamSchema.properties)
  }
} as const
export type TeamQuery = FromSchema<typeof teamQuerySchema>
export const teamQueryValidator = getValidator(teamQuerySchema, queryValidator)
export const teamQueryResolver = resolve<TeamQuery, HookContext>({})
