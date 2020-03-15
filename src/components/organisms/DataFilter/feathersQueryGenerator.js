import { unescape } from "lodash";

/**
 * @param  {[{}]} activeFilters array of active filter rules (with the properties 'attribute', 'value' and 'operator')
 */
export const generator = (activeFilters) => {
	const query = {};

	activeFilters.forEach((filter) => {
		switch (unescape(filter.operator)) {
			case "<": {
				const key = filter.applyNegated ? "$gte" : "$lt";
				query[filter.attribute] = {};
				query[filter.attribute][key] = filter.value;
				break;
			}
			case "<=": {
				const key = filter.applyNegated ? "$gt" : "$lte";
				query[filter.attribute] = {};
				query[filter.attribute][key] = filter.value;
				break;
			}
			case "includes": {
				const key = filter.applyNegated ? "$nin" : "$in";
				const { value } = filter;
				query[filter.attribute] = {};
				query[filter.attribute][key] = Array.isArray(value) ? value : [value];
				break;
			}
			default: {
				if (filter.applyNegated) {
					query[filter.attribute] = { $ne: filter.value };
				} else {
					query[filter.attribute] = filter.value;
				}
			}
		}
	});
	return query;
};

export default {
	generator,
};
