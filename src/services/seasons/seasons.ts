// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  seasonsDataValidator,
  seasonsPatchValidator,
  seasonsQueryValidator,
  seasonsResolver,
  seasonsExternalResolver,
  seasonsDataResolver,
  seasonsPatchResolver,
  seasonsQueryResolver
} from './seasons.schema'

import type { Application } from '../../declarations'
import { SeasonsService, getOptions } from './seasons.class'

export * from './seasons.class'
export * from './seasons.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const seasons = (app: Application) => {
  // Register our service on the Feathers application
  app.use('seasons', new SeasonsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    // methods: ['find', 'get', 'create', 'patch', 'remove'],
    methods: ['find', 'get'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('seasons').hooks({
    around: {
      all: [schemaHooks.resolveExternal(seasonsExternalResolver), schemaHooks.resolveResult(seasonsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(seasonsQueryValidator), schemaHooks.resolveQuery(seasonsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(seasonsDataValidator), schemaHooks.resolveData(seasonsDataResolver)],
      patch: [schemaHooks.validateData(seasonsPatchValidator), schemaHooks.resolveData(seasonsPatchResolver)],
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
    seasons: SeasonsService
  }
}
