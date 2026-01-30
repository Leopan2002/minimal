import type { CardProps } from '@mui/material/Card';

import { useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';

import { Iconify } from 'src/components/iconify';


// ----------------------------------------------------------------------

type Folder = {
  id: string;
  name: string;
  totalFiles: number;
  size: number;
  sharedWith: string[];
  isFavorited: boolean;
};

type Props = CardProps & {
  folders: Folder[];
};

export function FileFoldersGrid({ folders, sx, ...other }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Box
      sx={{ pb: 3, ...sx }}
      {...other}
    >
      <Box
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        sx={{
          gap: 3,
          display: 'flex',
          overflowX: 'auto',
          cursor: 'grab',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {folders.map((folder) => (
          <Card
            key={folder.id}
            sx={{
              p: 2.5,
              minWidth: 280,
              flexShrink: 0,
              boxShadow: 'none',
              border: (theme) => `solid 1px ${theme.palette.divider}`,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z8,
              },
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'warning.lighter',
                  }}
                >
                  <Iconify
                    icon={"eva:folder-fill" as any}
                    width={32}
                    sx={{ color: 'warning.main' }}
                  />
                </Box>

                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small">
                    <Iconify
                      icon={(folder.isFavorited ? 'eva:star-fill' : 'eva:star-outline') as any}
                      sx={{
                        color: folder.isFavorited ? 'warning.main' : 'text.secondary',
                      }}
                    />
                  </IconButton>

                  <IconButton size="small">
                    <Iconify icon={"eva:more-vertical-fill" as any} />
                  </IconButton>
                </Stack>
              </Stack>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap sx={{ mb: 0.5 }}>
                  {folder.name}
                </Typography>
                
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {folder.totalFiles} files • {folder.size.toFixed(2)} GB
                </Typography>
              </Box>

              {folder.sharedWith.length > 0 && (
                <AvatarGroup
                  max={3}
                  sx={{
                    '& .MuiAvatar-root': {
                      width: 24,
                      height: 24,
                      fontSize: '0.75rem',
                    },
                  }}
                >
                  {folder.sharedWith.map((avatar, index) => (
                    <Avatar
                      key={index}
                      src={avatar}
                      alt={`Shared user ${index + 1}`}
                    />
                  ))}
                </AvatarGroup>
              )}
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
