import { ButtonBuilder, ButtonInteraction } from 'discord.js';

interface button {
  button: ButtonBuilder;
  execute: (interaction: ButtonInteraction) => void;
}

export default button;
