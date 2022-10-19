import contentMeta from "./contentMeta";

const contentMetaTypes = {
	default: {
		i18nKey: "mixins.typeMeta.types.default",
		icon: "ic_default",
		iconLarge: "ic_default-circle",
		iconSource: "custom",
	},
	"text/html": {
		i18nKey: "mixins.typeMeta.types.webpage",
		icon: "ic_link",
		iconLarge: "ic_link-circle",
		iconSource: "custom",
	},
	"image/jpeg": {
		i18nKey: "mixins.typeMeta.types.image",
		icon: "ic_image",
		iconLarge: "ic_image-circle",
		iconSource: "custom",
	},
	"image/png": {
		i18nKey: "mixins.typeMeta.types.image",
		icon: "ic_image",
		iconLarge: "ic_image-circle",
		iconSource: "custom",
	},
	audio: {
		i18nKey: "mixins.typeMeta.types.audio",
		icon: "ic_sound",
		iconLarge: "ic_sound-circle",
		iconSource: "custom",
	},
	video: {
		i18nKey: "mixins.typeMeta.types.video",
		icon: "ic_video",
		iconLarge: "ic_video-circle",
		iconSource: "custom",
	},
	"application/pdf": {
		i18nKey: "mixins.typeMeta.types.document",
		icon: "ic_pdf",
		iconLarge: "ic_pdf-circle",
		iconSource: "custom",
	},
	"application/msword": {
		i18nKey: "mixins.typeMeta.types.document",
		icon: "ic_word",
		iconLarge: "ic_word-circle",
		iconSource: "custom",
	},
};

describe("@/mixins/contentMeta", () => {
	it("should return valid content defaultly", () => {
		expect(contentMeta.methods.getType("nonesence")).toStrictEqual(
			expect.objectContaining({
				icon: "ic_default",
			})
		);
	});

	it("should return valid icon for video", () => {
		expect(contentMeta.methods.getTypeIcon("video")).toStrictEqual(
			expect.objectContaining({
				iconLarge: "ic_video-circle",
			})
		);
	});

	it("should return valid icons for all types", () => {
		for (const metaTypeKey in contentMetaTypes) {
			const metaTypeValue = contentMetaTypes[metaTypeKey];
			expect(contentMeta.methods.getTypeIcon(metaTypeKey)).toStrictEqual(
				expect.objectContaining({
					iconLarge: metaTypeValue.iconLarge,
					icon: metaTypeValue.icon,
					iconSource: metaTypeValue.iconSource,
				})
			);
		}
	});
});
