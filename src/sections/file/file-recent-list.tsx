import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type FileRecentItemProps = {
  file: {
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    sharedWith: string[];
    isFavorited: boolean;
    modifiedAt: Date | string | number;
    icon?: string;
  };
};

function FileRecentItem({ file }: FileRecentItemProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const favorite = useBoolean(file.isFavorited);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        component={Card}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.default',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          transition: (theme) =>
            theme.transitions.create(['background-color'], {
              duration: theme.transitions.duration.shorter,
            }),
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          },
        }}
      >
        <Box
            component="img"
            src={file.icon}
            sx={{ width: 48, height: 48 }}
        />

        <ListItemText
          primary={file.name}
          secondary={
            <>
              {fData(file.size)}
              <Box
                component="span"
                sx={{
                  mx: 0.75,
                  width: 2,
                  height: 2,
                  borderRadius: '50%',
                  bgcolor: 'currentColor',
                }}
              />
              {fDateTime(file.modifiedAt)}
            </>
          }
          primaryTypographyProps={{
            noWrap: true,
            typography: 'subtitle2',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            display: 'inline-flex',
          }}
        />

        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 24,
              height: 24,
              fontSize: 12,
            },
          }}
        >
          {file.sharedWith &&
            file.sharedWith.map((person) => (
              <Avatar key={person} src={person} />
            ))}
        </AvatarGroup>

        <IconButton
          color={favorite.value ? 'warning' : 'default'}
          onClick={favorite.onToggle}
        >
          <Iconify
            icon={(favorite.value ? 'eva:star-fill' : 'eva:star-outline') as any}
          />
        </IconButton>

        <IconButton
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
        >
          <Iconify icon={"eva:more-vertical-fill" as any} />
        </IconButton>
      </Stack>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 160 },
          },
        }}
      >
        <MenuItem onClick={handleClosePopover}>
          <Iconify icon={"solar:share-bold" as any} sx={{ mr: 1 }} />
          Share
        </MenuItem>

        <MenuItem onClick={handleClosePopover}>
          <Iconify icon={"solar:pen-bold" as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleClosePopover}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon={"solar:trash-bin-trash-bold" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

type Props = {
  title?: string;
  list: {
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    sharedWith: string[];
    isFavorited: boolean;
    modifiedAt: Date | string | number;
    icon?: string;
  }[];
};

export function FileRecentList({ list, title, ...other }: Props) {
  return (
    <Box {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h6">{title}</Typography>

        <Stack direction="row" spacing={1}>
           <IconButton
              size="small"
              color="primary"
              sx={{
                width: 24,
                height: 24,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <Iconify icon="mingcute:add-line" width={16} />
            </IconButton>

            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                fontWeight: 600,
                alignSelf: 'center',
                ml: 1,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View all
            </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        {list.map((file) => (
          <FileRecentItem key={file.id} file={file} />
        ))}
      </Stack>
    </Box>
  );
}
