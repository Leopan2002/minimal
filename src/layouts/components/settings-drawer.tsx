import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useSettings } from 'src/contexts/settings-context';

import { Iconify } from 'src/components/iconify';

import { SettingsCard, SettingsOptionCard } from './settings-card';

// ----------------------------------------------------------------------

const NAV_LAYOUTS = [
  { value: 'vertical', label: 'Vertical', icon: 'carbon:side-panel-open' },
  { value: 'horizontal', label: 'Horizontal', icon: 'carbon:align-horizontal-left' },
  { value: 'mini', label: 'Mini', icon: 'carbon:side-panel-close' },
];

const PRESETS = [
  { name: 'Default', primary: '#00A76F' },
  { name: 'Cyan', primary: '#00B8D9' },
  { name: 'Purple', primary: '#7635DC' },
  { name: 'Blue', primary: '#2065D1' },
  { name: 'Orange', primary: '#FDA92D' },
  { name: 'Red', primary: '#FF5630' },
];

// ----------------------------------------------------------------------

export type SettingsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const theme = useTheme();
  const settings = useSettings();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
        },
      }}
      PaperProps={{
        sx: {
          width: 320,
          p: 3,
          backdropFilter: 'blur(20px)',
          bgcolor: (t) => alpha(t.palette.background.default, 0.9),
        },
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Settings</Typography>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Reset">
            <IconButton size="small" onClick={settings.onReset}>
              <Iconify icon={'solar:restart-bold' as any} width={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton size="small" onClick={onClose}>
              <Iconify icon={'mingcute:close-line' as any} width={20} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Mode */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
          Mode
        </Typography>
        <SettingsCard
          icon={settings.mode === 'light' ? 'solar:sun-bold' : 'solar:moon-bold'}
          label={settings.mode === 'light' ? 'Light' : 'Dark'}
          checked={settings.mode === 'dark'}
          onChange={(checked) => settings.onChangeMode(checked ? 'dark' : 'light')}
        />
      </Box>

      {/* Direction */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
          Direction
        </Typography>
        <SettingsCard
          icon={settings.direction === 'rtl' ? 'solar:align-right-bold' : 'solar:align-left-bold'}
          label={settings.direction === 'rtl' ? 'Right to Left' : 'Left to Right'}
          checked={settings.direction === 'rtl'}
          onChange={(checked) => settings.onChangeDirection(checked ? 'rtl' : 'ltr')}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Nav Layout */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
          Nav Layout
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {NAV_LAYOUTS.map((layout) => (
            <SettingsOptionCard
              key={layout.value}
              icon={layout.icon}
              label={layout.label}
              selected={settings.navLayout === layout.value}
              onClick={() => settings.onChangeNavLayout(layout.value as any)}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Presets */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
          Color Presets
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1.5,
          }}
        >
          {PRESETS.map((preset, index) => {
            const isSelected = settings.selectedPreset === index;
            return (
              <Box
                key={preset.name}
                onClick={() => settings.onChangePreset(index)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 56,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${preset.primary} 0%, ${alpha(preset.primary, 0.7)} 100%)`,
                    border: (t) => 
                      isSelected
                        ? `2px solid ${preset.primary}`
                        : `2px solid ${alpha(t.palette.grey[500], 0.12)}`,
                    boxShadow: isSelected 
                      ? `0 8px 24px ${alpha(preset.primary, 0.4)}`
                      : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 2px 8px ${alpha(preset.primary, 0.5)}`,
                        animation: 'checkmarkPop 0.3s ease-in-out',
                        '@keyframes checkmarkPop': {
                          '0%': { transform: 'scale(0)' },
                          '50%': { transform: 'scale(1.2)' },
                          '100%': { transform: 'scale(1)' },
                        },
                      }}
                    >
                      <Iconify 
                        icon="solar:check-circle-bold" 
                        width={16} 
                        sx={{ color: preset.primary }}
                      />
                    </Box>
                  )}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    mt: 0.75,
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? 'text.primary' : 'text.secondary',
                    transition: 'all 0.2s',
                  }}
                >
                  {preset.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Drawer>
  );
}
