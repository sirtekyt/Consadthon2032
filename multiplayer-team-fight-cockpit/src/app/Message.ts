export interface Message {
  source: string;
  content?: string;
  error?: boolean;
  username: string;
  type?: string;
}
