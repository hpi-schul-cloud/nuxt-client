import { getContentElementTypeMeta } from "./content-element-type-meta";
import { ContentElementType } from "@api-server";
import { mdiFormatText, mdiLink } from "@icons/material";

describe("content-element-type-meta", () => {
	it.each(Object.values(ContentElementType))("should provide an icon and a label key for %s", (type) => {
		const { icon, labelKey } = getContentElementTypeMeta(type);

		expect(icon).not.toBe("");
		expect(labelKey).not.toBe("");
	});

	it("should provide the icon and label used by the add element dialog", () => {
		expect(getContentElementTypeMeta(ContentElementType.RICH_TEXT)).toEqual({
			icon: mdiFormatText,
			labelKey: "components.elementTypeSelection.elements.textElement.subtitle",
		});
		expect(getContentElementTypeMeta(ContentElementType.LINK).icon).toBe(mdiLink);
	});
});
