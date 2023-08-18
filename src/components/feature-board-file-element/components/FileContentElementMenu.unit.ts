import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { BoardMenuAction } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import FileContentElementMenu from "./FileContentElementMenu.vue";

jest.mock("@/utils/fileHelper");

describe("FileContentElementMenu", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileContentElementMenu, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElementMenu = wrapper.findComponent(
			FileContentElementMenu
		);
		expect(fileContentElementMenu.exists()).toBe(true);
	});

	describe("move up and down board actions", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const multipleElementsSetupProps = {
				fileId: "file-id #1",
				fileName: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: true,
				isFirstElement: false,
				isLastElement: false,
				hasMultipleElements: true,
			};
			const wrapper = shallowMount(FileContentElementMenu, {
				...createComponentMocks({ i18n: true }),
				propsData: multipleElementsSetupProps,
			});

			return {
				wrapper,
			};
		};

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

		describe("when multiple elements are present", () => {
			it("should show the move up action", () => {
				const { wrapper } = setup();

				const moveUpTranslation = wrapper.vm
					.$t("components.board.action.moveUp")
					.toString();

				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(moveUpTranslation))
					.at(0);

				expect(childComponent.exists()).toBe(true);
			});

			it("should show the move down action", () => {
				const { wrapper } = setup();

				const moveDownTranslation = wrapper.vm
					.$t("components.board.action.moveDown")
					.toString();

				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(moveDownTranslation))
					.at(0);

				expect(childComponent.exists()).toBe(true);
			});

			describe("when element is at the beginning of the content elements list", () => {
				const setup = () => {
					document.body.setAttribute("data-app", "true");

					const firstElementSetupProps = {
						fileId: "file-id #1",
						fileName: "file-record #1.txt",
						url: "1/file-record #1.txt",
						isDownloadAllowed: true,
						isFirstElement: true,
						isLastElement: false,
						hasMultipleElements: true,
					};
					const wrapper = shallowMount(FileContentElementMenu, {
						...createComponentMocks({ i18n: true }),
						propsData: firstElementSetupProps,
					});

					return {
						wrapper,
					};
				};

				it("should not show the move up action", () => {
					const { wrapper } = setup();

					const moveUpTranslation = wrapper.vm
						.$t("components.board.action.moveUp")
						.toString();

					const childComponent = wrapper
						.findAllComponents(BoardMenuAction)
						.filter((c) => c.text().includes(moveUpTranslation));

					expect(childComponent.exists()).toBe(false);
				});

				it("should show the move down action", () => {
					const { wrapper } = setup();

					const moveDownTranslation = wrapper.vm
						.$t("components.board.action.moveDown")
						.toString();

					const childComponent = wrapper
						.findAllComponents(BoardMenuAction)
						.filter((c) => c.text().includes(moveDownTranslation))
						.at(0);

					expect(childComponent.exists()).toBe(true);
				});
			});

			describe("when element is at the end of the content elements list", () => {
				const setup = () => {
					document.body.setAttribute("data-app", "true");

					const lastElementSetupProps = {
						fileId: "file-id #1",
						fileName: "file-record #1.txt",
						url: "1/file-record #1.txt",
						isDownloadAllowed: true,
						isFirstElement: false,
						isLastElement: true,
						hasMultipleElements: true,
					};
					const wrapper = shallowMount(FileContentElementMenu, {
						...createComponentMocks({ i18n: true }),
						propsData: lastElementSetupProps,
					});

					return {
						wrapper,
					};
				};

				it("should show the move up action", () => {
					const { wrapper } = setup();

					const moveUpTranslation = wrapper.vm
						.$t("components.board.action.moveUp")
						.toString();

					const childComponent = wrapper
						.findAllComponents(BoardMenuAction)
						.filter((c) => c.text().includes(moveUpTranslation))
						.at(0);

					expect(childComponent.exists()).toBe(true);
				});

				it("should not show the move down action", () => {
					const { wrapper } = setup();

					const moveDownTranslation = wrapper.vm
						.$t("components.board.action.moveDown")
						.toString();

					const childComponent = wrapper
						.findAllComponents(BoardMenuAction)
						.filter((c) => c.text().includes(moveDownTranslation));

					expect(childComponent.exists()).toBe(false);
				});
			});
		});

		describe("when only a single element is present", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const singleElementSetupProps = {
					fileId: "file-id #1",
					fileName: "file-record #1.txt",
					url: "1/file-record #1.txt",
					isDownloadAllowed: true,
					isFirstElement: false,
					isLastElement: false,
					hasMultipleElements: false,
				};
				const wrapper = shallowMount(FileContentElementMenu, {
					...createComponentMocks({ i18n: true }),
					propsData: singleElementSetupProps,
				});

				return {
					wrapper,
				};
			};

			it("should not show the move up action", () => {
				const { wrapper } = setup();

				const moveUpTranslation = wrapper.vm
					.$t("components.board.action.moveUp")
					.toString();

				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(moveUpTranslation));

				expect(childComponent.exists()).toBe(false);
			});

			it("should not show the move down action", () => {
				const { wrapper } = setup();

				const moveDownTranslation = wrapper.vm
					.$t("components.board.action.moveDown")
					.toString();

				const childComponent = wrapper
					.findAllComponents(BoardMenuAction)
					.filter((c) => c.text().includes(moveDownTranslation));

				expect(childComponent.exists()).toBe(false);
			});
		});
	});

	describe("delete board action", () => {
		it("should show delete board menu action", () => {
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
	});
});
