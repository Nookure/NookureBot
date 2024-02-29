export interface category {
  name: string;
  channelPrefix: string;
}

export default {
  categories: [
    {
      name: 'Pterodactyl',
      channelPrefix: '🐦-Pterodactyl-{username}',
    },
    {
      name: 'NookureStaff',
      channelPrefix: '🔧-NookureStaff-{username}',
    },
    {
      name: 'NookureChat',
      channelPrefix: '🗣️-NookureChat-{username}',
    },
    {
      name: 'Nookure Comissions',
      channelPrefix: '🌿-Comissions-{username}',
    },
  ] as category[],
};