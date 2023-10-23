import { mount, MountOptions } from "@vue/test-utils";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import ClassMembersInfoBox from "@/components/page-class-members/ClassMembersInfoBox.vue";
import { useSystemApi } from "@data-system";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import flushPromises from "flush-promises";

jest.mock("@data-system");

describe("ClassMembersInfoBox", () => {
	let useSystemApiMock: DeepMocked<ReturnType<typeof useSystemApi>>;

	const getWrapper = (propsData: { systemId: string }) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = mount(ClassMembersInfoBox as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData: { ...propsData },
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSystemApiMock = createMock<ReturnType<typeof useSystemApi>>();

		jest.mocked(useSystemApi).mockReturnValue(useSystemApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("alert", () => {
		const setup = async () => {
			useSystemApiMock.getSystem.mockResolvedValue({
				id: "systemId",
				displayName: "asdf",
			});

			const { wrapper } = getWrapper({
				systemId: "systemId",
			});

			await flushPromises();

			return {
				wrapper,
			};
		};

		it("should render alert component", async () => {
			const { wrapper } = await setup();

			const alert = wrapper.findComponent({ name: "v-alert" });

			expect(alert.text()).toEqual(
				'page-class-members.systemInfoText {"systemName":"asdf"}'
			);
		});
	});

	describe("text", () => {
		it("should render text", () => {
			const { wrapper } = getWrapper({
				systemId: "systemId",
			});

			const text = wrapper.find('[data-testid="class-members-info-box-text"]');

			expect(text.text()).toEqual(
				"page-class-members.classMembersInfoBox.text"
			);
		});
	});

	describe("onMounted", () => {
		it("should load the system", async () => {
			getWrapper({
				systemId: "systemId",
			});

			expect(useSystemApiMock.getSystem).toHaveBeenCalledWith("systemId");
		});
	});

	describe("watch", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				systemId: "systemId",
			});

			return {
				wrapper,
			};
		};

		it("should load the system when systemId changes", async () => {
			const { wrapper } = setup();

			wrapper.setProps({ systemId: "systemId2" });

			await Vue.nextTick();

			expect(useSystemApiMock.getSystem).toHaveBeenCalledWith("systemId");
			expect(useSystemApiMock.getSystem).toHaveBeenCalledWith("systemId2");
		});
	});
});
