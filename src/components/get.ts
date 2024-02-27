import { ButtonBuilder, TextInputBuilder, ModalBuilder } from 'discord.js';
import ticketCreate from './buttons/tickets/create';
type Components = {
  buttons?: {
    [key: string]: ButtonBuilder;
  };
  inputs?: {
    [key: string]: TextInputBuilder;
  };
  modals?: {
    [key: string]: ModalBuilder;
  };
};

const components: Components = {
  buttons: {
    'createTicket': ticketCreate,
  },
};

export const getComponent = (type: 'buttons' | 'inputs' | 'modals', name: string): ButtonBuilder | TextInputBuilder | ModalBuilder | undefined => {
  const category = components[type];
  if (!category) {
    throw new Error(`Component category not found: ${type}`);
  }

  const component = category[name];
  if (!component) {
    throw new Error(`Component not found: ${type}/${name}`);
  }
  return component;
};