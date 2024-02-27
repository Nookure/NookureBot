import {
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import lang from '@/lang';
import { getComponent } from '@/components/get';

export const CREATE_TICKET = 'createTicket';

const commandData = new SlashCommandBuilder()
  .setName('ticketform')
  .setDescription('Create a ticket form')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const execute = async (interaction: CommandInteraction) => {
  const embed = new EmbedBuilder()
    .setTitle(lang.tickets.title)
    .setDescription(lang.tickets.description)
    .setColor(lang.tickets.color)
    .setThumbnail(lang.tickets.thumbnail)
    .setFooter({ text: lang.tickets.footer });

  const component = await getComponent('buttons', 'createTicket');
  if (!(component instanceof ButtonBuilder)) {
    throw new Error('Expected a ButtonBuilder');
  }

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(component);

  await interaction.reply({ embeds: [embed], components: [row] });
};

export default {
  data: commandData,
  execute,
};