
import {
  _id,
  _times,
  _fullName,
} from './_mock';

// ----------------------------------------------------------------------

export const CHART_HEIGHT = 200;

export const _chatContacts = [...Array(20)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  username: _fullName(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`, 
  address: '19034 Verna Unions Apt. 164 - Honolulu, HI / 81740',
  phone: '365-374-4961', 
  email: 'nannie_abernathy70@yahoo.com', 
  lastActivity: _times(index),
  status: (index % 2 && 'online') || (index % 3 && 'offline') || (index % 4 && 'alway') || 'busy',
  role: 'Front End Developer', 
}));

const _messages = [
  'The waves crashed against the shore, creating a soothing melody.',
  'The scent of blooming flowers filled the spring air.',
  'She gazed up at the night sky, mesmerized by the twinkling stars.',
  'The concert was a mesmerizing experience.',
  'The delicate butterfly landed on the vibrant flower.',
  'Sent a photo',
  'Just talking about the things that are interesting at the moment.',
  'Great! What about you?',
  'I am good.',
];

export const _chatConversations = Array.from({ length: 12 }, (_, index) => {
  const contact = _chatContacts[index];
  const isGroup = index % 3 === 0 && index !== 0;
  
  const participants = isGroup 
    ? [contact, _chatContacts[(index + 1) % 20], _chatContacts[(index + 2) % 20]] 
    : [contact];

  const messagesCount = Math.floor(Math.random() * 5) + 5; 
  
  const messages = Array.from({ length: messagesCount }, (_, msgIndex) => {
    const isMe = msgIndex % 2 === 0;
    const senderId = isMe ? 'user-id-0' : participants[msgIndex % participants.length].id;
    
    return {
      id: _id((index * 100) + msgIndex), 
      body: _messages[(index + msgIndex) % _messages.length],
      contentType: 'text',
      attachments: [],
      createdAt: new Date(Date.now() - ((messagesCount - msgIndex) * 15 * 60 * 1000)), 
      senderId,
    };
  });

  return {
    id: _id(index),
    participants,
    type: isGroup ? 'GROUP' : 'ONE_TO_ONE',
    unreadCount: index % 4 === 0 ? 0 : Math.floor(Math.random() * 5),
    messages,
  };
});
