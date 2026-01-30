import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PostCardProps = {
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: Date;
  postContent: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
};

export function UserProfilePostCard({
  author,
  createdAt,
  postContent,
  imageUrl,
  likes,
  comments,
  shares,
}: PostCardProps) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={author.avatarUrl} alt={author.name} />}
        title={author.name}
        subheader={fToNow(createdAt)}
        action={
          <IconButton>
            <Iconify icon="eva:more-vertical-fill" width={20} />
          </IconButton>
        }
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postContent}
        </Typography>

        {imageUrl && (
          <Box
            component="img"
            src={imageUrl}
            alt="Post"
            sx={{
              mt: 2,
              width: '100%',
              borderRadius: 1.5,
              objectFit: 'cover',
              maxHeight: 400,
            }}
          />
        )}
      </CardContent>

      <CardActions sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small" color="error">
              <Iconify icon={"solar:heart-bold" as any} width={20} />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {likes}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small">
              <Iconify icon={"solar:chat-round-dots-bold" as any} width={20} />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {comments}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small">
              <Iconify icon={"solar:share-bold" as any} width={20} />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {shares}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
