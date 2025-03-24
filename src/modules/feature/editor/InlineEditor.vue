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
import { useEditorConfig } from "./editorConfig.composable";

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

const { locale } = useI18n();
const {
	boardHeadings,
	boardPlugins,
	boardToolbarRegular,
	boardToolbarSimple,
	newsHeadings,
	newsPlugins,
	newsToolbar,
	highlights,
} = useEditorConfig();

// eslint-disable-next-line no-console
console.log("boardHeadings", boardHeadings);

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
			options: highlights,
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
</style>
