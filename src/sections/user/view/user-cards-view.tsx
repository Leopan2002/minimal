import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { _users } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function UserCardsView() {
  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Add user
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {_users.map((user) => (
          <Card key={user.id} sx={{ position: 'relative' }}>
            {/* Decorative background */}
            <Box
              sx={{
                height: 140,
                background: `linear-gradient(135deg, 
                  ${getGradientColors(user.id).start} 0%, 
                  ${getGradientColors(user.id).end} 100%)`,
                position: 'relative',
              }}
            />

            <CardContent
              sx={{
                pt: 7,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Avatar overlapping the background */}
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                sx={{
                  width: 80,
                  height: 80,
                  position: 'absolute',
                  top: -40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  border: (theme) => `4px solid ${theme.palette.background.paper}`,
                }}
              />

              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {user.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user.role}
              </Typography>

              {/* Social icons */}
              <Box sx={{ mb: 2, display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                <IconButton size="small" color="primary">
                  <Iconify icon={'mingcute:facebook-fill' as any} width={18} />
                </IconButton>
                <IconButton size="small" color="error">
                  <Iconify icon={'mingcute:instagram-fill' as any} width={18} />
                </IconButton>
                <IconButton size="small" color="info">
                  <Iconify icon={'mingcute:linkedin-fill' as any} width={18} />
                </IconButton>
                <IconButton size="small" color="default">
                  <Iconify icon={'mingcute:twitter-fill' as any} width={18} />
                </IconButton>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  borderTop: (theme) => `1px dashed ${theme.palette.divider}`,
                  pt: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{Math.floor(Math.random() * 10000)}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Follower
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{Math.floor(Math.random() * 5000)}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Following
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{Math.floor(Math.random() * 500)}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Post
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}


// ----------------------------------------------------------------------

// Helper function to generate gradient colors based on user ID
function getGradientColors(id: string) {
  const gradients = [
    { start: '#667eea', end: '#764ba2' },
    { start: '#f093fb', end: '#f5576c' },
    { start: '#4facfe', end: '#00f2fe' },
    { start: '#43e97b', end: '#38f9d7' },
    { start: '#fa709a', end: '#fee140' },
    { start: '#30cfd0', end: '#330867' },
    { start: '#a8edea', end: '#fed6e3' },
    { start: '#ff9a9e', end: '#fecfef' },
  ];
  
  // Use the last character of ID to pick a gradient
  const index = parseInt(id.slice(-1), 36) % gradients.length;
  return gradients[index];
}
