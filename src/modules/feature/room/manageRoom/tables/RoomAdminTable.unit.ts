import { createTestingPinia } from "@pinia/testing";
import { createTestingVuetify } from "./../../../../../../tests/test-utils/setup/createTestingVuetify";
import { createTestingI18n } from "./../../../../../../tests/test-utils/setup/createTestingI18n";
import { useAdministrationRoomStore } from "@data-room";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import RoomAdminTable from "./RoomAdminTable.vue";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";

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
