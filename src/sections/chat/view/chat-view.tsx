import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _chatConversations } from 'src/_mock';

import { ChatNav } from '../chat-nav';
import { ChatRoom } from '../chat-room';
import { ChatMessageList } from '../chat-message-list';
import { ChatMessageInput } from '../chat-message-input';
import { ChatHeaderDetails } from '../chat-header-details';

// ----------------------------------------------------------------------

export function ChatView() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const [navCollapsed, setNavCollapsed] = useState(false);
  
  const [openDetails, setOpenDetails] = useState(true);

  const currentConversation = _chatConversations.find((conversation) => conversation.id === selectedConversationId);

  const handleToggleNav = useCallback(() => {
    setNavCollapsed((prev) => !prev);
  }, []);
  
  const handleToggleDetails = useCallback(() => {
    setOpenDetails((prev) => !prev);
  }, []);

  const handleCompose = useCallback(() => {
    setSelectedConversationId(null);
  }, []);

  const handleSelectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId);
  }, []);
  
  const participants = currentConversation 
      ? currentConversation.participants.filter((participant: any) => participant.id !== 'user-id-0') 
      : [];
  
  // For group chat, participants list is the actual participants minus me, but in mock they are already 'other' participants usually?
  // Let's stick to the logic used in header or consistent one.
  // In `ChatHeaderDetails` we filter 'user-id-0'.
  
  const displayParticipants = currentConversation?.type === 'GROUP' 
      ? currentConversation.participants 
      : participants.length > 0 ? participants : (currentConversation?.participants || []);

  return (
    <Container maxWidth={false} sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Chat
      </Typography>

      <Card sx={{ height: '72vh', display: 'flex', overflow: 'hidden' }}>
        <ChatNav
            conversations={_chatConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            onToggleNav={handleToggleNav}
            onClickCompose={handleCompose}
            collapsed={navCollapsed}
        />

        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          {currentConversation ? (
            <>
              <ChatHeaderDetails 
                  conversation={currentConversation} 
                  onToggleDetails={handleToggleDetails}
              />

              <ChatMessageList conversation={currentConversation} />

              <ChatMessageInput />
            </>
          ) : (
            <Stack flexGrow={1} alignItems="center" justifyContent="center" sx={{ bgcolor: 'background.default' }}>
               <Box component="img" src="/assets/icons/files/ic-chat-active.svg" sx={{ width: 120, height: 120, mb: 2, opacity: 0.24 }} />
               <Typography variant="h6" sx={{ color: 'text.secondary' }}>Select a conversation to start chatting</Typography>
            </Stack>
          )}
        </Stack>
        
        {currentConversation && openDetails && (
            <ChatRoom conversation={currentConversation} participants={displayParticipants} />
        )}
      </Card>
    </Container>
  );
}
