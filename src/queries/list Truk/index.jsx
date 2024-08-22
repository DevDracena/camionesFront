import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getListTruckView } from "../../services/truk.services";
import { getDatos } from "../../services/state.services";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Truks = () => {
  const [data, setData] = useState([]);
  const [userLevel, setUserLevel] = useState(null);
  const [statesList, setStatesList] = useState([]); // Cambiado de state a statesList

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log(data);
  console.log(statesList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await getListTruckView();
        setData(datos);
      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
      }
    };

    const level = localStorage.getItem('userLevel');
    if (level) {
      setUserLevel(parseInt(level));
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataState = async () => {
      try {
        const datos = await getDatos();
        setStatesList(datos);
      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
      }
    };

    fetchDataState();
  }, []);

  const handleChange = (event, index) => {
    const newData = [...data];
    newData[index].estado = event.target.value;
    setData(newData);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Garita":
        return "blue";
      case "En Proceso":
        return "#770404";
      case "Carga":
        return "red";
      case "Descarga":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" p={0}>
        <Header title="Lista de Camiones" subtitle="Ingreso de Camiones" />
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        backgroundColor={colors.primary[400]}
        p="20px"
        borderRadius="8px"
      >
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
          {data.map((camion, index) => (
            <Box
              key={index}
              backgroundColor={colors.blueAccent[900]}
              p="20px"
              borderRadius="8px"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
             
            >
              <Typography variant="h3" fontWeight="bold"  marginBottom={"10px"}>
                Lugar Asignado: {camion.hangar}
              </Typography>
              <Typography variant="h3" fontWeight="bold" marginBottom={"20px"} >
                Camión: {camion.chapa}
              </Typography>

              <Box display={"flex"} marginTop={"5px"} alignItems="center">
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={getEstadoColor(camion.estado)}
                  mr={2}
                >
                  Estado: 
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id={`estado-select-label-${index}`} sx={{marginLeft:"-3%"}}>Estado</InputLabel >
                  <Select
                    labelId={`estado-select-label-${index}`}
                    id={`estado-select-${index}`}
                    value={camion.estado}  // Valor inicial es el estado actual del camión
                    label="Estado"
                    onChange={(event) => handleChange(event, index)}  // Maneja el cambio por índice
                    sx={{marginLeft:"-3%"}}
                  >
                    {statesList.map((stateItem) => (
                      <MenuItem key={stateItem.id} value={stateItem.Descripcion} >
                        {stateItem.Descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Truks;
