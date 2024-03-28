import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ClassMembersInfoBox from "./ClassMembersInfoBox.vue";
import { useSystemApi } from "@data-system";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

jest.mock("@data-system");

describe("ClassMembersInfoBox", () => {
	let useSystemApiMock: DeepMocked<ReturnType<typeof useSystemApi>>;

	const setup = (props = {}) => {
		const wrapper = mount(ClassMembersInfoBox, {
			props,
			global: {
				plugins: [createTestingVuetify(), vueDompurifyHTMLPlugin],
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSystemApiMock = createMock<ReturnType<typeof useSystemApi>>();

		jest.mocked(useSystemApi).mockReturnValue(useSystemApiMock);

		useSystemApiMock.getSystem.mockResolvedValue({
			id: "systemId",
			displayName: "asdf",
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("alert", () => {
		it("should render alert component", async () => {
			const { wrapper } = setup({
				systemId: "systemId",
			});

			await flushPromises();

			const alert = wrapper.findComponent({ name: "v-alert" });

			expect(alert.text()).toEqual(
				'page-class-members.systemInfoText {"systemName":"asdf"}'
			);
		});
	});

	describe("text", () => {
		it("should render text", () => {
			const { wrapper } = setup({
				systemId: "systemId",
			});

			const text = wrapper.find('[data-testid="class-members-info-box-text"]');

			expect(text.text()).toEqual(
				"page-class-members.classMembersInfoBox.text"
			);
		});
	});

	describe("onMounted", () => {
		it("should load the system", () => {
			setup({
				systemId: "systemId",
			});

			expect(useSystemApiMock.getSystem).toHaveBeenCalledWith("systemId");
		});
	});

	describe("watch", () => {
		it("should load the system when systemId changes", async () => {
			const { wrapper } = setup({
				systemId: "systemId",
			});

			wrapper.setProps({ systemId: "systemId2" });

			await nextTick();

			expect(useSystemApiMock.getSystem).toHaveBeenCalledWith("systemId");
			expect(useSystemApiMock.getSystem).toHaveBeenCalledWith("systemId2");
		});
	});
});
