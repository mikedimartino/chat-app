import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, names, animals, adjectives,  } from 'unique-names-generator';
import { Chat, User } from 'shared/types';

function generateRandomUser(): User {
  const name = uniqueNamesGenerator({
    dictionaries: [names, names],
    separator: ' ',
    length: 2,
  });
  return { id: uuidv4(), name }
}

function getRandomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1));
}

function generateRandomUsers(count: number): User[] {
  return [...Array(count)].map(() => generateRandomUser());
}

function generateChatTitle() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
  }).toLowerCase();
}

export function generateChat(): Chat {
  const participants = generateRandomUsers(getRandomInt(1, 6));
  const numMessages = getRandomInt(5, 30);
  const messages = [...Array(numMessages)].map(() => ({
    id: uuidv4(),
    author: participants[getRandomInt(0, participants.length - 1)],
    content: loremIpsum({
      count: getRandomInt(1, 3),
      units: 'sentences',
    }),
  }));

  return {
    id: uuidv4(),
    title: generateChatTitle(),
    messages,
  };
}

export function generateChats(count: number) {
  return [...Array(count)].map(() => generateChat());
}
