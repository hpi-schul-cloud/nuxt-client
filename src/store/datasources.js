import qs from "qs";
import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";

const base = serviceTemplate("datasources");

const removeIdFromArray = (array, id) => {
	const index = array.indexOf(id);
	if (index !== -1) {
		array.splice(index, 1);
	}
};

function Sleep(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const fetchData = async (ref, { ids, successConditions, query }) => {
	if (!Array.isArray(ids) || ids.length <= 0) {
		return Promise.resolve();
	}

	const $select = ["_id"];

	// search for related database keys
	successConditions.forEach((condition) => {
		Object.keys(condition).forEach((key) => {
			if ($select.indexOf(key) === -1) {
				$select.push(key);
			}
		});
	});

	// requested ressources
	const $or = ids.map((id) => ({ _id: id }));

	// create low copy
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
			console.error(err);
			return { data: [], limit: 0, skip: 0, total: 0, err };
		});

	// test results is any ready
	const changedRessources = watchingRessources.data.filter((e) => {
		let isChanged = false;
		Object.entries(successConditions).forEach(([key, value]) => {
			if (e[key] === value) {
				isChanged = true;
				removeIdFromArray(ids, e._id);
			}
		});
		return isChanged;
	});

	return Promise.resolve({
		ids,
		changedRessources,
	});
};

const module = mergeDeep(base, {
	actions: {
		updateCallback: async function(state, payload = {}) {
			const {
				requestInterval,
			//	executer,
				watchingIds,
				successConditions,
				query,
				maxIterations,
			} = payload;

			const timeout = Number.isInteger(requestInterval)
				? requestInterval
				: 30000;
			const iterations = Number.isInteger(maxIterations) ? maxIterations : 20;
			let memoIds = watchingIds;

			for (let i = 0; i < iterations; i++) {
				const { ids, changedRessources } = await fetchData(this, {
					ids: memoIds,
					successConditions,
					query,
				});
				memoIds = ids;
				// console.log(memoIds, changedRessources, executer); // TODO: remove it
				if (changedRessources.length > 0) {
					// TODO: executer || or add mutation directly ?
					base.mutations.updateProgress(changedRessources);
				}
				if (memoIds.length <= 0) {
					return Promise.resolve();
				}
				await Sleep(timeout);
			}
		},
	},
	mutations: {
		updateProgress() { // state, changedRessources
			// state, id, status
			// console.log("mutate", changedRessources);
			//mysource = this.getters.get(id) einzelne datasource aus lokalem store
			//mysource.status = status
		},
	},
});
export default module;
