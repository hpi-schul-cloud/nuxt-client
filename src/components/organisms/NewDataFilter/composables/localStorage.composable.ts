import { createSharedComposable, useStorage } from "@vueuse/core";

const filterLocalStorage = () => {
	// const defaults = {
	// 	filter: {
	// 		"pages.administration.students.index": {
	// 			query: {
	// 				consentStatus: {
	// 					$in: ["ok", "parentsAgreed"],
	// 				},
	// 				classes: ["1A"],
	// 				createdAt: {
	// 					$gte: "2023-12-06T21:00:00Z",
	// 					$lte: "2099-12-31T22:59:59Z",
	// 				},
	// 				lastLoginSystemChange: {
	// 					$gte: "2023-12-06T23:00:00Z",
	// 					$lte: "2099-12-31T22:59:59Z",
	// 				},
	// 				outdatedSince: {
	// 					$gte: "2023-12-06T23:00:00Z",
	// 					$lte: "2099-12-31T22:59:59Z",
	// 				},
	// 			},
	// 		},
	// 	},
	// };

	const defaults = {
		pagination: {},
		filter: {
			"pages.administration.students.index": {
				query: {},
			},
		},
		sorting: {},
		version: 1,
	};

	const uiFilterState = useStorage("uiState", defaults);

	return {
		uiFilterState,
	};
};

export const useFilterLocalStorage = createSharedComposable(filterLocalStorage);
