import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function UserPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL
  const pathSegments = location.pathname.split('/');
  const currentTab = pathSegments[pathSegments.length - 1] || 'list';

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/user/${newValue}`);
  };

  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <DashboardContent>
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">User</Typography>
        </Box>

        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            borderBottom: (theme) => `1px solid ${theme.vars.palette.divider}`,
          }}
        >
          <Tab label="List" value="list" />
          <Tab label="Profile" value="profile" />
          <Tab label="Cards" value="cards" />
        </Tabs>

        {/* Child routes render here */}
        <Outlet />
      </DashboardContent>
    </>
  );
}
