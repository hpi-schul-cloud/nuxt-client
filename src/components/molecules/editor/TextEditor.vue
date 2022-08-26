<template>
	<div v-if="editor" class="editor">
		<div class="default-menu">
			<div>
				Simple:
				<base-button
					data-testid="editor_undo"
					:class="{ 'is-active': editor.isActive('undo') }"
					@click="editor.chain().focus().undo().run()"
				>
					<base-icon source="material" icon="undo" />
				</base-button>

				<base-button
					data-testid="editor_redo"
					:class="{ 'is-active': editor.isActive('redo') }"
					@click="editor.chain().focus().redo().run()"
				>
					<base-icon source="material" icon="redo" />
				</base-button>

				<base-button
					data-testid="editor_format_bold"
					:class="{ 'is-active': editor.isActive('bold') }"
					@click="editor.chain().focus().toggleBold().run()"
				>
					<base-icon source="material" icon="format_bold" />
				</base-button>

				<base-button
					data-testid="editor_format_italic"
					:class="{ 'is-active': editor.isActive('italic') }"
					@click="editor.chain().focus().toggleItalic().run()"
				>
					<base-icon source="material" icon="format_italic" />
				</base-button>

				<base-button
					data-testid="editor_format_underlined"
					:class="{ 'is-active': editor.isActive('underline') }"
					@click="editor.chain().focus().toggleUnderline().run()"
				>
					<base-icon source="material" icon="format_underlined" />
				</base-button>

				<base-button
					data-testid="editor_format_strikethrough"
					:class="{ 'is-active': editor.isActive('strike') }"
					@click="editor.chain().focus().toggleStrike().run()"
				>
					<base-icon source="material" icon="format_strikethrough" />
				</base-button>

				<base-button
					data-testid="editor_format_h1"
					:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				>
					H1
				</base-button>
				<base-button
					data-testid="editor_format_h2"
					:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				>
					H2
				</base-button>
				<base-button
					data-testid="editor_format_h3"
					:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				>
					H3
				</base-button>

				<base-button
					data-testid="editor_format_list_bulleted"
					:class="{ 'is-active': editor.isActive('bulletList') }"
					:disabled="isInHeading"
					@click="editor.chain().focus().toggleBulletList().run()"
				>
					<base-icon source="material" icon="format_list_bulleted" />
				</base-button>

				<base-button
					data-testid="editor_format_list_numbered"
					:class="{ 'is-active': editor.isActive('orderedList') }"
					:disabled="isInHeading"
					@click="editor.chain().focus().toggleOrderedList().run()"
				>
					<base-icon source="material" icon="format_list_numbered" />
				</base-button>

				<base-button
					:class="{ 'is-active': editor.isActive('link') }"
					@click="setLink"
				>
					<base-icon source="material" icon="link" />
				</base-button>
				<base-button
					:disabled="!editor.isActive('link')"
					@click="editor.chain().focus().unsetLink().run()"
				>
					<base-icon source="material" icon="link_off" />
				</base-button>
			</div>

			<!-- Advanced toolbar actions -->
			<div v-if="advancedFeatures">
				Advanced:
				<base-button
					data-testid="editor_table"
					:class="{ 'is-active': editor.isActive('table') }"
					@click="
						editor
							.chain()
							.focus()
							.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
							.run()
					"
				>
					<base-icon source="material" icon="table_chart" />
				</base-button>
				<base-button
					data-testid="editor_add_image"
					:class="{ 'is-active': editor.isActive('undo') }"
					@click="showImagePrompt"
				>
					<base-icon source="material" icon="image" />
				</base-button>
				<base-button
					data-testid="editor_audio"
					:class="{ 'is-active': editor.isActive('audio') }"
					@click="showAudioPrompt"
				>
					<base-icon source="material" icon="music_note" />
				</base-button>
				<base-button
					data-testid="editor_video"
					:class="{ 'is-active': editor.isActive('video') }"
					@click="showVideoPrompt"
				>
					<base-icon source="material" icon="movie" />
				</base-button>
			</div>
			<!-- end advanced toolbar actions -->

			<!-- context-menu for tables -->
			<div v-if="showTableMenu">
				Table:
				<base-button
					data-testid="editor_table_add_column_before"
					@click="editor.chain().focus().addColumnBefore().run()"
				>
					addColumnBefore
				</base-button>
				<base-button
					data-testid="editor_table_add_column_after"
					@click="editor.chain().focus().addColumnAfter().run()"
				>
					addColumnAfter
				</base-button>
				<base-button
					data-testid="editor_table_add_row_before"
					@click="editor.chain().focus().addRowBefore().run()"
				>
					addRowBefore
				</base-button>
				<base-button
					data-testid="editor_table_add_row_after"
					@click="editor.chain().focus().addRowAfter().run()"
				>
					addRowAfter
				</base-button>
				<base-button
					data-testid="editor_table_delete_row"
					@click="editor.chain().focus().deleteRow().run()"
				>
					deleteRow
				</base-button>
				<base-button
					data-testid="editor_table_delete_column"
					@click="editor.chain().focus().deleteColumn().run()"
				>
					deleteColumn
				</base-button>
				<base-button @click="editor.chain().focus().mergeCells().run()">
					mergeCells
				</base-button>
				<base-button @click="editor.chain().focus().splitCell().run()">
					splitCell
				</base-button>
			</div>
			<!-- end-context-based menu for tables -->
		</div>

		<editor-content class="editor__content" :editor="editor" />
	</div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Audio from "./extensions/Audio";
import Video from "./extensions/Video";
import Math from "./extensions/Math";

import Span from "./extensions/Span";

