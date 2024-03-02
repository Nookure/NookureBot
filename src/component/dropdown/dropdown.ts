import { StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';

interface Dropdown {
  customId: string;
  selectMenu: StringSelectMenuBuilder;
  execute: (interaction: StringSelectMenuInteraction) => Promise<void>;
}

export default Dropdown;