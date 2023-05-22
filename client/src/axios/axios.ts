import axios from "axios";

const axiosReq = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        Accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
})

export default axiosReq;