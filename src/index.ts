import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import logger from './logger';
import MessageHandler from './events/onMessage';

const TOKEN = process.env.TOKEN as string;

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
  logger.info(`Logged in as ${readyClient.user?.tag}`);
});

new MessageHandler(client);

client.login(TOKEN);
