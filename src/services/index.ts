import { teamrank } from './teamrank/teamrank'
import { playermatchstat } from './playermatchstat/playermatchstat'
import { match } from './match/match'
import { matchlog } from './matchlog/matchlog'
import { competition } from './competition/competition'
import { playoff } from './playoff/playoff'
import { seasonteamplayer } from './seasonteamplayer/seasonteamplayer'
import { season } from './season/season'
import { seasonteam } from './seasonteam/seasonteam'
import { team } from './teams/teams'
import { player } from './players/players'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(teamrank)
  app.configure(playermatchstat)
  app.configure(match)
  app.configure(matchlog)
  app.configure(competition)
  app.configure(playoff)
  app.configure(seasonteamplayer)
  app.configure(season)
  app.configure(seasonteam)
  app.configure(team)
  app.configure(player)
  app.configure(user)
  // All services will be registered here
}
