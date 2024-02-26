import {
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import command from '../command';
import lang from '@/lang';

export const CREATE_TICKET = 'createTicket';

const command = new SlashCommandBuilder()
  .setName('ticketform')
  .setDescription('Create a ticket form')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const execute = async (interaction: CommandInteraction) => {
  const embed = new EmbedBuilder()
    .setTitle(lang.tickets.title)
    .setDescription(lang.tickets.description)
    .setColor(lang.tickets.color)
    .setThumbnail(lang.tickets.thumbnail)
    .setFooter({
      text: lang.tickets.footer,
    });

  const createTickketButton = new ButtonBuilder()
    .setCustomId(CREATE_TICKET)
    .setLabel(lang.tickets.createTicketButton.label)
    .setStyle(lang.tickets.createTicketButton.style);

  const row = new ActionRowBuilder().addComponents(createTickketButton);

  // @ts-expect-error - This is a valid method
  interaction.channel?.send({ embeds: [embed], components: [row] });

  interaction.reply({ content: 'Ticket form created', ephemeral: true });
};

export default {
  data: command,
  execute,
} as command;
