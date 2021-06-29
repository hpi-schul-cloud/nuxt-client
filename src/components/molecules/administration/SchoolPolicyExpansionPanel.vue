<template>
	<v-expansion-panel class="py-2 school-policy-expansion-panel">
		<v-expansion-panel-header>
			{{ schoolPolicyTitle(policy) }}
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-row>
				<v-col>
					<p class="body-1">
						{{ policy.consentText }}
					</p>
				</v-col>
			</v-row>
			<v-row v-if="policy.fileData">
				<v-col>
					<v-btn
						depressed
						color="primary"
						outlined
						:href="policy.fileData.data"
						:download="policy.fileData.filename"
					>
						<v-icon class="mr-2">
							{{ iconMdiDownload }}
						</v-icon>
						PDF herunterladen
					</v-btn>
				</v-col>
			</v-row>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
import { printDateTimeFromStringUTC } from "@plugins/datetime";
import { mdiDownload } from "@mdi/js";

export default {
	props: {
		policy: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			iconMdiDownload: mdiDownload,
		};
	},
	methods: {
		printDateTimeFromStringUTC,
		schoolPolicyTitle(schoolPolicy) {
			return `${schoolPolicy.title} vom ${printDateTimeFromStringUTC(
				schoolPolicy.publishedAt
			)}`;
		},
	},
};
</script>

<style lang="scss" scoped>
.school-policy-expansion-panel {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12); // TODO - find vuetify name for this
}
</style>
