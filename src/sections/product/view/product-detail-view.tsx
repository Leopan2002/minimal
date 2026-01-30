import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { fCurrency } from 'src/utils/format-number';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProductDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = _products.find((p) => p.id === id);

  if (!product) {
    return (
      <DashboardContent>
        <Typography variant="h4">Product not found</Typography>
      </DashboardContent>
    );
  }

  const handleBack = () => {
    navigate('/product/list');
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <DashboardContent>
      {/* Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <IconButton onClick={handleBack}>
          <Iconify icon={"eva:arrow-back-fill" as any} />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Product Details
        </Typography>
        <IconButton>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
        <Select value="published" size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
        </Select>
      </Stack>

      <Grid container spacing={3}>
        {/* Left - Product Gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            {/* Main Image */}
            <Box
              sx={{
                position: 'relative',
                paddingTop: '100%',
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.neutral',
              }}
            >
              <Box
                component="img"
                src={product.images?.[selectedImage] || product.coverUrl}
                alt={product.name}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Thumbnails */}
            <Stack direction="row" spacing={1}>
              {(product.images || [product.coverUrl]).map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: (theme) =>
                      `2px solid ${
                        selectedImage === index
                          ? theme.vars.palette.primary.main
                          : 'transparent'
                      }`,
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`Thumb ${index + 1}`}
                    sx={{
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* Right - Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* Title & Rating */}
            <Box>
              <Typography variant="overline" color="text.secondary">
                {product.category || 'NIKE'}
              </Typography>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {product.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating value={Number(product.rating) || 4} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  ({product.reviews || 0} reviews)
                </Typography>
              </Stack>
            </Box>

            {/* Price */}
            <Typography variant="h3">{fCurrency(product.price)}</Typography>

            {/* Description */}
            <Typography variant="body2" color="text.secondary">
              {product.description ||
                'Premium quality product crafted with attention to detail and designed for maximum comfort and style.'}
            </Typography>

            <Divider />

            {/* Color Selection */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Color
              </Typography>
              <Stack direction="row" spacing={1}>
                {product.colors?.map((color, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: color,
                      cursor: 'pointer',
                      border: (theme) => `2px solid ${theme.vars.palette.divider}`,
                    }}
                  >
                    <Box />
                  </Avatar>
                ))}
              </Stack>
            </Box>

            {/* Size */}
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle2">Size</Typography>
                <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
                  Size chart
                </Typography>
              </Stack>
              <Select fullWidth defaultValue="8" size="small">
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
              </Select>
            </Box>

            {/* Quantity */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Quantity
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={handleDecrement} size="small">
                  <Iconify icon={"eva:minus-fill" as any} />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={handleIncrement} size="small">
                  <Iconify icon={"eva:plus-fill" as any} />
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  Available: {product.stock || 0}
                </Typography>
              </Stack>
            </Box>

            <Divider />

            {/* Action Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                startIcon={<Iconify icon={"solar:cart-3-bold" as any} />}
              >
                Add to cart
              </Button>
              <Button fullWidth size="large" variant="outlined">
                Buy now
              </Button>
            </Stack>

            {/* Secondary Actions */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button size="small" startIcon={<Iconify icon={"solar:scale-bold" as any} />}>
                Compare
              </Button>
              <Button size="small" startIcon={<Iconify icon={"solar:heart-bold" as any} />}>
                Favorite
              </Button>
              <Button size="small" startIcon={<Iconify icon="solar:share-bold" />}>
                Share
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* Feature Highlights */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Iconify icon={"solar:verified-check-bold" as any} width={48} sx={{ mb: 1, color: 'primary.main' }} />
                <Typography variant="h6">100% Original</Typography>
                <Typography variant="body2" color="text.secondary">
                  Authentic products
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Iconify icon={"solar:restart-bold" as any} width={48} sx={{ mb: 1, color: 'primary.main' }} />
                <Typography variant="h6">10 Day Replacement</Typography>
                <Typography variant="body2" color="text.secondary">
                  Easy returns
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Iconify icon={"solar:shield-check-bold" as any} width={48} sx={{ mb: 1, color: 'primary.main' }} />
                <Typography variant="h6">Year Warranty</Typography>
                <Typography variant="body2" color="text.secondary">
                  Full coverage
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
              <Tab label="Description" value="description" />
              <Tab label="Reviews" value="reviews" />
            </Tabs>

            <Divider />

            <Box sx={{ p: 3 }}>
              {currentTab === 'description' && (
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Specifications
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Category
                        </Typography>
                        <Typography variant="body2">{product.category || 'Shoes'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Manufacturer
                        </Typography>
                        <Typography variant="body2">Nike</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Serial
                        </Typography>
                        <Typography variant="body2">{product.id.slice(0, 8)}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Stock
                        </Typography>
                        <Typography variant="body2">{product.stock || 0} units</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Product Details
                    </Typography>
                    <Typography variant="body2" component="div">
                      <ul>
                        <li>Premium materials for durability</li>
                        <li>Comfortable fit for all-day wear</li>
                        <li>Modern design that stands out</li>
                        <li>Easy to clean and maintain</li>
                      </ul>
                    </Typography>
                  </Box>
                </Stack>
              )}

              {currentTab === 'reviews' && (
                <Box>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h2">{product.rating || '4.2'}</Typography>
                      <Rating value={Number(product.rating) || 4.2} precision={0.1} readOnly />
                      <Typography variant="caption" color="text.secondary">
                        {product.reviews || 0} reviews
                      </Typography>
                    </Box>
                  </Stack>

                  <Button variant="outlined" fullWidth sx={{ mb: 3 }}>
                    Write your review
                  </Button>

                  <Stack spacing={2}>
                    <Typography variant="h6">Recent Reviews</Typography>
                    <Typography variant="body2" color="text.secondary">
                      No reviews yet. Be the first to review this product!
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
