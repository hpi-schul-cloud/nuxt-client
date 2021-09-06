import { Plugin } from "@nuxt/types";
import { serverAPI } from "../utils/api";

const accessor: Plugin = ({ $axios }) => {
	serverAPI.setup($axios);
};

export default accessor;
