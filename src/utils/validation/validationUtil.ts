export const REGEX_ID = "[a-fA-F0-9]{24}";

export const REGEX_UUID =
	"[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}";
export const REGEX_ACTIVATION_CODE = "[a-z0-9]+";
export const isMongoId = (val: unknown): boolean =>
	typeof val === "string" && new RegExp(`^${REGEX_ID}$`).test(val);

const REGEX_OFFICIAL_SCHOOL_NUMBER =
	"^(Dev-\\d{1,2}|EXPERTEN|MZ-[A-Z]{1,3}|ORG-[A-Z\\d]{2,7}|T\\d{4}|\\d{5,6}-[A-Za-z]{1,10}|[A-Za-z]{1,2}-\\d{5,6}|\\d{5,6})$";

export const isOfficialSchoolNumber = (value: unknown): boolean =>
	typeof value === "string" &&
	new RegExp(REGEX_OFFICIAL_SCHOOL_NUMBER).test(value);

export const isEnum =
	(enumType: object) =>
	(val: unknown): boolean =>
		Object.values(enumType).includes(val);
