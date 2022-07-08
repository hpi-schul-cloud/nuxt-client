<template>
	<v-custom-dialog
		v-model="showModal"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="dialogClosed"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ $t("components.molecules.copyResult.title") }}
		</h2>

		<template slot="content">
			<v-divider class="mb-4"></v-divider>
			<div v-if="loading">
				<v-skeleton-loader
					type="article, list-item-three-line"
					data-testid="copy-process-skeleton"
				/>
			</div>
			<div v-else>
				<label class="text-md mt-2">
					{{ copiedItemTitle }}
				</label>
				<copy-result
					v-if="copiedItems"
					:items="copiedItems"
					:success-all="isSuccessAll"
				/>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script lang="ts">
import { CopyApiResponse, CopyApiResponseStatusEnum } from "@/serverApi/v3";
import { copyModule } from "@/store";
import { PreparedCopyApiResponse } from "@/store/copy-process";
import CopyResult from "@components/molecules/CopyResult.vue";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
	components: { vCustomDialog, CopyResult },
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
			elementIndex: 0,
			showModal: false,
		};
	},
	computed: {
		copiedItems(): PreparedCopyApiResponse[] {
			if (this.copiedItemId === "") return [];
			const result = copyModule.getFilteredResult;
			return result.elements ? this.prepareCopiedElements(result.elements) : [];
		},
		isSuccessAll(): boolean {
			return copyModule.getIsSuccess;
		},
		copiedItemTitle() {
			return copyModule?.getTitle || "";
		},
		copiedItemId() {
			return copyModule?.getId || "";
		},
		statusEnum() {
			return copyModule.getResponseStatus;
		},
	},
	watch: {
		isOpen() {
			this.showModal = this.isOpen;
		},
	},
	methods: {
		mapUnusedStatus(
			status: CopyApiResponseStatusEnum
		): CopyApiResponseStatusEnum {
			if (
				status === CopyApiResponseStatusEnum.NotDoing ||
				status === CopyApiResponseStatusEnum.NotImplemented
			) {
				return CopyApiResponseStatusEnum.Failure;
			}
			return status;
		},
		prepareCopiedElements(items: CopyApiResponse[]): PreparedCopyApiResponse[] {
			return items.map((item): PreparedCopyApiResponse => {
				let feStatus = this.mapUnusedStatus(item.status);
				let elements: PreparedCopyApiResponse[] = [];
				if (item.elements && item.elements.length > 0) {
					const isSuccess = item.elements.every(
						(ele) => ele.status === CopyApiResponseStatusEnum.Success
					);
					feStatus = isSuccess
						? CopyApiResponseStatusEnum.Success
						: this.mapUnusedStatus(item.status);
					elements = this.prepareCopiedElements(item.elements);
				}

				return {
					...item,
					title: item.title,
					index: ++this.elementIndex,
					feStatus,
					elements,
				};
			});
		},
		dialogClosed() {
			this.showModal = false;
			this.$emit("dialog-closed", false);
			copyModule.resetCopyResult();
		},
	},
});
</script>
