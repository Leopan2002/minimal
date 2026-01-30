import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Author = {
  id: string;
  name: string;
  avatar: string;
  favorites: number;
  rank: number;
};

type Props = CardProps & {
  title?: string;
  list: Author[];
};

export function AnalyticsTopAuthors({ title = 'Top authors', list, ...other }: Props) {
  const getRankBadge = (rank: number) => {
    const badges = {
      1: { icon: 'solar:cup-star-bold', color: 'warning.main' },
      2: { icon: 'solar:cup-star-bold', color: 'info.main' },
      3: { icon: 'solar:cup-star-bold', color: 'error.light' },
    };
    return badges[rank as keyof typeof badges];
  };

  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ mb: 2 }} />

      <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
        {list.map((author, index) => (
          <Box key={author.id}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={author.avatar}
                alt={author.name}
                sx={{
                  width: 48,
                  height: 48,
                }}
              />

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {author.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {author.favorites.toLocaleString()} Favorite
                </Typography>
              </Box>

              {getRankBadge(author.rank) && (
                <Iconify
                  icon={getRankBadge(author.rank).icon as any}
                  width={24}
                  sx={{ color: getRankBadge(author.rank).color }}
                />
              )}
            </Stack>

            {index < list.length - 1 && <Divider sx={{ mt: 3, borderStyle: 'dashed' }} />}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
