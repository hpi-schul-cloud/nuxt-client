<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onDialogClosed"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2 wordbreak-normal">
			{{ $t("components.molecules.copyResult.title.partial") }}
		</div>

		<template slot="content">
			<div ref="copy-dialog-content" data-testid="copy-result-notifications">
				<div v-if="needsInfoText">
					<div
						class="d-flex flex-row pa-2 mb-4 rounded orange lighten-5 background"
					>
						<div class="mx-2">
							<v-icon class="orange--text text--darken-1">{{
								mdiAlert
							}}</v-icon>
						</div>
						<div>
							<template v-for="(warning, index) in copyResultWarnings">
								<p v-if="warning.isShow" :key="index" class="black--text mb-0">
									<strong>{{ warning.title }}</strong>
									&middot;
									{{ warning.text }}
								</p>
							</template>
						</div>
					</div>
				</div>
			</div>

			<div class="black--text">
				<p>{{ $t("components.molecules.copyResult.information") }}</p>
			</div>
			<copy-result-modal-list :items="items"></copy-result-modal-list>
		</template>
	</v-custom-dialog>
</template>

<script>
import {
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "@/serverApi/v3";
import CopyResultModalList from "@components/copy-result-modal/CopyResultModalList";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import {
	mdiAlert,
	mdiCheckCircle,
	mdiCloseCircle,
	mdiInformation,
} from "@mdi/js";

export default {
	name: "CopyResultModal",
	components: { CopyResultModalList, vCustomDialog },
	props: {
		copyResultItems: {
			type: Array,
			default: () => [],
		},
		copyResultStatus: {
			type: String,
			default: () => undefined,
		},
		copyResultError: {
			type: Object,
			default: () => undefined,
		},
	},
	inject: ["notifierModule", "copyModule"],
	data() {
		return {
			isOpen: false,
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
		copyResultWarnings() {
			return [
				{
					isShow: this.hasEtherpadElement,
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
					text: this.$t("components.molecules.copyResult.nexboardCopy.info"),
					title: this.$t("components.molecules.copyResult.label.nexboard"),
				},
				{
					isShow: this.hasFileElement,
					text: this.$t("components.molecules.copyResult.label.files"),
					title: this.$t("components.molecules.copyResult.fileCopy.error"),
				},
				{
					isShow: this.hasCourseGroup,
					text: this.$t("components.molecules.copyResult.courseGroupCopy.info"),
					title: this.$t("common.words.courseGroups"),
				},
			];
		},
		hasTimeoutError() {
			return (
				this.copyResultError !== undefined &&
				this.copyResultError.statusCode === 504
			);
		},
		needsInfoText() {
			return (
				this.hasGeogebraElement ||
				this.hasEtherpadElement ||
				this.hasNexboardElement ||
				this.hasFileElement ||
				this.hasCourseGroup
			);
		},
		hasGeogebraElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentGeogebra
			);
		},
		hasEtherpadElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentEtherpad
			);
		},
		hasNexboardElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentNexboard
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
		getLastResultTimestamp() {
			return this.copyModule.getLastResultTimestamp;
		},
	},
	watch: {
		getLastResultTimestamp: function (newValue, oldValue) {
			if (newValue > oldValue) {
				this.processFinalStatus();
			}
		},
	},
	methods: {
		hasElementOfType(items, types) {
			let found = false;
			items.forEach((item) => {
				if (found) return;
				item.elements.find((e) => types.includes(e.type))
					? (found = true)
					: null;
			});
			return found;
		},
		onDialogClosed() {
			this.isOpen = false;
			this.$emit("dialog-closed");
		},
		processFinalStatus() {
			if (this.copyResultStatus === CopyApiResponseStatusEnum.Success) {
				this.notifierModule.show({
					text: this.$t("components.molecules.copyResult.successfullyCopied"),
					status: "success",
				});
				return;
			}

			if (this.copyResultStatus === CopyApiResponseStatusEnum.Failure) {
				this.notifierModule.show({
					text: this.$t("components.molecules.copyResult.failedCopy"),
					status: "error",
					autoClose: false,
				});
				return;
			}

			if (
				this.copyResultError !== undefined &&
				this.copyResultError.statusCode === 504
			) {
				this.notifierModule.show({
					text: this.$t("components.molecules.copyResult.timeoutCopy"),
					status: "error",
					autoClose: false,
				});
				return;
			}

			// show the modal
			this.isOpen = true;
		},
	},
};
</script>

<style scoped lang="scss">
.wordbreak-normal {
	word-break: normal;
}
</style>
