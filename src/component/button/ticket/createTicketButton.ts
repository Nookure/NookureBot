import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { createTicketModal } from '@/component/modal/ticket/createTicketModal';
import button from '../button';
import lang from '@/lang';

export const CREATE_TICKET = 'createTicket';

const createTicketButton = new ButtonBuilder()
  .setCustomId(CREATE_TICKET)
  .setLabel(lang.tickets.createTicketButton.label)
  .setStyle(lang.tickets.createTicketButton.style);

export default {
  button: createTicketButton,
  async execute(interaction: ButtonInteraction) {
    await interaction.showModal(createTicketModal);
  },
} as button;
