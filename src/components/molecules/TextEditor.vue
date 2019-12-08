<template>
	<div class="editor">
		<editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
			<div class="menubar">
				<base-button
					data-testid="editor_undo"
					design="icon text"
					@click="commands.undo"
				>
					<base-icon source="material" icon="undo" />
				</base-button>

				<base-button
					data-testid="editor_redo"
					design="icon text"
					@click="commands.redo"
				>
					<base-icon source="material" icon="redo" />
				</base-button>

				<base-button
					data-testid="editor_format_bold"
					:design="isActive.bold() ? 'icon' : 'icon text'"
					@click="commands.bold"
				>
					<base-icon source="material" icon="format_bold" />
				</base-button>

				<base-button
					data-testid="editor_format_italic"
					:design="isActive.italic() ? 'icon' : 'icon text'"
					@click="commands.italic"
				>
					<base-icon source="material" icon="format_italic" />
				</base-button>

				<base-button
					data-testid="editor_format_underlined"
					:design="isActive.underline() ? 'icon' : 'icon text'"
					@click="commands.underline"
				>
					<base-icon source="material" icon="format_underlined" />
				</base-button>

				<base-button
					data-testid="editor_format_strikethrough"
					:design="isActive.strike() ? 'icon' : 'icon text'"
					@click="commands.strike"
				>
					<base-icon source="material" icon="format_strikethrough" />
				</base-button>

				<base-button
					data-testid="editor_format_h1"
					:design="isActive.heading({ level: 2 }) ? 'icon' : 'icon text'"
					@click="commands.heading({ level: 2 })"
				>
					H1
				</base-button>
				<base-button
					data-testid="editor_format_h2"
					:design="isActive.heading({ level: 3 }) ? 'icon' : 'icon text'"
					@click="commands.heading({ level: 3 })"
				>
					H2
				</base-button>
				<base-button
					data-testid="editor_format_h3"
					:design="isActive.heading({ level: 4 }) ? 'icon' : 'icon text'"
					@click="commands.heading({ level: 4 })"
				>
					H3
				</base-button>

				<base-button
					data-testid="editor_format_list_bulleted"
					:design="isActive.bullet_list() ? 'icon' : 'icon text'"
					:disabled="isInHeading"
					@click="commands.bullet_list"
				>
					<base-icon source="material" icon="format_list_bulleted" />
				</base-button>

				<base-button
					data-testid="editor_format_list_numbered"
					:design="isActive.ordered_list() ? 'icon' : 'icon text'"
					:disabled="isInHeading"
					@click="commands.ordered_list"
				>
					<base-icon source="material" icon="format_list_numbered" />
				</base-button>

				<base-button
					data-testid="editor_add_image"
					design="icon text"
					:disabled="isInHeading"
					@click="showImagePrompt(commands.image)"
				>
					<base-icon source="material" icon="image" />
				</base-button>
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
	border-bottom: 1px solid var(--color-gray);
}
.editor__content {
	outline: none;

	/deep/ [contenteditable="true"] {
		padding: var(--space-lg);
		outline: none;
		&:focus {
			border-bottom: 1px solid var(--color-secondary);
		}
	}
}
</style>
