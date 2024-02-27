import Handler from '@/event/handler';
import { CacheType, Collection, Events, Interaction } from 'discord.js';
import button from './button';
import logger from '@/logger';
import createTicketButton, { CREATE_TICKET } from './ticket/createTicketButton';

const buttons = new Collection<string, button>();

export const registerButton = (button: button, customId: string) => {
  buttons.set(customId, button);
};

registerButton(createTicketButton, CREATE_TICKET);

const handleButton = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isButton()) return;

  const button = buttons.get(interaction.customId);

  if (!button) return;

  try {
    await button.execute(interaction);
  } catch (error) {
    logger.error(`Error while executing button ${interaction.customId}: ${error}`);
    interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
  }
};

export default {
  register(client) {
    client.on(Events.InteractionCreate, handleButton);
  },
} as Handler;
