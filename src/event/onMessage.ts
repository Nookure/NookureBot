import { Attachment, Client, Events, Message } from 'discord.js';
import Handler from './handler';
import data from '@/data/data';
import { MessageAnalysis, MessageAnalysisType } from '@/data/types';
import logger from '@/logger';
import readText from '@/util/textFromImage';
import readFile from '@/util/textFromFile';

const handleMessage = (message: Message<boolean>) => {
  if (message.author.bot) return;
  message.attachments.forEach((attachment) => {
    if (attachment.contentType?.startsWith('image')) {
      logger.debug(`Image detected from ${message.author.tag}`);
      handleImage(message, attachment);
    }
    if (attachment.contentType?.startsWith('text/plain')) {
      logger.debug(`Plain text file detected from ${message.author.tag}`);
      handleFile(message, attachment);
    }
  });

  if (message.content) {
    handleText(message, message.content);
  }
};

const handleText = async (message: Message, input: string) => {
  data.forEach((data) => {
    if (data.type === MessageAnalysisType.Contains) {
      handleContains(message, input, data);
    } else if (data.type === MessageAnalysisType.Exact) {
      handleExact(message, input, data);
    }
  });
};

const handleContains = (message: Message<boolean>, input: string, data: MessageAnalysis) => {
  if (data.search instanceof Array) {
    data.search.some((search) => {
      let found = true;
      search.split(' ').forEach((word) => {
        if (!input.toLowerCase().includes(word.toLowerCase())) {
          found = false;
        }
      });

      if (found) {
        sendReply(message, data);
        return true;
      }
    });
  }

  if (typeof data.search === 'string') {
    let found = true;
    data.search.split(' ').forEach((word) => {
      if (!input.toLowerCase().includes(word.toLowerCase())) {
        found = false;
      }
    });

    if (found) sendReply(message, data);
  }
};

const handleExact = (message: Message<boolean>, input: string, data: MessageAnalysis) => {
  if (data.search instanceof Array) {
    data.search.some((search) => {
      if (input.toLowerCase() === search.toLowerCase()) {
        sendReply(message, data);
        return true;
      }
    });
  }

  if (typeof data.search === 'string') {
    if (input.toLowerCase() === data.search.toLowerCase()) {
      sendReply(message, data);
      return true;
    }
  }
};

const handleImage = async (message: Message<boolean>, attachment: Attachment) => {
  message.react('👀');
  readText(attachment.proxyURL)
    .then((text) => {
      handleText(message, text);
    })
    .catch((error) => {
      logger.error(error);
    });
};

const handleFile = async (message: Message<boolean>, attachment: Attachment) => {
  message.react('👀');
  readFile(attachment)
    .then((text) => {
      handleText(message, text);
    })
    .catch((error) => {
      logger.error(error);
    });
}

const sendReply = (message: Message<boolean>, data: MessageAnalysis) => {
  logger.debug(`Replying to ${message.author.tag} with ${data.reply}`);
  if (typeof data.reply === 'string') {
    message.reply(data.reply);
  } else {
    message.channel.send({ embeds: [data.reply] });
  }
};

export default {
  register(client: Client) {
    client.on(Events.MessageCreate, handleMessage);
  },
} as Handler;
