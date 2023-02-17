// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';
import { playerSchema } from './../players/players.schema';

// Main data model schema
export const playermatchstatSchema = Type.Object(
  {
    id: Type.Number(),
    playerid: Type.Number(),
    matchid: Type.Number(),
    starter: Type.Number(),
    foul: Type.Number(),
    points: Type.Number(),
    assist: Type.Number(),
    steal: Type.Number(),
    block: Type.Number(),
    turnover: Type.Number(),
    offensiverebound: Type.Number(),
    rebound: Type.Number(),
    '3pointshit': Type.Number(),
    '2pointshit': Type.Number(),
    '1pointshit': Type.Number(),
    hit: Type.Number(),
    '3pointsshot': Type.Number(),
    '2pointsshot': Type.Number(),
    '1pointsshot': Type.Number(),
    shot: Type.Number(),
    player: Type.Optional(Type.Ref(playerSchema))

  },
  { $id: 'Playermatchstat', additionalProperties: false }
)
export type Playermatchstat = Static<typeof playermatchstatSchema>
export const playermatchstatResolver = resolve<Playermatchstat, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, playermatchstatSchema);
  }
})

export const playermatchstatExternalResolver = resolve<Playermatchstat, HookContext>({
  player: virtual(async (playermatchstat, context) => {
    return context.app.service('players').get(playermatchstat.playerid)
  })
})

// Schema for creating new entries
export const playermatchstatDataSchema = Type.Pick(playermatchstatSchema, ['id'], {
  $id: 'PlayermatchstatData'
})
export type PlayermatchstatData = Static<typeof playermatchstatDataSchema>
export const playermatchstatDataValidator = getDataValidator(playermatchstatDataSchema, dataValidator)
export const playermatchstatDataResolver = resolve<Playermatchstat, HookContext>({})

// Schema for updating existing entries
export const playermatchstatPatchSchema = Type.Pick(playermatchstatSchema,['id'], {
  $id: 'PlayermatchstatPatch'
})
export type PlayermatchstatPatch = Static<typeof playermatchstatPatchSchema>
export const playermatchstatPatchValidator = getDataValidator(playermatchstatPatchSchema, dataValidator)
export const playermatchstatPatchResolver = resolve<Playermatchstat, HookContext>({})

// Schema for allowed query properties
export const playermatchstatQueryProperties = Type.Pick(playermatchstatSchema, ['matchid', 'playerid'])
export const playermatchstatQuerySchema = Type.Intersect(
  [
    querySyntax(playermatchstatQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PlayermatchstatQuery = Static<typeof playermatchstatQuerySchema>
export const playermatchstatQueryValidator = getValidator(playermatchstatQuerySchema, queryValidator)
export const playermatchstatQueryResolver = resolve<PlayermatchstatQuery, HookContext>({})
