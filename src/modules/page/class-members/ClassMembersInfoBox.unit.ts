import ClassMembersInfoBox from "./ClassMembersInfoBox.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useSystemApi } from "@data-system";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";

vi.mock("@data-system");

describe("ClassMembersInfoBox", () => {
	let useSystemApiMock: DeepMocked<ReturnType<typeof useSystemApi>>;

	const setup = (props = {}) => {
		const wrapper = mount(ClassMembersInfoBox, {
			props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$t: (key: string, dynamic?: object): string => key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSystemApiMock = createMock<ReturnType<typeof useSystemApi>>();

		vi.mocked(useSystemApi).mockReturnValue(useSystemApiMock);

		useSystemApiMock.getSystem.mockResolvedValue({
			id: "systemId",
			displayName: "asdf",
			hasEndSessionEndpoint: false,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("alert", () => {
		it("should render alert component", async () => {
			const { wrapper } = setup({
				systemId: "systemId",
			});

			await flushPromises();

			const alert = wrapper.findComponent({ name: "v-alert" });

			expect(alert.text()).toEqual('page-class-members.systemInfoText {"systemName":"asdf"}');
		});
	});

	describe("text", () => {
		it("should render text", () => {
			const { wrapper } = setup({
				systemId: "systemId",
			});

			const text = wrapper.find('[data-testid="class-members-info-box-text"]');

			const expectedTextParagraphes = ["firstParagraph", "secondParagraph", "thirdParagraph"]
				.map((text) => `pages.classMembers.infoBox.text.${text}`)
				.join("");

			const expectedTextListItems = ["first", "second", "third", "last"]
				.map((text) => `pages.classMembers.infoBox.text.listItem.${text}`)
				.join("");

			expect(text.text()).toEqual(expectedTextParagraphes + expectedTextListItems);
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
