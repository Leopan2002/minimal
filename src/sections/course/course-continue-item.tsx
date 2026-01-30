import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

type Course = {
  id: string;
  title: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
};

type Props = StackProps & {
  course: Course;
};

export function CourseContinueItem({ course, sx, ...other }: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={[
        {
          p: 2,
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Avatar
        src={course.thumbnail}
        variant="rounded"
        sx={{
          width: 48,
          height: 48,
          bgcolor: 'primary.lighter',
        }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap sx={{ mb: 0.5 }}>
          {course.title}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
          {course.completedLessons}/{course.totalLessons} Lessons
        </Typography>

        <LinearProgress
          variant="determinate"
          value={course.progress}
          sx={{
            height: 6,
            bgcolor: 'background.neutral',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'primary.main',
              borderRadius: 1,
            },
          }}
        />
      </Box>
    </Stack>
  );
}
