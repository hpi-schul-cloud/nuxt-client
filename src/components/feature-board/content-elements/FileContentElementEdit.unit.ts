import { downloadFile } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
jest.mock("@/utils/fileHelper");

describe("FileContentElementEdit", () => {
	const setupProps = (isBlocked: boolean | undefined = undefined) => ({
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
		isBlocked: isBlocked ?? false,
	});

	const setup = (isBlocked: boolean | undefined = undefined) => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps(isBlocked);
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
			isBlockedProp: propsData.isBlocked,
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

	describe("when file is blocked", () => {
		it("should find delete board menu action", () => {
			const { wrapper } = setup(true);

			const deleteTranslation = wrapper.vm
				.$t("components.board.action.delete")
				.toString();
			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(deleteTranslation))
				.at(0);

			expect(childComponent.exists()).toBe(true);
		});

		it("should NOT find download board menu action", () => {
			const { wrapper } = setup(true);

			const downloadTranslation = wrapper.vm.$t(
				"components.board.action.download"
			) as string;
			const childComponents = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(downloadTranslation));

			expect(childComponents.length).toBe(0);
		});
	});

	describe("when file is NOT blocked", () => {
		it("should find delete board menu action", () => {
			const { wrapper } = setup();

			const deleteTranslation = wrapper.vm
				.$t("components.board.action.delete")
				.toString();
			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(deleteTranslation))
				.at(0);

			expect(childComponent.exists()).toBe(true);
		});

		it("should find download board menu action", () => {
			const { wrapper } = setup();

			const downloadTranslation = wrapper.vm.$t(
				"components.board.action.download"
			) as string;
			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(downloadTranslation))
				.at(0);

			expect(childComponent.exists()).toBe(true);
		});

		describe("when delete board menu action is clicked", () => {
			it("should emit delete:element event", async () => {
				const { wrapper } = setup();

				const deleteTranslation = wrapper.vm
					.$t("components.board.action.delete")
					.toString();
				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(deleteTranslation))
					.at(0);
				childComponent.vm.$emit("click");

				expect(wrapper.emitted("delete:element")?.length).toBe(1);
			});
		});

		describe("when download board menu action is clicked", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const downloadFileMock = jest
					.mocked(downloadFile)
					.mockReturnValueOnce();

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
					downloadFileMock,
				};
			};

			it("should download file", async () => {
				const { wrapper, urlProp, fileNameProp, downloadFileMock } = setup();

				const downloadTranslation = wrapper.vm.$t(
					"components.board.action.download"
				) as string;
				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(downloadTranslation))
					.at(0);

				childComponent.vm.$emit("click");

				expect(downloadFileMock).toHaveBeenCalledTimes(1);
				expect(downloadFileMock).toHaveBeenCalledWith(urlProp, fileNameProp);
			});
		});
	});
});
