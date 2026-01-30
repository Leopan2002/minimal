import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

type Props = CardProps & {
  name: string;
  icon: string;
  usedSpace: number;
  totalSpace: number;
  color?: string;
};

export function FileStorageCard({
  name,
  icon,
  usedSpace,
  totalSpace,
  color = '#0061FF',
  sx,
  ...other
}: Props) {
  const percentage = (usedSpace / totalSpace) * 100;

  return (
    <Card
      sx={[
        {
          p: 3,
          boxShadow: 'none',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            component="img"
            src={icon}
            alt={name}
            sx={{ width: 40, height: 40 }}
          />
          
          {/* Three-dot menu icon placeholder */}
          <Box sx={{ width: 20, height: 20 }} />
        </Stack>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {name}
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {usedSpace.toFixed(2)} GB / {totalSpace.toFixed(2)} GB
          </Typography>

          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 6,
              bgcolor: 'background.neutral',
              '& .MuiLinearProgress-bar': {
                bgcolor: color,
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
}
