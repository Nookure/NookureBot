import { Collection, Interaction, StringSelectMenuInteraction } from 'discord.js';
import Handler from '@/event/handler';
import logger from '@/logger';
import Dropdown from './dropdown';
import ticketCategorySelect from './ticket/ticketCategorySelect';

const dropdowns = new Collection<string, Dropdown>();

export const registerDropdown = (dropdown: Dropdown) => {
  dropdowns.set(dropdown.customId, dropdown);
};

export const handleDropdown = async (interaction: Interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  const dropdown = dropdowns.get(interaction.customId);

  if (!dropdown) {
    logger.error(`Dropdown with customId ${interaction.customId} not found.`);
    return;
  }

  try {
    await dropdown.execute(interaction as StringSelectMenuInteraction);
  } catch (error) {
    logger.error(`Error while executing dropdown ${interaction.customId}: ${error}`);
    if (interaction.isRepliable()) {
      await interaction.reply({ content: 'There was an error while executing this dropdown!', ephemeral: true });
    }
  }
};

const DropdownHandler: Handler = {
  register(client) {
    client.on('interactionCreate', handleDropdown);
  },
};

export default DropdownHandler;

registerDropdown(ticketCategorySelect);