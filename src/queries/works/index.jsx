import { Box, useTheme, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getDatos } from "../../services/garden.services";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import ModalEditWors from "../../modal/garden/modalEditWork";


const Work = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const [modalDialogo, setModalDialogo] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [modalEditWorks, setModalEditWorks] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedWorks, setSelectedWorks] = useState(null);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "id_propietario", headerName: "ID_PRO" },

    {
      field: "owner_nombre",
      headerName: "NOMBRE",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fumigacion",
      headerName: "Fumigacion",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "abono",
      headerName: "Abono",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "vestringias",
      headerName: "VESTRINGIAS",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "abono_universal",
      headerName: "A.UNIVERSAL",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "entrada",
      headerName: "ENTRADA",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: ({ value }) =>
        format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      field: "salida",
      headerName: "SALIDA",
      flex: 1,
      headerAlign: "left",
      align: "left",
      type: "number",
      valueFormatter: ({ value }) =>
        format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      field: "fecha",
      headerName: "FECHA",
      flex: 1,
      headerAlign: "left",
      align: "left",
      type: "number",
      valueFormatter: ({ value }) =>
        format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
  ];

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    const filtered = data.filter((item) =>
      item.owner_nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRowSelection = (newSelection) => {
    if (newSelection.length === 0) {
      setSelectedWorks(null);
      setSelectedRowIds([]);
      setActiveButton(false);
    } else {
      const selectedRowId = newSelection[newSelection.length - 1];
      setSelectedRowIds([selectedRowId]);
      const selectedRow = data.find((row) => row.id === selectedRowId);
      setSelectedWorks(selectedRow.id);
      setActiveButton(true);
      console.log("el verdadero",selectedRowId)
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await getDatos();
        setData(datos);
        setFilteredData(datos);
        console.log(datos);
      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" p={0}>
        <Header title="Actividades" subtitle="Registro de Actividades" />
        <Box display="flex" alignItems="center">
          <Button
            disabled={!activeButton}
            onClick={() => setModalEditWorks(true)}
            color="secondary"
            variant="contained"
          >
            Editar
          </Button>

          <Button
            disabled={!activeButton}
            // backgroundColor={colors.primary[800]}
            onClick={() => setModalDialogo(true)}
            color="secondary"
            variant="contained"
            sx={{
              backgroundColor: "#e41811",
              color: "#ffffff ",
              marginLeft: "10px",
            }}
          >
            Eliminar
          </Button>

          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            height={"40%"}
            width={"60%"}
            ml={1}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Buscar"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[900],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={filteredData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={handleRowSelection}
          selectionModel={selectedRowIds}
          disableMultipleSelection={true}
        />
      </Box>
      <ModalEditWors
      open={modalEditWorks}
      onClose={() => setModalEditWorks(false)}
      onSelectClient={selectedWorks}
      />
    </Box>
  );
};

export default Work;
