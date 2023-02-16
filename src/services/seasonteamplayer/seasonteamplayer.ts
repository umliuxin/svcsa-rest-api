// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  seasonteamplayerDataValidator,
  seasonteamplayerPatchValidator,
  seasonteamplayerQueryValidator,
  seasonteamplayerResolver,
  seasonteamplayerExternalResolver,
  seasonteamplayerDataResolver,
  seasonteamplayerPatchResolver,
  seasonteamplayerQueryResolver
} from './seasonteamplayer.schema'

import type { Application } from '../../declarations'
import { SeasonteamplayerService, getOptions } from './seasonteamplayer.class'

export * from './seasonteamplayer.class'
export * from './seasonteamplayer.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const seasonteamplayer = (app: Application) => {
  // Register our service on the Feathers application
  app.use('seasonteamplayer', new SeasonteamplayerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('seasonteamplayer').hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(seasonteamplayerExternalResolver),
        schemaHooks.resolveResult(seasonteamplayerResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(seasonteamplayerQueryValidator),
        schemaHooks.resolveQuery(seasonteamplayerQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(seasonteamplayerDataValidator),
        schemaHooks.resolveData(seasonteamplayerDataResolver)
      ],
      patch: [
        schemaHooks.validateData(seasonteamplayerPatchValidator),
        schemaHooks.resolveData(seasonteamplayerPatchResolver)
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
    seasonteamplayer: SeasonteamplayerService
  }
}
