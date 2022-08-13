import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import NextLink from "next/link";
import { ShopLayout } from "../../components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra info si la orden ha sido pagada",
    width: 150,
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.paid ? (
        <Chip
          label="Pagada"
          color="success"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      ) : (
        <Chip
          label="Pendiente"
          color="error"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      );
    },
  },
  {
    field: "orderLink",
    headerName: "Ver orden",
    width: 100,
    sortable: false,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${row.id}`} passHref>
          <Link underline="always">Ver detalle</Link>
        </NextLink>
      );
    },
  },
];

const rows: any[] = [
  { id: 1, paid: true, fullname: "Juan Perez" },
  { id: 2, paid: true, fullname: "Pedro Rios" },
  { id: 3, paid: false, fullname: "Maria Duco" },
  { id: 4, paid: true, fullname: "Juan Perez" },
  { id: 5, paid: true, fullname: "Pedro John" },
  { id: 6, paid: false, fullname: "Maria Diaz" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container xs={12} height={650} width="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 30]}
        ></DataGrid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
