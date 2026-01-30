import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

type Reminder = {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
};

type Props = CardProps & {
  title?: string;
  reminders: Reminder[];
};

export function CourseReminders({
  title = 'Reminders',
  reminders,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Stack spacing={2} sx={{ p: 3, pt: 0 }}>
        {reminders.map((reminder) => (
          <Stack key={reminder.id} spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.lighter',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
              </Avatar>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {reminder.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {reminder.dueDate}
                </Typography>
              </Box>

              <Chip
                label={`${reminder.progress}%`}
                size="small"
                sx={{
                  bgcolor: 'success.lighter',
                  color: 'success.dark',
                  fontWeight: 600,
                }}
              />
            </Stack>

            <LinearProgress
              variant="determinate"
              value={reminder.progress}
              sx={{
                height: 6,
                bgcolor: 'background.neutral',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'success.main',
                  borderRadius: 1,
                },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
