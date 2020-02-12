import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("webuntisMetadata");

const module = mergeDeep(base, {
	actions: {
		async findAll({ commit }, payload = {}) {
			const { qid = "default", query, customEndpoint } = payload;

			const data = [];
			let total = 0;

			do {
				const res = await this.$axios.$get(customEndpoint || baseUrl, {
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
				data.push(...res.data);
			} while (data.length < total);

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
			return res;
		},
	},
});

export default module;
