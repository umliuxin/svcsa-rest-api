// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  seasonDataValidator,
  seasonPatchValidator,
  seasonQueryValidator,
  seasonResolver,
  seasonExternalResolver,
  seasonDataResolver,
  seasonPatchResolver,
  seasonQueryResolver
} from './season.schema'

import type { Application } from '../../declarations'
import { SeasonService, getOptions } from './season.class'

export * from './season.class'
export * from './season.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const season = (app: Application) => {
  // Register our service on the Feathers application
  app.use('season', new SeasonService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('season').hooks({
    around: {
      all: [schemaHooks.resolveExternal(seasonExternalResolver), schemaHooks.resolveResult(seasonResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(seasonQueryValidator), schemaHooks.resolveQuery(seasonQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(seasonDataValidator), schemaHooks.resolveData(seasonDataResolver)],
      patch: [schemaHooks.validateData(seasonPatchValidator), schemaHooks.resolveData(seasonPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    season: SeasonService
  }
}
