import { isString } from "@vueuse/core";

export const REGEX_ID = "[a-z0-9]{24}";
export const REGEX_UUID =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
export const REGEX_ACTIVATION_CODE = "[a-z0-9]+";
export const isMongoId = (val: unknown): boolean =>
	isString(val) && new RegExp(REGEX_ID).test(val);

const REGEX_OFFICIAL_SCHOOL_NUMBER =
	"^(Dev-\\d{1,2}|EXPERTEN|MZ-[A-Z]{1,3}|ORG-[A-Z0-9]{2,7}|T\\d{4}|[0-9]{5,6}-[A-Za-z]{1,10}|[A-Za-z]{2}-\\d{1,10}|[0-9]{5,6})$";

export const isOfficialSchoolNumber = (value: unknown): boolean =>
	isString(value) && new RegExp(REGEX_OFFICIAL_SCHOOL_NUMBER).test(value);
