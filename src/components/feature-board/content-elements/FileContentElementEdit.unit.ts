import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";
jest.mock("@/utils/fileHelper");

describe("FileContentElementEdit", () => {
	const setupProps = (isDownloadAllowed?: boolean) => ({
		fileId: "file-id #1",
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
		isDownloadAllowed: isDownloadAllowed ?? true,
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	});

	const setup = (isDownloadAllowed?: boolean) => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps(isDownloadAllowed);
		const wrapper = shallowMount(FileContentElementEdit, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			isDownloadAllowedProp: propsData.isDownloadAllowed,
			urlProp: propsData.url,
			isFirstElementProp: propsData.isFirstElement,
			isLastElementProp: propsData.isLastElement,
			hasMultipleElementsProp: propsData.hasMultipleElements,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementEdit);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const fileIcon = wrapper.find("v-icon-stub");

		expect(fileIcon.exists()).toBe(true);
	});

	it("should find file name", async () => {
		const { wrapper, fileNameProp } = setup();

		const fileName = wrapper.find("span").text();

		expect(fileName).toBe(fileNameProp);
	});

	it("should render the FileContentElementMenu", () => {
		const { wrapper } = setup(true);

		const menu = wrapper.findComponent(FileContentElementMenu);

		expect(menu.exists()).toBe(true);
	});

	it("should hand over fileName prop correctly to FileContentElementMenu", () => {
		const { wrapper, fileNameProp } = setup(true);

		const fileName = wrapper
			.findComponent(FileContentElementMenu)
			.props("fileName");

		expect(fileName).toBe(fileNameProp);
	});

	it("should hand over url prop correctly to FileContentElementMenu", () => {
		const { wrapper, urlProp } = setup(true);

		const url = wrapper.findComponent(FileContentElementMenu).props("url");

		expect(url).toBe(urlProp);
	});

	it("should hand over isDownloadAllowed prop correctly to FileContentElementMenu", () => {
		const { wrapper, isDownloadAllowedProp } = setup(true);

		const isDownloadAllowed = wrapper
			.findComponent(FileContentElementMenu)
			.props("isDownloadAllowed");

		expect(isDownloadAllowed).toBe(isDownloadAllowedProp);
	});

	it("should hand over isFirstElement prop correctly to FileContentElementMenu", () => {
		const { wrapper, isFirstElementProp } = setup(true);

		const isFirstElement = wrapper
			.findComponent(FileContentElementMenu)
			.props("isFirstElement");

		expect(isFirstElement).toBe(isFirstElementProp);
	});

	it("should hand over isLastElement prop correctly to FileContentElementMenu", () => {
		const { wrapper, isLastElementProp } = setup(true);

		const isLastElement = wrapper
			.findComponent(FileContentElementMenu)
			.props("isLastElement");

		expect(isLastElement).toBe(isLastElementProp);
	});

	it("should hand over hasMultipleElements prop correctly to FileContentElementMenu", () => {
		const { wrapper, hasMultipleElementsProp } = setup(true);

		const hasMultipleElements = wrapper
			.findComponent(FileContentElementMenu)
			.props("hasMultipleElements");

		expect(hasMultipleElements).toBe(hasMultipleElementsProp);
	});

	it("should forward delete:element from FileContentElementMenu", () => {
		const { wrapper } = setup(true);
		const menu = wrapper.findComponent(FileContentElementMenu);

		menu.vm.$emit("delete:element");

		expect(wrapper.emitted("delete:element")).toHaveLength(1);
	});

	it("should forward move-down:element from FileContentElementMenu", () => {
		const { wrapper } = setup(true);
		const menu = wrapper.findComponent(FileContentElementMenu);

		menu.vm.$emit("move-down:element");

		expect(wrapper.emitted("move-down:element")).toHaveLength(1);
	});

	it("should forward move-down:up from FileContentElementMenu", () => {
		const { wrapper } = setup(true);
		const menu = wrapper.findComponent(FileContentElementMenu);

		menu.vm.$emit("move-up:element");

		expect(wrapper.emitted("move-up:element")).toHaveLength(1);
	});
});
