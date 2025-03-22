<template>
	<ckeditor
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

<script>
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import CKEditor from "@ckeditor/ckeditor5-vue";
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import { useMediaQuery, useVModel } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	boardHeadings,
	boardPlugins,
	boardToolbarRegular,
	boardToolbarSimple,
	newsHeadings,
	newsPlugins,
	newsToolbar,
} from "./config";

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
		context: {
			type: String,
			default: "board",
		},
	},
	setup(props, { emit }) {
		const { t, locale } = useI18n();

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
				highlight: {
					options: [
						{
							model: "dullPinkMarker",
							class: "marker-dull-pink",
							title: t("components.editor.highlight.dullPink"),
							color: "var(--ck-highlight-marker-dull-pink)",
							type: "marker",
						},
						{
							model: "pinkMarker",
							class: "marker-pink",
							title: "Pink marker",
							color: "var(--ck-highlight-marker-pink)",
							type: "marker",
						},
						{
							model: "dullYellowMarker",
							class: "marker-dull-yellow",
							title: t("components.editor.highlight.dullYellow"),
							color: "var(--ck-highlight-marker-dull-yellow)",
							type: "marker",
						},
						{
							model: "yellowMarker",
							class: "marker-yellow",
							title: "Yellow marker",
							color: "var(--ck-highlight-marker-yellow)",
							type: "marker",
						},
						{
							model: "dullBlueMarker",
							class: "marker-dull-blue",
							title: t("components.editor.highlight.dullBlue"),
							color: "var(--ck-highlight-marker-dull-blue)",
							type: "marker",
						},
						{
							model: "blueMarker",
							class: "marker-blue",
							title: "Blue marker",
							color: "var(--ck-highlight-marker-blue)",
							type: "marker",
						},
						{
							model: "dullGreenMarker",
							class: "marker-dull-green",
							title: t("components.editor.highlight.dullGreen"),
							color: "var(--ck-highlight-marker-dull-green)",
							type: "marker",
						},
						{
							model: "greenMarker",
							class: "marker-green",
							title: "Green marker",
							color: "var(--ck-highlight-marker-green)",
							type: "marker",
						},
					],
				},
				wordCount: {
					onUpdate: (stats) => {
						charCount.value = stats.characters;
					},
				},
				language: locale.value,
				placeholder: props.placeholder,
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
			modelValue,
			CustomCKEditor,
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

.ck.ck-toolbar:not(.ck-dropdown__panel) {
	min-width: 450px;
}
</style>
