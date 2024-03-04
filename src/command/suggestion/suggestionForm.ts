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
import createSuggestionButton from '@/component/button/suggestion/createSuggestionButton';

const command = new SlashCommandBuilder()
  .setName('suggestionform')
  .setDescription('Create a suggestion form')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const execute = async (interaction: CommandInteraction) => {
  const embed = new EmbedBuilder()
    .setTitle(lang.suggestions.title)
    .setDescription(lang.suggestions.description)
    .setColor(lang.suggestions.color)
    .setThumbnail(lang.suggestions.thumbnail)
    .setFooter({
      text: lang.suggestions.footer,
    });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(createSuggestionButton.button);

  interaction.channel?.send({ embeds: [embed], components: [row] });

  interaction.reply({ content: 'Suggestion form created', ephemeral: true });
};

export default {
  data: command,
  execute,
} as command;
