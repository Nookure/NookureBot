import { Client } from 'discord.js';

class Handler {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

export default Handler;
