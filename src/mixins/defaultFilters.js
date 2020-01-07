export const supportedFilterTypes = [
	"date",
	"fulltextSearch",
	"number",
	"select",
	"text",
];

export const supportedFilterMatchingTypes = {
	date: {
		equal: {
			value: "equal",
			label: "ist",
		},
		before: {
			value: "before",
			label: "vor dem",
		},
		after: {
			value: "after",
			label: "nach dem",
		},
	},
	number: {
		equal: {
			value: "equal",
			label: "=",
		},
		greater: {
			value: "greater",
			label: ">",
		},
		less: {
			value: "less",
			label: "<",
		},
		greaterEqual: {
			value: "greaterEqual",
			label: "≥",
		},
		lessEqual: {
			value: "lessEqual",
			label: "≤",
		},
	},
	text: {
		equals: {
			value: "equals",
			label: "ist gleich",
		},
		contains: {
			value: "contains",
			label: "enthält",
		},
	},
};

const defaultFiltersMixin = {
	methods: {
		filterTextDefault: function(value, targetValue) {
			return this.filterTextContains(value, targetValue);
		},
		filterTextContains(value, targetValue) {
			return (value || "")
				.toString()
				.toString()
				.toLowerCase()
				.includes(targetValue.toString().toLowerCase());
		},
		filterTextEquals(value, targetValue) {
			return (
				(value || "").toString().toLowerCase() ===
				targetValue.toString().toLowerCase()
			);
		},

		filterNumberDefault(value, targetValue) {
			return this.filterNumberEqual(value, targetValue);
		},
		filterNumberEqual(value, targetValue) {
			return Number(value) === Number(targetValue);
		},
		filterNumberGreater(value, targetValue) {
			return Number(value) > Number(targetValue);
		},
		filterNumberLess(value, targetValue) {
			return Number(value) < Number(targetValue);
		},
		filterNumberGreaterEqual(value, targetValue) {
			return Number(value) >= Number(targetValue);
		},
		filterNumberLessEqual(value, targetValue) {
			return Number(value) <= Number(targetValue);
		},

		filterSelectDefault(value, targetValue) {
			return targetValue.some((option) => {
				return (
					option.checked &&
					option.value &&
					option.value.toString() === (value || "").toString()
				);
			});
		},

		filterDateDefault(value, targetValue) {
			return this.filterDateEqual(value, targetValue);
		},
		filterDateEqual(value, targetValue) {
			return new Date(value).getTime() === new Date(targetValue).getTime();
		},
		filterDateBefore(value, targetValue) {
			return new Date(value) <= new Date(targetValue);
		},
		filterDateAfter(value, targetValue) {
			return new Date(value) >= new Date(targetValue);
		},
	},
};

export default defaultFiltersMixin;
