import axios from "axios";
import { $axios, initializeAxios } from "@/utils/api";

describe("foo", () => {
	beforeEach(() => {
		initializeAxios(axios);
	});
	it("tests stuff", () => {
		expect($axios).toBeDefined();
	});
});
