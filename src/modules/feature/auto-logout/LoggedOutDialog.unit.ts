import LoggedOutDialog from "./LoggedOutDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockPush = vi.fn();
vi.mock("vue-router", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

describe("LoggedOutDialog", () => {
	let wrapper: ReturnType<typeof mount>;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		wrapper?.unmount();
	});

	const setup = (isJwtExpired = false) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				applicationStore: {
					isJwtExpired,
				},
			},
		});

		wrapper = mount(LoggedOutDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), pinia],
			},
		});

		const dialog = wrapper.findComponent(SvsDialog);

		return { dialog, wrapper };
	};

	describe("Dialog Visibility", () => {
		describe("When JWT is not expired", () => {
			it("should not show", () => {
				const { dialog } = setup(false);

				expect(dialog.props("modelValue")).toBe(false);
			});
		});

		describe("When JWT expires during session", async () => {
			it("should show", async () => {
				const { dialog } = setup(true);

				expect(dialog.props("modelValue")).toBe(true);
			});

			it("should redirect to login when confirm button is clicked", async () => {
				const { dialog } = setup(true);

				dialog.vm.$emit("confirm");

				expect(mockPush).toHaveBeenCalledWith("/login");
			});

			it("should have correct title and button text", () => {
				const { dialog } = setup(true);

				expect(dialog.props("confirmBtnLangKey")).toBe("feature-loggedout.button");
				expect(dialog.props("title")).toBe("feature-loggedout.title");
			});

			it("should render with all required props", () => {
				const { dialog } = setup(true);

				expect(dialog.props("noCancel")).toBe(true);
			});

			it("should render error alert content", () => {
				const { wrapper } = setup(true);

				const warningAlert = wrapper.findComponent({ name: "ErrorAlert" });
				expect(warningAlert.exists()).toBe(true);
			});
		});
	});
});
