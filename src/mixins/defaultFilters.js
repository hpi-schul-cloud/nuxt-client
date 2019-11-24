const defaultFiltersMixin = {
	methods: {
		filterStringDefault: function(value, targetValue) {
			return this.filterStringContains(value, targetValue);
		},
		filterStringContains(value, targetValue) {
			return value
				.toString()
				.toLowerCase()
				.includes(targetValue.toString().toLowerCase());
		},
		filterStringEquals(value, targetValue) {
			return (
				value.toString().toLowerCase() === targetValue.toString().toLowerCase()
			);
		},

		filterNumberDefault(value, targetValue) {
			return this.filterStringEquals(value, targetValue);
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
					option.value.toString() === value.toString()
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
