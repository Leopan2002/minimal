import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = {
  conversation: any;
  participants: any[];
};

export function ChatRoom({ conversation, participants }: Props) {
  const isGroup = conversation.type === 'GROUP';

  const renderGroup = (
    <Stack alignItems="center" sx={{ py: 5 }}>
        <AvatarGroup max={3} sx={{ mb: 2 }}>
            {participants.map((participant) => (
                <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} sx={{ width: 64, height: 64 }} />
            ))}
        </AvatarGroup>
      
        <Box sx={{ mb: 1, typography: 'subtitle1' }}>
            {participants.map((p) => p.name).join(', ')}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {participants.length} participants
        </Typography>
    </Stack>
  );

  const renderSingle = (
      <Stack alignItems="center" sx={{ py: 5 }}>
          <Avatar alt={participants[0].name} src={participants[0].avatarUrl} sx={{ width: 96, height: 96, mb: 2 }} />
          <Typography variant="subtitle1">{participants[0].name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{participants[0].role}</Typography>
      </Stack>
  );

  const renderContent = (
      <Stack sx={{ p: 2.5 }}>
         {/* Simple Accordions for Info */}
         <CollapseButton icon="solar:user-id-bold" title="Information" defaultOpen>
             <Stack spacing={2} sx={{ p: 2, typography: 'body2' }}>
                 <Stack direction="row">
                     <Iconify icon={"solar:phone-bold" as any} width={20} sx={{ mr: 1, color: 'text.disabled' }} />
                     {participants[0].phone}
                 </Stack>
                 <Stack direction="row">
                     <Iconify icon={"solar:letter-bold" as any} width={20} sx={{ mr: 1, color: 'text.disabled' }} />
                     {participants[0].email}
                 </Stack>
                  <Stack direction="row">
                     <Iconify icon={"solar:map-point-bold" as any} width={20} sx={{ mr: 1, color: 'text.disabled' }} />
                     {participants[0].address}
                 </Stack>
             </Stack>
         </CollapseButton>

         <CollapseButton icon="solar:gallery-wide-bold" title="Images">
             <Box sx={{ p:2, typography: 'caption', color: 'text.disabled' }}>No images shared</Box>
         </CollapseButton>

         <CollapseButton icon="solar:file-bold" title="Files">
             <Box sx={{ p:2, typography: 'caption', color: 'text.disabled' }}>No files shared</Box>
         </CollapseButton>
      </Stack>
  );

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Scrollbar>
        {isGroup ? renderGroup : renderSingle}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderContent}
      </Scrollbar>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CollapseButtonProps = {
    icon: string;
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

function CollapseButton({ icon, title, children, defaultOpen }: CollapseButtonProps) {
    const collapse = useBoolean(defaultOpen);

    return (
        <Stack spacing={0.5}>
            <ListItemButton onClick={collapse.onToggle} sx={{ borderRadius: 1, pl: 1, pr: 1, typography: 'subtitle2' }}>
                 <Iconify icon={icon as any} width={24} sx={{ mr: 1 }} /> 
                 <Box component="span" sx={{ flexGrow: 1 }}>{title}</Box>
                 <Iconify icon={collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} width={16} />
            </ListItemButton>
            <Collapse in={collapse.value}>
                {children}
            </Collapse>
        </Stack>
    );
}
