import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  _courses,
  _hoursData,
  _myAccount,
  _strengthData,
  _courseSummary,
  _featuredCourses,
  _courseReminders,
} from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { CourseReminders } from '../course-reminders';
import { CourseMyAccount } from '../course-my-account';
import { CourseHoursChart } from '../course-hours-chart';
import { CourseSummaryCard } from '../course-summary-card';
import { CourseContinueItem } from '../course-continue-item';
import { CourseFeaturedCard } from '../course-featured-card';
import { CourseStrengthChart } from '../course-strength-chart';

// ----------------------------------------------------------------------

export function CourseView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Course
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column (Summary Cards + Main Content) */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Summary Cards */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <CourseSummaryCard
                  title="In Progress"
                  value={_courseSummary.inProgress}
                  icon={
                    <Iconify
                      icon={'material-symbols:folder-open' as any}
                      width={32}
                      sx={{ color: 'warning.main', transform: 'rotate(-42deg)', margin: '1.2rem' }}
                    />
                  }
                  color="warning"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CourseSummaryCard
                  title="Completed"
                  value={_courseSummary.completed}
                  icon={
                    <Iconify
                      icon={'material-symbols:folder-check-rounded' as any}
                      width={32}
                      sx={{ color: 'success.main', transform: 'rotate(-42deg)', margin: '1.2rem' }}
                    />
                  }
                  color="success"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CourseSummaryCard
                  title="Certificates"
                  value={_courseSummary.certificates}
                  icon={
                    <Iconify
                      icon={'tabler:certificate' as any}
                      width={32}
                      sx={{
                        color: 'secondary.main',
                        transform: 'rotate(-42deg)',
                        margin: '1.2rem',
                      }}
                    />
                  }
                  color="secondary"
                />
              </Grid>
            </Grid>

            {/* Hours Spent Chart */}
            <CourseHoursChart
              chart={{
                series: [
                  {
                    name: 'Hours',
                    data: _hoursData,
                  },
                ],
                categories: [],
              }}
            />

            {/* Continue Course Section */}
            <Card sx={{ p: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6">Continue course</Typography>

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

              <Box sx={{ display: 'grid', gap: 2 }}>
                {_courses.map((course) => (
                  <CourseContinueItem key={course.id} course={course} />
                ))}
              </Box>
            </Card>

            {/* Featured Course Section */}
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6">Featured course</Typography>

                <Stack direction="row" spacing={1}>
                  <IconButton size="small">
                    <Iconify icon={'eva:arrow-ios-back-fill' as any} />
                  </IconButton>
                  <IconButton size="small">
                    <Iconify icon={'eva:arrow-ios-forward-fill' as any} />
                  </IconButton>
                </Stack>
              </Stack>

              <Grid container spacing={3}>
                {_featuredCourses.map((course) => (
                  <Grid key={course.id} size={{ xs: 12, sm: 6, md: 3 }}>
                    <CourseFeaturedCard course={course} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Grid>

        {/* Right Sidebar Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* User Info */}
            <CourseMyAccount myAccount={_myAccount} />

            {/* Strength Radar Chart */}
            <CourseStrengthChart
              chart={{
                categories: _strengthData.categories,
                series: _strengthData.series,
              }}
            />

            {/* Reminders */}
            <CourseReminders reminders={_courseReminders} />
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
