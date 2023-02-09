// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const seasonsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    teamnumber: Type.Number(),
    starttime: Type.String({format: 'date-time'}),
    startdate: Type.Object({
      month: Type.Number(),
      day: Type.Number(),
      year: Type.Number(),
    })    

  },
  { $id: 'Seasons', additionalProperties: false }
)
export type Seasons = Static<typeof seasonsSchema>
export const seasonsResolver = resolve<Seasons, HookContext>({
  startdate: async (_, season) => {
    const dateObj = new Date(season["starttime"])

    return {
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
      year: dateObj.getFullYear()
    }
  },
  starttime: async () => undefined,
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, seasonsSchema);
  }
})

export const seasonsExternalResolver = resolve<Seasons, HookContext>({})

// Schema for creating new entries
export const seasonsDataSchema = Type.Pick(seasonsSchema, ['name'], {
  $id: 'SeasonsData'
})
export type SeasonsData = Static<typeof seasonsDataSchema>
export const seasonsDataValidator = getDataValidator(seasonsDataSchema, dataValidator)
export const seasonsDataResolver = resolve<Seasons, HookContext>({})

// Schema for updating existing entries
export const seasonsPatchSchema = Type.Partial(seasonsSchema, {
  $id: 'SeasonsPatch'
})
export type SeasonsPatch = Static<typeof seasonsPatchSchema>
export const seasonsPatchValidator = getDataValidator(seasonsPatchSchema, dataValidator)
export const seasonsPatchResolver = resolve<Seasons, HookContext>({})

// Schema for allowed query properties
export const seasonsQueryProperties = Type.Pick(seasonsSchema, ['name'])
export const seasonsQuerySchema = Type.Intersect(
  [
    querySyntax(seasonsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SeasonsQuery = Static<typeof seasonsQuerySchema>
export const seasonsQueryValidator = getValidator(seasonsQuerySchema, queryValidator)
export const seasonsQueryResolver = resolve<SeasonsQuery, HookContext>({})
