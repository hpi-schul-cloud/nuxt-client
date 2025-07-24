import { createTestingPinia } from "@pinia/testing";
import { createTestingVuetify } from "./../../../../../../tests/test-utils/setup/createTestingVuetify";
import { createTestingI18n } from "./../../../../../../tests/test-utils/setup/createTestingI18n";
import { useAdministrationRoomStore } from "@data-room";
import { useI18n } from "vue-i18n";
import RoomAdminTable from "./RoomAdminTable.vue";
import { mockedPiniaStoreTyping, schoolFactory } from "@@/tests/test-utils";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import SchoolsModule from "@/store/schools";
import { schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: jest.fn().mockImplementation((key: string) => key),
		}),
	};
});
const mockI18n = jest.mocked(useI18n());

describe("RoomAdminTable", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
		setupStores({
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(RoomAdminTable, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							administrationRoomStore: {
								roomList: [],
								selectedIds: [],
								loading: false,
								isEmptyList: true,
							},
						},
					}),
				],
			},
		});

		const adminRoomStore = mockedPiniaStoreTyping(useAdministrationRoomStore);

		return {
			wrapper,
			adminRoomStore,
		};
	};

	it("renders the component", () => {
		const { wrapper } = setup();
		const dataTable = wrapper.findComponent({ name: "DataTable" });

		expect(wrapper.exists()).toBe(true);
		expect(dataTable.exists()).toBe(true);
		expect(mockI18n.t).toHaveBeenCalled();
	});
});
