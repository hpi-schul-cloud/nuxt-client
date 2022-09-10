import Table from "@tiptap/extension-table";
import TableNodeView from "../components/TableNodeView.vue";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

export default Table.extend({
	addNodeView() {
		return VueNodeViewRenderer(TableNodeView);
	},
});
