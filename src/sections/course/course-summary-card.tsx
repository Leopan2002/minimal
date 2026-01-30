import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
};

export function CourseSummaryCard({
  title,
  value,
  icon,
  color = 'primary',
  sx,
  ...other
}: Props) {
  return (
    <Card
      sx={[
        {
          p: 2.5,
          position: 'relative',
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* Floating Icon Circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -45,
          right: -128,
          width: 180,
          height: 180,
          transform: 'rotate(42deg)',
          borderRadius: '30px',
          bgcolor: `${color}.lighter`,
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'start',
          color: `${color}.main`,
          '& > svg': {
            width: 28,
            height: 28,
          },
        }}
      >
        {icon}
      </Box>

      {/* Content */}
      <Box>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {fShortenNumber(value)}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}