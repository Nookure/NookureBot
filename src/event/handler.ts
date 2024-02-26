import { Client } from 'discord.js';

interface Handler {
  register(client: Client): void;
}

export default Handler;
