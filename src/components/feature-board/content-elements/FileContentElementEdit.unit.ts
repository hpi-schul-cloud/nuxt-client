import { downloadFile } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
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
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			urlProp: propsData.url,
			isDownloadAllowedProp: propsData.isDownloadAllowed,
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

	describe("when download is NOT allowed", () => {
		it("should find delete board menu action", () => {
			const { wrapper } = setup(false);

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
			const { wrapper } = setup(false);

			const downloadTranslation = wrapper.vm
				.$t("components.board.action.download")
				.toString();
			const childComponents = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(downloadTranslation));

			expect(childComponents.length).toBe(0);
		});
	});

	describe("when download is allowed", () => {
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

			const downloadTranslation = wrapper.vm
				.$t("components.board.action.download")
				.toString();
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

				const downloadTranslation = wrapper.vm
					.$t("components.board.action.download")
					.toString();
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

	describe("when multiple elements are present", () => {
		const multipleElementsSetupProps = () => ({
			fileId: "file-id #1",
			fileName: "file-record #1.txt",
			url: "1/file-record #1.txt",
			isDownloadAllowed: true,
			isFirstElement: false,
			isLastElement: false,
			hasMultipleElements: true,
		});

		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const propsData = multipleElementsSetupProps();
			const wrapper = shallowMount(FileContentElementEdit, {
				...createComponentMocks({ i18n: true }),
				propsData,
			});

			return {
				wrapper,
			};
		};

		it("should show all board menu items", () => {
			const { wrapper } = setup();

			const moveUpTranslation = wrapper.vm
				.$t("components.board.action.moveUp")
				.toString();
			const moveDownTranslation = wrapper.vm
				.$t("components.board.action.moveDown")
				.toString();
			const downloadTranslation = wrapper.vm
				.$t("components.board.action.download")
				.toString();
			const deleteTranslation = wrapper.vm
				.$t("components.board.action.delete")
				.toString();

			const boardMenuActionsComponents =
				wrapper.findAllComponents(BoardMenuAction);

			console.log(wrapper.overview());

			const firstAction = boardMenuActionsComponents.at(0);
			const secondAction = boardMenuActionsComponents.at(1);
			const thirdAction = boardMenuActionsComponents.at(2);
			const fourthAction = boardMenuActionsComponents.at(3);

			expect(boardMenuActionsComponents.length).toStrictEqual(4);
			expect(firstAction.text()).toContain(moveUpTranslation);
			expect(secondAction.text()).toContain(moveDownTranslation);
			expect(thirdAction.text()).toContain(downloadTranslation);
			expect(fourthAction.text()).toContain(deleteTranslation);
		});

		describe("when move up menu action is clicked", () => {
			it("should emit move-up:element event", async () => {
				const { wrapper } = setup();

				const moveUpTranslation = wrapper.vm
					.$t("components.board.action.moveUp")
					.toString();
				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(moveUpTranslation))
					.at(0);
				childComponent.vm.$emit("click");

				expect(wrapper.emitted("move-up:element")?.length).toBe(1);
			});
		});

		describe("when move down menu action is clicked", () => {
			it("should emit move-down:element event", async () => {
				const { wrapper } = setup();

				const moveDownTranslation = wrapper.vm
					.$t("components.board.action.moveDown")
					.toString();
				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(moveDownTranslation))
					.at(0);
				childComponent.vm.$emit("click");

				expect(wrapper.emitted("move-down:element")?.length).toBe(1);
			});
		});

		describe("when element is at the beginning of the content elements list", () => {
			const firstElementSetupProps = () => ({
				fileId: "file-id #1",
				fileName: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: true,
				isFirstElement: true,
				isLastElement: false,
				hasMultipleElements: true,
			});

			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const propsData = firstElementSetupProps();
				const wrapper = shallowMount(FileContentElementEdit, {
					...createComponentMocks({ i18n: true }),
					propsData,
				});

				return {
					wrapper,
				};
			};

			it("should show show only limited board menu items", () => {
				const { wrapper } = setup();

				const moveDownTranslation = wrapper.vm
					.$t("components.board.action.moveDown")
					.toString();
				const downloadTranslation = wrapper.vm
					.$t("components.board.action.download")
					.toString();
				const deleteTranslation = wrapper.vm
					.$t("components.board.action.delete")
					.toString();

				const boardMenuActionsComponents =
					wrapper.findAllComponents(BoardMenuAction);

				const firstAction = boardMenuActionsComponents.at(0);
				const secondAction = boardMenuActionsComponents.at(1);
				const thirdAction = boardMenuActionsComponents.at(2);

				expect(boardMenuActionsComponents.length).toStrictEqual(3);
				expect(firstAction.text()).toContain(moveDownTranslation);
				expect(secondAction.text()).toContain(downloadTranslation);
				expect(thirdAction.text()).toContain(deleteTranslation);
			});
		});

		describe("when element is at the end of the content elements list", () => {
			const lastElementSetupProps = () => ({
				fileId: "file-id #1",
				fileName: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: true,
				isFirstElement: false,
				isLastElement: true,
				hasMultipleElements: true,
			});

			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const propsData = lastElementSetupProps();
				const wrapper = shallowMount(FileContentElementEdit, {
					...createComponentMocks({ i18n: true }),
					propsData,
				});

				return {
					wrapper,
				};
			};
			it("should show show only limited board menu items", () => {
				const { wrapper } = setup();

				const moveUpTranslation = wrapper.vm
					.$t("components.board.action.moveUp")
					.toString();
				const downloadTranslation = wrapper.vm
					.$t("components.board.action.download")
					.toString();
				const deleteTranslation = wrapper.vm
					.$t("components.board.action.delete")
					.toString();

				const boardMenuActionsComponents =
					wrapper.findAllComponents(BoardMenuAction);

				const firstAction = boardMenuActionsComponents.at(0);
				const secondAction = boardMenuActionsComponents.at(1);
				const thirdAction = boardMenuActionsComponents.at(2);

				expect(boardMenuActionsComponents.length).toStrictEqual(3);
				expect(firstAction.text()).toContain(moveUpTranslation);
				expect(secondAction.text()).toContain(downloadTranslation);
				expect(thirdAction.text()).toContain(deleteTranslation);
			});
		});
	});

	describe("when only a single element is present", () => {
		const singleElementSetupProps = () => ({
			fileId: "file-id #1",
			fileName: "file-record #1.txt",
			url: "1/file-record #1.txt",
			isDownloadAllowed: true,
			isFirstElement: false,
			isLastElement: false,
			hasMultipleElements: false,
		});

		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const propsData = singleElementSetupProps();
			const wrapper = shallowMount(FileContentElementEdit, {
				...createComponentMocks({ i18n: true }),
				propsData,
			});

			return {
				wrapper,
			};
		};
		it("should only show one board menu item", () => {
			const { wrapper } = setup();

			const downloadTranslation = wrapper.vm
				.$t("components.board.action.download")
				.toString();
			const deleteTranslation = wrapper.vm
				.$t("components.board.action.delete")
				.toString();

			const boardMenuActionsComponents =
				wrapper.findAllComponents(BoardMenuAction);

			const firstAction = boardMenuActionsComponents.at(0);
			const secondAction = boardMenuActionsComponents.at(1);

			expect(boardMenuActionsComponents.length).toStrictEqual(2);
			expect(firstAction.text()).toContain(downloadTranslation);
			expect(secondAction.text()).toContain(deleteTranslation);
		});
	});
});
