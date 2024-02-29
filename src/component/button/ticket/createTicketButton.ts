import { ButtonBuilder } from 'discord.js';
import button from '../button';
import lang from '@/lang';
export const CREATE_TICKET = 'createTicket';

const createTickketButton = new ButtonBuilder()
  .setCustomId(CREATE_TICKET)
  .setLabel(lang.tickets.createTicketButton.label)
  .setStyle(lang.tickets.createTicketButton.style);

export default {
  button: createTickketButton,
  execute(interaction) {
    interaction.reply({ content: 'Create ticket click', ephemeral: true });
  },
} as button;
