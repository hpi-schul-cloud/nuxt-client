const isDictObj = (obj) => {
	return typeof obj === "object" && obj.constructor == Object;
};

/**
 * @param  {[{}]} config filter configuration
 * @param  {{}} values input values
 * @return {} feathers query object
 */
export const generator = (config, values) => {
	const query = {};
	config.forEach((group) => {
		const hasValue = group.filter.some(
			(input) => values[input.id] !== undefined
		);
		// skip if no value is defined for the modal
		if (!hasValue) {
			return;
		}
		if (typeof (group.parser || {}).generator === "function") {
			// extract values for group
			const groupValues = {};
			group.filter.forEach((filter) => {
				groupValues[filter.id] = values[filter.id];
			});
			// generate query
			const newQuery = group.parser.generator(group, groupValues);
			Object.assign(query, newQuery);
			return;
		}
		// edge case for sort
		if (
			["$sort-attribute", "$sort-order"].every(
				(attribute) =>
					!!group.filter.find((input) => input.attribute === attribute)
			)
		) {
			query["$sort"] = {};
			const sortAttribute = group.filter.find(
				(input) => input.attribute === "$sort-attribute"
			);
			const sortDirection = group.filter.find(
				(input) => input.attribute === "$sort-order"
			);
			query["$sort"][values[sortAttribute.id]] = values[sortDirection.id];
			return;
		}
		// default handling
		group.filter.forEach((filter) => {
			const applyNegated = filter.applyNegated(values[filter.id]);
			switch (filter.operator) {
				case "<": {
					const key = applyNegated ? "$gte" : "$lt";
					query[filter.attribute] = {};
					query[filter.attribute][key] = values[filter.id];
					break;
				}
				case "<=": {
					const key = applyNegated ? "$gt" : "$lte";
					query[filter.attribute] = {};
					query[filter.attribute][key] = values[filter.id];
					break;
				}
				case "includes": {
					const key = applyNegated ? "$nin" : "$in";
					const value = values[filter.id];
					query[filter.attribute] = {};
					query[filter.attribute][key] = Array.isArray(value) ? value : [value];
					break;
				}
				default: {
					if (applyNegated) {
						query[filter.attribute] = { $ne: values[filter.id] };
					} else {
						query[filter.attribute] = values[filter.id];
					}
				}
			}
		});
	});
	return query;
};

/**
 * @param  {[{}]} config filter configuration
 * @param  {{}} query feathers query
 * @return {{inputId: any}} returns values dictionary
 */
// eslint-disable-next-line no-unused-vars
export const parser = (config, query) => {
	const values = {};

	// edge case for sort (extract)
	if (
		isDictObj(query["$sort"]) &&
		Object.entries(query["$sort"]).length === 1
	) {
		const [attribute, order] = Object.entries(query["$sort"])[0];
		query["$sort-attribute"] = attribute;
		query["$sort-order"] = order;
	}

	config.forEach((group) => {
		// custom parser specified
		if (typeof (group.parser || {}).parser === "function") {
			const newValues = group.parser.parser(group, query);
			Object.assign(values, newValues);
			return;
		}

		// default handling
		group.filter.forEach((input) => {
			let queryValue = query[input.attribute];
			if (queryValue === undefined) {
				return;
			}

			if (isDictObj(queryValue) && Object.entries(queryValue).length === 1) {
				const [operator, realValue] = Object.entries(queryValue)[0];
				if (operator.startsWith("$")) {
					switch (input.operator) {
						case "<": {
							if (!["$lt", "$gte"].includes(operator)) {
								return;
							}
							break;
						}
						case "<=": {
							if (!["$lte", "$gt"].includes(operator)) {
								return;
							}
							break;
						}
						case "includes": {
							if (!["$nin", "$in"].includes(operator)) {
								return;
							}
							break;
						}
					}
					queryValue = realValue;
				}
			}
			values[input.id] = queryValue;
		});
	});

	delete query["$sort-attribute"];
	delete query["$sort-order"];

	return values;
};

export default {
	generator,
	parser,
};
