import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

interface command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
}

export default command;
