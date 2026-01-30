import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

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
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function FileDataActivity({
  title = 'Data activity',
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.grey[500],
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    chart: { stacked: true },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 8,
        borderRadiusApplication: 'end',
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
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
            value="yearly"
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
            <ToggleButton value="yearly">Yearly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
          </ToggleButtonGroup>
        }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          type="bar"
          series={chart.series}
          options={chartOptions}
          sx={{ height: 360 }}
        />
      </Box>
    </Card>
  );
}
