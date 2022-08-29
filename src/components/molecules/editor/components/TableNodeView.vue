<template>
	<node-view-wrapper class="table-node-view">
		<span class="label">Tabelle</span>
		<p>
			This experiment failed. Editor looses focus on actions. At least with
			tables. Might work with other elements
		</p>
		<div class="menu">
			<base-button @click="deleteTable"> delete table </base-button>
			<base-button @click="editor.chain().focus().addColumnBefore().run()">
				add column before
			</base-button>
			<base-button @click="editor.chain().focus().addColumnAfter().run()">
				add column after
			</base-button>
			<base-button @click="editor.chain().focus().addRowBefore().run()">
				add row before
			</base-button>
			<base-button @click="editor.chain().focus().addRowAfter().run()">
				add row after
			</base-button>
			<base-button @click="editor.chain().focus().deleteRow().run()">
				delete row
			</base-button>
			<base-button @click="editor.chain().focus().deleteColumn().run()">
				delete column
			</base-button>
			<base-button @click="editor.chain().focus().mergeCells().run()">
				merge cells
			</base-button>
			<base-button @click="editor.chain().focus().splitCell().run()">
				split cell
			</base-button>
		</div>
		<node-view-content class="node-view-content" as="table" />
	</node-view-wrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";

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
	/* stylelint-disable-next-line */
	margin: 1rem 0;
	/* stylelint-disable-next-line */
	padding: 2rem 1rem 1rem;
	border: 3px solid #0d0d0d;
	/* stylelint-disable-next-line */
	border-radius: 0.5rem;

	.label {
		position: absolute;
		top: 0;
		padding: var(--radius-sm) var(--radius-md);
		margin-left: 0;
		font-size: var(--text-sm);
		color: var(--color-white);
		text-transform: uppercase;
		background-color: var(--color-black);
		border-radius: 0 0 var(--radius-md) var(--radius-md);
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
</style>
