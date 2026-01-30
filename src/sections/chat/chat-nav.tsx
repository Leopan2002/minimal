import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { ChatNavItem } from './chat-nav-item';

// ----------------------------------------------------------------------

type Props = {
  conversations: any[]; 
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onToggleNav: () => void;
  onClickCompose: () => void;
  collapsed: boolean;
};

export function ChatNav({ conversations, selectedConversationId, onSelectConversation, onToggleNav, onClickCompose, collapsed }: Props) {
  const theme = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = conversations.filter((conversation) => {
    // Basic search by participant name
    // For groups: check if any participant matches
    // For single: check if the other participant matches
    const participants = conversation.participants.filter((p: any) => p.id !== 'user-id-0');
    // Also include group name if exists, but we don't have explicit group name logic in mock yet other than joined names
    // Safe bet: JSON stringify or loop
    return participants.some((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const renderContent = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2.5, pb: 0 }}>
         {/* User Avatar - using static mock for now */}
         <Box sx={{ position: 'relative' }}>
            <Avatar src="/assets/images/avatar/avatar-25.webp" alt="My Profile" sx={{ width: 48, height: 48 }} />
            <Box
               sx={{
                  bottom: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: 'success.main',
                  border: (t) => `solid 2px ${t.palette.background.paper}`,
               }}
            />
         </Box>

         {!collapsed && (
             <>
                 <Box sx={{ flexGrow: 1 }} />

                 <IconButton onClick={onToggleNav}>
                    <Iconify icon={"eva:arrow-ios-back-fill" as any} />
                 </IconButton>
                 
                 <IconButton onClick={onClickCompose}>
                    <Iconify icon={"solar:user-plus-bold" as any} />
                 </IconButton>
             </>
         )}
      </Stack>

      <Box sx={{ p: 2.5 }}>
         {!collapsed && (
             <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts..."
                InputProps={{
                   startAdornment: (
                      <InputAdornment position="start">
                         <Iconify icon={"eva:search-fill" as any} sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                   ),
                }}
                sx={{
                   '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                   },
                }}
             />
         )}
         {collapsed && (
             <IconButton onClick={onToggleNav}>
                <Iconify icon={"eva:arrow-ios-forward-fill" as any} />
             </IconButton>
         )}
      </Box>

      <Scrollbar sx={{ p: 2.5 }}>
        {searchResults.map((conversation) => (
          <ChatNavItem
            key={conversation.id}
            conversation={conversation}
            selected={conversation.id === selectedConversationId}
            onSelect={() => onSelectConversation(conversation.id)}
            collapsed={collapsed}
          />
        ))}
      </Scrollbar>
    </>
  );

  return (
    <Stack
      sx={{
        width: collapsed ? 88 : 320,
        flexShrink: 0,
        borderRight: `solid 1px ${theme.palette.divider}`,
        transition: theme.transitions.create('width'),
      }}
    >
      {renderContent}
    </Stack>
  );
}
