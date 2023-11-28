<template>
	<div>
		<div v-if="!isEditMode" class="card-container grey lighten-4">
			<div v-if="shouldDisplayImage" class="logo-container">
				<PreviewImage :src="getImage" :contain="true" alt="Some alt" />
			</div>
			<div class="additional-info mt-4">
				<h4>Zusätzliche Informationen</h4>
				<p><strong>Name: </strong> {{ content.name }}</p>
				<p><strong>Titel: </strong> {{ content.title }}</p>
				<p><strong>Erstellt am: </strong> {{ content.createdAt }}</p>
				<p><strong>Geändert am: </strong> {{ content.modifiedAt }}</p>
				<p>
					<strong>Lizenz: </strong>
					<img :src="content.license.icon" alt="License Icon" />
				</p>
				<p v-if="content.contentTypeIcon">
					<strong>Content-Type: </strong>
					<v-icon>{{ getContentTypeIcon }}</v-icon>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, toRef } from "vue";
import { Preview, Resource } from "@/store/types/content";
import { mdiFile, mdiHeadphones, mdiStorefrontOutline } from "@mdi/js";
import { useI18n } from "@/composables/i18n.composable";
import { PreviewImage } from "@ui-preview-image";

export default defineComponent({
	name: "LearnstoreContent",
	props: {
		resource: {
			type: Object as PropType<Resource>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	components: { PreviewImage },
	setup(props) {
		const { t } = useI18n();
		const resource: Ref<Resource> = toRef(props, "resource");

		const getTitle = computed(
			() =>
				resource.value?.title ??
				t("feature-board-learnstore-element.placeholder.select")
		);

		const shouldDisplayImage = computed(() =>
			Boolean(
				resource.value?.preview &&
					(resource.value?.preview.data || resource.value?.preview.url)
			)
		);

		const getImage = computed(() => {
			const preview: Preview | undefined = resource.value?.preview;
			if (preview?.data) {
				return preview.data;
			} else if (preview?.url) {
				return preview.url;
			}
			return "";
		});

		const getIcon = computed(() => mdiStorefrontOutline);

		const content = computed(() => {
			return {
				name: resource.value.name,
				title: resource.value.title,
				createdAt: resource.value.createdAt,
				modifiedAt: resource.value.modifiedAt,
				license: {
					icon: resource.value.license.icon,
					url: resource.value.license.url,
				},
				downloadUrl: resource.value.downloadUrl,
				contentTypeIcon: resource.value.iconURL,
			};
		});

		const getContentTypeIcon = computed(() => {
			switch (resource.value?.mimetype) {
				case "audio/mpeg": {
					return mdiHeadphones;
				}
				default: {
					return mdiFile;
				}
			}
		});

		return {
			t,
			getTitle,
			shouldDisplayImage,
			getImage,
			getIcon,
			content,
			getContentTypeIcon,
		};
	},
});
</script>

<style scoped>
.additional-info {
	background-color: #f9f9f9;
	padding: 10px;
	border-radius: 8px;
}

.additional-info h4 {
	margin-bottom: 8px;
}

.additional-info p {
	margin: 5px 0;
}

.logo-container {
	margin-top: 8px;
}
</style>
