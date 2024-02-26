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
};
