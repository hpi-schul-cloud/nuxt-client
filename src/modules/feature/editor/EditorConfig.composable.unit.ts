import { mountComposable } from "@@/tests/test-utils";
import { useEditorConfig } from "./EditorConfig.composable";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { Editor } from "@ckeditor/ckeditor5-core";

describe("useEditorConfig", () => {
	const setup = () => {
		const envConfigModule: jest.Mocked<EnvConfigModule> = createModuleMocks(
			EnvConfigModule,
			{
				getFallbackLanguage: "en",
			}
		);

		const composable = mountComposable(() => useEditorConfig(), {
			global: {
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
				plugins: [createTestingI18n()],
			},
		});

		return {
			composable,
			envConfigModule,
		};
	};

	it("should be defined", () => {
		const { composable } = setup();

		expect(composable).toBeDefined();
	});

	it("should set language correctly", () => {
		const { composable } = setup();
		expect(composable.generalConfig.language).toBe("en");
	});

	it("should set localised color labels", () => {
		const { composable } = setup();

		const fontColorOliveGreen = composable.generalConfig.fontColor.colors[0];

		expect(fontColorOliveGreen.label).toBe(
			"components.editor.fonts.colors.oliveGreen"
		);

		const fontBackgroundColorIndigo =
			composable.generalConfig.fontBackgroundColor.colors[4];

		expect(fontBackgroundColorIndigo.label).toBe(
			"components.editor.fonts.colors.indigo"
		);
	});

	describe("when keydown event is triggered", () => {
		const setupEditor = ({
			btnKey,
			editorData,
			sourceElement,
		}: {
			btnKey?: string;
			editorData?: string;
			sourceElement?: HTMLElement;
		} = {}) => {
			const mockEditor = {
				editing: {
					view: {
						document: {
							on: jest.fn((event, callback) => {
								// Simulate the keydown event
								if (event === "keydown") {
									const mockEventInfo = { name: "keydown" };
									const mockKeystrokeInfo = {
										domEvent: { key: btnKey || " " },
									};
									callback(mockEventInfo, mockKeystrokeInfo);
								}
							}),
						},
					},
				},
				getData: jest.fn(() => editorData || ""),
				sourceElement: sourceElement || document.createElement("div"),
			} as unknown as Editor;

			const onDelete = jest.fn();

			const { composable } = setup();

			return {
				composable,
				mockEditor,
				onDelete,
			};
		};

		describe.each(["Backspace", "Delete"])("and %s is pressed", (key) => {
			describe("and editor is empty", () => {
				it("should call onDelete", () => {
					const { composable, mockEditor, onDelete } = setupEditor({
						btnKey: key,
						editorData: "",
					});

					composable.registerDeletionHandler(mockEditor, onDelete);

					expect(onDelete).toHaveBeenCalled();
				});
			});

			describe("and editor contains text", () => {
				it("should not call onDelete", () => {
					const { composable, mockEditor, onDelete } = setupEditor({
						btnKey: key,
						editorData: "<p>Some content</p>",
					});

					composable.registerDeletionHandler(mockEditor, onDelete);

					expect(onDelete).not.toHaveBeenCalled();
				});
				describe("and editor contains formula", () => {
					it("should not call onDelete", () => {
						const { composable, mockEditor, onDelete } = setupEditor({
							btnKey: key,
							editorData: '<p><span class="math-tex"></span></p>',
						});

						composable.registerDeletionHandler(mockEditor, onDelete);

						expect(onDelete).not.toHaveBeenCalled();
					});
				});
				describe("and editor contains a list", () => {
					it("should not call onDelete", () => {
						const sourceElement = document.createElement("div");
						sourceElement.innerHTML = "<ul><li>Item</li></ul>";
						const { composable, mockEditor, onDelete } = setupEditor({
							btnKey: key,
							editorData: "",
							sourceElement,
						});
						composable.registerDeletionHandler(mockEditor, onDelete);
						expect(onDelete).not.toHaveBeenCalled();
					});
				});
			});
		});
	});
});
