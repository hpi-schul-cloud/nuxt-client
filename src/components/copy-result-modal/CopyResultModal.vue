<template>
	<v-custom-dialog
		v-model="isDialogOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="modalClosed"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ $t("components.molecules.copyResult.title") }}
		</h2>
		<template slot="content">
			<div>
				<!-- Platz für die Notifications für fehlende Geogebras, files o.Ä. --->
				<div v-if="hasFailedGeogebraElement">
					<!-- Geogebra notification component-->
				</div>
				<div v-if="hasFailedEtherpadElement">
					<!-- Etherpad notification component-->
				</div>
				<div v-if="hasFailedFileElement">
					<!-- File notification component-->
				</div>

				<copy-result-modal-list :items="items"></copy-result-modal-list>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import CopyResultModalList from "@components/copy-result-modal/CopyResultModalList";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { copyModule } from "@utils/store-accessor";

const mockData = {
	id: "asdklöjfasdklf",
	status: "partial",
	elements: [
		{
			type: "METADATA",
			status: "success",
		},
		{
			type: "USER_GROUP",
			status: "not-doing",
		},
		{
			type: "LTITOOL_GROUP",
			status: "not-doing",
		},
		{
			type: "TIME_GROUP",
			status: "not-doing",
		},
		{
			type: "FILE_GROUP",
			status: "not-implemented",
		},
		{
			type: "COURSEGROUP_GROUP",
			status: "not-implemented",
		},
		{
			title: "taskgroup",
			type: "TASK_GROUP",
			status: "failure",
			id: "62e7a94e2c74e087967d3727",
			elements: [
				{
					type: "METADATA",
					status: "success",
				},
				{
					title: "task in group",
					type: "TASK",
					status: "failure",
					id: "62e7a94e2c74e087967d3237",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
			],
		},
		{
			title: "board",
			type: "BOARD",
			status: "partial",
			id: "62e7a94e2c74e087967d3737",
			elements: [
				{
					title: "Thema (3)",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3723",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT_TEXT",
									status: "success",
								},
								{
									title: "Sieb des Blabla",
									type: "LESSON_CONTENT_GEOGEBRA",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT_ETHERPAD",
									status: "success",
								},
							],
						},
					],
				},
				{
					title: "Thema (2)",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3724",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT_TEXT",
									status: "success",
								},
								{
									title: "Geogebra",
									type: "LESSON_CONTENT_GEOGEBRA",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT_NEXBOARD",
									status: "success",
								},
							],
						},
					],
				},
				{
					title: "Thema (1)",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3725",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT_NEXBOARD",
									status: "success",
								},
								{
									title: "Geogebra",
									type: "LESSON_CONTENT_GEOGEBRA",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT_LERNSTORE",
									status: "success",
								},
							],
						},
					],
				},
			],
		},
	],
};

export default {
	name: "CopyResultModal",
	components: { CopyResultModalList, vCustomDialog },
	props: {
		isOpen: {
			type: Boolean,
		},
		loading: {
			type: Boolean,
		},
	},
	data() {
		return {
			isDialogOpen: true,
		};
	},
	computed: {
		items() {
			return copyModule.getFilteredResult;
		},
		hasFailedGeogebraElement() {
			return this.findElementByType(this.items, "geogebra"); // hasser um notifications oberhalb der liste anzuzeigen -> e.g. "Geogebra Inhalte werden nur als Hülle angelegt"
		},
		hasFailedEtherpadElement() {
			return this.findElementByType(this.items, "etherpad"); // ^ ...
		},
		hasFailedFileElement() {
			return this.findElementByType(this.items, "file"); // ^ ...
		},
	},
	watch: {
		isOpen() {
			console.log("watcher on isOpen", this.isOpen);
			this.isDialogOpen = this.isOpen;
		},
	},
	created() {
		// WIP
		console.log("created modal compoentn");
		copyModule.setFilteredResult(mockData);
	},
	methods: {
		findElementByType(items, type) {
			// returns true if any element in all breadcrumbs contain a failed element of specified type
			let found = false;
			items.forEach((item) => {
				if (found) return;
				item.elements.find((e) => e.type === type) ? (found = true) : null;
			});
			return false;
			// return found;
		},
		modalClosed() {
			copyModule.resetCopyResult();
			this.$emit("dialog-close", false);
		},
	},
};
</script>

<!--<style scoped></style>-->
