// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  playerseasonaverageDataValidator,
  playerseasonaveragePatchValidator,
  playerseasonaverageQueryValidator,
  playerseasonaverageResolver,
  playerseasonaverageExternalResolver,
  playerseasonaverageDataResolver,
  playerseasonaveragePatchResolver,
  playerseasonaverageQueryResolver
} from './playerseasonaverage.schema'

import type { Application } from '../../declarations'
import { PlayerseasonaverageService, getOptions } from './playerseasonaverage.class'

export * from './playerseasonaverage.class'
export * from './playerseasonaverage.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const playerseasonaverage = (app: Application) => {
  // Register our service on the Feathers application
  app.use('playerseasonaverage', new PlayerseasonaverageService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('playerseasonaverage').hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(playerseasonaverageExternalResolver),
        schemaHooks.resolveResult(playerseasonaverageResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(playerseasonaverageQueryValidator),
        schemaHooks.resolveQuery(playerseasonaverageQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(playerseasonaverageDataValidator),
        schemaHooks.resolveData(playerseasonaverageDataResolver)
      ],
      patch: [
        schemaHooks.validateData(playerseasonaveragePatchValidator),
        schemaHooks.resolveData(playerseasonaveragePatchResolver)
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
    playerseasonaverage: PlayerseasonaverageService
  }
}
