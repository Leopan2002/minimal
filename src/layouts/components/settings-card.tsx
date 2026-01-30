
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type SettingsCardProps = {
  icon: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
};

export function SettingsCard({ icon, label, checked, onChange, description }: SettingsCardProps) {
  return (
    <Card
      sx={{
        p: 2,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s',
        border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        // '&:hover': {
        //   bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        //   borderColor: (theme) => alpha(theme.palette.grey[500], 0.24),
        // },
      }}
      onClick={() => onChange(!checked)}
    >
      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box display="flex" flexDirection="column" gap={1} flex={1}>
          <Iconify 
            icon={icon as any} 
            width={24} 
            sx={{ 
              color: checked ? 'primary.main' : 'text.secondary',
              transition: 'color 0.2s'
            }} 
          />
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {label}
            </Typography>
            {description && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        <Switch
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onChange(e.target.checked);
          }}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: 'primary.main',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'primary.main',
            },
          }}
        />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type SettingsOptionCardProps = {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
};

export function SettingsOptionCard({ icon, label, selected, onClick, description }: SettingsOptionCardProps) {
  return (
    <Card
      sx={{
        p: 2,
        cursor: 'pointer',
        border: (theme) => 
          selected 
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        ...(selected && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        }),
        // '&:hover': {
        //   bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        //   borderColor: (theme) => 
        //     selected 
        //       ? theme.palette.primary.main 
        //       : alpha(theme.palette.grey[500], 0.24),
        // },
      }}
      onClick={onClick}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
        <Iconify 
          icon={icon as any} 
          width={32} 
          sx={{ 
            color: selected ? 'primary.main' : 'text.secondary',
            transition: 'color 0.2s'
          }} 
        />
        <Box textAlign="center">
          <Typography 
            variant="subtitle2" 
            fontWeight={600}
            color={selected ? 'primary.main' : 'text.primary'}
          >
            {label}
          </Typography>
          {description && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}
