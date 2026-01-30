import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current tab from the URL path
  const getCurrentTab = () => {
    if (location.pathname.includes('/product/list')) return 'list';
    return 'shop';
  };

  const [currentTab, setCurrentTab] = useState(getCurrentTab());

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/product/${newValue}`);
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Product
      </Typography>

      <Box sx={{ mb: 5 }}>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          <Tab label="Shop" value="shop" />
          <Tab label="List" value="list" />
        </Tabs>
      </Box>

      <Outlet />
    </DashboardContent>
  );
}
