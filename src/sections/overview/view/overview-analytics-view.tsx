import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import {
  _invoices,
  _topAuthors,
  _relatedApps,
  _appFeatured,
} from 'src/_mock';

import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppWidgetSummary } from '../app-widget-summary';
import { AnalyticsTopAuthors } from '../analytics-top-authors';
import { AnalyticsRelatedApps } from '../analytics-related-apps';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsInvoicesTable } from '../analytics-invoices-table';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsCircularProgress } from '../analytics-circular-progress';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppWelcome
            title={`Welcome back 👋 \n ${CONFIG.appName}`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<img alt="motivation" src="/assets/illustrations/illustration-dashboard.svg" />}
            action={
              <Button variant="contained" color="primary">
                Go now
              </Button>
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title="Total active users"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title="Total installed"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title="Total downloads"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Current download"
            chart={{
              series: [
                { label: 'Mac', value: 12560 },
                { label: 'Window', value: 67010 },
                { label: 'iOS', value: 16140 },
                { label: 'Android', value: 11700 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Area installed"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              series: [
                { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 75, 55, 48, 44] },
                { name: 'Europe', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 67, 89, 92] },
                { name: 'Americas', data: [10, 14, 42, 45, 37, 42, 59, 66, 23, 34, 12, 18] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <AnalyticsInvoicesTable title="New Invoice" list={_invoices} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsRelatedApps list={_relatedApps} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTopAuthors list={_topAuthors} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <AnalyticsCircularProgress
                title="Conversion"
                total={38566}
                percent={48}
                color="success"
                label="Conversion"
              />
            </Grid>

            <Grid size={12}>
              <AnalyticsCircularProgress
                title="Applications"
                total={55566}
                percent={75}
                color="info"
                label="Applications"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
