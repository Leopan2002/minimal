import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// import { bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  img?: React.ReactNode;
};

export function AppWelcome({ title, description, action, img, sx, ...other }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.lighter} 0%, ${theme.vars.palette.primary.light} 100%)`,
        p: { xs: 3, md: 5 },
        borderRadius: 2,
        position: 'relative',
        color: 'primary.darker',
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            mb: { xs: 3, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ maxWidth: 360, mb: { xs: 3, md: 0 } }}>
            {description}
          </Typography>

          {action && action}
        </Box>

        {img && (
            <Box sx={{ maxWidth: 360 }}>
                {img}
            </Box>
        )}

      </Box>
    </Box>
  );
}
