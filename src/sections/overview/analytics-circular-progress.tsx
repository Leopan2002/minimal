import type { CardProps } from '@mui/material/Card';
import type { PaletteColorKey } from 'src/theme/core';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  color?: PaletteColorKey;
  label?: string;
};

export function AnalyticsCircularProgress({
  title,
  total,
  percent,
  color = 'success',
  label,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const gradientColors: Record<string, string[]> = {
    success: ['#10B981', '#059669'],
    info: ['#06B6D4', '#0891B2'],
    primary: ['#3B82F6', '#2563EB'],
    secondary: ['#8B5CF6', '#7C3AED'],
    error: ['#EF4444', '#DC2626'],
    warning: ['#F59E0B', '#D97706'],
  };

  const selectedGradient = gradientColors[color] || gradientColors.primary;

  return (
    <Card
      sx={[
        {
          p: 3,
          boxShadow: 'none',
          color: 'common.white',
          backgroundImage: `linear-gradient(135deg, ${selectedGradient[0]} 0%, ${selectedGradient[1]} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h3" sx={{ mb: 0.5 }}>
            {fNumber(total)}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {label || title}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 80,
            height: 80,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background Circle */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: `6px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.24)}`,
            }}
          />

          {/* Progress Circle */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '6px solid transparent',
              borderTopColor: 'common.white',
              borderRightColor: 'common.white',
              transform: `rotate(${(percent / 100) * 360}deg)`,
              transition: 'transform 1s ease-in-out',
            }}
          />

          {/* Percentage Text */}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, zIndex: 1 }}>
            {percent}%
          </Typography>
        </Box>
      </Box>

      {/* Decorative Background */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.16)} 0%, transparent 70%)`,
        }}
      />
    </Card>
  );
}
