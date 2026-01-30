import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type GalleryItem = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

type Props = {
  gallery: GalleryItem[];
};

export function UserProfileGallery({ gallery }: Props) {
  const theme = useTheme();

  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenLightbox = (url: string) => {
    setSelectedImage(url);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {gallery.map((image) => (
          <Card key={image.id} sx={{ cursor: 'pointer', position: 'relative' }}>
            <Box
              component="img"
              alt="gallery"
              src={image.imageUrl}
              onClick={() => handleOpenLightbox(image.imageUrl)}
              sx={{
                width: 1,
                height: 1,
                objectFit: 'cover',
                aspectRatio: '1/1',
              }}
            />

            <Box
              sx={{
                width: 1,
                height: 1,
                top: 0,
                left: 0,
                position: 'absolute',
                bgcolor: alpha(theme.palette.grey[900], 0.72),
                opacity: 0,
                transition: theme.transitions.create('opacity'),
                '&:hover': { opacity: 1 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton color="inherit">
                <Iconify icon={"eva:more-vertical-fill" as any} />
              </IconButton>
            </Box>

            <Box
              sx={{
                left: 0,
                bottom: 0,
                width: 1,
                position: 'absolute',
                p: 2,
                bgcolor: 'transparent',
                backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
              }}
            >
              <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                {image.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'common.white', opacity: 0.72 }}>
                {fDate(image.postAt)}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Dialog open={openLightbox} onClose={handleCloseLightbox} maxWidth="md">
        {selectedImage && (
          <Box
            component="img"
            src={selectedImage}
            sx={{ width: 1, height: 'auto', maxHeight: '90vh' }}
          />
        )}
      </Dialog>
    </>
  );
}
