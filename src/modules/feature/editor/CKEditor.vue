<template>
	<ckeditor
		ref="ck"
		v-model="modelValue"
		:editor="editor"
		:config="config"
		data-testid="ckeditor"
		:disabled="disabled"
		@blur="handleBlur"
		@focus="handleFocus"
		@ready="handleReady"
	/>
</template>

<script>
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { BalloonEditor, ClassicEditor } from "@hpi-schul-cloud/ckeditor";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import { useMediaQuery, useVModel } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useEditorConfig } from "./EditorConfig.composable";
import katex from "katex";
window.katex = katex;

export default defineComponent({
	name: "CkEditor",
	components: {
		ckeditor: CKEditor.component,
	},
	emits: [
		"ready",
		"focus",
		"update:value",
		"blur",
		"keyboard",
		"keyboard:delete",
	],
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: [String, undefined],
			default: "",
		},
		type: {
			type: String,
			validator: (value) => ["classic", "balloon", "inline"].includes(value),
			default: "classic",
		},
		mode: {
			type: String,
			validator: (value) => ["simple", "regular", "news"].includes(value),
			default: "regular",
		},
		disabled: {
			type: Boolean,
		},
		autofocus: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
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
		const editor = computed(() => {
			return props.type === "classic" ? ClassicEditor : BalloonEditor;
		});

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
				if (
					data.domEvent.key === "Backspace" ||
					data.domEvent.key === "Delete"
				) {
					handleDelete();
				}
			});
		};

		const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);
		const showFullToolbar = computed(() => {
			return props.mode === "simple" && !isMobile.value;
		});

		return {
			ck,
			editor,
			modelValue,
			config,
			charCount,
			handleBlur,
			handleFocus,
			handleDelete,
			handleReady,
		};
	},
});
</script>

<style lang="scss">
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";
@import "katex/dist/katex.min.css";

.ck-content {
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

.ck.ck-toolbar {
	border: none;
}
</style>
