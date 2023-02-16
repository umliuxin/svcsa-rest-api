// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  matchDataValidator,
  matchPatchValidator,
  matchQueryValidator,
  matchResolver,
  matchExternalResolver,
  matchDataResolver,
  matchPatchResolver,
  matchQueryResolver
} from './match.schema'

import type { Application } from '../../declarations'
import { MatchService, getOptions } from './match.class'

export * from './match.class'
export * from './match.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const match = (app: Application) => {
  // Register our service on the Feathers application
  app.use('match', new MatchService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('match').hooks({
    around: {
      all: [schemaHooks.resolveExternal(matchExternalResolver), schemaHooks.resolveResult(matchResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(matchQueryValidator), schemaHooks.resolveQuery(matchQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(matchDataValidator), schemaHooks.resolveData(matchDataResolver)],
      patch: [schemaHooks.validateData(matchPatchValidator), schemaHooks.resolveData(matchPatchResolver)],
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
    match: MatchService
  }
}
