// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  playoffDataValidator,
  playoffPatchValidator,
  playoffQueryValidator,
  playoffResolver,
  playoffExternalResolver,
  playoffDataResolver,
  playoffPatchResolver,
  playoffQueryResolver
} from './playoff.schema'

import type { Application } from '../../declarations'
import { PlayoffService, getOptions } from './playoff.class'

export * from './playoff.class'
export * from './playoff.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const playoff = (app: Application) => {
  // Register our service on the Feathers application
  app.use('playoff', new PlayoffService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('playoff').hooks({
    around: {
      all: [schemaHooks.resolveExternal(playoffExternalResolver), schemaHooks.resolveResult(playoffResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(playoffQueryValidator), schemaHooks.resolveQuery(playoffQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(playoffDataValidator), schemaHooks.resolveData(playoffDataResolver)],
      patch: [schemaHooks.validateData(playoffPatchValidator), schemaHooks.resolveData(playoffPatchResolver)],
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
    playoff: PlayoffService
  }
}
