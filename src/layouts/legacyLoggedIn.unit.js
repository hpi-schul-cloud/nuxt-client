import legacyLoggedIn from "./legacyLoggedIn";
import AuthModule from "@/store/auth";
import FilePathsModule from "@/store/filePaths";

const $route = {
	query: {
		id: "mockId",
	},
	path: "/administration/students/",
};

const $router = { push: jest.fn() };
AuthModule.setUser({
	permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
	roles: [{ name: "administrator" }],
});
AuthModule.setAccessToken("asdf");

FilePathsModule.setSpecificFiles("https://dbildungscloud.de");

describe("legacyLoggedIn", () => {
	it(...isValidComponent(legacyLoggedIn));
	it("should mark active links", () => {
		const wrapper = mount(legacyLoggedIn, {
			...createComponentMocks({ i18n: true, $router, $route }),
		});
		const administrationListItem = wrapper.find("[data-testId='Verwaltung']");
		const studentAdministrationListItem = wrapper.find(
			"[data-testId='Schüler:innen']"
		);
		expect(
			administrationListItem.element.classList.contains("child-active")
		).toBeTrue();
		expect(
			studentAdministrationListItem.element.classList.contains("active")
		).toBeTrue();
	});
});
