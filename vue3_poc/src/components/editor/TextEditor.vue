<template>
	<div v-if="editor" class="editor">
		<div class="default-menu">
			<div>
				<strong>Simple</strong><br />
				<button
					:class="{ 'is-active': editor.isActive('undo') }"
					@click="editor.chain().focus().undo().run()"
				>
					undo
				</button>

				<button
					:class="{ 'is-active': editor.isActive('redo') }"
					@click="editor.chain().focus().redo().run()"
				>
					redo
				</button>

				<button
					:class="{ 'is-active': editor.isActive('bold') }"
					@click="editor.chain().focus().toggleBold().run()"
				>
					bold
				</button>

				<button
					:class="{ 'is-active': editor.isActive('italic') }"
					@click="editor.chain().focus().toggleItalic().run()"
				>
					italic
				</button>

				<button
					:class="{ 'is-active': editor.isActive('underline') }"
					@click="editor.chain().focus().toggleUnderline().run()"
				>
					underline
				</button>

				<button
					:class="{ 'is-active': editor.isActive('strike') }"
					@click="editor.chain().focus().toggleStrike().run()"
				>
					strikethrough
				</button>

				<button
					:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				>
					H1
				</button>
				<button
					:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				>
					H2
				</button>
				<button
					:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				>
					H3
				</button>

				<button
					:class="{ 'is-active': editor.isActive('bulletList') }"
					:disabled="isInHeading"
					@click="editor.chain().focus().toggleBulletList().run()"
				>
					list_bulleted
				</button>

				<button
					:class="{ 'is-active': editor.isActive('orderedList') }"
					:disabled="isInHeading"
					@click="editor.chain().focus().toggleOrderedList().run()"
				>
					list_numbered
				</button>

				<button
					:class="{ 'is-active': editor.isActive('link') }"
					@click="setLink"
				>
					link
				</button>
				<button
					:disabled="!editor.isActive('link')"
					@click="editor.chain().focus().unsetLink().run()"
				>
					link_off
				</button>
			</div>

			<!-- Advanced toolbar actions -->
			<div v-if="advancedFeatures">
				<strong>Advanced</strong><br />
				<button
					:class="{ 'is-active': editor.isActive('table') }"
					@click="
						editor
							.chain()
							.focus()
							.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
							.run()
					"
				>
					table
				</button>
				<button
					:class="{ 'is-active': editor.isActive('undo') }"
					@click="showImagePrompt"
				>
					image
				</button>
				<button
					:class="{ 'is-active': editor.isActive('audio') }"
					@click="showAudioPrompt"
				>
					audio
				</button>
				<button
					:class="{ 'is-active': editor.isActive('video') }"
					@click="showVideoPrompt"
				>
					video
				</button>
				<button
					:class="{ 'is-active': editor.isActive('math') }"
					@click="addMath"
				>
					math
				</button>
			</div>
			<!-- end advanced toolbar actions -->

			<div v-if="editor.isActive('table')">
				<strong>Table</strong><br />
				<button @click="deleteTable">delete table</button>
				<button @click="editor.chain().focus().addColumnBefore().run()">
					add column before
				</button>
				<button @click="editor.chain().focus().addColumnAfter().run()">
					add column after
				</button>
				<button @click="editor.chain().focus().addRowBefore().run()">
					add row before
				</button>
				<button @click="editor.chain().focus().addRowAfter().run()">
					add row after
				</button>
				<button @click="editor.chain().focus().deleteRow().run()">
					delete row
				</button>
				<button @click="editor.chain().focus().deleteColumn().run()">
					delete column
				</button>
				<button @click="editor.chain().focus().mergeCells().run()">
					merge cells
				</button>
				<button @click="editor.chain().focus().splitCell().run()">
					split cell
				</button>
			</div>

			<div style="display: none">
				<button @click="editor.chain().focus().addColumnBefore().run()">
					add column before
				</button>
				<button @click="editor.chain().focus().addColumnAfter().run()">
					add column after
				</button>
				<button @click="editor.chain().focus().addRowBefore().run()">
					add row before
				</button>
				<button @click="editor.chain().focus().addRowAfter().run()">
					add row after
				</button>
				<button @click="editor.chain().focus().deleteRow().run()">
					delete row
				</button>
				<button @click="editor.chain().focus().deleteColumn().run()">
					delete column
				</button>
				<button @click="editor.chain().focus().mergeCells().run()">
					merge cells
				</button>
				<button @click="editor.chain().focus().splitCell().run()">
					split cell
				</button>
			</div>
		</div>

		<editor-content class="editor__content" :editor="editor" />
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
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

export default defineComponent({
	name: "TiptapProofOfConcept",
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

	beforeUnmount() {
		this.editor.destroy();
	},

	methods: {
		editorUpdateHandler() {
			//console.log(this.editor.getJSON());
			//const content = this.editor.getHTML();
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
		addMath() {
			this.editor.chain().focus().addMath().run();
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
});
</script>
<style lang="scss" scoped>
.default-menu {
	position: sticky;
	top: 0;
	/* stylelint-disable-next-line */
	z-index: 99;
	/* stylelint-disable-next-line */
	padding: 1rem;
	/* stylelint-disable-next-line */
	background-color: #fefefe;
	/* stylelint-disable-next-line */
	margin-bottom: 2rem;
	border-bottom: 2px solid #000;

	button {
		/* stylelint-disable-next-line */
		border: solid 2px #000;
		/* stylelint-disable-next-line */
		margin: 5px 10px 5px 0;
		/* stylelint-disable-next-line */
		padding: 3px;
	}
}

.editor__content {
	/* stylelint-disable-next-line */
	z-index: 1;
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

	::v-deep img {
		width: 100%;
		height: auto;
	}

	::v-deep table {
		width: 100%;
		/* stylelint-disable-next-line */
		margin: 1rem 0 0 0;
		overflow: hidden;
		table-layout: fixed;
		border-collapse: collapse;

		td,
		th {
			position: relative;
			min-width: var(--radius-lg);
			/* stylelint-disable-next-line */
			padding: 2px 6px;
			overflow: hidden;
			vertical-align: top;
			border: 2px solid #ced4da;

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

	:root {
		--z-index-2: 2;
	}
}

button.is-active {
	background-color: var(--color-secondary-dark);
}
</style>
