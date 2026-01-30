import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Country = {
  id: string;
  name: string;
  flag: string;
  percentage: number;
  installs: number;
  downloads: number;
  trend: 'up' | 'down';
};

type Props = CardProps & {
  title?: string;
  list: Country[];
};

export function AnalyticsCountries({ title = 'Top installed countries', list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ mb: 3 }} />

      <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
        {list.map((country) => (
          <Box key={country.id}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Box
                component="img"
                src={country.flag}
                alt={country.name}
                sx={{
                  width: 28,
                  height: 20,
                  borderRadius: 0.5,
                  objectFit: 'cover',
                }}
              />

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {country.name}
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 60 }}>
                {country.percentage}%
              </Typography>

              <Typography variant="caption" sx={{ color: 'text.disabled', minWidth: 60 }}>
                {fShortenNumber(country.installs)}
              </Typography>

              <Iconify
                icon={country.trend === 'up' ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                width={16}
                sx={{
                  color: country.trend === 'up' ? 'success.main' : 'error.main',
                  minWidth: 16,
                }}
              />
            </Stack>

            <LinearProgress
              variant="determinate"
              value={country.percentage}
              color={country.percentage > 10 ? 'primary' : 'inherit'}
              sx={{
                height: 6,
                bgcolor: 'background.neutral',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
