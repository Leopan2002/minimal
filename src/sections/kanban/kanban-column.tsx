import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { KanbanTaskCard } from './kanban-task-card';

import type { KanbanTask, KanbanColumn as KanbanColumnType } from './types';


// ----------------------------------------------------------------------

type Props = BoxProps & {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  onOpenTaskDetails: (taskId: string) => void;
  onAddTask: () => void;
  onRenameColumn: (columnId: string, newName: string) => void;
  onDeleteColumn: (columnId: string) => void;
  showPrompt: (title: string, message?: string, defaultValue?: string) => Promise<string | null>;
  showConfirm: (title: string, message: string) => Promise<boolean>;
};

export function KanbanColumn({ 
  column, 
  tasks, 
  onOpenTaskDetails, 
  onAddTask,
  onRenameColumn,
  onDeleteColumn,
  showPrompt,
  showConfirm,
  sx, 
  ...other 
}: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleRename = async () => {
    handleCloseMenu();
    const newName = await showPrompt('Rename Column', 'Enter new column name:', column.name);
    if (newName?.trim() && newName !== column.name) {
      onRenameColumn(column.id, newName.trim());
    }
  };

  const handleDelete = async () => {
    handleCloseMenu();
    
    if (tasks.length > 0) {
      await showConfirm('Cannot Delete Column', 'Please move or delete all tasks before deleting this column.');
      return;
    }

    const confirmed = await showConfirm(
      'Delete Column',
      `Are you sure you want to delete "${column.name}" column?`
    );
    
    if (confirmed) {
      onDeleteColumn(column.id);
    }
  };

  return (
    <Box
      sx={[
        {
          width: 310,
          flexShrink: 0,
          height: 'fit-content',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Stack spacing={2}>
        {/* Column Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'text.primary',
              }}
            />
            <Typography variant="subtitle2">{column.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {tasks.length}
            </Typography>
          </Stack>

          <IconButton size="small" onClick={handleOpenMenu}>
            <Iconify icon={"eva:more-horizontal-fill" as any} width={20} />
          </IconButton>
        </Stack>

        {/* Task Cards */}
        <SortableContext 
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack ref={setNodeRef} spacing={2}>
            {tasks.map((task) => (
              <KanbanTaskCard
                key={task.id}
                task={task}
                onOpenDetails={() => onOpenTaskDetails(task.id)}
              />
            ))}

            {/* Add Card Button */}
            <Button
              fullWidth
              startIcon={<Iconify icon={"mingcute:add-line" as any} />}
              onClick={onAddTask}
              sx={{
                py: 1.5,
                borderStyle: 'dashed',
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              Add card
            </Button>
          </Stack>
        </SortableContext>
      </Stack>

      {/* Column Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleRename}>
          <Iconify icon={"solar:pen-bold" as any} sx={{ mr: 1 }} />
          Rename
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={"solar:trash-bin-trash-bold" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
