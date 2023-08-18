import {TeamParam} from "./teams-list";

export interface Player {
  id?: number;
  username: string;
  team: TeamParam;
}
