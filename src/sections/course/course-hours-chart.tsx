import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name: string;
      data: { week: number[]; month: number[]; year: number[] };
    }[];
    options?: ChartOptions;
  };
};

export function CourseHoursChart({
  title = 'Hours spent',
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('year');

  const chartColors = chart.colors ?? [theme.palette.primary.main];

  const chartData = chart.series[0].data[period];
  const categories = 
    period === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : period === 'month'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { 
      width: 3,
      curve: 'smooth',
    },
    xaxis: { categories: categories.slice(0, chartData.length) },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ToggleButtonGroup
            size="small"
            exclusive
            value={period}
            onChange={(e, newPeriod) => {
              if (newPeriod) setPeriod(newPeriod);
            }}
            sx={{
              '& .MuiToggleButton-root': {
                px: 2,
                py: 0.5,
                border: 'none',
                fontSize: '0.75rem',
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  fontWeight: 600,
                },
              },
            }}
          >
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </ToggleButtonGroup>
        }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          type="area"
          series={[{ name: chart.series[0].name, data: chartData }]}
          options={chartOptions}
          sx={{ height: 360 }}
        />
      </Box>
    </Card>
  );
}
