import { ButtonStyle, ColorResolvable } from 'discord.js';

export default {
  tickets: {
    title: 'Support Tickets',
    description: `
      > If you need any assistance click the button below!
      > Our staff team will be shortly with you!
    `,
    color: 'Red' as ColorResolvable,
    thumbnail: 'https://avatars.githubusercontent.com/u/115893913?s=280&v=4',
    footer: 'Nookure Studios © ' + new Date().getFullYear(),
    createTicketButton: {
      label: '📩 Create Ticket',
      style: ButtonStyle.Primary,
    },
  },
  suggestions: {
    title: 'Suggestions',
    description: `
      > If you have any suggestions click the button below!
      > Our staff team will be shortly with you!
    `,
    color: 'Green' as ColorResolvable,
    thumbnail: 'https://avatars.githubusercontent.com/u/115893913?s=280&v=4',
    footer: 'Nookure Studios © ' + new Date().getFullYear(),
    createSuggestionButton: {
      label: '📩 Create Suggestion',
      style: ButtonStyle.Primary,
    },
    createSuggestionModal: {
      title: 'Create Suggestion',
      description: 'Create a suggestion for the server',
      fields: {
        product: {
          id: 'product',
          label: 'Product',
          placeholder: 'Nookure Staff',
          default: '',
        },
        suggestion: {
          id: 'suggestion',
          label: 'Suggestion',
          placeholder: 'I would implement...',
          default: '',
        },
      },
      submitReply: 'Suggestion created!',
    },
    // Available placeholders: {user}, {user.displayName}, {user.mention}, {user.avatarUrl}, {user.tag}, {user.id}, {field.<name>}.
    suggestionEmbed: {
      title: 'New Suggestion from {user.displayName}',
      description: '',
      color: 'Green' as ColorResolvable,
      thumbnail: '{user.avatarUrl}',
      footer: 'Nookure Studios © ' + new Date().getFullYear(),
      fields: {
        product: {
          name: '**Product:**',
          value: '```{field.product}```',
          inline: false,
        },
        suggestion: {
          name: '**Suggestion:**',
          value: '```{field.suggestion}```',
          inline: false,
        },
      },
    },
  },
};
