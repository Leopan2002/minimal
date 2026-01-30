import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps;

export function FileUploadBox({ sx, ...other }: Props) {
  return (
    <Card
      sx={[
        {
          p: 5,
          boxShadow: 'none',
          textAlign: 'center',
          border: (theme) => `dashed 1.5px ${alpha(theme.palette.grey[500], 0.32)}`,
          bgcolor: 'background.neutral',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'primary.main',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Iconify
            icon={"eva:cloud-upload-fill" as any}
            width={32}
            sx={{ color: 'primary.main' }}
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Drop or Select file
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop files here or click to browse
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
