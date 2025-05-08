import { isUndefined } from 'lodash';
import {
	isEnum,
	isH5pId,
	isMongoId,
	isOfficialSchoolNumber,
	oneOf,
} from "./validationUtil";

describe("validationUtil", () => {
	describe("isMongoId", () => {
		describe("when the value is a mongo id", () => {
			it("should return true", () => {
				expect(isMongoId("681b1666dfb0c3b8637d5a7c")).toBe(true);
			});
		});

		describe("when the value is not a mongo id", () => {
			it("should return false", () => {
				expect(isMongoId("681b1666df")).toBe(false);
			});
		});
	});

	describe("isH5pId", () => {
		describe("when the value is a mongo id", () => {
			it("should return true", () => {
				expect(isH5pId("681b1666dfb0c3b8637d5a7c")).toBe(true);
			});
		});

		describe("when the value is new", () => {
			it("should return true", () => {
				expect(isH5pId("new")).toBe(true);
			});
		});

		describe("when the value is not a mongo id", () => {
			it("should return false", () => {
				expect(isH5pId("681b1666df")).toBe(false);
			});
		});
	});

	describe("isOfficialSchoolNumber", () => {
		it("should return true for valid official school numbers", () => {
			expect(isOfficialSchoolNumber("Dev-12")).toBe(true);
			expect(isOfficialSchoolNumber("EXPERTEN")).toBe(true);
			expect(isOfficialSchoolNumber("MZ-ABC")).toBe(true);
			expect(isOfficialSchoolNumber("MZ-A")).toBe(true);
			expect(isOfficialSchoolNumber("ORG-A134V55")).toBe(true);
			expect(isOfficialSchoolNumber("ORG-A1")).toBe(true);
			expect(isOfficialSchoolNumber("12345-Y")).toBe(true);
			expect(isOfficialSchoolNumber("AB-123456")).toBe(true);
			expect(isOfficialSchoolNumber("A-12345")).toBe(true);
			expect(isOfficialSchoolNumber("123456")).toBe(true);
			expect(isOfficialSchoolNumber("12345")).toBe(true);
		});

		it("should return false for invalid official school numbers", () => {
			expect(isOfficialSchoolNumber("T12345")).toBe(false);
			expect(isOfficialSchoolNumber("X1234")).toBe(false);
			expect(isOfficialSchoolNumber("1234-Y")).toBe(false);
			expect(isOfficialSchoolNumber("Dev")).toBe(false);
			expect(isOfficialSchoolNumber("Dev-123")).toBe(false);
			expect(isOfficialSchoolNumber("ORG-A134V550")).toBe(false);
			expect(isOfficialSchoolNumber("10033101000")).toBe(false);
			expect(isOfficialSchoolNumber("nicht_05083")).toBe(false);
			expect(isOfficialSchoolNumber("gelöscht_99016")).toBe(false);
			expect(isOfficialSchoolNumber("AB-1234567")).toBe(false);
			expect(isOfficialSchoolNumber("AB-1234")).toBe(false);
			expect(isOfficialSchoolNumber("-1234")).toBe(false);
			expect(isOfficialSchoolNumber("1234")).toBe(false);
		});
	});

	describe("isEnum", () => {
		enum TestEnum {
			Value1 = 0,
			Value2 = "Test2",
		}

		describe("when it is in the enum", () => {
			it("should return true", () => {
				expect(isEnum(TestEnum)(TestEnum.Value1)).toBe(true);
				expect(isEnum(TestEnum)(TestEnum.Value2)).toBe(true);
			});
		});

		describe("when it is not part of the enum", () => {
			it("should return false", () => {
				expect(isEnum(TestEnum)(1)).toBe(false);
				expect(isEnum(TestEnum)("other")).toBe(false);
			});
		});
	});

	describe("isUndefined", () => {
		describe("when the value is undefined", () => {
			it("should return true", () => {
				expect(isUndefined(undefined)).toBe(true);
			});
		});

		describe("when the value is not undefined", () => {
			it("should return false", () => {
				expect(isUndefined("defined")).toBe(false);
			});
		});
	});

	describe("oneOf", () => {
		describe("when one validator succeeds", () => {
			it("should return true", () => {
				expect(oneOf(isUndefined, isMongoId)(undefined)).toBe(true);
				expect(oneOf(isUndefined, isMongoId)("681b1666dfb0c3b8637d5a7c")).toBe(
					true
				);
			});
		});

		describe("when all validator fail", () => {
			it("should return false", () => {
				expect(oneOf(isUndefined, isMongoId)("invalid")).toBe(false);
			});
		});
	});
});
