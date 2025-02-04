import axios from "axios"

export const API = axios.create({
  //TODO: adicionar variavle de ambiente
  baseURL: "http://localhost:3001"
})