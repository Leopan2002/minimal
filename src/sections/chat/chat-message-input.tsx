import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ChatMessageInput() {
  return (
    <Box sx={{ p: 2, borderTop: (theme) => `solid 1px ${theme.palette.divider}` }}>
        <InputBase
            fullWidth
            placeholder="Type a message..."
            startAdornment={
               <IconButton>
                  <Iconify icon={"eva:attach-2-fill" as any} />
               </IconButton>
            }
            endAdornment={
                <Stack direction="row" spacing={0.5}>
                    <IconButton>
                        <Iconify icon={"solar:smile-circle-bold" as any} />
                    </IconButton>
                    <IconButton>
                        <Iconify icon={"solar:microphone-bold" as any} />
                    </IconButton>
                    <IconButton color="primary">
                        <Iconify icon={"solar:plain-bold-duotone" as any} />
                    </IconButton>
                </Stack>
            }
            sx={{
                pl: 1,
                height: 56,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
        />
    </Box>
  );
}
