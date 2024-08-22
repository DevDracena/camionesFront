import React, { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
// import Header from '../components/Header';
// import axios from 'axios'; // Necesitarás axios o fetch para las solicitudes HTTP
import { PostLogin } from '../services/login.services';
import ModalCharge from "../modal/modalCharge";
import { useNavigate } from "react-router-dom";



export const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Estado para los inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState(null);

  const navigate = useNavigate();


// useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//         navigate('/'); // Si el token ya existe, redirige
//     }
// }, [navigate]);


    // Función para manejar el cambio en los inputs
    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'user') {
            setUsername(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    };

    // Función para manejar el clic en el botón de inicio de sesión
    const handleLogin = async () => {
        setIsLoading(true);
        const data = { username, password };
    
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await PostLogin(data);
    
            console.log('Login successful:', response);
            localStorage.setItem('authToken', response.token);
            setLevel(response.level);
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userLevel', response.level); // Guarda el nivel del usuario
            setIsLoading(false);
            navigate('/'); // Redirige a la página principal después del login
        } catch (error) {
            console.error('Error logging in:', error);
            setIsLoading(false);
        }
    };

//   console.log("level",level);


    return (
        <Box sx={{
            background:"#1f2a40",
            height:"550px",
            width:"700px",
            margin:"auto",
            marginTop:"100px",
            boxShadow:"0 0 5px 0px #000000",
            borderRadius:"10px"
        }}>
            <Box sx={{
                paddingTop:"10px",
                paddingLeft:"50px",
                fontSize:"20px",
                display:"flex",
                justifyContent:"space-between",
                marginRight:"80px",
                marginBottom:"-20px"
            }}>
                <h1>Iniciar Sesion</h1>
                <img className='logo'
                    style={{
                        width:"250px",
                        height:"100px",
                        marginTop:"35px"
                    }}
                    src="../../assets/helios12.png" alt="logo" />
            </Box>
            <Box sx={{
                paddingLeft:"50px",
                fontSize:"20px",
                display:"flex",
                flexDirection:"column",

                "& input": {
                    height:"42px",
                    width:"90%",
                    border:"none",
                    borderRadius:"8px",
                    marginTop:"5px",
                    marginBottom:"15px",
                    fontSize:"18px"
                },
                "& input:hover": {
                    border:"3px solid rgb(98 102 241)"
                },
            }}>
                <label htmlFor="user">Nombre de Usuario</label>
                <input
                    className='input'
                    id='user'
                    type="text"
                    placeholder='Ingrese su Usuario'
                    value={username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    className='input'
                    id='password'
                    type="password"
                    placeholder='Ingrese su Contraseña'
                    value={password}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{
                paddingLeft:"50px",
                display:"flex",
                justifyContent:"space-between",
                marginRight:"80px",
                fontSize:"25px",
                marginTop:"20px",
                "& button":{
                    height:"50px",
                    width:"180px",
                    borderRadius:"8px",
                    background:"rgb(98 102 241)",
                    border:"none",
                    color:"#ffffff",
                    fontSize:"20px"
                },
                "& button:hover":{
                    background:"#151632",
                },

                "& label":{
                    fontSize:"22px",
                    marginTop:"10px",
                }
            }}>
                <Button
                    className='button'
                    onClick={handleLogin}
                >
                    Iniciar Sesion
                </Button>
                <label htmlFor="Registrarse" className='label'>Registrarse</label>
            </Box>
            <ModalCharge isLoading={isLoading} />
        </Box>

    )
}


