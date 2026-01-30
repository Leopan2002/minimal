import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type FollowerProps = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  isFollowed?: boolean;
  location?: string;
};

type Props = {
  followers: FollowerProps[];
};

export function UserProfileFollowers({ followers }: Props) {
  const [followedState, setFollowedState] = useState<string[]>([]);

  const handleToggleFollow = useCallback(
    (id: string) => {
      const isFollowed = followedState.includes(id);
      if (isFollowed) {
        setFollowedState((prev) => prev.filter((item) => item !== id));
      } else {
        setFollowedState((prev) => [...prev, id]);
      }
    },
    [followedState]
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
      }}
    >
      {followers.map((follower) => {
        const isFollowed = followedState.includes(follower.id);

        return (
          <Card
            key={follower.id}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt={follower.name} src={follower.avatarUrl} sx={{ width: 48, height: 48, mr: 2 }} />

            <ListItemText
              primary={follower.name}
              secondary={
                <>
                  <Iconify icon={"mingcute:location-fill" as any} width={16} sx={{ mr: 0.5, flexShrink: 0 }} />
                  {follower.location || 'United States'}
                </>
              }
              primaryTypographyProps={{
                noWrap: true,
                typography: 'subtitle2',
              }}
              secondaryTypographyProps={{
                mt: 0.5,
                noWrap: true,
                display: 'flex',
                component: 'span',
                alignItems: 'center',
                typography: 'caption',
                color: 'text.disabled',
              }}
            />

            <Button
              size="small"
              variant={isFollowed ? 'text' : 'outlined'}
              color={isFollowed ? 'success' : 'inherit'}
              startIcon={
                isFollowed ? <Iconify icon={"eva:checkmark-fill" as any} /> : <Iconify icon={"eva:plus-fill" as any} />
              }
              onClick={() => handleToggleFollow(follower.id)}
              sx={{ ml: 1, flexShrink: 0 }}
            >
              {isFollowed ? 'Followed' : 'Follow'}
            </Button>
          </Card>
        );
      })}
    </Box>
  );
}
