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
				<h4>Test Component</h4>
			</div>
			<template slot="content">
				<v-divider class="mb-4"></v-divider>
				<copy-result
					v-if="courseCopyItems.length"
					:items="courseCopyItems"
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
		};
	},
	computed: {
		courseCopyItems() {
			return roomModule.getCourseCopyResult;
		},
	},
	async created() {
		await roomModule.triggerCopyCourse(this.courseId);
	},

	methods: {},
};
</script>
