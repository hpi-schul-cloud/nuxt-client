import LoadingStateModule from "@store/loading-state";
import { LoadingStatePayload } from "@store/types/loading-state-payload";

describe("loading-state store", () => {
	describe("actions", () => {
		describe("show", () => {
			it("should set default values for omitted options", () => {
				const loadingStateModule = new LoadingStateModule({});
				const setLoadingStateMock = jest.spyOn(
					loadingStateModule,
					"setLoadingState"
				);
				const payload: LoadingStatePayload = { text: "Test Text" };

				loadingStateModule.open(payload);

				const expectedPayload: LoadingStatePayload = {
					...payload,
					isPersistent: true,
					hasOverlay: true,
				};

				expect(setLoadingStateMock).toHaveBeenCalledWith(expectedPayload);
			});

			it("should overwrite default values with given options", () => {
				const loadingStateModule = new LoadingStateModule({});
				const setLoadingStateMock = jest.spyOn(
					loadingStateModule,
					"setLoadingState"
				);

				const payload: LoadingStatePayload = {
					text: "Test Text",
					hasOverlay: false,
					isPersistent: false,
				};

				loadingStateModule.open(payload);

				expect(setLoadingStateMock).toHaveBeenCalledWith(payload);
			});
		});
	});
});
