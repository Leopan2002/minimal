import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  filterRole: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: any) => void;
};

export function UserTableToolbar({ numSelected, filterName, onFilterName, filterRole, onFilterRole }: UserTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <FormControl sx={{ minWidth: 160 }}>
          <Select
            value={filterRole}
            onChange={onFilterRole}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by role' }}
            sx={{ height: 40 }}
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="Leader">Leader</MenuItem>
            <MenuItem value="Hr Manager">HR Manager</MenuItem>
            <MenuItem value="UI Designer">UI Designer</MenuItem>
            <MenuItem value="UX Designer">UX Designer</MenuItem>
            <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
            <MenuItem value="Project Manager">Project Manager</MenuItem>
            <MenuItem value="Backend Developer">Backend Developer</MenuItem>
            <MenuItem value="Full Stack Designer">Full Stack Designer</MenuItem>
            <MenuItem value="Front End Developer">Front End Developer</MenuItem>
            <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
          </Select>
        </FormControl>
      )}
    </Toolbar>
  );
}
