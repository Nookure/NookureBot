export interface category {
  id: string;
  name: string;
  description?: string;
  channelPrefix: string;
  emoji?: string;
}

export default {
  categories: [
    {
      id: 'pterodactyl',
      name: 'Pterodactyl',
      description: 'Pterodactyl related tickets',
      channelPrefix: '🐦-Pterodactyl-{username}',
      emoji: '🐦',
    },
    {
      id: 'nookurestaff',
      name: 'NookureStaff',
      description: 'Nookure Staff related tickets',
      channelPrefix: '🔧-NookureStaff-{username}',
      emoji: '🔧',
    },
    {
      id: 'nookurechat',
      name: 'NookureChat',
      description: 'Nookure Chat related tickets',
      channelPrefix: '🗣️-NookureChat-{username}',
      emoji: '🗣️',
    },
    {
      id: 'comissions',
      name: 'Nookure Comissions',
      description: 'Nookure Comissions related tickets',
      channelPrefix: '🌿-Comissions-{username}',
      emoji: '🌿',
    },
  ] as category[],
};