import { useContext } from "react";
import { MyContext } from "../context/GlobalContext";


export const useGlobalContext = ()=> useContext(MyContext)