// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import { app } from '../../app'

import type { Match } from '../match/match.schema'
import type { TeamEssential } from '../teams/teams.schema'

export type Teamrank = {
  rank?: number;
  team?: TeamEssential;
  teamid: number;
  win: number;
  lose: number;
  forfeit: number;
  point: number;
  total_score: number;
  oppo_score: number;
  score_diff?: number;
}
export type TeamrankData = Teamrank
export type TeamrankPatch = Teamrank
export type TeamrankQuery = {
  seasonid: number;
}

export interface TeamrankServiceOptions {
  app: Application
}

export interface TeamrankParams extends Params<TeamrankQuery> {
  seasonid: number
}

const EMPTY_TEAM_RANK = {
  win: 0,
  lose: 0,
  forfeit: 0,
  point: 0,
  total_score: 0,
  oppo_score: 0
}


// This is a skeleton for a custom service class. Remove or add the methods you need here
export class TeamrankService
  implements ServiceInterface<Teamrank, TeamrankData, TeamrankParams, TeamrankPatch>
{
  constructor(public options: TeamrankServiceOptions) {
  }

  async find(_params?: TeamrankParams): Promise<Teamrank[]> {
    let seasonId;
    if(_params?.query?.seasonid){
      seasonId = _params.query.seasonid;
    } else {
      const seasonData = await app.service('season').find({
        query: {
          $limit: 1,
          $sort: {
            starttime: -1,
          }
        }
      });
      seasonId = seasonData.data[0].id;
    }
    
    const matches = await this.getMatchesBySeasonId(seasonId)


    return this.rankTeamrank(this.calcTeamrank(matches));
  }



  async getMatchesBySeasonId(seasonId: number): Promise<any[]> {
    const allMatches = await app.service('match').find({
      query: {
        seasonid: seasonId,
      }
    });
    return allMatches.data;
  }

  calcTeamrank(matches: Match[]): Record<number, Teamrank> {
    const teamData: Record<number, Teamrank> = {};
    matches.forEach((match: Match) => {
      const { teamaid, teambid, scoreteama, scoreteamb, state } = match;
      if (state !== 1) { return; }

      if (!teamData.hasOwnProperty(teamaid)) {
        teamData[teamaid] = { ...EMPTY_TEAM_RANK, teamid: teamaid };
      }
      if (!teamData.hasOwnProperty(teambid)) {
        teamData[teambid] = { ...EMPTY_TEAM_RANK, teamid: teambid };
      }
      // for team a 
      teamData[teamaid].total_score += scoreteama;
      teamData[teamaid].oppo_score += scoreteamb;

      // for team b
      teamData[teambid].total_score += scoreteamb;
      teamData[teambid].oppo_score += scoreteama;

      if (scoreteama === 15 && scoreteamb === 0) {
        teamData[teambid].forfeit += 1;
      }
      if (scoreteama === 0 && scoreteamb === 15) {
        teamData[teamaid].forfeit += 1;
      }

      if (scoreteama > scoreteamb) {
        teamData[teamaid].win += 1;
        teamData[teambid].lose += 1;
      } else {
        teamData[teambid].win += 1;
        teamData[teamaid].lose += 1;
      }

    });

    return teamData;
  }

  rankTeamrank(teamrankData: Record<number, Teamrank>): Teamrank[] {
    return Object.values(teamrankData).map((teamrank) => {
      const score_diff = teamrank.total_score - teamrank.oppo_score;
      const point = teamrank.win * 2 + teamrank.lose;
      return { ...teamrank, score_diff, point}
    }).sort((a, b) => {
      if (a.point !== b.point) {
        return b.point - a.point
      }

      if (a.score_diff !== b.score_diff) {
        return b.score_diff - a.score_diff;
      }

      if (a.win !== b.win) {
        return b.win - a.win;
      }

      if(a.total_score !== b.total_score) {
        return b.total_score - a.total_score;
      }
      return 1;
    })
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
