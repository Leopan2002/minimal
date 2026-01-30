import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const QUICK_LINKS = [
  { title: 'Dashboard', path: '/', category: 'Overview' },
  { title: 'User - List', path: '/user/list', category: 'Management' },
  { title: 'User - Cards', path: '/user/cards', category: 'Management' },
  { title: 'User - Profile', path: '/user/profile', category: 'Management' },
  { title: 'Product - Shop', path: '/product/shop', category: 'E-Commerce' },
  { title: 'Product - List', path: '/product/list', category: 'E-Commerce' },
  { title: 'Blog', path: '/blog', category: 'Content' },
  { title: 'File Manager', path: '/file', category: 'Files' },
  { title: 'Course', path: '/course', category: 'Learning' },
  { title: 'Kanban', path: '/kanban', category: 'Project' },
];

// ----------------------------------------------------------------------

export type SearchbarProps = {
  onSearchIconClick?: () => void;
};

export function Searchbar({ onSearchIconClick }: SearchbarProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleOpen = useCallback(() => {
    setOpen(true);
    onSearchIconClick?.();
  }, [onSearchIconClick]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchQuery('');
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      handleClose();
    },
    [navigate, handleClose]
  );

  const filteredLinks = QUICK_LINKS.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:search-fill' as any} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'visible',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Search Input */}
          <Box sx={{ p: 2, pb: 1 }}>
            <TextField
              autoFocus
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={'eva:search-fill' as any} sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      Esc
                    </Typography>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleClose();
                }
              }}
            />
          </Box>

          {/* Quick Links */}
          <List sx={{ p: 0 }}>
            {filteredLinks.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No results found
                </Typography>
              </Box>
            ) : (
              filteredLinks.map((link, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleNavigate(link.path)} sx={{ py: 1.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2">{link.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {link.category}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.disabled">
                      {link.path}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
