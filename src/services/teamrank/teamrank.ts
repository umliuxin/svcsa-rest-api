// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application, HookContext } from '../../declarations'
import { TeamrankService, getOptions } from './teamrank.class'
import { resolve, virtual } from '@feathersjs/schema'
import { hooks as schemaHooks } from '@feathersjs/schema'

export * from './teamrank.class'

import type { Teamrank } from './teamrank.class'

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
      all: [schemaHooks.resolveResult(teamResolver)]
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


const teamResolver = resolve<Teamrank, HookContext>({
  team: virtual(async (teamrank, context) => {
    const teamData = await context.app.service('teams').get(teamrank.teamid);
    return {
      name: teamData.name,
      logosrc: teamData.logosrc,
      shortname: teamData.shortname
    }
  }),
  
})