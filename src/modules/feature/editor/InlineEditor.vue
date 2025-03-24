<template>
	<Editor
		ref="ck"
		v-model="modelValue"
		:editor="CustomCKEditor.InlineEditor"
		:config="config"
		data-testid="ckeditor"
		:disabled="disabled"
		class="palla"
		@blur="handleBlur"
		@focus="handleFocus"
		@ready="handleReady"
	/>
</template>

<script setup lang="ts">
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import CKEditor from "@ckeditor/ckeditor5-vue";
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import { useMediaQuery, useVModel } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useEditorConfig } from "./EditorConfig.composable";

const props = defineProps({
	value: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	mode: {
		type: String,
		default: "regular",
	},
	disabled: {
		type: Boolean,
	},
	autofocus: {
		type: Boolean,
	},
	viewportOffsetTop: {
		type: Number,
		default: 0,
	},
});

const emit = defineEmits([
	"ready",
	"focus",
	"update:value",
	"blur",
	"keyboard",
	"keyboard:delete",
]);

const Editor = CKEditor.component;

const { t, locale } = useI18n();
const {
	boardHeadings,
	boardPlugins,
	boardToolbarRegular,
	boardToolbarSimple,
	newsHeadings,
	newsPlugins,
	newsToolbar,
} = useEditorConfig();

const ck = ref(null);
const modelValue = useVModel(props, "value", emit);

const charCount = ref(0);

const toolbarItems = {
	simple: boardToolbarSimple,
	regular: boardToolbarRegular,
	news: newsToolbar,
};

const plugins = {
	simple: boardPlugins,
	regular: boardPlugins,
	news: newsPlugins,
};

const headings = {
	simple: boardHeadings,
	regular: boardHeadings,
	news: newsHeadings,
};

const config = computed(() => {
	return {
		toolbar: {
			items: toolbarItems[props.mode],
			shouldNotGroupWhenFull: showFullToolbar.value,
		},
		plugins: plugins[props.mode],
		heading: headings[props.mode],
		link: {
			defaultProtocol: "//",
			addTargetToExternalLinks: true,
		},
		wordCount: {
			onUpdate: (stats) => {
				charCount.value = stats.characters;
			},
		},
		language: locale.value,
		placeholder: props.placeholder,
		fontColor: {
			// Using the following colors from the vuetify color palette:
			// lime-darken-4, green-darken-2, cyan-darken-3, blue-darken-2, indigo, deep-purple, purple, pink-darken-1, red-darken-2
			// Some colors are translated by CKEditor itself
			colors: [
				{
					color: "#827717",
					label: t("components.editor.fonts.colors.oliveGreen"),
				},
				{ color: "#388E3C", label: "Green" },
				{ color: "#00838F", label: "Turquoise" },
				{ color: "#1976D2", label: "Blue" },
				{
					color: "#3F51B5",
					label: t("components.editor.fonts.colors.indigo"),
				},
				{
					color: "#673AB7",
					label: t("components.editor.fonts.colors.darkPurple"),
				},
				{ color: "#9C27B0", label: "Purple" },
				{
					color: "#D81B60",
					label: t("components.editor.fonts.colors.pink"),
				},
				{ color: "#D32F2F", label: "Red" },
			],
		},
		fontBackgroundColor: {
			// Using the following colors from the vuetify color palette:
			// light-green-lighten-4, green-lighten-4, cyan-lighten-4, blue-lighten-4, indigo-lighten-4, purple-lighten-4, pink-lighten-4, deep-orange-lighten-4, amber-lighten-4
			// Some colors are translated by CKEditor itself
			colors: [
				{ color: "#DCEDC8", label: "Light green" },
				{ color: "#C8E6C9", label: "Green" },
				{ color: "#B2EBF2", label: "Turquoise" },
				{ color: "#BBDEFB", label: "Blue" },
				{
					color: "#C5CAE9",
					label: t("components.editor.fonts.colors.indigo"),
				},
				{
					color: "#E1BEE7",
					label: t("components.editor.fonts.colors.darkPurple"),
				},
				{
					color: "#F8BBD0",
					label: t("components.editor.fonts.colors.pink"),
				},
				{ color: "#FFCCBC", label: "Orange" },
				{
					color: "#FFECB3",
					label: "Yellow",
				},
			],
		},
		ui: {
			viewportOffset: {
				top: 220,
			},
		},
	};
});

const handleFocus = () => emit("focus");
const handleBlur = () => emit("blur");
const handleDelete = () => {
	if (charCount.value === 0) {
		emit("keyboard:delete");
	}
};

const handleReady = (editor) => {
	emit("ready");

	if (props.autofocus) {
		editor.editing.view.focus();
	}

	// attach additional event listener not provided by vue wrapper itself
	// for more infos on editor instance, see https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
	editor.editing.view.document.on("keydown", (evt, data) => {
		if (data.domEvent.key === "Backspace" || data.domEvent.key === "Delete") {
			handleDelete();
		}
	});
};

const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);
const showFullToolbar = computed(() => {
	return props.mode === "simple" && !isMobile.value;
});
</script>

<style lang="scss">
@import "@/styles/settings.scss";
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";

:root {
	--ck-highlight-marker-dull-blue: hsl(203, 64%, 86%);
	--ck-highlight-marker-dull-green: hsl(91, 27%, 85%);
	--ck-highlight-marker-dull-pink: hsl(341, 57%, 88%);
	--ck-highlight-marker-dull-yellow: hsl(28, 67%, 86%);

	// z-index must be less than z-index of the headers to prevent that the toolbar is shown in front of the headers when scrolling.
	--ck-z-modal: 15;
}

.ck-content {
	.marker-dull-pink {
		background-color: var(--ck-highlight-marker-dull-pink);
	}
	.marker-dull-yellow {
		background-color: var(--ck-highlight-marker-dull-yellow);
	}
	.marker-dull-blue {
		background-color: var(--ck-highlight-marker-dull-blue);
	}
	.marker-dull-green {
		background-color: var(--ck-highlight-marker-dull-green);
	}
	ul,
	ol {
		padding-left: revert;
	}
}

.ck-blurred {
	border: none !important;
}

.ck-focused {
	border: none !important;
	box-shadow: none !important;
}

@media #{map-get($display-breakpoints, "sm-and-up")} {
	.ck.ck-toolbar:not(.ck-dropdown__panel) {
		min-width: 450px;
	}
}

.ck-math-tex {
	font-size: large;
}
</style>
