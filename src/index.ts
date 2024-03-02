import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import logger from './logger';
import onMessage from './event/onMessage';
import commandHandler from './command/commandHandler';
import './database/connection';
import buttonHandler from './component/button/buttonHandler';
import { modalHandlerRegistry } from './component/modal/modalHandler';
import dropdownHandler from './component/dropdown/dropdownHandler';

logger.sponsor('Powered by Nookure');

const TOKEN = process.env.TOKEN as string;

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
  logger.info(`Logged in as ${readyClient.user?.tag}`);
});

const registerEvents = (client: Client) => {
  [onMessage, commandHandler, buttonHandler, dropdownHandler, modalHandlerRegistry].forEach((event) => event.register(client));
};

registerEvents(client);

client.login(TOKEN);
