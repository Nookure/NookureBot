import { Client, ModalSubmitInteraction } from 'discord.js';
import logger from '@/logger';

interface ModalHandler {
  handleModalSubmit: (interaction: ModalSubmitInteraction) => Promise<void>;
}

class ModalHandlerRegistry {
  private modalHandlers = new Map<string, ModalHandler>();

  public registerModal(customId: string, handler: ModalHandler) {
    this.modalHandlers.set(customId, handler);
  }

  public async handleModalSubmit(interaction: ModalSubmitInteraction) {
    const handler = this.modalHandlers.get(interaction.customId);
    if (handler) {
      try {
        await handler.handleModalSubmit(interaction);
      } catch (error) {
        logger.error('Error handling modal submit:'+error);
        await interaction.reply({ content: 'Something went wrong. Try again later', ephemeral: true });
      }
    } else {
      logger.warning(`No handler registered for modal with customId: ${interaction.customId}`);
      await interaction.reply({ content: 'No handler found for this modal.', ephemeral: true });
    }
  }

  public register(client: Client) {
    client.on('interactionCreate', async (interaction) => {
      if (interaction.isModalSubmit()) {
        await this.handleModalSubmit(interaction);
      }
    });
  }
}

export const modalHandlerRegistry = new ModalHandlerRegistry();
