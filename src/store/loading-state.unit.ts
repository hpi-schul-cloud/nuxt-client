import LoadingStateModule from "@/store/loading-state";
import { LoadingStatePayload } from "@/store/types/loading-state-payload";

describe("loading-state store", () => {
	describe("actions", () => {
		describe("open", () => {
			it("should set default values for omitted options", () => {
				const loadingStateModule = new LoadingStateModule({});
				const setLoadingStateMock = vi.spyOn(loadingStateModule, "setLoadingState");
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
				const setLoadingStateMock = vi.spyOn(loadingStateModule, "setLoadingState");

				const payload: LoadingStatePayload = {
					text: "Test Text",
					hasOverlay: false,
					isPersistent: false,
				};

				loadingStateModule.open(payload);

				expect(setLoadingStateMock).toHaveBeenCalledWith(payload);
			});
		});

		describe("close", () => {
			it("should change loading state", () => {
				const loadingStateModule = new LoadingStateModule({});
				loadingStateModule.open({
					text: "Test Text",
					hasOverlay: true,
					isPersistent: false,
				});
				expect(loadingStateModule.getIsOpen).toBe(true);
				loadingStateModule.close();
				expect(loadingStateModule.getIsOpen).toBe(false);
			});
		});
	});

	describe("getters", () => {
		describe("getIsOpen", () => {
			it("should initially return false", () => {
				const loadingStateModule = new LoadingStateModule({});
				expect(loadingStateModule.getIsOpen).toBe(false);
			});

			it("should return true after opening the dialog", () => {
				const loadingStateModule = new LoadingStateModule({});
				loadingStateModule.open({ text: "Test" });
				expect(loadingStateModule.getIsOpen).toBe(true);
			});
		});

		describe("getLoadingState", () => {
			it("should return given loading state", () => {
				const payload: LoadingStatePayload = {
					text: "Test Text",
					hasOverlay: false,
					isPersistent: false,
				};
				const loadingStateModule = new LoadingStateModule({});
				loadingStateModule.open(payload);
				expect(loadingStateModule.getLoadingState).toEqual(payload);
			});
		});
	});
});
