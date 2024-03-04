import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, EmbedBuilder } from 'discord.js';
import { modalHandlerRegistry } from '../modalHandler';
import lang from '@/lang';
import settings from '@/config/suggestions';
import logger from '@/logger';
export const customId = 'create-suggestion-modal';

const fields = Object.values(lang.suggestions.createSuggestionModal.fields);

const modalComponents = fields.map((field) => {
  const textInput = new TextInputBuilder()
    .setCustomId(field.id)
    .setLabel(field.label)
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(field.placeholder)
    .setRequired(true);

  if (field.default) {
    textInput.setValue(field.default);
  }

  return new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);
});

export const createSuggestionModal = new ModalBuilder()
  .setCustomId(customId)
  .setTitle(lang.suggestions.createSuggestionModal.title)
  .addComponents(modalComponents);

export async function handleCreateSuggestionModalSubmit(interaction: ModalSubmitInteraction) {
  const guild = interaction.guild;
  const suggestionChannel = await guild?.channels.cache.get(settings.channelId);
  if (!suggestionChannel?.isTextBased()) {
    logger.error('Suggestion channel is not a text channel');
    return;
  } else {
    const user = interaction.user;
    const replacePlaceholders = (text: string) => {
      return text
        .replace(/{user}/g, `${user.username}`)
        .replace(/{user\.displayName}/g, `${user.displayName}`)
        .replace(/{user\.mention}/g, `<@${user.id}>`)
        .replace(/{user\.avatarUrl}/g, user.displayAvatarURL())
        .replace(/{user\.tag}/g, user.tag)
        .replace(/{user\.id}/g, user.id)
        .replace(/{field\.(.*?)}/g, (match, fieldName) => {
          const fieldValue = interaction.fields.getTextInputValue(fieldName);
          return fieldValue || match;
        });
    };
    const title = replacePlaceholders(lang.suggestions.suggestionEmbed.title);
    const description = replacePlaceholders(lang.suggestions.suggestionEmbed.description);
    const langFields = Object.values(lang.suggestions.suggestionEmbed.fields);
    const suggestionEmbed = new EmbedBuilder({
      title: title,
      description: description,
    }).setThumbnail(replacePlaceholders(lang.suggestions.suggestionEmbed.thumbnail)).setColor(lang.suggestions.suggestionEmbed.color).addFields(langFields.map(field => {
      return { name: replacePlaceholders(field.name), value: replacePlaceholders(field.value), inline: field.inline };
    }));
    suggestionChannel.send({ embeds: [suggestionEmbed] });
  }
  await interaction.reply({ content: lang.suggestions.createSuggestionModal.submitReply, ephemeral: true });
}

modalHandlerRegistry.registerModal(customId, { handleModalSubmit: handleCreateSuggestionModalSubmit });
