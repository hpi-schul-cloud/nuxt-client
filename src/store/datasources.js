import qs from "qs";

import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
import { removeIdFromArray } from "@utils/helpers";

const base = serviceTemplate("datasources");

const forceNumber = (v, _v) => {
	return Number.isInteger(v) ? v : _v;
};

const Sleep = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const solvedConditions = (successConditions) => (resource) => {
	let isChanged = false;
	successConditions.forEach((condition) => {
		Object.entries(condition).forEach(([key, value]) => {
			if (resource[key] === value) {
				isChanged = true;
			}
		});
	});
	return isChanged;
};

const selectRelatedDataBaseKeys = (successConditions) => {
	const $select = ["_id"];
	successConditions.forEach((condition) => {
		Object.keys(condition).forEach((key) => {
			if ($select.indexOf(key) === -1) {
				$select.push(key);
			}
		});
	});
	return $select;
};

const fetchData = async (ref, { ids, $select, query, conditionHelper }) => {
	if (!Array.isArray(ids) || ids.length <= 0) return Promise.resolve();

	// create low copy query with related ressources
	const $or = ids.map((id) => ({ _id: id }));
	const newQuery = Object.assign(query, { $select, $or });

	// fetch watching ressources
	const watchingRessources = await ref.$axios
		.$get(base.baseUrl, {
			params: newQuery,
			paramsSerializer: (params) => {
				return qs.stringify(params);
			},
		})
		.catch((err) => {
			// should not stop if any error is throwed
			console.error(err);
			return { data: [], limit: 0, skip: 0, total: 0, err };
		});

	// test result if is any is ready
	const changedRessources = watchingRessources.data.filter(conditionHelper);
	changedRessources.forEach(({ _id }) => {
		removeIdFromArray(ids, _id);
	});

	return Promise.resolve({
		ids,
		changedRessources,
	});
};

const module = mergeDeep(base, {
	actions: {
		updateCallback: async function ({ commit }, payload = {}) {
			const {
				requestInterval,
				watchingIds,
				successConditions,
				query = {},
				maxIterations,
			} = payload;

			const copyQuery = { ...query };
			copyQuery.$skip = 0;
			delete copyQuery.$limit;

			const timeout = forceNumber(requestInterval, 30 * 1000);
			const iterations = forceNumber(maxIterations, 60);
			const $select = selectRelatedDataBaseKeys(successConditions);
			const conditionHelper = solvedConditions(successConditions);
			let memoIds = watchingIds;

			for (let i = 0; i < iterations; i++) {
				const { ids, changedRessources } = await fetchData(this, {
					ids: memoIds,
					$select,
					conditionHelper,
					query: copyQuery,
				});
				memoIds = ids;

				changedRessources.forEach((element) => {
					commit("patchSingleItem", element);
				});

				if (memoIds.length <= 0) {
					return Promise.resolve();
				}
				await Sleep(timeout);
			}
		},
	},
	getters: {
		getPendingIdsFromResult(state) {
			try {
				const pendingIds = [];
				state.list.forEach((datasource) => {
					if (datasource.lastStatus === "Pending") {
						pendingIds.push(datasource._id);
					}
				});
				return pendingIds;
			} catch (err) {
				return [];
			}
		},
	},
});
export default module;
