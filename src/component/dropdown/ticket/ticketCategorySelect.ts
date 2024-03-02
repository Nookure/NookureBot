import { StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';
import Dropdown from '../dropdown';
import { createTicketModal } from '@/component/modal/ticket/createTicketModal';
import userSelections from '@/util/userSelections';
import tickets from '@/config/tickets';

export const CREATE_TICKET_DROPDOWN_CUSTOM_ID = 'ticketCategorySelect';
const ticketOptions = tickets.categories.map((ticket) => ({
  label: ticket.name,
  description: ticket.description,
  value: ticket.id,
  emoji: ticket.emoji,
}));

const ticketCategorySelect: Dropdown = {
  customId: CREATE_TICKET_DROPDOWN_CUSTOM_ID,
  selectMenu: new StringSelectMenuBuilder()
    .setCustomId(CREATE_TICKET_DROPDOWN_CUSTOM_ID)
    .setPlaceholder('Select a category')
    .addOptions(ticketOptions),
  execute: async (interaction: StringSelectMenuInteraction) => {
    const selectedValue = interaction.values[0];
    userSelections.set(interaction.user.id, selectedValue);
    await interaction.showModal(createTicketModal);
  },
};

export default ticketCategorySelect;