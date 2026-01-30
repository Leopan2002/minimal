import React, { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import {
  useSensor,
  DndContext,
  useSensors,
  DragOverlay,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DashboardContent } from 'src/layouts/dashboard';
import { _kanbanTasks, _kanbanColumns } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { KanbanColumn } from '../kanban-column';
import { KanbanTaskForm } from '../kanban-task-form';
import { KanbanTaskCard } from '../kanban-task-card';
import { KanbanTaskDetails } from '../kanban-task-details';
import { PromptDialog, ConfirmDialog } from '../kanban-dialogs';

import type { KanbanTask, KanbanColumn as KanbanColumnType } from '../types';

// ----------------------------------------------------------------------

export function KanbanView() {
  const [fixedColumn, setFixedColumn] = useState(false);
  const [columns, setColumns] = useState<KanbanColumnType[]>(_kanbanColumns);
  const [tasks, setTasks] = useState<KanbanTask[]>(_kanbanTasks as KanbanTask[]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskFormMode, setTaskFormMode] = useState<'create' | 'edit'>('create');
  const [selectedColumnForNewTask, setSelectedColumnForNewTask] = useState<string>('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Dialog states
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);
  const [promptDialogProps, setPromptDialogProps] = useState({
    title: '',
    message: '',
    defaultValue: '',
    onSubmit: (value: string | null) => {},
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Drag-and-drop state
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Horizontal scroll state
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStart, setScrollStart] = useState({ x: 0, scrollLeft: 0 });
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    })
  );

  const selectedTask: KanbanTask | null = selectedTaskId
    ? (tasks.find((task) => task.id === selectedTaskId) as KanbanTask) || null
    : null;

  // Helper to show custom prompt dialog
  const showPrompt = (title: string, message: string = '', defaultValue: string = '') => 
    new Promise<string | null>((resolve) => {
      setPromptDialogProps({
        title,
        message,
        defaultValue,
        onSubmit: (value) => {
          setPromptDialogOpen(false);
          resolve(value);
        },
      });
      setPromptDialogOpen(true);
    });

  // Helper to show custom confirm dialog
  const showConfirm = (title: string, message: string) =>
    new Promise<boolean>((resolve) => {
      setConfirmDialogProps({
        title,
        message,
        onConfirm: () => {
          setConfirmDialogOpen(false);
          resolve(true);
        },
      });
      setConfirmDialogOpen(true);
    });

  // Drag-and-drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Find column IDs
    const activeTask = tasks.find((t) => t.id === activeId);
    const activeColumn = activeTask?.status || '';
    
    // Check if overId is a column or a task
    const overTask = tasks.find((t) => t.id === overId);
    const overColumn = overTask?.status || overId;
    
    if (activeColumn === overColumn) return;
    
    // Move task to different column
    setColumns((prev) => prev.map((col) => {
      // Remove from old column
      if (col.id === activeColumn) {
        return { ...col, taskIds: col.taskIds.filter((id) => id !== activeId) };
      }
      // Add to new column
      if (col.id === overColumn) {
        const newTaskIds = [...col.taskIds];
        const overIndex = overTask ? newTaskIds.indexOf(overId) : newTaskIds.length;
        newTaskIds.splice(overIndex, 0, activeId);
        return { ...col, taskIds: newTaskIds };
      }
      return col;
    }));
    
    // Update task status
    setTasks((prev) => prev.map((task) =>
      task.id === activeId ? { ...task, status: overColumn } : task
    ));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveTaskId(null);
    
    if (!over || active.id === over.id) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);
    
    if (!activeTask) return;
    
    const activeColumn = activeTask.status;
    const overColumn = overTask?.status || overId;
    
    if (activeColumn === overColumn) {
      // Reorder tasks within the same column
      setColumns((prev) => prev.map((col) => {
        if (col.id === activeColumn) {
          const oldIndex = col.taskIds.indexOf(activeId);
          const newIndex = col.taskIds.indexOf(overId);
          return { ...col, taskIds: arrayMove(col.taskIds, oldIndex, newIndex) };
        }
        return col;
      }));
    }
  };

  // Horizontal scroll handlers
  const handleScrollMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Only start scrolling if clicking on the container itself, not on children
    if (e.target !== container) return;
    
    setIsScrolling(true);
    setScrollStart({
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    });
  };

  const handleScrollMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isScrolling) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - scrollStart.x) * 2; // Multiply by 2 for faster scrolling
    container.scrollLeft = scrollStart.scrollLeft - walk;
  };

  const handleScrollMouseUp = () => {
    setIsScrolling(false);
  };

  const handleScrollMouseLeave = () => {
    setIsScrolling(false);
  };

  const handleOpenTaskDetails = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseTaskDetails = () => {
    setSelectedTaskId(null);
  };

  // Task CRUD handlers
  const handleAddTask = (columnId: string) => {
    setSelectedColumnForNewTask(columnId);
    setTaskFormMode('create');
    setTaskFormOpen(true);
  };

  const handleCreateTask = (taskData: Partial<KanbanTask>) => {
    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: taskData.title || '',
      description: taskData.description || '',
      cover: taskData.cover || null,
      priority: taskData.priority || 'medium',
      status: taskData.status || selectedColumnForNewTask,
      assignees: [],
      commentsCount: 0,
      attachmentsCount: 0,
      labels: taskData.labels || [],
      dueDate: taskData.dueDate || '',
      subtasks: [],
    };

    setTasks((prev) => [...prev, newTask]);

    // Add task ID to column
    setColumns((prev) =>
      prev.map((col) =>
        col.id === newTask.status
          ? { ...col, taskIds: [...col.taskIds, newTask.id] }
          : col
      )
    );

    setSnackbarMessage('Task created successfully!');
  };

  const handleUpdateTask = (taskId: string, updates: Partial<KanbanTask>) => {
    const oldTask = tasks.find((t) => t.id === taskId);
    const newStatus = updates.status;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );

    // If status changed, move task between columns
    if (newStatus && oldTask && oldTask.status !== newStatus) {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === oldTask.status) {
            // Remove from old column
            return { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) };
          }
          if (col.id === newStatus) {
            // Add to new column
            return { ...col, taskIds: [...col.taskIds, taskId] };
          }
          return col;
        })
      );
    }

    setSnackbarMessage('Task updated successfully!');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => id !== taskId),
      }))
    );
    setSelectedTaskId(null);
    setSnackbarMessage('Task deleted successfully!');
  };

  // Column CRUD handlers
  const handleAddColumn = (name: string) => {
    const newColumn: KanbanColumnType = {
      id: `column-${Date.now()}`,
      name,
      taskIds: [],
    };
    setColumns((prev) => [...prev, newColumn]);
    setSnackbarMessage('Column created successfully!');
  };

  const handleRenameColumn = (columnId: string, newName: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, name: newName } : col))
    );
    setSnackbarMessage('Column renamed successfully!');
  };

  const handleDeleteColumn = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (column && column.taskIds.length > 0) {
      setSnackbarMessage('Cannot delete column with tasks!');
      return;
    }

    setColumns((prev) => prev.filter((col) => col.id !== columnId));
    setSnackbarMessage('Column deleted successfully!');
  };

  return (
    <DashboardContent sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Kanban</Typography>

        <FormControlLabel
          control={
            <Switch
              checked={fixedColumn}
              onChange={(e) => setFixedColumn(e.target.checked)}
            />
          }
          label="Fixed column"
        />
      </Stack>

      {/* Horizontal Scrollable Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box
          ref={scrollContainerRef}
          onMouseDown={handleScrollMouseDown}
          onMouseMove={handleScrollMouseMove}
          onMouseUp={handleScrollMouseUp}
          onMouseLeave={handleScrollMouseLeave}
          sx={{
            display: 'flex',
            gap: 3,
            overflow: 'auto',
            pb: 3,
            flexGrow: 1,
            cursor: isScrolling ? 'grabbing' : 'grab',
            userSelect: isScrolling ? 'none' : 'auto',
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'divider',
              borderRadius: 1,
            },
          }}
        >
          {columns.map((column) => {
            const columnTasks = column.taskIds
              .map((taskId) => tasks.find((task) => task.id === taskId))
              .filter((task) => task !== undefined) as KanbanTask[];

            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onOpenTaskDetails={handleOpenTaskDetails}
                onAddTask={() => handleAddTask(column.id)}
                onRenameColumn={handleRenameColumn}
                onDeleteColumn={handleDeleteColumn}
                showPrompt={showPrompt}
                showConfirm={showConfirm}
              />
            );
          })}

          {/* Add Column Button */}
          <Box
            sx={{
              width: 310,
              flexShrink: 0,
            }}
          >
            <Button
              fullWidth
              startIcon={<Iconify icon={"mingcute:add-line" as any} />}
              onClick={async () => {
                const name = await showPrompt('Add Column', 'Enter column name:');
                if (name?.trim()) {
                  handleAddColumn(name.trim());
                }
              }}
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
              Add column
            </Button>
          </Box>
        </Box>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTaskId ? (
            <KanbanTaskCard
              task={tasks.find((t) => t.id === activeTaskId)!}
              onOpenDetails={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Details Drawer */}
      <KanbanTaskDetails
        open={!!selectedTaskId}
        task={selectedTask}
        columns={columns}
        onClose={handleCloseTaskDetails}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        showConfirm={showConfirm}
      />

      {/* Task Form Dialog */}
      <KanbanTaskForm
        open={taskFormOpen}
        mode={taskFormMode}
        task={taskFormMode === 'edit' ? selectedTask : null}
        columns={columns}
        defaultColumnId={selectedColumnForNewTask}
        onTaskSubmit={(updates) => {
          if (taskFormMode === 'create') {
            handleCreateTask(updates);
          } else if (selectedTask) {
            handleUpdateTask(selectedTask.id, updates);
          }
        }}
        onClose={() => setTaskFormOpen(false)}
      />

      {/* Snackbar for feedback */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />

      {/* Custom Dialogs */}
      <PromptDialog
        open={promptDialogOpen}
        title={promptDialogProps.title}
        message={promptDialogProps.message}
        defaultValue={promptDialogProps.defaultValue}
        onClose={(value) => {
          promptDialogProps.onSubmit(value);
        }}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        title={confirmDialogProps.title}
        message={confirmDialogProps.message}
        onClose={(confirmed) => {
          if (confirmed) {
            confirmDialogProps.onConfirm();
          } else {
            setConfirmDialogOpen(false);
          }
        }}
      />
    </DashboardContent>
  );
}
