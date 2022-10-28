import { authModule, envConfigModule, roomsModule } from "@/store";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import RoomWrapper from "./RoomWrapper.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import RoomsModule from "@/store/rooms";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import Vue from "vue";

const getWrapper = (
	options: any = {
		propsData: { hasRooms: true },
		computed: { $mq: () => "desktop", isLoading: () => false },
	}
) => {
	return mount(RoomWrapper, {
		...createComponentMocks({
			i18n: true,
		}),
		...options,
	});
};

const mockAuthStoreData = {
	__v: 0,
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
	let wrapper: Wrapper<Vue>;

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			roomsModule: RoomsModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
		roomsModule.setAllElements(mockData as any);
	});

	describe("when data is not loaded yet", () => {
		it("should display skeleton loader", () => {
			wrapper = getWrapper({
				props: { hasRooms: false },
				computed: { $mq: () => "desktop", isLoading: () => true },
			});

			expect(wrapper.findComponent({ ref: "skeleton-loader" }).exists()).toBe(
				true
			);

			wrapper.destroy();
		});
	});

	describe("when data is loaded", () => {
		describe("when data is empty", () => {
			it("should display empty state", () => {
				wrapper = getWrapper({
					props: { hasRooms: false },
					computed: { $mq: () => "desktop", isLoading: () => false },
				});

				expect(
					wrapper.findComponent({ ref: "rooms-empty-state" }).exists()
				).toBe(true);

				wrapper.destroy();
			});
		});

		describe("when data is not empty", () => {
			it("should render page content slot", () => {
				wrapper = getWrapper({
					propsData: { hasRooms: true },
					computed: { $mq: () => "desktop", isLoading: () => false },
					slots: {
						"page-content": "<div>Page Content</div>",
					},
				});

				expect(wrapper.html()).toContain("<div>Page Content</div>");

				wrapper.destroy();
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

			const fabComponent = wrapper.find(".wireframe-fab");
			expect(fabComponent.exists()).toBe(true);
		});

		it("should open the import-modal", async () => {
			//@ts-ignore
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true });
			const wrapper = getWrapper();

			const importModalComponent = wrapper.find(".import-modal");
			//@ts-ignore
			expect(importModalComponent.vm.isOpen).toBe(false);

			const fab = wrapper.find(".wireframe-fab");
			await fab.trigger("click");

			const importBtn = wrapper.find(
				'[data-testid="fab_button_import_course"]'
			);
			await importBtn.trigger("click");

			//@ts-ignore
			expect(importModalComponent.vm.isOpen).toBe(true);
		});

		it("should call the updateRooms method if import-modal component emits 'update-rooms' event", async () => {
			const updateRoomsMock = jest.fn();
			const wrapper = getWrapper();
			//@ts-ignore
			wrapper.vm.updateRooms = updateRoomsMock;
			await wrapper.setData({ importDialog: { isOpen: true } });

			const importModalComponent = wrapper.find(".import-modal");
			await importModalComponent.vm.$emit("update-rooms");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(updateRoomsMock).toHaveBeenCalled();
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

			const fabComponent = wrapper.find(".wireframe-fab");
			expect(fabComponent.exists()).toBe(false);

			wrapper.destroy();
		});
	});
});
