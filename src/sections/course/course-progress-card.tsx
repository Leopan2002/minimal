import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { fPercent } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  progress: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export function CourseProgressCard({
  title,
  progress,
  color = 'primary',
  sx,
  ...other
}: Props) {

  return (
    <Card
      sx={[
        {
          p: 3,
          textAlign: 'center',
          boxShadow: 'none',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          thickness={4}
          sx={{ color: 'grey.300' }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          thickness={4}
          sx={{
            color: `${color}.main`,
            position: 'absolute',
            left: 0,
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" sx={{ color: `${color}.main` }}>
            {fPercent(progress)}
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" noWrap>
        {title}
      </Typography>
    </Card>
  );
}
