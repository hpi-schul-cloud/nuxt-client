<template>
	<node-view-wrapper class="table-node-view">
		<span class="label">Tabelle</span>
		<p>
			! This experiment failed ! Editor looses focus on actions. At least with
			tables.
		</p>
		<div class="menu">
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
		<node-view-content class="node-view-content" as="table" />
	</node-view-wrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
export default {
	components: {
		NodeViewWrapper,
		NodeViewContent,
	},
	props: nodeViewProps,
	methods: {
		deleteTable() {
			this.deleteNode();
		},
	},
};
</script>

<style lang="scss" scoped>
.table-node-view {
	position: relative;
	border: 3px solid #0d0d0d;
	/* stylelint-disable-next-line */
	border-radius: 0.5rem;
	/* stylelint-disable-next-line */
	margin: 1rem 0;
	/* stylelint-disable-next-line */
	padding: 2rem 1rem 1rem;

	button {
		/* stylelint-disable-next-line */
		border: solid 2px #000;
		/* stylelint-disable-next-line */
		margin: 5px 10px 5px 0;
		/* stylelint-disable-next-line */
		padding: 3px;
	}

	.label {
		position: absolute;
		top: 0;
		/* stylelint-disable-next-line */
		padding: 5px;
		margin-left: 0;
		/* stylelint-disable-next-line */
		font-size: 12px;
		/* stylelint-disable-next-line */
		color: #fff;
		text-transform: uppercase;
		/* stylelint-disable-next-line */
		background-color: #000;
		/* stylelint-disable-next-line */
		border-radius: 0 0 5px 5px;
	}

	::v-deep .node-view-content {
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
}
</style>
