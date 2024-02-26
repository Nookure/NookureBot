import Handler from '@/event/handler';
import { CacheType, Collection, Events, Interaction, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import command from '@/command/command';
import about from './about';
import logger from '@/logger';

const commands = new Collection<string, command>();

const registerCommand = (command: command) => {
  commands.set(command.data.name, command);
};

registerCommand(about);

const handleCommand = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.error(`Command ${interaction.commandName} not found`);
  }

  try {
    await command?.execute(interaction);
  } catch (error) {
    logger.error(`Error while executing command ${interaction.commandName}: ${error}`);
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
};

export default {
  register(client) {
    client.on(Events.InteractionCreate, handleCommand);
    const rest = new REST().setToken(process.env.TOKEN as string);
    const commandsData = [] as RESTPostAPIChatInputApplicationCommandsJSONBody[];

    commands.forEach((command) => {
      commandsData.push(command.data.toJSON());
    });

    rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
      { body: commandsData }
    );
  },
} as Handler;
