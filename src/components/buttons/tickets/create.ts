import { ButtonBuilder } from 'discord.js';
import lang from '@/lang';

const createTicket = new ButtonBuilder()
  .setCustomId('createTicket')
  .setLabel(lang.tickets.createTicketButton.label)
  .setStyle(lang.tickets.createTicketButton.style);

export default createTicket;