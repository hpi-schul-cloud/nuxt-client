import ActivationCodePage from "./ActivationCode.page.vue";
import InfoModalFullWidth from "@/components/legacy/InfoModalFullWidth.vue";
import { initializeAxios } from "@/utils/api";
import { mockAxiosInstance } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiEmailCheckOutline, mdiEmailRemoveOutline } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";
import { VIcon } from "vuetify/components";

describe("ActivationCode.page.vue", () => {
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		axiosMock.put.mockResolvedValueOnce({ data: {} });
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const activationCode = "activation-code";
		const router = createRouterMock();
		router.setParams({ activationCode });
		injectRouterMock(router);

		const wrapper = mount(ActivationCodePage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper, activationCode };
	};

	it("should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should call activation api on mount", async () => {
		const { activationCode } = setup();

		expect(axiosMock.put).toHaveBeenCalledWith(`/v1/activation/${activationCode}`);
	});

	it("should render success modal on successful activation", async () => {
		axiosMock.put.mockReset();
		axiosMock.put.mockResolvedValue({
			data: {
				keyword: "eMailAddress",
				success: true,
			},
		});
		const { wrapper } = setup();
		await flushPromises();

		const infoModal = wrapper.getComponent(InfoModalFullWidth);
		const successIcon = infoModal.getComponent(VIcon);

		expect(infoModal.props("title")).toBe("pages.activation._activationCode.index.success.email");
		expect(infoModal.props("description")).toBe("");
		expect(successIcon.props("icon")).toBe(mdiEmailCheckOutline);
	});

	it("should render error modal on failed activation", async () => {
		axiosMock.put.mockReset();
		axiosMock.put.mockResolvedValue({
			data: {
				keyword: undefined,
				success: false,
			},
		});
		const { wrapper } = setup();
		await flushPromises();

		const infoModal = wrapper.getComponent(InfoModalFullWidth);
		const errorIcon = infoModal.getComponent(VIcon);

		expect(infoModal.props("title")).toBe("pages.activation._activationCode.index.error.title");
		expect(infoModal.props("description")).toBe("pages.activation._activationCode.index.error.description");
		expect(errorIcon.props("icon")).toBe(mdiEmailRemoveOutline);
	});

	it("should navigate to home page on modal close", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const infoModal = wrapper.getComponent(InfoModalFullWidth);
		infoModal.vm.$emit("update:model-value");

		expect(getRouter().push).toHaveBeenCalledWith({ path: "/" });
	});

	it("should have an empty description if keyword is not email address in response", async () => {
		axiosMock.put.mockReset();
		axiosMock.put.mockResolvedValue({
			data: {
				keyword: undefined,
				success: true,
			},
		});
		const { wrapper } = setup();
		await flushPromises();

		const infoModal = wrapper.getComponent(InfoModalFullWidth);

		expect(infoModal.props("description")).toBe("");
	});
});
