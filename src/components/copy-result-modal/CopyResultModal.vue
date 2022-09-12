<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onDialogClosed"
	>
		<h2 slot="title" class="text-h4 my-2 wordbreak-normal">
			{{ title }}
		</h2>
		<template slot="content">
			<div ref="copy-dialog-content" data-testid="copy-result-notifications">
				<v-alert
					v-if="hasTimeoutError"
					data-testid="timeout-alert"
					type="warning"
					:icon="mdiCloseCircle"
					text
					border="left"
				>
					<div class="alert_text mr-2">
						{{ $t("components.molecules.copyResult.timeoutCopy") }}
					</div>
				</v-alert>
				<v-alert
					v-if="needsInfoText"
					type="warning"
					:icon="mdiInformation"
					text
					border="left"
				>
					<div class="alert_text mr-2">
						<div v-if="hasGeogebraElement" data-testid="geogebra">
							<strong>{{
								$t("components.molecules.copyResult.label.geogebra")
							}}</strong>
							&middot;
							{{ $t("components.molecules.copyResult.geogebraCopy.info") }}
						</div>
						<div v-if="hasEtherpadElement" data-testid="etherpad">
							<strong>{{
								$t("components.molecules.copyResult.label.etherpad")
							}}</strong>
							&middot;
							{{ $t("components.molecules.copyResult.etherpadCopy.info") }}
						</div>
						<div v-if="hasNexboardElement" data-testid="nexboard">
							<strong>{{
								$t("components.molecules.copyResult.label.nexboard")
							}}</strong>
							&middot;
							{{ $t("components.molecules.copyResult.nexboardCopy.info") }}
						</div>
						<div v-if="hasCourseGroup" data-testid="coursegroups">
							<strong>{{ $t("common.words.courseGroups") }}</strong> &middot;
							{{ $t("components.molecules.copyResult.courseGroupCopy.info") }}
						</div>
						<div v-if="hasFileElement" data-testid="files">
							<strong>{{
								$t("components.molecules.copyResult.label.files")
							}}</strong>
							&middot;
							{{ $t("components.molecules.copyResult.fileCopy.error") }}
						</div>
					</div>
				</v-alert>

				<copy-result-modal-list :items="items"></copy-result-modal-list>
			</div>
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
import { mdiCheckCircle, mdiCloseCircle, mdiInformation } from "@mdi/js";

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
	inject: ["notifierModule"],
	data() {
		return {
			isOpen: false,
			mdiInformation,
			mdiCheckCircle,
			mdiCloseCircle,
		};
	},
	computed: {
		items() {
			return this.copyResultItems;
		},
		hasTimeoutError() {
			return (
				this.copyResultError !== undefined &&
				this.copyResultError.statusCode === 504
			);
		},
		status() {
			return this.copyResultStatus;
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
		title() {
			if (this.isLoading || this.hasTimeoutError) {
				return this.$t("components.molecules.copyResult.title.loading");
			}

			if (this.copyResultStatus === "success") {
				return this.$t("components.molecules.copyResult.title.success");
			}

			if (this.copyResultStatus === "partial") {
				return this.$t("components.molecules.copyResult.title.partial");
			}

			return this.$t("components.molecules.copyResult.title.failure");
		},
		isPartialSuccessful() {
			return (
				this.copyResultStatus?.status === CopyApiResponseStatusEnum.Partial
			);
		},
	},
	watch: {
		isLoading: function () {
			if (this.isLoading === false) {
				this.$nextTick(() => setTimeout(this.focusFirstLink, 100));
			}
		},
		copyResultStatus: function (newValue, oldValue) {
			if (oldValue === undefined && newValue !== undefined) {
				console.log("received result");
				this.processFinalStatus();
			}
		},
	},
	methods: {
		focusFirstLink() {
			const dialog = this.$refs["copy-dialog-content"];
			if (dialog && dialog.querySelector("a")) {
				dialog.querySelector("a").focus();
			}
		},
		hasElementOfType(items, type) {
			let found = false;
			items.forEach((item) => {
				if (found) return;
				item.elements.find((e) => e.type === type) ? (found = true) : null;
			});
			return found;
		},
		onDialogClosed() {
			this.$emit("dialog-closed");
		},
		processFinalStatus() {
			console.log("processFinalStatus");
			if (this.copyResultStatus.status === CopyApiResponseStatusEnum.Success) {
				this.notifierModule.show({
					text:
						"AAAAArgh" +
						this.$t("components.molecules.copyResult.successfullyCopied"),
					status: "success",
					timeout: 5000,
					autoClose: false,
				});
			} else if (
				this.copyResultStatus.status === CopyApiResponseStatusEnum.Failure
			) {
				this.notifierModule.show({
					text: this.$t("components.molecules.copyResult.failedCopy"),
					status: "error",
					timeout: 5000,
					autoClose: false,
				});
			} else {
				this.isOpen = true;
			}
		},
	},
};
</script>

<style scoped>
::v-deep .v-btn__content .v-icon,
.alert_text {
	color: var(--color-black) !important;
}

::v-deep .v-alert__border {
	opacity: 1;
}

.wordbreak-normal {
	word-break: normal;
}
</style>

<style lang="scss">
a.v-breadcrumbs__item:hover,
a.v-breadcrumbs__item:focus {
	border-bottom: 1px solid var(--color-primary);
}
</style>
