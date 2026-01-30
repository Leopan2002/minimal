import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fShortenNumber } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PlatformStat = {
  platform: 'windows' | 'mac' | 'ios' | 'android';
  percentage: number;
};

type Application = {
  id: string;
  name: string;
  icon: string;
  price: 'free' | number;
  totalDownloads: number;
  platforms: PlatformStat[];
};

type Props = CardProps & {
  title?: string;
  list: Application[];
};

export function AnalyticsRelatedApps({ title = 'Related applications', list, ...other }: Props) {
  const getPlatformIcon = (platform: string) => {
    const icons = {
      windows: 'logos:microsoft-windows',
      mac: 'logos:apple',
      ios: 'logos:apple',
      android: 'logos:android-icon',
    };
    return icons[platform as keyof typeof icons] || 'eva:smartphone-outline';
  };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        sx={{ mb: 2 }}
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer' }}>
              Top 7 days
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', cursor: 'pointer' }}>
              Top 30 days
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', cursor: 'pointer' }}>
              All times
            </Typography>
          </Box>
        }
      />

      <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
        {list.map((app, index) => (
          <Box key={app.id}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={app.icon}
                variant="rounded"
                sx={{ width: 48, height: 48, bgcolor: 'background.neutral' }}
              >
                {app.name.charAt(0)}
              </Avatar>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle2" noWrap>
                    {app.name}
                  </Typography>
                  {app.price === 'free' && (
                    <Label color="success" variant="soft" sx={{ textTransform: 'capitalize' }}>
                      Free
                    </Label>
                  )}
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  {app.platforms.map((platform) => (
                    <Stack
                      key={platform.platform}
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                    >
                      <Iconify
                        icon={getPlatformIcon(platform.platform) as any}
                        width={16}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {platform.percentage}%
                      </Typography>
                    </Stack>
                  ))}
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {fShortenNumber(app.totalDownloads)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {index < list.length - 1 && <Divider sx={{ mt: 3, borderStyle: 'dashed' }} />}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
