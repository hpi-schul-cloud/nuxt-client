import { createTestingI18n } from "@@/tests/test-utils/setup";
import { Invitations } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

describe("Invitations", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);
	});

	const setup = (roomInvitationLinks = []) => {
		const wrapper = shallowMount(Invitations, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomInvitationLinkStore: {
								isLoading: false,
								roomInvitationLinks,
							},
						},
					}),
				],
			},
		});
		return { wrapper };
	};

	it("should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render info text", () => {
		const { wrapper } = setup();
		const infoText = wrapper.get("[data-testid=info-text]");

		expect(infoText.text()).toBe(
			"pages.rooms.members.tab.invitations.infoText"
		);
	});
});
