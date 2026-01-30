import Box from '@mui/material/Box';

import { Scrollbar } from 'src/components/scrollbar';

import { ChatMessageItem } from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  conversation: any;
};

export function ChatMessageList({ conversation }: Props) {
  return (
    <Scrollbar sx={{ p: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {conversation.messages.map((message: any) => (
          <ChatMessageItem 
            key={message.id} 
            message={message} 
            participants={conversation.participants}
          />
        ))}
      </Box>
    </Scrollbar>
  );
}
