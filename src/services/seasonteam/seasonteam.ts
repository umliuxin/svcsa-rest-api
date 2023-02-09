// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  seasonteamDataValidator,
  seasonteamPatchValidator,
  seasonteamQueryValidator,
  seasonteamResolver,
  seasonteamExternalResolver,
  seasonteamDataResolver,
  seasonteamPatchResolver,
  seasonteamQueryResolver
} from './seasonteam.schema'

import type { Application } from '../../declarations'
import { SeasonteamService, getOptions } from './seasonteam.class'

export * from './seasonteam.class'
export * from './seasonteam.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const seasonteam = (app: Application) => {
  // Register our service on the Feathers application
  app.use('seasonteam', new SeasonteamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('seasonteam').hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(seasonteamExternalResolver),
        schemaHooks.resolveResult(seasonteamResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(seasonteamQueryValidator),
        schemaHooks.resolveQuery(seasonteamQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(seasonteamDataValidator),
        schemaHooks.resolveData(seasonteamDataResolver)
      ],
      patch: [
        schemaHooks.validateData(seasonteamPatchValidator),
        schemaHooks.resolveData(seasonteamPatchResolver)
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
    seasonteam: SeasonteamService
  }
}
