// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  matchlogDataValidator,
  matchlogPatchValidator,
  matchlogQueryValidator,
  matchlogResolver,
  matchlogExternalResolver,
  matchlogDataResolver,
  matchlogPatchResolver,
  matchlogQueryResolver
} from './matchlog.schema'

import type { Application } from '../../declarations'
import { MatchlogService, getOptions } from './matchlog.class'

export * from './matchlog.class'
export * from './matchlog.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const matchlog = (app: Application) => {
  // Register our service on the Feathers application
  app.use('matchlog', new MatchlogService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('matchlog').hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(matchlogExternalResolver),
        schemaHooks.resolveResult(matchlogResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(matchlogQueryValidator),
        schemaHooks.resolveQuery(matchlogQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(matchlogDataValidator),
        schemaHooks.resolveData(matchlogDataResolver)
      ],
      patch: [
        schemaHooks.validateData(matchlogPatchValidator),
        schemaHooks.resolveData(matchlogPatchResolver)
      ],
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
    matchlog: MatchlogService
  }
}
