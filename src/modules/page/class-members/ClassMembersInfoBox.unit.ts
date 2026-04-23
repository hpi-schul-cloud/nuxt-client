import ClassMembersInfoBox from "./ClassMembersInfoBox.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useSystem } from "@data-system";
import { flushPromises, mount } from "@vue/test-utils";
import { Mocked } from "vitest";
import { computed, ref } from "vue";

vi.mock("@data-system");

describe("ClassMembersInfoBox", () => {
	let useSystemMock: Mocked<ReturnType<typeof useSystem>>;

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

	const mockSystem = {
		id: "systemId",
		displayName: "asdf",
		hasEndSessionEndpoint: false,
	};

	beforeEach(() => {
		useSystemMock = mockComposable(useSystem, {
			system: ref(mockSystem),
			systemName: computed(() => mockSystem.displayName),
		});

		vi.mocked(useSystem).mockReturnValue(useSystemMock);
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
});
