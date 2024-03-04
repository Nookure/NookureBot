import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import button from '../button';
import lang from '@/lang';
import { createSuggestionModal } from '@/component/modal/suggestion/createSuggestionModal';

export const CREATE_SUGGEST = 'createSuggest';

const createSuggestButton = new ButtonBuilder()
  .setCustomId(CREATE_SUGGEST)
  .setLabel(lang.suggestions.createSuggestionButton.label)
  .setStyle(lang.suggestions.createSuggestionButton.style);

export default {
  button: createSuggestButton,
  async execute(interaction: ButtonInteraction) {
    const modalData = createSuggestionModal.toJSON();
    await interaction.showModal(modalData);
  },
} as button;