import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalSubmitInteraction } from 'discord.js';
import { modalHandlerRegistry } from '../modalHandler';
import userSelections from '@/util/userSelections';
export const customId = 'create-ticket-modal';

export const createTicketModal = new ModalBuilder()
  .setCustomId(customId)
  .setTitle('Create Ticket')
  .addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('ticket-title')
        .setLabel('Title')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Error when...')
        .setRequired(true)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('ticket-description')
        .setLabel('Description')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Greetings, I am having trouble with...')
        .setRequired(true)
    ),
  );

export async function handleCreateTicketModalSubmit(interaction: ModalSubmitInteraction) {
  const userSelectedValue = userSelections.get(interaction.user.id);
  const title = interaction.fields.getTextInputValue('ticket-title');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const description = interaction.fields.getTextInputValue('ticket-description');
  await interaction.reply({ content: `Ticket created with title: ${title}, ${ userSelectedValue }`, ephemeral: true });
  userSelections.delete(interaction.user.id);
}
modalHandlerRegistry.registerModal(customId, { handleModalSubmit: handleCreateTicketModalSubmit });