import { Embed } from 'discord.js';

export enum MessageAnalysisType {
  Exact,
  Contains,
}

export interface MultipleSearch {
  search: string
}

export interface MessageAnalysis {
  type: MessageAnalysisType;
  search: string | string[];
  reply: string | Embed;
}
