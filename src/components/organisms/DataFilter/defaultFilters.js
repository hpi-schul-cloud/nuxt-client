export const supportedFilterTypes = [
	"date",
	"fulltextSearch",
	"number",
	"select",
	"text",
];

const filterTextIncludes = (value, targetValue) => {
	return (value || "")
		.toString()
		.toString()
		.toLowerCase()
		.includes(targetValue.toString().toLowerCase());
};
const filterTextEqual = (value, targetValue) => {
	return (
		(value || "").toString().toLowerCase() ===
		targetValue.toString().toLowerCase()
	);
};
const filterTextLess = (value, targetValue) => {
	return (
		(value || "").toString().toLowerCase() <
		targetValue.toString().toLowerCase()
	);
};
const filterTextLessEqual = (value, targetValue) => {
	return (
		(value || "").toString().toLowerCase() <=
		targetValue.toString().toLowerCase()
	);
};

const filterNumberEqual = (value, targetValue) => {
	return Number(value) === Number(targetValue);
};
const filterNumberLess = (value, targetValue) => {
	return Number(value) < Number(targetValue);
};
const filterNumberLessEqual = (value, targetValue) => {
	return Number(value) <= Number(targetValue);
};

const filterSelect = (value, targetValue) => {
	return targetValue.some((option) => {
		return (
			option.checked &&
			option.value &&
			option.value.toString() === (value || "").toString()
		);
	});
};

const filterDateDefault = (value, targetValue) => {
	return filterDateEqual(value, targetValue);
};
const filterDateEqual = (value, targetValue) => {
	return new Date(value).getTime() === new Date(targetValue).getTime();
};
const filterDateBefore = (value, targetValue) => {
	return new Date(value) <= new Date(targetValue);
};
const filterDateAfter = (value, targetValue) => {
	return new Date(value) >= new Date(targetValue);
};

const defaultFilters = {
	date: {
		default: filterDateDefault,
		"=": filterDateEqual,
		before: filterDateBefore,
		after: filterDateAfter,
	},
	number: {
		default: filterNumberEqual,
		"=": filterNumberEqual,
		"<": filterNumberLess,
		"<=": filterNumberLessEqual,
	},
	select: {
		default: filterSelect,
	},
	text: {
		default: filterTextIncludes,
		"=": filterTextEqual,
		"<": filterTextLess,
		"<=": filterTextLessEqual,
		includes: filterTextIncludes,
	},
};

export default defaultFilters;
