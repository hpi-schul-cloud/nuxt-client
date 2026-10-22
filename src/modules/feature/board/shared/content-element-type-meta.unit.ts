import { getContentElementTypeMeta, isContentElementTypeEnabled } from "./content-element-type-meta";
import { createTestEnvStore } from "@@/tests/test-utils";
import { ContentElementType } from "@api-server";
import { mdiFormatText, mdiLink } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("content-element-type-meta", () => {
	it.each(Object.values(ContentElementType))("should provide an icon, a label key and a name key for %s", (type) => {
		const { icon, labelKey, nameKey } = getContentElementTypeMeta(type);

		expect(icon).not.toBe("");
		expect(labelKey).not.toBe("");
		expect(nameKey).toMatch(/^components\.cardElement\./);
	});

	it("should provide the icon and label used by the add element dialog", () => {
		expect(getContentElementTypeMeta(ContentElementType.RICH_TEXT)).toEqual({
			icon: mdiFormatText,
			labelKey: "components.elementTypeSelection.elements.textElement.subtitle",
			nameKey: "components.cardElement.richTextElement",
		});
		expect(getContentElementTypeMeta(ContentElementType.LINK).icon).toBe(mdiLink);
	});

	describe("isContentElementTypeEnabled", () => {
		beforeEach(() => {
			setActivePinia(createTestingPinia());
		});

		it.each([ContentElementType.RICH_TEXT, ContentElementType.FILE, ContentElementType.DELETED])(
			"should always enable %s",
			(type) => {
				createTestEnvStore({});

				expect(isContentElementTypeEnabled(type)).toBe(true);
			}
		);

		it.each([
			[ContentElementType.LINK, "FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED"],
			[ContentElementType.EXTERNAL_TOOL, "FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED"],
			[ContentElementType.DRAWING, "FEATURE_TLDRAW_ENABLED"],
			[ContentElementType.VIDEO_CONFERENCE, "FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED"],
			[ContentElementType.FILE_FOLDER, "FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED"],
			[ContentElementType.H5P, "FEATURE_COLUMN_BOARD_H5P_ENABLED"],
			[ContentElementType.COLLABORATIVE_TEXT_EDITOR, "FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED"],
		] as const)("should follow the feature flag for %s", (type, flag) => {
			createTestEnvStore({ [flag]: true });
			expect(isContentElementTypeEnabled(type)).toBe(true);

			createTestEnvStore({ [flag]: false });
			expect(isContentElementTypeEnabled(type)).toBe(false);
		});
	});
});
