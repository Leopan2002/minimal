import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type FriendProps = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

type Props = {
  friends: FriendProps[];
  searchFriends: string;
  onSearchFriends: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UserProfileFriends({ friends, searchFriends, onSearchFriends }: Props) {
  return (
    <>
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4">Friends</Typography>
        <TextField
          value={searchFriends}
          onChange={onSearchFriends}
          placeholder="Search friends..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"eva:search-fill" as any} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2, width: '100%', maxWidth: 280 }}
        />
      </Box>

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
        {friends.map((friend) => (
          <Card
            key={friend.id}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt={friend.name} src={friend.avatarUrl} sx={{ width: 48, height: 48, mr: 2 }} />

            <ListItemText
              primary={friend.name}
              secondary={friend.role}
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

            <IconButton sx={{ top: 8, right: 8, position: 'absolute' }}>
              <Iconify icon={"eva:more-vertical-fill" as any} />
            </IconButton>
          </Card>
        ))}
      </Box>
    </>
  );
}
