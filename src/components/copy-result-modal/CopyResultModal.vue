<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onDialogClosed"
	>
		<template #title>
			<div ref="textTitle" class="text-h4 my-2 wordbreak-normal">
				{{ $t("components.molecules.copyResult.title.partial") }}
			</div>
		</template>

		<template #content>
			<div ref="copy-dialog-content" data-testid="copy-result-notifications">
				<div class="d-flex flex-row pa-2 mb-4 rounded bg-orange-lighten-5">
					<div class="mx-2">
						<v-icon color="warning">{{ mdiAlert }}</v-icon>
					</div>
					<div>
						<template v-for="(warning, index) in copyResultWarnings">
							<p
								v-if="warning.isShow"
								:key="index"
								class="mb-0 aligned-with-icon"
								data-testid="warning-title"
							>
								<strong>{{ warning.title }}</strong>
								&middot;
								{{ warning.text }}
							</p>
						</template>
					</div>
				</div>
			</div>
			<template v-if="hasErrors && isCourse">
				<div>
					<p>{{ $t("components.molecules.copyResult.information") }}</p>
				</div>
				<copy-result-modal-list :items="filteredItems" />
			</template>
		</template>
	</v-custom-dialog>
</template>

<script>
import CopyResultModalList from "@/components/copy-result-modal/CopyResultModalList.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import {
	mdiAlert,
	mdiCheckCircle,
	mdiCloseCircle,
	mdiInformation,
} from "@icons/material";

export default {
	name: "CopyResultModal",
	components: { CopyResultModalList, vCustomDialog },
	props: {
		isOpen: {
			type: Boolean,
		},
		copyResultItems: {
			type: Array,
			default: () => [],
		},
		copyResultRootItemType: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			mdiInformation,
			mdiCheckCircle,
			mdiCloseCircle,
			mdiAlert,
		};
	},
	computed: {
		items() {
			return this.copyResultItems;
		},

		filteredItems() {
			if (envConfigModule.getEnv.FEATURE_NEXBOARD_COPY_ENABLED) {
				return this.copyResultItems;
			}

			return this.copyResultItems.map((item) => {
				const filteredElements = item.elements.filter(
					(element) =>
						element.type !== CopyApiResponseTypeEnum.LessonContentNexboard
				);
				return { ...item, elements: filteredElements };
			});
		},

		copyResultWarnings() {
			return [
				{
					isShow: this.hasGeogebraElement,
					text: this.$t("components.molecules.copyResult.geogebraCopy.info"),
					title: this.$t("components.molecules.copyResult.label.geogebra"),
				},
				{
					isShow: this.hasEtherpadElement,
					text: this.$t("components.molecules.copyResult.etherpadCopy.info"),
					title: this.$t("components.molecules.copyResult.label.etherpad"),
				},
				{
					isShow: this.hasNexboardElement,
					text: this.nexboardInfoText,
					title: this.$t("components.molecules.copyResult.label.nexboard"),
				},
				{
					isShow: this.hasDrawingElement,
					text: this.$t("components.molecules.copyResult.tldrawCopy.info"),
					title: this.$t("components.molecules.copyResult.label.tldraw"),
				},
				{
					isShow: this.hasFileElement || this.isCourse,
					text: this.filesInfoText,
					title: this.$t("components.molecules.copyResult.label.files"),
				},
				{
					isShow:
						this.isFeatureCtlToolsEnabled &&
						(this.hasExternalTool || this.hasExternalToolElement),
					text: this.externalToolsInfoText,
					title: this.$t("components.molecules.copyResult.label.externalTools"),
				},
				{
					isShow: this.hasCourseGroup,
					text: this.$t("components.molecules.copyResult.courseGroupCopy.info"),
					title: this.$t("common.words.courseGroups"),
				},
			];
		},
		hasGeogebraElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentGeogebra
			);
		},
		hasEtherpadElement() {
			return (
				this.hasElementOfType(
					this.items,
					CopyApiResponseTypeEnum.CollaborativeTextEditorElement
				) ||
				this.hasElementOfType(
					this.items,
					CopyApiResponseTypeEnum.LessonContentEtherpad
				)
			);
		},
		hasNexboardElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentNexboard
			);
		},
		hasDrawingElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.DrawingElement
			);
		},
		hasFileElement() {
			return this.hasElementOfType(this.items, CopyApiResponseTypeEnum.File);
		},
		hasCourseGroup() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.CoursegroupGroup
			);
		},
		isFeatureCtlToolsEnabled() {
			return envConfigModule.getCtlToolsTabEnabled;
		},
		hasErrors() {
			return this.items.length > 0;
		},
		isCourse() {
			return this.copyResultRootItemType === CopyApiResponseTypeEnum.Course;
		},
		filesInfoText() {
			const courseFilesText = this.isCourse
				? this.$t("components.molecules.copyResult.courseFiles.info")
				: "";
			const fileErrorText = this.hasFileElement
				? this.$t("components.molecules.copyResult.fileCopy.error")
				: "";
			return `${courseFilesText} ${fileErrorText}`.trim();
		},
		nexboardInfoText() {
			return envConfigModule.getEnv.FEATURE_NEXBOARD_COPY_ENABLED
				? this.$t("components.molecules.copyResult.nexboardCopy.info")
				: this.$t("components.molecules.copyResult.nexboardCopy.infoTldraw");
		},
		externalToolsInfoText() {
			return envConfigModule.getEnv.FEATURE_CTL_TOOLS_COPY_ENABLED
				? this.$t("components.molecules.copyResult.ctlTools.withFeature.info")
				: this.$t("components.molecules.copyResult.ctlTools.info");
		},
		hasExternalTool() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.ExternalTool
			);
		},
		hasExternalToolElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.ExternalToolElement
			);
		},
	},
	methods: {
		hasElementOfType(items, types) {
			let found = false;
			items.forEach((item) => {
				if (found) return;
				found = item.elements.find((e) => types.includes(e.type));
			});
			return found;
		},
		onDialogClosed() {
			this.$emit("copy-dialog-closed");
		},
	},
};
</script>

<style scoped lang="scss">
.wordbreak-normal {
	word-break: normal;
}

.aligned-with-icon {
	padding-top: var(--space-xs-3);
}
</style>
