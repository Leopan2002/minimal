import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type FeaturedCourse = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  students: number;
  price: number;
  category: string;
};

type Props = CardProps & {
  course: FeaturedCourse;
};

export function CourseFeaturedCard({ course, sx, ...other }: Props) {
  return (
    <Card
      sx={[
        {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z16,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component="img"
        src={course.thumbnail}
        alt={course.title}
        sx={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
        }}
      />

      <Stack spacing={2} sx={{ p: 2.5, flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={course.duration}
            size="small"
            sx={{
              bgcolor: 'background.neutral',
              fontSize: '0.75rem',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {course.students} students
          </Typography>
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{
            height: 44,
            overflow: 'hidden',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {course.title}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" component="span">
              {fCurrency(course.price)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {' / year'}
            </Typography>
          </Box>

          <Button variant="contained" size="small">
            Join
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
