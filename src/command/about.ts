import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import command from './command';

const aboutCommand = new SlashCommandBuilder().setName('about').setDescription('About the bot');

export default {
  data: aboutCommand,
  execute: (interaction) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: 'About the bot',
        iconURL: interaction.user.displayAvatarURL(),
      })
      .addFields(
        {
          name: 'Description',
          value: 'This bot will help users to get help with common errors and questions about Nookure products.'
        },
        {
          name: 'Author',
          value: 'Angelillo15 + Github contributors',
        },
        {
          name: 'Source Code',
          value: 'https://github.com/Nookure/NookBot',
        }
      )
      .setColor('Red')
      .setTimestamp();

    interaction.reply( { embeds: [embed], ephemeral: true });
  },
} as command;
