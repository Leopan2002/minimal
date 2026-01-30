import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

import type { KanbanTask, KanbanColumn } from './types';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  task: KanbanTask | null;
  columns: KanbanColumn[];
  onClose: () => void;
  onUpdateTask: (taskId: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask: (taskId: string) => void;
  showConfirm: (title: string, message: string) => Promise<boolean>;
};

export function KanbanTaskDetails({ open, task, columns, onClose, onUpdateTask, onDeleteTask, showConfirm }: Props) {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  if (!task) return null;

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const subtaskProgress = task.subtasks.length > 0 
    ? (completedSubtasks / task.subtasks.length) * 100 
    : 0;

  const handleDelete = async () => {
    const confirmed = await showConfirm(
      'Delete Task',
      'Are you sure you want to delete this task?'
    );
    
    if (confirmed) {
      onDeleteTask(task.id);
      onClose();
    }
  };

  const handleStatusChange = (newStatus: string) => {
    onUpdateTask(task.id, { status: newStatus });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 480 } },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2.5, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}
      >
        <Typography variant="h6">{task.title}</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton 
            onClick={handleDelete} 
            color="error"
            title="Delete task"
          >
            <Iconify icon={"solar:trash-bin-trash-bold" as any} />
          </IconButton>
          <IconButton onClick={onClose}>
            <Iconify icon={"mingcute:close-line" as any} />
          </IconButton>
        </Stack>
      </Stack>

      <Tabs
        value={currentTab}
        onChange={(e, value) => setCurrentTab(value)}
        sx={{ px: 2.5, bgcolor: 'background.neutral' }}
      >
        <Tab label="Overview" value="overview" />
        <Tab label="Subtasks" value="subtasks" />
        <Tab label="Comments" value="comments" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {/* Overview Tab */}
        {currentTab === 'overview' && (
          <Stack spacing={3}>
            {task.cover && (
              <Box
                component="img"
                src={task.cover}
                alt={task.title}
                sx={{
                  width: '100%',
                  height: 200,
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />
            )}

            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                  Status
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  {columns.map((column) => (
                    <MenuItem key={column.id} value={column.id}>
                      {column.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                  Labels
                </Typography>
                <Stack direction="row" spacing={1}>
                  {task.labels.map((label) => (
                    <Chip key={label} label={label} size="small" color="primary" />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                  Due date
                </Typography>
                <Typography variant="body2">{task.dueDate}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                  Priority
                </Typography>
                <Chip
                  label={task.priority}
                  size="small"
                  color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'info'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {task.description}
                </Typography>
              </Box>

              {task.attachmentsCount > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Attachments ({task.attachmentsCount})
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {[...Array(task.attachmentsCount)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1.5,
                          bgcolor: 'background.neutral',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon={"solar:file-bold" as any} width={32} sx={{ color: 'text.disabled' }} />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Stack>
        )}

        {/* Subtasks Tab */}
        {currentTab === 'subtasks' && (
          <Stack spacing={3}>
            {task.subtasks.length > 0 && (
              <>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Progress
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {completedSubtasks}/{task.subtasks.length}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={subtaskProgress}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: 'background.neutral',
                    }}
                  />
                </Box>

                <Stack spacing={1}>
                  {task.subtasks.map((subtask) => (
                    <FormControlLabel
                      key={subtask.id}
                      control={<Checkbox checked={subtask.completed} />}
                      label={subtask.title}
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          textDecoration: subtask.completed ? 'line-through' : 'none',
                          color: subtask.completed ? 'text.disabled' : 'text.primary',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </>
            )}

            {task.subtasks.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
                No subtasks yet
              </Typography>
            )}
          </Stack>
        )}

        {/* Comments Tab */}
        {currentTab === 'comments' && (
          <Stack spacing={3}>
            {task.commentsCount > 0 ? (
              [...Array(task.commentsCount)].map((_, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  <Avatar src={task.assignees[index % task.assignees.length]?.avatar} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="subtitle2">
                        {task.assignees[index % task.assignees.length]?.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        2 hours ago
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      This is a sample comment for the task.
                    </Typography>
                  </Box>
                </Stack>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
                No comments yet
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
