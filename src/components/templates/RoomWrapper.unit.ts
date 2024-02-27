import { authModule, roomsModule } from "@/store";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import RoomWrapper from "./RoomWrapper.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import RoomsModule from "@/store/rooms";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { SpeedDialMenu } from "@ui-speed-dial-menu";

const getWrapper = (
	options: ComponentMountingOptions<typeof RoomWrapper> = {
		props: { hasRooms: true },
	}
) => {
	return mount(RoomWrapper, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				mq: () => ({
					current: "desktop",
				}),
			},
		},
		...options,
	});
};

const mockAuthStoreData = {
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	roles: ["student"],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
};

const mockData = [
	{
		id: "123",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: "2019-12-07T23:00:00.000Z",
		untilDate: "2020-12-16T23:00:00.000Z",
		titleDate: "2019/20",
	},
	{
		id: "234",
		title: "History",
		shortTitle: "Hi",
		displayColor: "#EF6C00",
		startDate: "2015-07-31T22:00:00.000Z",
		untilDate: "2018-07-30T22:00:00.000Z",
		titleDate: "2015-2018",
	},
	{
		id: "345",
		title: "Spanish",
		shortTitle: "Sp",
		displayColor: "#009688",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2021-11-05T23:00:00.000Z",
		titleDate: "2021",
	},
	{
		id: "456",
		title: "English",
		shortTitle: "En",
		displayColor: "#EC407A",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2022-07-30T22:00:00.000Z",
	},
];

describe("@templates/RoomWrapper.vue", () => {
	beforeEach(() => {
		setupStores({
			roomsModule: RoomsModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
		roomsModule.setAllElements(mockData);
	});

	describe("when data is not loaded yet", () => {
		it("should display skeleton loader", () => {
			roomsModule.setLoading(true);

			const wrapper = getWrapper({
				props: { hasRooms: false },
			});

			expect(wrapper.findComponent({ ref: "skeleton-loader" }).exists()).toBe(
				true
			);
		});
	});

	describe("when data is loaded", () => {
		describe("when data is empty", () => {
			it("should display empty state", async () => {
				const wrapper = getWrapper({
					props: { hasRooms: false },
				});

				expect(
					wrapper.findComponent({ ref: "rooms-empty-state" }).exists()
				).toBe(true);
			});
		});

		describe("when data is not empty", () => {
			it("should render page content slot", () => {
				const wrapper = getWrapper({
					props: { hasRooms: true },
					slots: {
						"page-content": "<div>Page Content</div>",
					},
				});

				expect(wrapper.html()).toContain("<div>Page Content</div>");
			});
		});
	});

	describe("when user has course create permission", () => {
		beforeEach(() => {
			authModule.setUser({
				...mockAuthStoreData,
				updatedAt: "",
				birthday: "",
				createdAt: "",
				preferences: {},
				schoolId: "",
				emailSearchValues: [],
				firstNameSearchValues: [],
				lastNameSearchValues: [],
				consent: {},
				forcePasswordChange: false,
				language: "",
				fullName: "",
				avatarInitials: "",
				avatarBackgroundColor: "",
				age: 0,
				displayName: "",
				accountId: "",
				schoolName: "",
				externallyManaged: false,
			});
		});

		it("should display fab", () => {
			const wrapper = getWrapper();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(true);
		});
	});

	describe("when user does not have course create permission", () => {
		it("should not display fab", () => {
			authModule.setUser({
				...mockAuthStoreData,
				permissions: ["aksjdhf", "poikln"],
				updatedAt: "",
				birthday: "",
				createdAt: "",
				preferences: {},
				schoolId: "",
				emailSearchValues: [],
				firstNameSearchValues: [],
				lastNameSearchValues: [],
				consent: {},
				forcePasswordChange: false,
				language: "",
				fullName: "",
				avatarInitials: "",
				avatarBackgroundColor: "",
				age: 0,
				displayName: "",
				accountId: "",
				schoolName: "",
				externallyManaged: false,
			});

			const wrapper = getWrapper();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(false);
		});
	});
});
