import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProductTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stockFilter: string;
  onStockFilter: (value: string) => void;
  publishFilter: string;
  onPublishFilter: (value: string) => void;
};

export function ProductTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  stockFilter,
  onStockFilter,
  publishFilter,
  onPublishFilter,
}: ProductTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: (theme) => theme.vars.palette.primary.lighter,
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
          {/* Stock Filter */}
          <Select
            value={stockFilter}
            onChange={(e) => onStockFilter(e.target.value)}
            displayEmpty
            size="small"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">All Stock</MenuItem>
            <MenuItem value="out_of_stock">Out of stock</MenuItem>
            <MenuItem value="low_stock">Low stock</MenuItem>
            <MenuItem value="in_stock">In stock</MenuItem>
          </Select>

          {/* Publish Filter */}
          <Select
            value={publishFilter}
            onChange={(e) => onPublishFilter(e.target.value)}
            displayEmpty
            size="small"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>

          {/* Search */}
          <TextField
            fullWidth
            value={filterName}
            onChange={onFilterName}
            placeholder="Search products..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{ maxWidth: 320 }}
          />
        </Stack>
      )}

      {numSelected > 0 ? (
        <IconButton>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      ) : (
        <Stack direction="row" spacing={1}>
          <IconButton>
            <Iconify icon={"solar:settings-bold" as any} />
          </IconButton>
          <IconButton>
            <Iconify icon={"solar:upload-minimalistic-bold" as any} />
          </IconButton>
          <IconButton>
            <Iconify icon={"solar:filter-bold" as any} />
          </IconButton>
          <IconButton>
            <Iconify icon={"solar:tuning-square-2-bold" as any} />
          </IconButton>
        </Stack>
      )}
    </Toolbar>
  );
}
