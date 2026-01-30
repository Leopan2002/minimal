import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  conversation: any;
  selected: boolean;
  onSelect: () => void;
  collapsed: boolean;
};

export function ChatNavItem({ conversation, selected, onSelect, collapsed }: Props) {
  const isGroup = conversation.type === 'GROUP';
  
  const otherParticipants = conversation.participants.filter((participant: any) => participant.id !== 'user-id-0'); // Assuming 'user-id-0' is current user
  
  const displayParticipant = otherParticipants[0] || conversation.participants[0]; 

  const lastMessage = conversation.messages[conversation.messages.length - 1];
  
  const isMe = lastMessage?.senderId === 'user-id-0';

  if (collapsed) {
      return (
        <ListItemButton
          disableGutters
          onClick={onSelect}
          sx={{
            py: 1,
            px: 0,
            justifyContent: 'center',
            ...(selected && {
              bgcolor: 'action.selected',
            }),
          }}
        >
             <Box sx={{ position: 'relative' }}>
                <Badge
                   color={displayParticipant.status === 'online' ? 'success' : displayParticipant.status === 'busy' ? 'error' : 'default'}
                   variant={displayParticipant.status === 'offline' ? undefined : 'dot'}
                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                   overlap="circular"
                   sx={{
                      '& .MuiBadge-badge': {
                         width: 10,
                         height: 10,
                         borderRadius: '50%',
                         border: (theme) => `solid 2px ${theme.palette.background.paper}`,
                         bgcolor: displayParticipant.status === 'busy' 
                            ? 'warning.main'
                            : displayParticipant.status === 'online' 
                               ? 'success.main' 
                               : 'text.disabled',
                      }
                   }}
                >
                    <Avatar alt={displayParticipant.name} src={displayParticipant.avatarUrl} sx={{ width: 40, height: 40 }} />
                </Badge>
             </Box>
        </ListItemButton>
      )
  }

  return (
    <ListItemButton
      disableGutters
      onClick={onSelect}
      sx={{
        py: 1,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Box sx={{ position: 'relative', mr: 2 }}>
         <Badge
            color={displayParticipant.status === 'online' ? 'success' : displayParticipant.status === 'busy' ? 'error' : 'default'}
            variant={displayParticipant.status === 'offline' ? undefined : 'dot'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            overlap="circular"
            sx={{
               '& .MuiBadge-badge': {
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  border: (theme) => `solid 2px ${theme.palette.background.paper}`,
                  bgcolor: displayParticipant.status === 'busy' 
                     ? 'warning.main' /* Orange clock lookalike color */
                     : displayParticipant.status === 'online' 
                        ? 'success.main' 
                        : 'text.disabled',
                   ...(displayParticipant.status === 'busy' && {
                      '&::before': { width: 2, height: 2, borderRadius: 1 },
                   })
               }
            }}
         >
             <Avatar alt={displayParticipant.name} src={displayParticipant.avatarUrl} sx={{ width: 48, height: 48 }} />
         </Badge>
      </Box>

      <Stack sx={{ width: 1 }}>
         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Box component="span" sx={{ typography: 'subtitle2' }}>{displayParticipant.name}</Box>
            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
               {lastMessage && fToNow(lastMessage.createdAt)}
            </Box>
         </Stack>
         
         <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box component="span" sx={{ typography: 'body2', color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
               {isMe ? `You: ${lastMessage?.body}` : lastMessage?.body}
            </Box>
            {conversation.unreadCount > 0 && (
               <Box
                  sx={{
                     width: 8,
                     height: 8,
                     bgcolor: 'info.main',
                     borderRadius: '50%',
                  }}
               />
            )}
         </Stack>
      </Stack>
    </ListItemButton>
  );
}
