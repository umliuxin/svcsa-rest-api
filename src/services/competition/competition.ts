// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  competitionDataValidator,
  competitionPatchValidator,
  competitionQueryValidator,
  competitionResolver,
  competitionExternalResolver,
  competitionDataResolver,
  competitionPatchResolver,
  competitionQueryResolver
} from './competition.schema'

import type { Application } from '../../declarations'
import { CompetitionService, getOptions } from './competition.class'

export * from './competition.class'
export * from './competition.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const competition = (app: Application) => {
  // Register our service on the Feathers application
  app.use('competition', new CompetitionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('competition').hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(competitionExternalResolver),
        schemaHooks.resolveResult(competitionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(competitionQueryValidator),
        schemaHooks.resolveQuery(competitionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(competitionDataValidator),
        schemaHooks.resolveData(competitionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(competitionPatchValidator),
        schemaHooks.resolveData(competitionPatchResolver)
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
    competition: CompetitionService
  }
}
