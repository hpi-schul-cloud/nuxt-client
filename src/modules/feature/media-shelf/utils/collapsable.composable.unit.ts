import { useCollapsableState } from "./collapsable.composable";
import { ref } from "vue";

describe("collapsable.composable", () => {
	const panelName = "testPanel";

	describe("openItems", () => {
		describe("when the panel is open", () => {
			const setup = () => {
				const collapsed = ref(false);

				const composable = useCollapsableState(panelName, collapsed);

				return {
					composable,
					collapsed,
				};
			};

			it("should have the panel name in the array", async () => {
				const { composable } = setup();

				expect(composable.openItems.value).toEqual([panelName]);
			});
		});

		describe("when the panel is collapsed", () => {
			const setup = () => {
				const collapsed = ref(true);

				const composable = useCollapsableState(panelName, collapsed);

				return {
					composable,
				};
			};

			it("should not have the panel name in the array", async () => {
				const { composable } = setup();

				expect(composable.openItems.value).toEqual([]);
			});
		});
	});

	describe("collapsed", () => {
		describe("when the panel is open", () => {
			const setup = () => {
				const collapsed = ref(false);

				const composable = useCollapsableState(panelName, collapsed);

				composable.openItems.value = [panelName];

				return {
					composable,
					collapsed,
				};
			};

			it("should be false", async () => {
				const { collapsed } = setup();

				expect(collapsed.value).toEqual(false);
			});
		});

		describe("when the panel is collapsed", () => {
			const setup = () => {
				const collapsed = ref(false);

				const composable = useCollapsableState(panelName, collapsed);

				composable.openItems.value = [];

				return {
					composable,
					collapsed,
				};
			};

			it("should be true", async () => {
				const { collapsed } = setup();

				expect(collapsed.value).toEqual(true);
			});
		});
	});
});
