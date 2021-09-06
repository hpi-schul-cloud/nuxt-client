import { AutoLogoutModule } from "./autoLogout";

describe("autoLogout module", () => {
	describe("actions", () => {
		it("init should call setInit mutation", async () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const spySetInit = jest.fn();

			autoLogoutModule.setInit = spySetInit;

			await autoLogoutModule.init();
			expect(spySetInit).toHaveBeenCalled();
		});
		it("extendSession should call setActive mutation", async () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const spySetActive = jest.fn();

			autoLogoutModule.setActive = spySetActive;

			expect(spySetActive).not.toHaveBeenCalled();
			await autoLogoutModule.extendSessionAction();
			expect(spySetActive).toHaveBeenCalled();
		});
	});
	describe("mutations", () => {
		it("setActive should set active and error values", () => {
			const autoLogoutModule = new AutoLogoutModule({});
			expect(autoLogoutModule.active).toBe(false);
			expect(autoLogoutModule.error).toBe(false);

			autoLogoutModule.setActive(true, true);

			expect(autoLogoutModule.active).toBe(true);
			expect(autoLogoutModule.error).toBe(true);
		});
		it("setToastValue should set toastValue value", () => {
			const autoLogoutModule = new AutoLogoutModule({});

			expect(autoLogoutModule.toastValue).toBeNull();
			autoLogoutModule.setToastValue(1);
			expect(autoLogoutModule.toastValue).toBe(1);
		});
		it("setReaminingTimeInSeconds should set remainingTimeInSeconds value", () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const mockValue = 12345;

			expect(autoLogoutModule.remainingTimeInSeconds).not.toBe(mockValue);
			autoLogoutModule.setRemainingTimeInSeconds(mockValue);
			expect(autoLogoutModule.remainingTimeInSeconds).toBe(mockValue);
		});
		describe("when setInit is called with no paramater", () => {
			it("should set a default value for showWarningOnRemainingSeconds", () => {
				const autoLogoutModule = new AutoLogoutModule({});
				const showWarningDefaultValue = 3600;
				autoLogoutModule.setInit();
				expect(autoLogoutModule.showWarningOnRemainingSeconds).toBe(
					showWarningDefaultValue
				);
			});
			it("should set a default value for defaultRemainingTimeInSeconds", () => {
				const autoLogoutModule = new AutoLogoutModule({});
				const remainigTimeDefaultValue = 3600 * 2;
				autoLogoutModule.setInit();

				expect(autoLogoutModule.defaultRemainingTimeInSeconds).toBe(
					remainigTimeDefaultValue
				);
			});
		});
		describe("when setInit is called with defined parameters", () => {
			it("should set the parameter as value for showWarningOnRemainingSeconds", () => {
				const autoLogoutModule = new AutoLogoutModule({});
				const showWarningMockValue = 123;
				autoLogoutModule.setInit(showWarningMockValue);
				expect(autoLogoutModule.showWarningOnRemainingSeconds).toBe(
					showWarningMockValue
				);
			});
			it("should set the parameter as value for defaultRemainingTimeInSeconds", () => {
				const autoLogoutModule = new AutoLogoutModule({});
				const remainigTimeMockValue = 456;

				autoLogoutModule.setInit(undefined, remainigTimeMockValue);
				expect(autoLogoutModule.defaultRemainingTimeInSeconds).toBe(
					remainigTimeMockValue
				);
			});
		});
	});
	describe("getters", () => {
		it("getActive should retrieve the active object", () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const activeMockValue = true;

			expect(autoLogoutModule.getActive).not.toBe(activeMockValue);
			autoLogoutModule.active = activeMockValue;
			expect(autoLogoutModule.getActive).toBe(activeMockValue);
		});
		it("getError should retrieve the error object", () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const errorMockValue = true;

			expect(autoLogoutModule.getError).not.toBe(errorMockValue);
			autoLogoutModule.error = errorMockValue;
			expect(autoLogoutModule.getError).toBe(errorMockValue);
		});
		it("getRemainigTimeInSeconds should retrieve the remainigTimeInSeconds object", () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const remainigMock = 12345;

			expect(autoLogoutModule.getRemainingTimeInSeconds).not.toBe(remainigMock);
			autoLogoutModule.remainingTimeInSeconds = remainigMock;
			expect(autoLogoutModule.getRemainingTimeInSeconds).toBe(remainigMock);
		});
		it("getToastValue should retrieve the toastValue object", () => {
			const autoLogoutModule = new AutoLogoutModule({});
			const toastMockValue = 456;

			expect(autoLogoutModule.getToastValue).not.toBe(toastMockValue);
			autoLogoutModule.toastValue = toastMockValue;
			expect(autoLogoutModule.getToastValue).toBe(toastMockValue);
		});
	});
});
