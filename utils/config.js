import axios from "axios";

const CONFIG = {
  API: process.env.NEXT_PUBLIC_BACKEND_API + 'api/',
  axios: axios
}


export default CONFIG;