import Table from "@tiptap/extension-table";
import TableNodeView from "../components/TableNodeView";
import { VueNodeViewRenderer } from "@tiptap/vue-2";

export default Table.extend({
	addNodeView() {
		return VueNodeViewRenderer(TableNodeView);
	},
});
