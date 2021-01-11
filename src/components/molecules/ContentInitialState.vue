<template>
	<empty-state
		image="@assets/img/empty-state/content-initial.svg"
		:alt="$t('pages.content.init_state.img_alt')"
		:title="$t('pages.content.init_state.title')"
	>
		<template v-slot:description>
			<div class="initial-state-description">
				<!-- eslint-disable vue/no-v-html -->
				<span v-if="isThuringen" v-html="$t('pages.content.init_state.messageTH')"/>
				<span v-else v-html="$t('pages.content.init_state.message')" />
			</div>
		</template>
	</empty-state>
</template>

<script>
import EmptyState from "@components/molecules/EmptyState";
export default {
	components: {
		EmptyState,
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
  computed: {
    isThuringen() {
      return process.env.SC_THEME === "thr";
    },
  }
};
</script>
<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
