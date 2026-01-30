import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Category = {
  id: string;
  name: string;
  size: number;
  icon: string;
  color: string;
};

type Props = CardProps & {
  title?: string;
  categories: Category[];
  totalUsed: number;
  totalSpace: number;
};

export function FileCategories({
  title = 'Categories',
  categories,
  totalUsed,
  totalSpace,
  ...other
}: Props) {
  const percentage = ((totalUsed / totalSpace) * 100).toFixed(0);

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Circular Progress Section */}
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Box
            sx={{
              width: 160,
              height: 160,
              margin: '0 auto',
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
                border: (theme) => `8px solid ${theme.palette.grey[200]}`,
              }}
            />

            {/* Progress Circle */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '8px solid transparent',
                borderTopColor: 'primary.main',
                borderRightColor: 'primary.main',
                borderBottomColor: 'primary.main',
                transform: `rotate(${(totalUsed / totalSpace) * 360}deg)`,
                transition: 'transform 1s ease-in-out',
              }}
            />

            {/* Center Text */}
            <Box sx={{ textAlign: 'center', zIndex: 1 }}>
              <Typography variant="h4" sx={{ mb: 0.5, color: 'primary.main' }}>
                {percentage}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Used of {fData(totalSpace * 1024 * 1024 * 1024)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Categories List */}
        {categories.map((category) => (
          <Stack
            key={category.id}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Box
              component="img"
              src={category.icon}
              alt={category.name}
              sx={{ width: 40, height: 40 }}
            />

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {category.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {fData(category.size * 1024 * 1024 * 1024)}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: category.color,
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
