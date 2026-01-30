import type { DialogProps } from '@mui/material/Dialog';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import type { KanbanTask, KanbanColumn } from './types';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  mode: 'create' | 'edit';
  task?: KanbanTask | null;
  columns: KanbanColumn[];
  defaultColumnId?: string;
  onTaskSubmit: (taskData: Partial<KanbanTask>) => void;
  onClose: () => void;
};

export function KanbanTaskForm({ 
  mode, 
  task, 
  columns, 
  defaultColumnId,
  onTaskSubmit, 
  onClose,
  open,
  ...other 
}: Props) {
  const [formData, setFormData] = useState<Partial<KanbanTask>>({
    title: '',
    description: '',
    priority: 'medium',
    status: defaultColumnId || columns[0]?.id || '',
    labels: [],
    dueDate: '',
    cover: null,
  });

  const [newLabel, setNewLabel] = useState('');

  // Reset form when dialog opens or props change
  useEffect(() => {
    if (open) {
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'medium',
        status: task?.status || defaultColumnId || columns[0]?.id || '',
        labels: task?.labels || [],
        dueDate: task?.dueDate || '',
        cover: task?.cover || null,
      });
      setNewLabel('');
    }
  }, [open, task, defaultColumnId, columns]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddLabel = () => {
    if (newLabel.trim()) {
      handleChange('labels', [...(formData.labels || []), newLabel.trim()]);
      setNewLabel('');
    }
  };

  const handleDeleteLabel = (labelToDelete: string) => {
    handleChange('labels', formData.labels?.filter((label) => label !== labelToDelete) || []);
  };

  const handleSubmit = () => {
    if (!formData.title?.trim()) return;
    
    onTaskSubmit(formData);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose} {...other}>
      <DialogTitle>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            select
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Status / Column"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            {columns.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.name}
              </MenuItem>
            ))}
          </TextField>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Labels
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
              {formData.labels?.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  onDelete={() => handleDeleteLabel(label)}
                />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="Add label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLabel();
                  }
                }}
              />
              <Button onClick={handleAddLabel} variant="outlined" size="small">
                Add
              </Button>
            </Stack>
          </Box>

          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Cover Image URL"
            value={formData.cover || ''}
            onChange={(e) => handleChange('cover', e.target.value || null)}
            placeholder="https://example.com/image.jpg"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.title?.trim()}
        >
          {mode === 'create' ? 'Create Task' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
