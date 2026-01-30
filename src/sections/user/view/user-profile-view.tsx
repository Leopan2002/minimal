import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { _users, _posts } from 'src/_mock';

import { UserProfileCover } from '../user-profile-cover';
import { UserProfileAbout } from '../user-profile-about';
import { UserProfileFriends } from '../user-profile-friends';
import { UserProfileGallery } from '../user-profile-gallery';
import { UserProfilePostCard } from '../user-profile-post-card';
import { UserProfileFollowers } from '../user-profile-followers';
import { UserProfilePostInput } from '../user-profile-post-input';

// ----------------------------------------------------------------------

export function UserProfileView() {
  const [currentTab, setCurrentTab] = useState('profile');
  const [searchFriends, setSearchFriends] = useState('');

  const handleSearchFriends = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFriends(event.target.value);
  };

  // Use first user as profile owner
  const user = _users[0];

  // Sample posts data
  const posts = [
    {
      id: '1',
      author: {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      createdAt: new Date(2024, 0, 20),
      postContent:
        'The sun sets over the horizon, painting the sky in brilliant hues of orange and pink.',
      imageUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-3.webp',
      likes: 1947,
      comments: 875,
      shares: 52,
    },
    {
      id: '2',
      author: {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      createdAt: new Date(2024, 0, 19),
      postContent:
        'Excited to announce our new project launching next month! Stay tuned for more updates.',
      likes: 1245,
      comments: 432,
      shares: 89,
    },
    {
      id: '3',
      author: {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      createdAt: new Date(2024, 0, 18),
      postContent:
        'Just finished an amazing book on leadership and innovation. Highly recommend it to everyone in tech!',
      imageUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-4.webp',
      likes: 892,
      comments: 234,
      shares: 45,
    },
  ];

  return (
    <Box>
      {/* Cover Section */}
      <UserProfileCover
        name={user.name}
        role={user.role}
        avatarUrl={user.avatarUrl}
        coverUrl="https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-5.webp"
      />

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onChange={(e, value) => setCurrentTab(value)}
        sx={{
          mb: 3,
          borderBottom: (theme) => `1px solid ${theme.vars.palette.divider}`,
        }}
      >
        <Tab label="Profile" value="profile" />
        <Tab label="Followers" value="followers" />
        <Tab label="Friends" value="friends" />
        <Tab label="Gallery" value="gallery" />
      </Tabs>

      {/* Content */}
      {currentTab === 'profile' && (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              md: '300px 1fr',
            },
          }}
        >
          {/* Left Sidebar */}
          <Stack spacing={3}>
            {/* Follower Stats */}
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <Box>
                    <Typography variant="h4">1,947</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Follower
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '1px',
                      height: 48,
                      bgcolor: 'divider',
                    }}
                  />
                  <Box>
                    <Typography variant="h4">9,124</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Following
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* About Card */}
            <UserProfileAbout
              bio="Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer."
              location="United Kingdom"
              email="demo@minimals.cc"
              company="Lueilwitz and Sons"
              school="Nikolaus - Leuschke"
            />
          </Stack>

          {/* Right Content - Posts */}
          <Stack spacing={3}>
            {/* Post Input */}
            <UserProfilePostInput avatarUrl={user.avatarUrl} />

            {/* Posts Feed */}
            {posts.map((post) => (
              <UserProfilePostCard key={post.id} {...post} />
            ))}
          </Stack>
        </Box>
      )}

      {currentTab === 'followers' && <UserProfileFollowers followers={_users} />}

      {currentTab === 'friends' && (
        <UserProfileFriends
          friends={_users}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && (
        <UserProfileGallery
          gallery={_posts.map((post) => ({
            id: post.id,
            title: post.title,
            postAt: post.postedAt,
            imageUrl: post.coverUrl,
          }))}
        />
      )}
    </Box>
  );
}
