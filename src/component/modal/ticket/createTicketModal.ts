import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalSubmitInteraction } from 'discord.js';
import { modalHandlerRegistry } from '../modalHandler';
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
        .setPlaceholder('Enter the title of your ticket')
        .setRequired(true)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('ticket-description')
        .setLabel('Description')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Enter the description of your issue')
        .setRequired(true)
    )
  );

export async function handleCreateTicketModalSubmit(interaction: ModalSubmitInteraction) {
  const title = interaction.fields.getTextInputValue('ticket-title');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const description = interaction.fields.getTextInputValue('ticket-description');
  await interaction.reply({ content: `Ticket created with title: ${title}`, ephemeral: true });
}
modalHandlerRegistry.registerModal(customId, { handleModalSubmit: handleCreateTicketModalSubmit });