import {TeamParam} from "./teams-list";

export interface Message {
  source: string;
  content?: string;
  error?: boolean;
  team: TeamParam;
  username: string;
  type?: string;
}
