<template>
	<div class="editor">
		<editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
			<div class="menubar">
				<v-btn
					icon
					color="secondary"
					data-testid="editor_undo"
					@click="commands.undo"
				>
					<base-icon source="material" icon="undo" />
				</v-btn>
				<v-btn
					data-testid="editor_redo"
					icon
					color="secondary"
					@click="commands.redo"
				>
					<base-icon source="material" icon="redo" />
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.bold()"
					:fab="isActive.bold()"
					data-testid="editor_format_bold"
					@click="commands.bold"
				>
					<base-icon source="material" icon="format_bold" />
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.italic()"
					:fab="isActive.italic()"
					data-testid="editor_format_italic"
					@click="commands.italic"
				>
					<base-icon source="material" icon="format_italic" />
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.underline()"
					:fab="isActive.underline()"
					data-testid="editor_format_underlined"
					@click="commands.underline"
				>
					<base-icon source="material" icon="format_underlined" />
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.strike()"
					:fab="isActive.strike()"
					data-testid="editor_format_strikethrough"
					@click="commands.strike"
				>
					<base-icon source="material" icon="format_strikethrough" />
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.heading({ level: 2 })"
					:fab="isActive.heading({ level: 2 })"
					data-testid="editor_format_h1"
					@click="commands.heading({ level: 2 })"
				>
					H1
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.heading({ level: 3 })"
					:fab="isActive.heading({ level: 3 })"
					data-testid="editor_format_h2"
					@click="commands.heading({ level: 3 })"
				>
					H2
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.heading({ level: 4 })"
					:fab="isActive.heading({ level: 4 })"
					data-testid="editor_format_h3"
					@click="commands.heading({ level: 4 })"
				>
					H3
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.bullet_list()"
					:fab="isActive.bullet_list()"
					data-testid="editor_format_list_bulleted"
					:disabled="isInHeading"
					@click="commands.bullet_list"
				>
					<base-icon source="material" icon="format_list_bulleted" />
				</v-btn>
				<v-btn
					color="secondary"
					width="36"
					height="36"
					depressed
					:icon="!isActive.ordered_list()"
					:fab="isActive.ordered_list()"
					data-testid="editor_format_list_numbered"
					:disabled="isInHeading"
					@click="commands.ordered_list"
				>
					<base-icon source="material" icon="format_list_numbered" />
				</v-btn>
				<v-btn
					data-testid="editor_add_image"
					icon
					color="secondary"
					:disabled="isInHeading"
					@click="showImagePrompt(commands.image)"
				>
					<base-icon source="material" icon="image" />
				</v-btn>
			</div>
		</editor-menu-bar>

		<editor-content
			v-model="content"
			class="editor__content"
			:editor="editor"
		/>
	</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
	Bold,
	BulletList,
	HardBreak,
	Heading,
	History,
	Image,
	Italic,
	Link,
	ListItem,
	OrderedList,
	Strike,
	Underline,
	Placeholder,
} from "tiptap-extensions";

export default {
	components: {
		EditorContent,
		EditorMenuBar,
	},
	model: {
		prop: "value",
		event: "update",
	},
	props: {
		value: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			editor: new Editor({
				extensions: [
					new Bold(),
					new BulletList(),
					new HardBreak(),
					new Heading({ levels: [2, 3, 4] }),
					new History(),
					new Image(),
					new Italic(),
					new Link(),
					new ListItem(),
					new OrderedList(),
					new Strike(),
					new Underline(),
					new Placeholder({
						emptyEditorClass: "is-editor-empty",
						emptyNodeClass: "is-empty",
						emptyNodeText: this.placeholder,
						showOnlyWhenEditable: true,
						showOnlyCurrent: true,
					}),
				],
				content: this.value,
				onUpdate: this.editorUpdateHandler,
			}),
			content: "",
		};
	},
	computed: {
		isInHeading() {
			return (
				this.editor.isActive.heading({ level: 2 }) ||
				this.editor.isActive.heading({ level: 3 }) ||
				this.editor.isActive.heading({ level: 4 })
			);
		},
	},
	watch: {
		value(to) {
			if (to !== this.content) {
				this.editor.setContent(to);
			}
		},
	},
	beforeDestroy() {
		this.editor.destroy();
	},
	methods: {
		editorUpdateHandler({ getHTML }) {
			const content = getHTML();
			const error = this.isInvalid(content);
			if (error) {
				this.$toast.error(error);
				this.editor.commands.undo();
			} else {
				this.content = content;
				this.$emit("update", content);
			}
		},
		showImagePrompt(command) {
			const src = prompt("Bitte gib die URL deines Bildes hier ein:");
			if (src !== null) {
				command({ src });
			}
		},
		isInvalid(content) {
			let error = false;
			if (content.includes(`src="data:`)) {
				error = this.$t("components.molecules.TextEditor.noLocalFiles");
			}
			return error;
		},
	},
};
</script>
<style lang="scss" scoped>
.menubar {
	padding-bottom: var(--space-xs-2);
	border-bottom: 1px solid var(--v-grey-base);
}

.editor__content {
	outline: none;

	::v-deep [contenteditable="true"] {
		padding: var(--space-lg);
		outline: none;

		&:focus {
			border-bottom: 1px solid var(--v-primary-base);
		}
	}

	::v-deep *.is-empty:first-child::before {
		float: left;
		height: 0;
		color: var(--v-grey-base);
		pointer-events: none;
		content: attr(data-empty-text);
	}
}
</style>
