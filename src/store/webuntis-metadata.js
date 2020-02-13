import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
import qs from "qs";

const base = serviceTemplate("webuntisMetadata");

const module = mergeDeep(base, {
	actions: {
		async findAll({ commit }, payload = {}) {
			const { qid = "default", query } = payload;

			let data = [];
			let total = 0;
			do {
				const res = await this.$axios.$get("webuntisMetadata", {
					params: {
						$limit: 10000,
						$skip: data.length,
						...query,
					},
					paramsSerializer: (params) => {
						return qs.stringify(params);
					},
				});
				// eslint-disable-next-line prefer-destructuring
				total = res.total;
				data = data.concat(res.data);
			} while (data.length < total);

			data = data.slice(0, total); // TODO remove this line that hides errors
			if (data.length !== total) {
				throw new Error("received more data than expected");
			}

			commit("updatePaginationForQuery", {
				query,
				qid,
				res: {
					limit: total,
					skip: 0,
					total,
				},
			});
			commit("set", {
				items: data,
			});
			return {
				limit: total,
				skip: 0,
				total,
				data,
			};
		},
	},
});

export default module;