export default {
	components: {
		EditorContent,
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
		readonly: {
			type: Boolean,
		},
		advancedFeatures: {
			type: Boolean,
		},
	},
	data() {
		return {
			editor: null,
			scrollTimer: -1,
			pageOffset: 0,
		};
	},
	computed: {
		isInHeading() {
			return (
				this.editor.isActive("heading", { level: 2 }) ||
				this.editor.isActive("heading", { level: 3 }) ||
				this.editor.isActive("heading", { level: 4 })
			);
		},
		showTableMenu() {
			return this.editor.isActive("table");
		},
	},
	watch: {
		value(value) {
			// HTML
			const isSame = this.editor.getHTML() === value;

			// JSON
			// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

			if (isSame) {
				return;
			}

			this.editor.commands.setContent(value, false);
		},
	},

	mounted() {
		this.editor = new Editor({
			content: this.value,
			editable: !this.readonly,
			extensions: [
				StarterKit.configure({
					blockquote: true,
					text: true,
				}),
				HardBreak,
				Heading.configure({ levels: [2, 3, 4] }),
				Underline,
				Link.configure({ openOnClick: false }),
				Subscript,
				Superscript,
				Span,
				Placeholder.configure({ placeholder: this.placeholder }), // seems not to work
				...(this.advancedFeatures
					? [
							Table.configure({
								resizable: true,
							}),
							TableRow,
							TableHeader,
							TableCell,
							Audio,
							Video,
							Math,
							Image,
					  ]
					: []),
			],
			onUpdate: this.editorUpdateHandler,
		});
	},

	beforeDestroy() {
		this.editor.destroy();
	},

	methods: {
		editorUpdateHandler() {
			console.log(this.editor.getJSON());

			const content = this.editor.getHTML();
			const error = this.isInvalid(content);
			if (error) {
				this.$toast.error(error);
				this.editor.commands.undo();
			} else {
				//this.content = content;
				this.$emit("update", content);
				//this.$emit("input", content);
			}
			//MathJax.Hub.Typeset();
		},
		showImagePrompt() {
			const src = window.prompt("Bitte gib die URL deines Bildes hier ein:");
			if (src !== null) {
				this.editor.chain().focus().setImage({ src }).run();
			}
		},
		showAudioPrompt() {
			const url = window.prompt("Audio File", "http://192.168.1.136/musik.mp3");
			if (url) {
				this.editor.chain().focus().setAudio({ src: url }).run();
			}
		},
		showVideoPrompt() {
			const url = window.prompt("Video File", "http://192.168.1.136/film.mp4");
			if (url) {
				this.editor.chain().focus().setVideo({ src: url }).run();
			}
		},
		isInvalid(content) {
			let error = false;
			if (content.includes(`src="data:`)) {
				error = this.$t("components.molecules.TextEditor.noLocalFiles");
			}
			return error;
		},
		setLink() {
			const previousUrl = this.editor.getAttributes("link").href;
			const url = window.prompt("URL", previousUrl);

			// cancelled
			if (url === null) {
				return;
			}

			// empty
			if (url === "") {
				this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
				return;
			}
			// update link
			this.editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		},
	},
};
</script>
<style lang="scss" scoped>
.default-menu {
	position: sticky;
	top: var(--sticky-header-height);
	z-index: var(--layer-sticky-header);
	padding-top: var(--space-xs-2);
	padding-bottom: var(--space-xs-2);
	background-color: var(--color-white);
	border-bottom: 1px solid var(--color-gray);
}

.editor__content {
	z-index: var(--layer-sticky-page);
	outline: none;

	::v-deep [contenteditable="true"] {
		padding: var(--space-lg);
		outline: none;

		&:focus {
			border-bottom: 1px solid var(--color-primary);
		}
	}

	::v-deep *.is-empty:first-child::before {
		float: left;
		height: 0;
		color: var(--color-gray);
		pointer-events: none;
		content: attr(data-empty-text);
	}

	::v-deep blockquote {
		position: relative;
		width: 80%;
		padding: var(--radius-lg);
		margin: var(--radius-lg) auto;
		color: var(--color-warning);
		text-align: center;
	}

	::v-deep blockquote::before,
	::v-deep blockquote::after {
		position: absolute;
		font-size: var(--sidebar-sub-item-height);
		color: var(--color-warning);
	}

	::v-deep blockquote::before {
		right: 100%;
		bottom: calc(-1 * var(--radius-lg));
		margin-right: calc(-1 * var(--radius-lg));
		content: '"';
	}

	::v-deep blockquote::after {
		top: calc(-1 * var(--radius-lg));
		bottom: auto;
		left: 100%;
		margin-left: calc(-1 * var(--radius-lg));
		content: '"';
	}

	:root {
		--z-index-2: 2;
	}

	::v-deep table {
		width: 100%;
		margin: 0;
		overflow: hidden;
		table-layout: fixed;
		border-collapse: collapse;

		td,
		th {
			position: relative;
			min-width: var(--radius-lg);
			padding: var(--border-width-bold) calc(3 * var(--border-width-bold));
			overflow: hidden;
			vertical-align: top;
			border: var(--border-width-bold) solid #ced4da;

			> * {
				margin-bottom: 0;
			}
		}

		th {
			font-weight: var(--font-weight-bold);
			text-align: left;
			background: #f1f3f5;
		}

		/* stylelint-disable-next-line */
		.selectedCell::after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: var(--z-index-2);
			pointer-events: none;
			content: "";
			background: rgba(200, 200, 255, 0.4);
		}

		.column-resize-handle {
			position: absolute;
			top: 0;
			right: -2px;
			bottom: -2px;
			width: 4px;
			pointer-events: none;
			background: #adf;
		}

		p {
			margin: 0;
		}
	}
}

button.is-active {
	background-color: var(--color-secondary-dark);
}
</style>
