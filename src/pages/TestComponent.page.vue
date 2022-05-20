<template>
	<default-wireframe ref="main" :full-width="true">
		<template slot="header">
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						color="secondary"
						class="back-button"
						outlined
						small
						@click="testComponentDialog.isOpen = !testComponentDialog.isOpen"
					>
						Open Copy Result
					</v-btn>
				</div>
			</div>
		</template>
		<v-custom-dialog v-model="testComponentDialog.isOpen" :size="640">
			<div slot="title" class="dialog-header">
				<h4>Copy Result</h4>
			</div>
			<template slot="content">
				<v-divider class="mb-4"></v-divider>
				<copy-result
					v-if="taskCopyObject.elements"
					:items="copiedItems"
					:show-spinner="testComponentDialog.loading"
				>
				</copy-result>
			</template>
		</v-custom-dialog>
	</default-wireframe>
</template>

<script>
import { roomModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";

import CopyResult from "@components/molecules/CopyResult";

export default {
	components: {
		DefaultWireframe,
		vCustomDialog,
		CopyResult,
	},
	layout: "defaultVuetify",
	data() {
		return {
			testComponentDialog: {
				isOpen: true,
				loading: false,
			},
			elementIndex: 0,
		};
	},
	computed: {
		taskCopyObject() {
			return roomModule.getTaskCopyResult;
		},
		copiedItems() {
			const data = this.taskCopyObject;
			return [
				{
					id: data.id,
					status: data.status,
					title: data.title,
					type: data.type,
					index: this.elementIndex,
					elements: data.elements
						? this.prepareCopiedElements(data.elements)
						: [],
				},
			];
		},
	},
	async created() {
		await roomModule.fetchContent("0000dcfbfb5c7a3f00bf21ab");
		await roomModule.copyTask("59cce3f6c6abf042248e888d");
	},

	methods: {
		prepareCopiedElements(items) {
			return items.map(({ elements = [], ...rest }) => {
				const item = { ...rest };
				item.index = ++this.elementIndex;
				if (item.status === "not-doing" || item.status === "not-implemented")
					item.status = "failure";
				if (elements.length) {
					const isSuccess = elements.every((ele) => ele.status === "success");
					item.status = isSuccess ? "success" : item.status;
					item.elements = this.prepareCopiedElements(elements);
				}

				return item;
			});
		},
	},
};
</script>
