import setupStores from "@@/tests/test-utils/setupStores";
import FilesOverview from "@pages/files/FilesOverview.page.vue";
import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import FilesModule from "@store/files";
import AuthModule from "@store/auth";
import { authModule } from "@utils/store-accessor";
import { User } from "@store/types/auth";
import { provide } from "@vue/composition-api";

describe("", () => {
	let wrapper: Wrapper<any>;

	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			files: FilesModule,
			auth: AuthModule,
		});

		wrapper = mount(FilesOverview, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
			},
		});
	});

	function setup() {
		const userWithPermission: Partial<User> = {
			permissions: ["collaborative_files"],
		};
		const userWithoutPermission: Partial<User> = {
			permissions: ["collaborative_files"],
		};
		return {
			userWithPermission,
			userWithoutPermission,
		};
	}

	describe("basic functions", () => {
		it("Should render component", () => {
			expect(wrapper.findComponent(FilesOverview).exists()).toBe(true);
		});
	});

	describe("basicRouteEnter", () => {
		it("", () => {
			const { userWithoutPermission } = setup();
			authModule.setUser(userWithoutPermission as User);
			const title = wrapper.find("#page-title");
			expect(title).toBeDefined();
		});
	});

	describe("t", () => {
		it("", () => {});
	});

	describe("headers", () => {
		it("", () => {});
	});

	describe("items", () => {
		it("", () => {});
	});

	describe("currentCategory", () => {
		it("", () => {});
	});

	describe("click", () => {
		it("", () => {});
	});

	describe("timesAgo", () => {
		it("", () => {});
	});
});
