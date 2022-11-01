import axios from "axios";
import { $axios, initializeAxios } from "@/utils/api";
import { getNestedObjectValues } from "@/utils/helpers";

describe("foo", () => {
	beforeEach(() => {
		initializeAxios(axios);
	});
	it("tests stuff", () => {
		expect($axios).toBeDefined();
		expect(getNestedObjectValues).toBeDefined();
	});
});
