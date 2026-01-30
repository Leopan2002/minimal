import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProfileCoverProps = {
  name: string;
  role: string;
  avatarUrl: string;
  coverUrl: string;
};

export function UserProfileCover({ name, role, avatarUrl, coverUrl }: ProfileCoverProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 280, md: 320 },
        mb: 3,
      }}
    >
      {/* Cover Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: { xs: 200, md: 240 },
          backgroundImage: `url(${coverUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
            borderRadius: 2,
          },
        }}
      />

      {/* Profile Info */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: { xs: 24, md: 32 },
          right: { xs: 24, md: 32 },
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
        }}
      >
        {/* Avatar */}
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            width: { xs: 96, md: 128 },
            height: { xs: 96, md: 128 },
            border: (theme) => `4px solid ${theme.palette.background.paper}`,
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        />

        {/* Name and Role */}
        <Box sx={{ pb: 1, flexGrow: 1 }}>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ pb: 1, display: 'flex', gap: 1 }}>
          <IconButton
            sx={{
              bgcolor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={"solar:user-plus-bold" as any} width={20} />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={"solar:chat-round-dots-bold" as any} width={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
