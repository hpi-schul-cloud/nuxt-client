const types = Object.freeze({
	default: {
		i18nKey: "mixins.typeMeta.types.default",
		icon: "local_library",
		iconSource: "material",
	},
	"text/html": {
		i18nKey: "mixins.typeMeta.types.webpage",
		icon: "link",
		iconSource: "material",
	},
	"image/jpeg": {
		i18nKey: "mixins.typeMeta.types.image",
		icon: "file-image-o",
		iconSource: "fa",
	},
	"image/png": {
		i18nKey: "mixins.typeMeta.types.image",
		icon: "file-image-o",
		iconSource: "fa",
	},
	audio: {
		i18nKey: "mixins.typeMeta.types.audio",
		icon: "file-audio-o",
		iconSource: "fa",
	},
	video: {
		i18nKey: "mixins.typeMeta.types.video",
		icon: "ondemand_video",
		iconSource: "material",
	},
	"application/pdf": {
		i18nKey: "mixins.typeMeta.types.document",
		icon: "file-pdf-o",
		iconSource: "fa",
	},
});

const contentMeta = {
	methods: {
		getType(type) {
			return types[type];
		},
		getTypeI18nName(type) {
			const options = types[type] || types.default;
			return this.$t(options.i18nKey);
		},
		getTypeIcon(type) {
			const options = types[type] || types.default;
			return { icon: options.icon, iconSource: options.iconSource };
		},
	},
};

export default contentMeta;
