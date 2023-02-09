// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  teamDataValidator,
  teamPatchValidator,
  teamQueryValidator,
  teamResolver,
  teamExternalResolver,
  teamDataResolver,
  teamPatchResolver,
  teamQueryResolver
} from './teams.schema'

import type { Application } from '../../declarations'
import { TeamService, getOptions } from './teams.class'

export * from './teams.class'
export * from './teams.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const team = (app: Application) => {
  // Register our service on the Feathers application
  app.use('teams', new TeamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    // methods: ['find', 'get', 'create', 'patch', 'remove'],
    methods: ['find', 'get'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('teams').hooks({
    around: {
      all: [schemaHooks.resolveExternal(teamExternalResolver), schemaHooks.resolveResult(teamResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(teamQueryValidator), schemaHooks.resolveQuery(teamQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(teamDataValidator), schemaHooks.resolveData(teamDataResolver)],
      patch: [schemaHooks.validateData(teamPatchValidator), schemaHooks.resolveData(teamPatchResolver)],
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
    teams: TeamService
  }
}
