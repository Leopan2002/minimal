import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavHorizontalProps = {
  data: NavItem[];
  sx?: SxProps<Theme>;
};

export function NavHorizontal({ data, sx }: NavHorizontalProps) {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 1.5,
          borderBottom: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
          bgcolor: 'background.paper',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {data.map((item) => {
        const isActived = item.path === pathname;

        return (
          <ListItemButton
            key={item.title}
            component={RouterLink}
            href={item.path}
            sx={[
              (t) => ({
                px: 2,
                py: 1,
                gap: 1,
                borderRadius: 1,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: t.vars.palette.text.secondary,
                minHeight: 44,
                ...(isActived && {
                  fontWeight: 'fontWeightSemiBold',
                  color: t.vars.palette.primary.main,
                  bgcolor: varAlpha(t.vars.palette.primary.mainChannel, 0.08),
                }),
              }),
            ]}
          >
            <Box component="span" sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>

            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
              {item.title}
            </Box>

            {item.info && item.info}
          </ListItemButton>
        );
      })}
    </Box>
  );
}
