import axios from "axios";
//https://event-mngmnt-bellcorp.onrender.com/
const instance = axios.create({
 // baseURL: "http://localhost:5000/api",
   baseURL: "https://event-mngmnt-bellcorp.onrender.com/api",
});

export default instance;
