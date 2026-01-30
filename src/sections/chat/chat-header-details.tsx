import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AvatarGroup from '@mui/material/AvatarGroup';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  conversation: any;
  onToggleDetails: () => void;
};

export function ChatHeaderDetails({ conversation, onToggleDetails }: Props) {
  const isGroup = conversation.type === 'GROUP';
  const otherParticipants = conversation.participants.filter((participant: any) => participant.id !== 'user-id-0');
  const displayParticipant = otherParticipants[0];

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 2.5,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      {isGroup ? (
          <AvatarGroup max={3}>
              {conversation.participants.map((participant: any) => (
                  <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
              ))}
          </AvatarGroup>
      ) : (
         <Avatar alt={displayParticipant.name} src={displayParticipant.avatarUrl} sx={{ mr: 2 }} />
      )}

      <Box sx={{ flexGrow: 1, ml: isGroup ? 2 : 0 }}>
        <Typography variant="subtitle2">
            {isGroup ? conversation.participants.map((p: any) => p.name).join(', ') : displayParticipant.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isGroup ? `${conversation.participants.length} participants` : (displayParticipant.status === 'online' ? 'Online' : 'Offline')}
        </Typography>
      </Box>

      <Stack direction="row">
        <IconButton>
          <Iconify icon={"solar:phone-bold" as any} />
        </IconButton>
        <IconButton>
          <Iconify icon={"solar:videocamera-record-bold" as any} />
        </IconButton>
        <IconButton onClick={onToggleDetails}>
          <Iconify icon={"solar:sidebar-minimalistic-bold" as any} />
        </IconButton>
        <IconButton>
          <Iconify icon={"solar:menu-dots-bold" as any} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
