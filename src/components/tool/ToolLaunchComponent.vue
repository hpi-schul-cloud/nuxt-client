<template>
	<div>
		<v-progress-circular
			v-if="isLoading"
			indeterminate
			color="primary"
			:size="70"
			:width="7"
		></v-progress-circular>
		<div v-show="!isLoading" class="text-center mx-auto container-max-width">
			<h1 class="pl-4 pr-4">Tool starten ...</h1>
			<div v-if="launched">
				<p class="pa-4">
					{{ launched.url }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import ExternalToolsModule from "../../store/external-tools";
import { ToolLaunchRequestResponse } from "../../serverApi/v3";
import { useExternalToolMappings } from "../../composables/external-tool-mappings.composable";
import { ToolLaunch } from "./tool-launch.interface";
import { ToolLaunchMethod } from "./tool-launch-method";

export default defineComponent({
	name: "ToolLaunchRequestComponent",
	props: {
		contextExternalToolId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const isLoading = ref(true);
		const launched = ref(null);
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		const { mapToolLaunchRequestResponse } = useExternalToolMappings();

		const launchTool = async () => {
			const launchToolResponse: ToolLaunchRequestResponse | undefined =
				await externalToolsModule?.launchTool(props.contextExternalToolId);
			if (!launchToolResponse) {
				throw new Error("No launch tool response");
			}
			return mapToolLaunchRequestResponse(launchToolResponse);
		};

		const handleGetRequest = (toolLaunch: ToolLaunch) => {
			if (toolLaunch.openNewTab) {
				window.open(toolLaunch.url, "_blank");
			} else {
				window.location.href = toolLaunch.url;
			}
		};

		const handlePostRequest = (toolLaunch: ToolLaunch) => {
			const form = document.createElement("form");
			form.method = "POST";
			form.action = toolLaunch.url;
			form.target = toolLaunch.openNewTab ? "_blank" : "_self";

			const payload = JSON.parse(toolLaunch.payload || "{}");

			for (const key in payload) {
				if (Object.prototype.hasOwnProperty.call(payload, key)) {
					const hiddenField = document.createElement("input");
					hiddenField.type = "hidden";
					hiddenField.name = key;
					hiddenField.value = payload[key];

					form.appendChild(hiddenField);
				}
			}

			document.body.appendChild(form);
			form.submit();
		};

		onMounted(async () => {
			console.log("ToolLaunchRequestComponent mounted");
			try {
				const toolLaunch = await launchTool();
				if (toolLaunch.method === ToolLaunchMethod.GET) {
					handleGetRequest(toolLaunch);
				} else if (toolLaunch.method === ToolLaunchMethod.POST) {
					handlePostRequest(toolLaunch);
				}
				isLoading.value = false;
			} catch (error) {
				console.error(error);
			}
		});

		return {
			isLoading,
			launched,
		};
	},
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--size-content-width-max);
}
</style>
