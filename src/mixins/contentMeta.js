const types = Object.freeze({
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
	"text/directory": {
		i18nKey: "mixins.typeMeta.types.document",
		icon: "ic_collection",
		iconLarge: "ic_collection-circle",
		iconSource: "custom",
	},
});

const contentMeta = {
	methods: {
		getType(type) {
			return types[type] || types.default;
		},
		getTypeI18nName(type) {
			return this.$t(this.getType(type).i18nKey);
		},
		getTypeIcon(type) {
			const options = this.getType(type);
			return {
				icon: options.icon,
				iconLarge: options.iconLarge,
				iconSource: options.iconSource,
			};
		},
	},
};

export default contentMeta;
