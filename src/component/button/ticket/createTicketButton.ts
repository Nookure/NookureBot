import { ButtonBuilder, ButtonInteraction, StringSelectMenuBuilder, ActionRowBuilder } from 'discord.js';
import button from '../button';
import lang from '@/lang';
import ticketCategorySelect from '@/component/dropdown/ticket/ticketCategorySelect';

export const CREATE_TICKET = 'createTicket';

const createTicketButton = new ButtonBuilder()
  .setCustomId(CREATE_TICKET)
  .setLabel(lang.tickets.createTicketButton.label)
  .setStyle(lang.tickets.createTicketButton.style);

export default {
  button: createTicketButton,
  async execute(interaction: ButtonInteraction) {
    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(ticketCategorySelect.selectMenu);
    await interaction.reply({ content: 'Only a few steps more!', components: [row], ephemeral: true });
  },
} as button;