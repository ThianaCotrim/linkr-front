


import axios from 'axios'


const connection = process.env.REACT_APP_API_URL || 'http://www.localhost:5000';


const Api = (url) => {


   const creation = axios.create({ baseURL: url,});
   return creation;
  
}


export default Api (connection);