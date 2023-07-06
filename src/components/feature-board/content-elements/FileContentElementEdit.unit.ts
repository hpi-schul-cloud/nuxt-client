import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";

describe("FileContentElementEdit", () => {
	const generalSetupProps = () => ({
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
	});

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = generalSetupProps();
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

	describe("when multiple elements are present", () => {
		const multipleElementsSetupProps = () => ({
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

			const moveUpTranslation = wrapper.vm.$t(
				"components.board.action.moveUp"
			) as string;
			const moveDownTranslation = wrapper.vm.$t(
				"components.board.action.moveDown"
			) as string;
			const deleteTranslation = wrapper.vm.$t(
				"components.board.action.delete"
			) as string;

			const boardMenuActionsComponents =
				wrapper.findAllComponents(BoardMenuAction);

			const firstAction = boardMenuActionsComponents.at(0);
			const secondAction = boardMenuActionsComponents.at(1);
			const thirdAction = boardMenuActionsComponents.at(2);

			expect(boardMenuActionsComponents.length).toStrictEqual(3);
			expect(firstAction.text()).toContain(moveUpTranslation);
			expect(secondAction.text()).toContain(moveDownTranslation);
			expect(thirdAction.text()).toContain(deleteTranslation);
		});

		describe("when move up menu action is clicked", () => {
			it("should emit move-up:element event", async () => {
				const { wrapper } = setup();

				const moveUpTranslation = wrapper.vm.$t(
					"components.board.action.moveUp"
				) as string;
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

				const moveDownTranslation = wrapper.vm.$t(
					"components.board.action.moveDown"
				) as string;
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

				const moveDownTranslation = wrapper.vm.$t(
					"components.board.action.moveDown"
				) as string;
				const deleteTranslation = wrapper.vm.$t(
					"components.board.action.delete"
				) as string;

				const boardMenuActionsComponents =
					wrapper.findAllComponents(BoardMenuAction);

				const firstAction = boardMenuActionsComponents.at(0);
				const secondAction = boardMenuActionsComponents.at(1);

				expect(boardMenuActionsComponents.length).toStrictEqual(2);
				expect(firstAction.text()).toContain(moveDownTranslation);
				expect(secondAction.text()).toContain(deleteTranslation);
			});
		});

		describe("when element is at the end of the content elements list", () => {
			const firstElementSetupProps = () => ({
				isFirstElement: false,
				isLastElement: true,
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

				const moveUpTranslation = wrapper.vm.$t(
					"components.board.action.moveUp"
				) as string;
				const deleteTranslation = wrapper.vm.$t(
					"components.board.action.delete"
				) as string;

				const boardMenuActionsComponents =
					wrapper.findAllComponents(BoardMenuAction);

				const firstAction = boardMenuActionsComponents.at(0);
				const secondAction = boardMenuActionsComponents.at(1);

				expect(boardMenuActionsComponents.length).toStrictEqual(2);
				expect(firstAction.text()).toContain(moveUpTranslation);
				expect(secondAction.text()).toContain(deleteTranslation);
			});
		});
	});

	describe("when only a single element is present", () => {
		const singleElementSetupProps = () => ({
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

			const deleteTranslation = wrapper.vm.$t(
				"components.board.action.delete"
			) as string;

			const boardMenuActionsComponents =
				wrapper.findAllComponents(BoardMenuAction);

			const action = boardMenuActionsComponents.at(0);

			expect(boardMenuActionsComponents.length).toStrictEqual(1);
			expect(action.text()).toContain(deleteTranslation);
		});
	});
});
