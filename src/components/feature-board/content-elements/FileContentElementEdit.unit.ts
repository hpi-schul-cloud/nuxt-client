import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";

describe("FileContentElementEdit", () => {
	const setupProps = () => ({
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
	});

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps();
		const wrapper = shallowMount(FileContentElementEdit, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			urlProp: propsData.url,
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

		const fileName = wrapper.find("v-list-item-title-stub").text();

		expect(fileName).toBe(fileNameProp);
	});

	describe("when delete board menu action is clicked", () => {
		it("should emit delete:element event", async () => {
			const { wrapper } = setup();

			const deleteTranslation = wrapper.vm.$t(
				"components.board.action.delete"
			) as string;
			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(deleteTranslation))
				.at(0);
			childComponent.vm.$emit("click");

			expect(wrapper.emitted("delete:element")?.length).toBe(1);
		});
	});
});
