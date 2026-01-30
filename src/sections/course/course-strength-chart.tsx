import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: { name: string; data: number[] }[];
    options?: ChartOptions;
  };
};

export function CourseStrengthChart({
  title = 'Strength',
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.main];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.2 },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: Array(chart.categories.length).fill(theme.palette.text.secondary),
        },
      },
    },
    yaxis: {
      show: false,
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Chart
        type="radar"
        series={chart.series}
        options={chartOptions}
        sx={{ height: 280, p: 2 }}
      />
    </Card>
  );
}
