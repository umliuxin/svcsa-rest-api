import { season } from './season/season'
import { seasonteam } from './seasonteam/seasonteam'
import { team } from './teams/teams'
import { player } from './players/players'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(season)
  app.configure(seasonteam)
  app.configure(team)
  app.configure(player)
  app.configure(user)
  // All services will be registered here
}
