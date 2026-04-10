<template>
	<div data-testid="class-members-info-box">
		<v-alert v-show="hasSystem" type="info" class="mb-0">
			<div class="alert-text">
				{{
					$t("page-class-members.systemInfoText", {
						systemName,
					})
				}}
			</div>
		</v-alert>
		<h2>
			{{ $t("page-class-members.classMembersInfoBox.title") }}
		</h2>
		<div data-testid="class-members-info-box-text">
			<i18n-t keypath="pages.classMembers.infoBox.text.firstParagraph" scope="global" tag="p">
				<span class="font-weight-bold"> {{ t("pages.classMembers.infoBox.text.firstParagraph.bold") }}</span>
			</i18n-t>
			<p>{{ t("pages.classMembers.infoBox.text.secondParagraph") }}</p>
			<p>{{ t("pages.classMembers.infoBox.text.thirdParagraph") }}</p>
			<ul class="pl-4">
				<li v-for="(item, index) in infoBoxTextListItems" :key="index">
					{{ t(item) }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
import { System, useSystemApi } from "@data-system";
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	props: {
		systemId: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const { t } = useI18n();
		const { getSystem } = useSystemApi();

		const system: Ref<System | undefined> = ref();

		const infoBoxTextListItems = [
			t("pages.classMembers.infoBox.text.listItem.first"),
			t("pages.classMembers.infoBox.text.listItem.second"),
			t("pages.classMembers.infoBox.text.listItem.third"),
			t("pages.classMembers.infoBox.text.listItem.last"),
		];

		onMounted(async () => {
			if (props.systemId) {
				system.value = await getSystem(props.systemId);
			}
		});

		watch(
			() => props.systemId,
			async (value, oldValue) => {
				if (value && value !== oldValue) {
					system.value = await getSystem(props.systemId);
				}
			}
		);

		const hasSystem: ComputedRef<boolean> = computed(() => !!system.value);

		const systemName: ComputedRef<string> = computed(() => system.value?.displayName ?? "");

		return {
			hasSystem,
			systemName,
			infoBoxTextListItems,
			t,
		};
	},
});
</script>
