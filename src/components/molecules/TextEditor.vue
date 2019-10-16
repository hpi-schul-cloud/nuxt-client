<template>
	<div class="editor">
		<editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
			<div class="menubar">
				<base-button design="icon text" @click="commands.undo">
					<base-icon source="material" icon="undo" />
				</base-button>

				<base-button design="icon text" @click="commands.redo">
					<base-icon source="material" icon="redo" />
				</base-button>

				<base-button
					:design="isActive.bold() ? 'icon' : 'icon text'"
					@click="commands.bold"
				>
					<base-icon source="material" icon="format_bold" />
				</base-button>

				<base-button
					:design="isActive.italic() ? 'icon' : 'icon text'"
					@click="commands.italic"
				>
					<base-icon source="material" icon="format_italic" />
				</base-button>

				<base-button
					:design="isActive.underline() ? 'icon' : 'icon text'"
					@click="commands.underline"
				>
					<base-icon source="material" icon="format_underlined" />
				</base-button>

				<base-button
					:design="isActive.strike() ? 'icon' : 'icon text'"
					@click="commands.strike"
				>
					<base-icon source="material" icon="strikethrough_s" />
				</base-button>

				<base-button
					:design="isActive.heading({ level: 1 }) ? 'icon' : 'icon text'"
					@click="commands.heading({ level: 1 })"
				>
					H1
				</base-button>
				<base-button
					:design="isActive.heading({ level: 2 }) ? 'icon' : 'icon text'"
					@click="commands.heading({ level: 2 })"
				>
					H2
				</base-button>
				<base-button
					:design="isActive.heading({ level: 3 }) ? 'icon' : 'icon text'"
					@click="commands.heading({ level: 3 })"
				>
					H3
				</base-button>

				<base-button
					:design="isActive.bullet_list() ? 'icon' : 'icon text'"
					@click="commands.bullet_list"
				>
					<base-icon source="material" icon="format_list_bulleted" />
				</base-button>

				<base-button
					:design="isActive.ordered_list() ? 'icon' : 'icon text'"
					@click="commands.ordered_list"
				>
					<base-icon source="material" icon="format_list_numbered" />
				</base-button>

				<base-button
					design="icon text"
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
					new Heading({ levels: [1, 2, 3] }),
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
				onUpdate: ({ getHTML }) => {
					this.content = getHTML();
					this.$emit("update", getHTML());
				},
			}),
			content: "",
		};
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
		showImagePrompt(command) {
			const src = prompt("Bitte gib die URL deines Bildes hier ein:");
			if (src !== null) {
				command({ src });
			}
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
