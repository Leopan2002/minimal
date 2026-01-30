import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProductTableRowProps = {
  row: {
    id: string;
    name: string;
    coverUrl: string;
    createdAt: Date | string;
    stock: number;
    stockStatus: 'out_of_stock' | 'low_stock' | 'in_stock';
    price: number;
    publish: 'published' | 'draft';
  };
  selected: boolean;
  onSelectRow: () => void;
};

export function ProductTableRow({ row, selected, onSelectRow }: ProductTableRowProps) {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/product/${row.id}`);
  };

  // Stock label color and text
  const stockLabel = {
    out_of_stock: { text: 'Out of stock', color: 'error' as const },
    low_stock: { text: `${row.stock} low stock`, color: 'warning' as const },
    in_stock: { text: `${row.stock} in stock`, color: 'success' as const },
  }[row.stockStatus];

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            src={row.coverUrl}
            alt={row.name}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <ListItemText
            primary={
              <Typography
                variant="subtitle2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={handleNavigateToDetail}
              >
                {row.name}
              </Typography>
            }
          />
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {fDate(row.createdAt)}
        </Typography>
      </TableCell>

      <TableCell>
        <Label color={stockLabel.color}>{stockLabel.text}</Label>
      </TableCell>

      <TableCell>{fCurrency(row.price)}</TableCell>

      <TableCell>
        <Label color={row.publish === 'published' ? 'info' : 'default'}>
          {row.publish === 'published' ? 'Published' : 'Draft'}
        </Label>
      </TableCell>

      <TableCell align="right">
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
