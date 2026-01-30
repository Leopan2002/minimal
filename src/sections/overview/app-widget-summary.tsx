import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
    options?: ChartOptions;
  };
};

export function AppWidgetSummary({ title, percent, total, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.main];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { borderRadius: 2, columnWidth: '80%' } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    tooltip: {
      y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart.options,
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>{title}</Box>

        <Box sx={{ my: 1.5, typography: 'h4' }}>{fNumber(total)}</Box>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify
            width={24}
            icon={(percent < 0 ? 'solar:double-alt-arrow-down-bold-duotone' : 'solar:double-alt-arrow-up-bold-duotone') as any}
            sx={{
              mr: 0.5,
              color: 'success.main',
              ...(percent < 0 && { color: 'error.main' }),
            }}
          />

          <Box
             component="span"
             sx={{
                typography: 'subtitle2',
                color: percent < 0 ? 'error.main' : 'success.main',
                mr: 1
             }}
          >
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Box>

          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            last week
          </Box>
        </Stack>
      </Box>

      <Chart
        type="bar"
        series={[{ data: chart.series }]}
        options={chartOptions}
        sx={{ width: 60, height: 36 }}
      />
    </Card>
  );
}
