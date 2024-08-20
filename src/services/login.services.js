import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const getDatos = async () => {
  try {
    const response = await axios.get(`${API_URL}garden/viewActivity`);
    // console.log("este es el verdadero", response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener datos del backend:', error);
  }
};

const getOneDatos = async (id) => {
  try {
    const response = await axios.get(`${API_URL}garden/${id}`);
    //  console.log("este es el verdadero", response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener datos del backend:', error);
  }
};

const PostLogin = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}login`, datos);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // Si el error es una respuesta del servidor con un mensaje de error
      throw new Error('Error al enviar datos al backend: ' + error.response.data.message);
    } else {
      // Si el error no es una respuesta del servidor con un mensaje de error
      throw new Error('Error al enviar datos al backend: ' + error.message);
    }
  }
};

export { getDatos, PostLogin, getOneDatos };
