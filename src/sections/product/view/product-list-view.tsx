import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { ProductTableRow } from '../product-table-row';
import { ProductTableHead } from '../product-table-head';
import { ProductTableToolbar } from '../product-table-toolbar';

// ----------------------------------------------------------------------

export function ProductListView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stockFilter, setStockFilter] = useState('');
  const [publishFilter, setPublishFilter] = useState('');

  const handleSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const handleSelectAllRows = useCallback((checked: boolean) => {
    if (checked) {
      const newSelecteds = _products.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const handleSelectRow = useCallback((id: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  }, []);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const handleFilterName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  }, []);

  const handleStockFilter = useCallback((value: string) => {
    setPage(0);
    setStockFilter(value);
  }, []);

  const handlePublishFilter = useCallback((value: string) => {
    setPage(0);
    setPublishFilter(value);
  }, []);

  // Apply filters
  const filteredProducts = _products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStock = !stockFilter || product.stockStatus === stockFilter;
    const matchesPublish = !publishFilter || product.publish === publishFilter;
    return matchesName && matchesStock && matchesPublish;
  });

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headCells = [
    { id: 'name', label: 'Product' },
    { id: 'createdAt', label: 'Create at' },
    { id: 'stock', label: 'Stock' },
    { id: 'price', label: 'Price' },
    { id: 'publish', label: 'Publish' },
  ];

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">List</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Add product
        </Button>
      </Box>

      <Card>
        <ProductTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterName}
          stockFilter={stockFilter}
          onStockFilter={handleStockFilter}
          publishFilter={publishFilter}
          onPublishFilter={handlePublishFilter}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductTableHead
                order={order}
                orderBy={orderBy}
                rowCount={filteredProducts.length}
                numSelected={selected.length}
                onSort={handleSort}
                onSelectAllRows={handleSelectAllRows}
                headCells={headCells}
              />
              <TableBody>
                {paginatedProducts.map((row) => (
                  <ProductTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => handleSelectRow(row.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
