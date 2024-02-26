import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import logger from './logger';
import onMessage from './events/onMessage';

const TOKEN = process.env.TOKEN as string;

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
  logger.info(`Logged in as ${readyClient.user?.tag}`);
});

const registerEvents = (client: Client) => {
  [onMessage].forEach((event) => event.register(client));
};

registerEvents(client);

client.login(TOKEN);
