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
		<h2 class="text-h4">
			{{ $t("page-class-members.classMembersInfoBox.title") }}
		</h2>
		<RenderHTML
			:html="$t('page-class-members.classMembersInfoBox.text')"
			data-testid="class-members-info-box-text"
			component="div"
		/>
	</div>
</template>
<script lang="ts">
import { System, useSystemApi } from "@data-system";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
	watch,
} from "vue";
import { RenderHTML } from "@feature-render-html";

export default defineComponent({
	components: { RenderHTML },
	props: {
		systemId: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const { getSystem } = useSystemApi();

		const system: Ref<System | undefined> = ref();

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

		const systemName: ComputedRef<string> = computed(() => {
			return system.value?.displayName ?? "";
		});

		return {
			hasSystem,
			systemName,
		};
	},
});
</script>
