// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  playermatchstatDataValidator,
  playermatchstatPatchValidator,
  playermatchstatQueryValidator,
  playermatchstatResolver,
  playermatchstatExternalResolver,
  playermatchstatDataResolver,
  playermatchstatPatchResolver,
  playermatchstatQueryResolver
} from './playermatchstat.schema'

import type { Application } from '../../declarations'
import { PlayermatchstatService, getOptions } from './playermatchstat.class'

export * from './playermatchstat.class'
export * from './playermatchstat.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const playermatchstat = (app: Application) => {
  // Register our service on the Feathers application
  app.use('playermatchstat', new PlayermatchstatService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('playermatchstat').hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(playermatchstatExternalResolver),
        schemaHooks.resolveResult(playermatchstatResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(playermatchstatQueryValidator),
        schemaHooks.resolveQuery(playermatchstatQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(playermatchstatDataValidator),
        schemaHooks.resolveData(playermatchstatDataResolver)
      ],
      patch: [
        schemaHooks.validateData(playermatchstatPatchValidator),
        schemaHooks.resolveData(playermatchstatPatchResolver)
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
    playermatchstat: PlayermatchstatService
  }
}
