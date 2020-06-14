import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { BACKEND_SECRET, BASE_URL } from "../env";

const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: `${BASE_URL}/`,
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
  }),
});

export default useAxios;