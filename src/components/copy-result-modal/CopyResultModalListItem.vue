<template>
	<div v-if="item !== undefined">
		<div class="d-flex flex-row align-items-center">
			<v-icon> {{ mdiChevronLeft }} </v-icon>

			<v-breadcrumbs
				class="pa-0"
				:items="[{ href: itemUrl, text: item.title, disabled: false }]"
			></v-breadcrumbs>
		</div>
		<ul class="mb-4 pl-1">
			<li v-for="(e, index) of elements" :key="index" class="list-none">
				<v-icon x-small class="mr-1"> {{ mdiMenuRight }} </v-icon>
				<span class="black--text">{{
					getElementTypeName(e.type) + " - " + e.title
				}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import { mdiChevronLeft, mdiMenuRight } from "@mdi/js";

export default {
	name: "CopyResultModalListItem",
	props: {
		item: {
			type: Object,
			required: true,
			default: () => undefined,
		},
	},
	data() {
		return {
			mdiChevronLeft,
			mdiMenuRight,
		};
	},
	computed: {
		itemUrl() {
			return "google.de"; // create the target url where the user can fix the shown errors
		},
		elements() {
			return this.item?.elements || [];
		},
	},
	methods: {
		getElementTypeName(type) {
			if (type === CopyApiResponseTypeEnum.BOARD)
				return this.$t("common.words.learnContent");
			if (type === CopyApiResponseTypeEnum.CONTENT)
				return this.$t("components.molecules.copyResult.label.content");
			if (type === CopyApiResponseTypeEnum.COURSE)
				return this.$t("common.labels.room");
			if (type === CopyApiResponseTypeEnum.COURSEGROUP_GROUP)
				return this.$t("common.words.courseGroups");
			if (type === CopyApiResponseTypeEnum.FILE)
				return this.$t("components.molecules.copyResult.label.file");
			if (type === CopyApiResponseTypeEnum.FILE_GROUP)
				return this.$t("components.molecules.copyResult.label.files");
			if (type === CopyApiResponseTypeEnum.LEAF)
				return this.$t("components.molecules.copyResult.label.leaf");
			if (type === CopyApiResponseTypeEnum.LERNSTORE_MATERIAL)
				return "Missing name for Lernstore Material";
			if (type === CopyApiResponseTypeEnum.LERNSTORE_MATERIAL_GROUP)
				return this.$t(
					"components.molecules.copyResult.label.lernstoreMaterialGroup"
				);
			if (type === CopyApiResponseTypeEnum.LESSON)
				return this.$t("common.words.topics");
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_GEOGEBRA)
				return "i18n geogebra";
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_ETHERPAD)
				return "i18n etherpad";
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_TEXT)
				return "i18n text";
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_NEXBOARD)
				return "i18n nexboard";
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_LERNSTORE)
				return "i18n lernstore";
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_TASK)
				return this.$t("common.words.task");
			if (type === CopyApiResponseTypeEnum.LESSON_CONTENT_GROUP)
				return this.$t(
					"components.molecules.copyResult.label.lessonContentGroup"
				);
			if (type === CopyApiResponseTypeEnum.LTITOOL_GROUP)
				return this.$t("components.molecules.copyResult.label.ltiToolsGroup");
			if (type === CopyApiResponseTypeEnum.METADATA)
				return this.$t("components.molecules.copyResult.metadata");
			if (type === CopyApiResponseTypeEnum.SUBMISSION_GROUP)
				return this.$t("components.molecules.copyResult.label.submissions");
			if (type === CopyApiResponseTypeEnum.TASK)
				return this.$t("common.words.task");
			if (type === CopyApiResponseTypeEnum.TASK_GROUP)
				return this.$t("common.words.tasks");
			if (type === CopyApiResponseTypeEnum.TIME_GROUP)
				return this.$t("components.molecules.copyResult.label.timeGroup");
			if (type === CopyApiResponseTypeEnum.USER_GROUP)
				return this.$t("components.molecules.copyResult.label.userGroup");

			return "unknown label";
		},
	},
};
</script>

<style scoped>
.list-none {
	list-style-type: none;
}
</style>
