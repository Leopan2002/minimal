import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _folders, _recentFiles, _fileCategories, _storageServices } from 'src/_mock';

import { FileUploadBox } from '../file-upload-box';
import { FileCategories } from '../file-categories';
import { FileRecentList } from '../file-recent-list';
import { FileStorageCard } from '../file-storage-card';
import { FileFoldersGrid } from '../file-folders-grid';
import { FileDataActivity } from '../file-data-activity';

// ----------------------------------------------------------------------

export function FileView() {
  const totalUsed = _fileCategories.reduce((acc, cat) => acc + cat.size, 0);
  const totalSpace = 22.35;

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        File
      </Typography>

      <Grid container spacing={3}>
        {/* Storage Service Cards */}
        {_storageServices.map((service) => (
          <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <FileStorageCard
              name={service.name}
              icon={service.icon}
              usedSpace={service.usedSpace}
              totalSpace={service.totalSpace}
              color={service.color}
            />
          </Grid>
        ))}

        {/* Data Activity, Folders, Recent Files */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <Stack spacing={3}>
            <FileDataActivity
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    name: 'Images',
                    data: [10, 30, 45, 50, 55, 65, 70, 85, 100],
                  },
                  {
                    name: 'Media',
                    data: [15, 25, 30, 35, 40, 45, 50, 55, 60],
                  },
                  {
                    name: 'Documents',
                    data: [20, 30, 35, 40, 45, 50, 55, 60, 65],
                  },
                  {
                    name: 'Other',
                    data: [10, 15, 20, 25, 30, 35, 40, 45, 50],
                  },
                ],
              }}
            />

            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6">
                  Folders
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.75,
                      bgcolor: 'primary.lighter',
                      color: 'primary.dark',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {_folders.length}
                  </Box>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  View all
                </Typography>
              </Stack>

              <FileFoldersGrid folders={_folders} />
            </Box>

            <FileRecentList
              title="Recent files"
              list={_recentFiles}
            />
          </Stack>
        </Grid>

        {/* Upload Box and Categories */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Stack spacing={3}>
            <FileUploadBox />
            <FileCategories
              categories={_fileCategories}
              totalUsed={totalUsed}
              totalSpace={totalSpace}
            />
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
