import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { requestListTruckView } from '../../services/trukSocket.services';
import { Box, Typography } from "@mui/material";

const SOCKET_URL = "http://localhost:4000";
const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  query: {
    token: localStorage.getItem("authToken"),
  },
});

const Hangar1 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const fetchData = async () => {
    try {
      const datos = await requestListTruckView();
      if (datos) {
        setData(datos);
        const filtered = datos.find((item) => item.id_hangar === 2);
        setFilteredData(filtered ? { ...filtered } : null);
      }
    } catch (error) {
      console.error("Error al obtener datos del backend:", error);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on("listTruckViewData", (hangarData) => {
      if (hangarData && hangarData.length > 0) {
        setData(hangarData);
        const filtered = hangarData.find((item) => item.id_hangar === 2);
        setFilteredData(filtered ? { ...filtered } : null);
      }
    });

    socket.on("truckStateUpdated", (updatedTruck) => {
      setData((prevData) =>
        prevData.map((truck) =>
          truck.id === updatedTruck.id ? updatedTruck : truck
        )
      );
      if (updatedTruck.id_hangar === 2) {
        setFilteredData({ ...updatedTruck });
      }
      fetchData();
    });

    return () => {
      socket.off("listTruckViewData");
      socket.off("truckStateUpdated");
    };
  }, []);

  return (
    <Box sx={{
      background: "#1f2a40",
      height: "90vh",
      width: "100%",
      padding: "5vh 5vw",
      marginTop: "3vh",
      marginLeft: "3vw",
      boxShadow: "0 0 5px 0px #000000",
      borderRadius: "10px",
      boxSizing: "border-box"
    }}>
      <Box sx={{
        fontSize: "2vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{
          fontSize: "10vw",
          marginTop: "-2vh"
        }}>Hangar 2</h1>

        <Box>
          <img className='logo'
            style={{
              width: "700px", // Mantener el tamaño fijo
              height: "280px", // Mantener el tamaño fijo
              marginTop: "2vh",
              marginRight: "2vw"
            }}
            src="../../assets/helios12.png" alt="logo" />
        </Box>
      </Box>
      
      {filteredData ? (
        <Box>
          <Typography variant="h1" sx={{ fontSize: "10vw", marginTop: "-5vh", fontWeight: "700" }}>
            Camión: {filteredData.chapa}
          </Typography>

          <Box sx={{ marginTop: "10vh" }}>
            <Typography variant="h1" sx={{ fontSize: "10vw", marginTop: "-5vh", fontWeight: "700" }}>
              Estado: {filteredData.estado}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="h1" sx={{ fontSize: "10vw", marginTop: "-5vh", fontWeight: "700" }}>
          No hay camiones asignados al Hangar
        </Typography>
      )}
    </Box>
  );
}

export default Hangar1;
