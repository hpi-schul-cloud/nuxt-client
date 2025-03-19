import BaseLink from "./BaseLink";
import { RouterLinkStub } from "@vue/test-utils";
import { logger } from "@util-logger";

describe("@/components/base/BaseLink", () => {
	const createWrapper = (options = {}) => {
		const wrapper = shallowMount(BaseLink, {
			global: {
				stubs: { RouterLink: RouterLinkStub },
			},
			...options,
		});

		return wrapper;
	};

	it("as link: renders its default slot content", () => {
		const wrapper = createWrapper({
			props: {
				href: "https://dbildungscloud.de",
			},
			slots: {
				default: "as link",
			},
		});

		expect(wrapper.html()).toContain("as link");
	});

	it("as 'router to': renders its default slot content", () => {
		const wrapper = createWrapper({
			props: {
				to: "/news",
			},
			slots: {
				default: "as 'router to'",
			},
		});

		expect(wrapper.html()).toContain("as 'router to'");
	});

	it("as 'route name': renders its default slot content", () => {
		const wrapper = createWrapper({
			props: {
				name: "news",
			},
			slots: {
				default: "as 'route name'",
			},
		});

		expect(wrapper.html()).toContain("as 'route name'");
	});

	it("renders a-tag for external links", () => {
		const wrapper = createWrapper({
			props: {
				href: "https://dbildungscloud.de",
			},
		});

		expect(wrapper.find("a").element.href).toContain(
			"https://dbildungscloud.de"
		);
	});

	it("renders router link for internal :to links", () => {
		const wrapper = createWrapper({
			props: {
				to: "/news",
			},
		});
		expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/news");
		expect(wrapper.element.tagName).not.toStrictEqual("A");
	});

	it("renders router link for internal links by name", () => {
		const wrapper = createWrapper({
			props: {
				name: "news",
			},
		});
		expect(wrapper.findComponent(RouterLinkStub).props().to.name).toBe("news");
	});

	it("log warning for insecure external urls", () => {
		// use .mockImplementation() to prevent output to console
		const loggerWarn = jest.spyOn(logger, "warn").mockImplementation();
		createWrapper({
			props: {
				href: "http://dbildungscloud.de",
			},
		});
		expect(loggerWarn).toHaveBeenCalledWith(
			expect.stringContaining("Insecure href")
		);
	});

	it("log warning for invalid props", () => {
		// use .mockImplementation() to prevent output to console
		const loggerWarn = jest.spyOn(logger, "warn").mockImplementation();

		createWrapper();

		expect(loggerWarn).toHaveBeenCalledWith(
			expect.stringContaining("Invalid props")
		);
	});
});
