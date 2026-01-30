import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type AboutCardProps = {
  bio: string;
  location: string;
  email: string;
  company: string;
  school: string;
};

export function UserProfileAbout({ bio, location, email, company, school }: AboutCardProps) {
  return (
    <Card>
      <CardHeader title="About" />

      <CardContent>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          {bio}
        </Typography>

        <Stack spacing={2}>
          {/* Location */}
          <Stack direction="row" spacing={2}>
            <Iconify icon={"mingcute:location-fill" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Typography variant="body2">
              Live at <strong>{location}</strong>
            </Typography>
          </Stack>

          {/* Email */}
          <Stack direction="row" spacing={2}>
            <Iconify icon={"mingcute:mail-fill" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Typography variant="body2">{email}</Typography>
          </Stack>

          {/* Company */}
          <Stack direction="row" spacing={2}>
            <Iconify icon={"mingcute:building-2-fill" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Typography variant="body2">
              CEO at <strong>{company}</strong>
            </Typography>
          </Stack>

          {/* Education */}
          <Stack direction="row" spacing={2}>
            <Iconify icon={"mingcute:trophy-fill" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Typography variant="body2">
              Studied at <strong>{school}</strong>
            </Typography>
          </Stack>
        </Stack>

        {/* Social Links */}
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ color: '#1877F2' }}>
            <Iconify icon={'mingcute:facebook-fill' as any} width={20} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#E02D69' }}>
            <Iconify icon={'mingcute:instagram-fill' as any} width={20} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#0A66C2' }}>
            <Iconify icon={'mingcute:linkedin-fill' as any} width={20} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#1DA1F2' }}>
            <Iconify icon={'mingcute:twitter-fill' as any} width={20} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
