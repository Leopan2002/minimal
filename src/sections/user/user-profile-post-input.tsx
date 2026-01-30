import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PostInputProps = {
  avatarUrl: string;
};

export function UserProfilePostInput({ avatarUrl }: PostInputProps) {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar src={avatarUrl} sx={{ width: 48, height: 48 }} />

        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Share what you are thinking here..."
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'divider',
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <IconButton size="small">
          <Iconify icon={"solar:gallery-add-bold" as any} width={24} />
        </IconButton>
        <IconButton size="small">
          <Iconify icon={"solar:videocamera-record-bold" as any} width={24} />
        </IconButton>
      </Box>
    </Card>
  );
}
