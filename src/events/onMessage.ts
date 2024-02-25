import { Client, Events, Message } from 'discord.js';
import Handler from './handler';
import data from '@/data/data';
import { MessageAnalysis, MessageAnalysisType } from '@/data/types';
import logger from '@/logger';

class MessageHandler extends Handler {
  constructor(client: Client) {
    super(client);
    client.on(Events.MessageCreate, handleMessage);
  }
}

const handleMessage = (message: Message<boolean>) => {
  if (message.author.bot) return;
  data.forEach((data) => {
    if (data.type === MessageAnalysisType.Contains) {
      handleContains(message, data);
    } else if (data.type === MessageAnalysisType.Exact) {
      handleExact(message, data);
    }
  });
};

const handleContains = (message: Message<boolean>, data: MessageAnalysis) => {
  if (data.search instanceof Array) {
    data.search.forEach((search) => {
      let found = true;
      search.split(' ').forEach((word) => {
        if (!message.content.toLowerCase().includes(word.toLowerCase())) {
          found = false;
        }
      });

      if (found) {
        sendReply(message, data);
        return;
      }
    });
  }

  if (typeof data.search === 'string') {
    let found = true;
    data.search.split(' ').forEach((word) => {
      if (!message.content.toLowerCase().includes(word.toLowerCase())) {
        found = false;
      }
    });

    if (found) sendReply(message, data);
  }
};


const handleExact = (message: Message<boolean>, data: MessageAnalysis) => {
  if (data.search instanceof Array) {
    data.search.forEach((search) => {
      if (message.content.toLowerCase() === search.toLowerCase()) {
        sendReply(message, data);
      }
    });
  }

  if (typeof data.search === 'string') {
    if (message.content.toLowerCase() === data.search.toLowerCase()) {
      sendReply(message, data);
    }
  }
};

const sendReply = (message: Message<boolean>, data: MessageAnalysis) => {
  logger.debug(`Replying to ${message.author.tag} with ${data.reply}`);
  if (typeof data.reply === 'string') {
    message.reply(data.reply);
  } else {
    message.channel.send({ embeds: [data.reply] });
  }
};

export default MessageHandler;
