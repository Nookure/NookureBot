import {
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import command from '../command';
import { createSuggestionModal } from '@/component/modal/suggestion/createSuggestionModal';

const command = new SlashCommandBuilder()
  .setName('suggest')
  .setDescription('Suggest something new!');

const execute = async (interaction: CommandInteraction) => {
  const modalData = createSuggestionModal.toJSON();
  await interaction.showModal(modalData);
};

export default {
  data: command,
  execute,
} as command;
