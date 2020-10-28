<template>
	<base-header
		v-bind="$attrs"
		:actions="actions"
		anchor="top-right-bottom-placed"
		source="material"
		icon="more_vert"
	>
		<div class="next-lesson-container">
			<base-icon source="custom" icon="clock"></base-icon>
			some date
		</div>
		<base-button design="text">
			<base-icon source="material" icon="folder"></base-icon>
			Kursdateien
		</base-button>
	</base-header>
</template>
<script>
import BaseHeader from "@components/base/BaseHeader";
import BaseButton from "@components/base/BaseButton";
import BaseIcon from "@components/base/BaseIcon";

export default {
	components: {
		BaseHeader,
		BaseButton,
		BaseIcon,
	},
	props: {
		nextLessonDate: {
			type: String,
			required: true,
		},
		courseDataLink: {
			type: String,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.next-lesson-container {
	display: flex;
	align-items: center;
}
</style>
