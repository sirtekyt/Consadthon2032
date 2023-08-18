import {teams} from "./services/websocket.service";

export interface Message {
  source: string;
  content?: string;
  error?: boolean;
  team?: teams;
  type?: string;
}
