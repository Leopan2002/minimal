import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = CardProps & {
  list: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export function AppFeatured({ list, sx, ...other }: Props) {
  // Just show the first item for now since we don't have the Carousel component ready
  const item = list[0]; 

  return (
    <Card sx={{ bgcolor: 'common.black', color: 'common.white', ...sx }} {...other}>
      <CarouselItem item={item} />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: Props['list'][0];
};

function CarouselItem({ item }: CarouselItemProps) {
  const { title, description, coverUrl } = item;
  
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          p: 3,
          gap: 1,
          width: 1,
          zIndex: 9,
          bottom: 0,
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          mb: 5,
        }}
      >
        <Typography variant="overline" sx={{ color: 'warning.main' }}>
          App / Featured
        </Typography>

        <Typography variant="h5" sx={{ color: 'common.white' }} noWrap>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'common.white' }} noWrap>
            {description}
        </Typography>
      </Box>

      <Box
        component="img"
        alt={title}
        src={coverUrl}
        sx={{
          width: 1,
          height: { xs: 280, xl: 320 },
          objectFit: 'cover',
        }}
      />
      
      <Box 
        sx={{
          width: 1,
          height: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          background: `linear-gradient(to bottom, ${alpha('#000000', 0)} 0%, #000000 75%)`
        }}
      />
    </Box>
  );
}
