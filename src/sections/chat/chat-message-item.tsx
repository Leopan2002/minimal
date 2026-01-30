import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  message: any;
  participants: any[];
};

export function ChatMessageItem({ message, participants }: Props) {
  const isMe = message.senderId === 'user-id-0'; // Mock current user check
  
  const sender = participants.find((p) => p.id === message.senderId);

  return (
    <Stack direction="row" justifyContent={isMe ? 'flex-end' : 'flex-start'} sx={{ mb: 3 }}>
        {!isMe && (
            <Avatar 
                alt={sender?.name} 
                src={sender?.avatarUrl} 
                sx={{ width: 32, height: 32, mr: 2 }} 
            />
        )}
        
        <Stack alignItems={isMe ? 'flex-end' : 'flex-start'}>
            <Box
                sx={{
                    p: 1.5,
                    minWidth: 48,
                    maxWidth: 320,
                    borderRadius: 1.5,
                    typography: 'body2',
                    bgcolor: isMe ? 'primary.main' : 'background.neutral',
                    color: isMe ? 'primary.contrastText' : 'text.primary',
                }}
            >
                {message.body}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5 }}>
                {fToNow(message.createdAt)}
            </Typography>
        </Stack>
    </Stack>
  );
}
