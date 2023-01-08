// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const playerSchema = Type.Object(
  {
    ID: Type.Number(),
    Name: Type.String()
  },
  { $id: 'Player', additionalProperties: false }
)
export type Player = Static<typeof playerSchema>
export const playerResolver = resolve<Player, HookContext>({})

export const playerExternalResolver = resolve<Player, HookContext>({})

// Schema for creating new entries
export const playerDataSchema = Type.Pick(playerSchema, ['Name'], {
  $id: 'PlayerData'
})
export type PlayerData = Static<typeof playerDataSchema>
export const playerDataValidator = getDataValidator(playerDataSchema, dataValidator)
export const playerDataResolver = resolve<Player, HookContext>({})

// Schema for updating existing entries
export const playerPatchSchema = Type.Partial(playerSchema, {
  $id: 'PlayerPatch'
})
export type PlayerPatch = Static<typeof playerPatchSchema>
export const playerPatchValidator = getDataValidator(playerPatchSchema, dataValidator)
export const playerPatchResolver = resolve<Player, HookContext>({})

// Schema for allowed query properties
export const playerQueryProperties = Type.Pick(playerSchema, ['ID', 'Name'])
export const playerQuerySchema = Type.Intersect(
  [
    querySyntax(playerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PlayerQuery = Static<typeof playerQuerySchema>
export const playerQueryValidator = getValidator(playerQuerySchema, queryValidator)
export const playerQueryResolver = resolve<PlayerQuery, HookContext>({})
