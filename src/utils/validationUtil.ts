import { isDef, isString } from "@vueuse/core";

export const REGEX_ID = "[a-z0-9]{24}";
export const REGEX_UUID =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
export const REGEX_ACTIVATION_CODE = "[a-z0-9]+";
export const isMongoId = (val: unknown) =>
	isDef(val) && typeof val === "string" && new RegExp(REGEX_ID).test(val);

export const isOfficialSchoolNumber = (value: unknown) =>
	isString(value) && /[0-9]{5}/.test(value);
