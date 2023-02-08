// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

import { toLowerCaseProperty } from '../../utilities/property-name-converter';
// Main data model schema
export const playerSchema = Type.Object(
  {
    id: Type.Number(),
    birth: Type.String({ format: 'date-time' }),
    height: Type.Number(),
    weight: Type.Number(),
    photosrc: Type.String(),
    sex: Type.String(),
    email: Type.String(),
    name: Type.String(),
    birthday: Type.Object({
      month: Type.Number(),
      day: Type.Number(),
    })
  },
  { $id: 'Player', additionalProperties: true }
)

export type Player = Static<typeof playerSchema>
export const playerResolver = resolve<Player, HookContext>({
  photosrc: async (value) => {
    // Return the photo avatar URL
    return `http://svcsa.org/uploads/${value}`;
  },
  height: async (value) => {
    if (!value) {
      return;
    }
    // Calculate to cm, if it is in inch
    if (value < 10) {
      return value * 33;
    }
    return value
  },
  birthday: async (_, player) => {
    const dateObj = new Date(player["birth"])

    return {
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate()
    }
  },
  birth: async () => undefined,

}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, playerSchema);
  }
})

export const playerExternalResolver = resolve<Player, HookContext>({

})

// Schema for creating new entries
export const playerDataSchema = Type.Pick(playerSchema, ['name', 'birth', 'height', 'weight', 'sex', 'email'], {
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
export const playerQueryProperties = Type.Pick(playerSchema, ['name'])
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
