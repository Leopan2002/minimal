import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = CardProps & {
  userName?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function AnalyticsWelcomeBanner({
  userName = 'Jayden Frankie',
  subtitle = 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything',
  actionLabel = 'Go now',
  onAction,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={[
        {
          p: 5,
          boxShadow: 'none',
          position: 'relative',
          color: 'common.white',
          backgroundImage: `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`,
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 480,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          Welcome back 👋
          {'\n'}
          <Box component="span" sx={{ color: 'primary.main' }}>
            {userName}
          </Box>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </Typography>

        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            backgroundColor: 'success.main',
            backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.9)} 0%, ${theme.palette.success.dark} 100%)`,
            '&:hover': {
              backgroundColor: 'success.dark',
              backgroundImage: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
            },
          }}
        >
          {actionLabel}
        </Button>
      </Box>

      {/* Illustration */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: -32, sm: -16, md: 0 },
          bottom: { xs: -32, sm: -16, md: 0 },
          width: { xs: 280, sm: 320, md: 360 },
          height: { xs: 280, sm: 320, md: 360 },
          opacity: 0.9,
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          alt="welcome"
          src="/assets/illustrations/illustration-dashboard.svg"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Decorative Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
    </Card>
  );
}
