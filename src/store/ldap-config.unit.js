/* eslint-disable jest/no-focused-tests */
import { getters, mutations } from "../../src/store/ldap-config";

const state = {
	data: {
		testDataKey: "dataTest",
	},
	verified: {
		testVerifiedKey: "verifiedTest",
	},
	submitted: {
		testSubmmittedKey: "submmitedTest",
	},
	temp: {
		testTempKey: "tempTest",
	},
};

describe("store/ldap-config", () => {
	describe("getters", () => {
		describe("dataGetter", () => {
			it("it returns data state", () => {
				expect(getters.dataGetter(state)).toStrictEqual({
					testDataKey: "dataTest",
				});
			});
		});
		describe("tempGetter", () => {
			it("it returns data state", () => {
				expect(getters.tempGetter(state)).toStrictEqual({
					testTempKey: "tempTest",
				});
			});
		});
	});
	describe("mutations", () => {
		describe("setData", () => {
			it("sets data values correctly", async () => {
				mutations.setData(state, { testDataKey: "newDataValue" });
				expect(state.data).toStrictEqual({ testDataKey: "newDataValue" });
			});
		});
		describe("setVerified", () => {
			it("sets verified values correctly", async () => {
				mutations.setVerified(state, { testVerifiedKey: "newVerifiedValue" });
				expect(state.verified).toStrictEqual({
					testVerifiedKey: "newVerifiedValue",
				});
			});
		});
		describe("setSubmmited", () => {
			it("sets submitted values correctly", async () => {
				mutations.setSubmitted(state, {
					testSubmmittedKey: "newSubmittedValue",
				});
				expect(state.submitted).toStrictEqual({
					testSubmmittedKey: "newSubmittedValue",
				});
			});
		});
		describe("setTemp", () => {
			it("sets temp values correctly", async () => {
				mutations.setTemp(state, { testTempKey: "newTempValue" });
				expect(state.temp).toStrictEqual({
					testTempKey: "newTempValue",
				});
			});
		});
		describe("updateData", () => {
			it("updates temp values correctly", async () => {
				mutations.updateData(state, { testTempKey: "updatedTempValue" });
				expect(state.temp).toStrictEqual({
					testTempKey: "updatedTempValue",
				});
			});
		});
		describe("clearData", () => {
			it("updates temp values correctly", async () => {
				const clearDataState = {
					...state,
					temp: { testTempKey: "tempValue" },
					data: { testDataKey: "dataValue" },
				};
				expect(clearDataState.temp).toStrictEqual({
					testTempKey: "tempValue",
				});
				expect(clearDataState.data).toStrictEqual({
					testDataKey: "dataValue",
				});

				mutations.clearData(clearDataState);
				expect(clearDataState.temp).toStrictEqual({
					testDataKey: "",
				});
			});
		});
	});
});
