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
				<v-alert
					v-if="needsInfoText"
					type="warning"
					:icon="mdiInformation"
					text
					border="left"
					:aria-label="$t('components.molecules.copyResult.title.partial')"
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
							<strong>{{ $t("common.words.courseGroups") }}</strong>
							&middot;
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

				<div class="black--text">
					<p>{{ $t("components.molecules.copyResult.information") }}</p>
				</div>
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
	inject: ["notifierModule", "copyModule"],
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
