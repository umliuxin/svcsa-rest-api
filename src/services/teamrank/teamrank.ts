// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { TeamrankService, getOptions } from './teamrank.class'

export * from './teamrank.class'

// A configure function that registers the service and its hooks via `app.configure`
export const teamrank = (app: Application) => {
  // Register our service on the Feathers application
  app.use('teamrank', new TeamrankService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('teamrank').hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
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
    teamrank: TeamrankService
  }
}
