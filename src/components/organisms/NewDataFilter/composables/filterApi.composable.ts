import { createSharedComposable } from "@vueuse/core";
import { useStore } from "vuex";
import { authModule } from "@/store";
import { SelectOptionsType } from "../types/filterTypes";

const dataTableFilterApi = async () => {
	const store = useStore();

	const { currentYear } = authModule.getSchool;

	const getClasses = async () => {
		return await store.dispatch("classes/find", {
			query: {
				$limit: 1000,
				year: currentYear._id,
			},
		});
	};

	await getClasses();

	const classState = store.state["classes"].list;

	const classNamesList = classState.reduce(
		(acc: SelectOptionsType[], item: { displayName: string }) =>
			acc.concat({
				label: item.displayName,
				value: item.displayName,
			}),
		[]
	);

	return {
		classNamesList,
	};
};

export const useDataTableFilterApi = createSharedComposable(dataTableFilterApi);
