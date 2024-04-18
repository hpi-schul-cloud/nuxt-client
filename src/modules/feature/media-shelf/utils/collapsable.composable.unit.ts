import { useCollapsableState } from "./collapsable.composable";

describe("collapsable.composable", () => {
	const panelName = "testPanel";

	describe("openItems", () => {
		describe("when the panel is open", () => {
			const setup = () => {
				const composable = useCollapsableState(panelName);

				composable.collapsed.value = false;

				return {
					composable,
				};
			};

			it("should have the panel name in the array", async () => {
				const { composable } = setup();

				expect(composable.openItems.value).toEqual([panelName]);
			});
		});

		describe("when the panel is collapsed", () => {
			const setup = () => {
				const composable = useCollapsableState(panelName);

				composable.collapsed.value = true;

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
				const composable = useCollapsableState(panelName);

				composable.openItems.value = [panelName];

				return {
					composable,
				};
			};

			it("should be false", async () => {
				const { composable } = setup();

				expect(composable.collapsed.value).toEqual(false);
			});
		});

		describe("when the panel is collapsed", () => {
			const setup = () => {
				const composable = useCollapsableState(panelName);

				composable.openItems.value = [];

				return {
					composable,
				};
			};

			it("should be true", async () => {
				const { composable } = setup();

				expect(composable.collapsed.value).toEqual(true);
			});
		});
	});
});
