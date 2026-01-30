import type { CardProps } from '@mui/material/Card';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';

import { Iconify } from 'src/components/iconify';

import type { KanbanTask } from './types';

// ----------------------------------------------------------------------

type Props = CardProps & {
  task: KanbanTask;
  onOpenDetails: () => void;
};

const PRIORITY_COLORS = {
  low: 'info',
  medium: 'warning',
  high: 'error',
} as const;

export function KanbanTaskCard({ task, onOpenDetails, sx, ...other }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onOpenDetails}
      sx={[
        {
          p: 2,
          cursor: isDragging ? 'grabbing' : 'grab',
          boxShadow: 'none',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          opacity: isDragging ? 0.5 : 1,
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z8,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Stack spacing={2}>
        {task.cover && (
          <Box
            component="img"
            src={task.cover}
            alt={task.title}
            sx={{
              width: '100%',
              height: 160,
              borderRadius: 1.5,
              objectFit: 'cover',
            }}
          />
        )}

        <Typography variant="subtitle2">{task.title}</Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          {task.priority && (
            <Chip
              label={task.priority}
              size="small"
              color={PRIORITY_COLORS[task.priority]}
              sx={{
                height: 20,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
              }}
            />
          )}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            {task.commentsCount > 0 && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Iconify
                  icon={"solar:chat-round-dots-bold" as any}
                  width={16}
                  sx={{ color: 'text.disabled' }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {task.commentsCount}
                </Typography>
              </Stack>
            )}

            {task.attachmentsCount > 0 && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Iconify
                  icon={"solar:paperclip-bold" as any}
                  width={16}
                  sx={{ color: 'text.disabled' }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {task.attachmentsCount}
                </Typography>
              </Stack>
            )}
          </Stack>

          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
            {task.assignees.map((assignee) => (
              <Avatar
                key={assignee.id}
                alt={assignee.name}
                src={assignee.avatar}
                sx={{ width: 24, height: 24 }}
              />
            ))}
          </AvatarGroup>
        </Stack>
      </Stack>
    </Card>
  );
}
