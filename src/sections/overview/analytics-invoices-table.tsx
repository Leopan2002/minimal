import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type InvoiceStatus = 'paid' | 'out_of_date' | 'progress';

type Invoice = {
  id: string;
  category: string;
  price: number;
  status: InvoiceStatus;
};

type Props = CardProps & {
  title?: string;
  list: Invoice[];
  onViewAll?: () => void;
};

export function AnalyticsInvoicesTable({ title = 'New Invoices', list, onViewAll, ...other }: Props) {
  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'out_of_date':
        return 'error';
      case 'progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'out_of_date':
        return 'Out of date';
      case 'progress':
        return 'Progress';
      default:
        return status;
    }
  };

  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ mb: 1 }} />

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 680 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map((invoice) => (
                <TableRow key={invoice.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{invoice.id}</TableCell>
                  <TableCell>{invoice.category}</TableCell>
                  <TableCell>${invoice.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Label color={getStatusColor(invoice.status)} variant="soft">
                      {getStatusLabel(invoice.status)}
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Link
          href="#"
          color="inherit"
          underline="always"
          onClick={(e) => {
            e.preventDefault();
            onViewAll?.();
          }}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          View all
          <Iconify icon="eva:arrow-ios-forward-fill" width={16} sx={{ ml: 0.5 }} />
        </Link>
      </Box>
    </Card>
  );
}
