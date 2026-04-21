<template>
	<VList role="feed" lines="two">
		<TransitionGroup class="overflow-hidden" name="anim-tasks" tag="ul">
			<li v-for="task in tasks" :key="task.id" class="tasks-list-item">
				<slot :task="task" />
			</li>
		</TransitionGroup>

		<div v-if="hasPagination" v-intersect="loadMore" aria-hidden="true" />
		<div v-if="showSpinner" class="d-flex justify-center my-10">
			<VProgressCircular indeterminate />
		</div>
	</VList>
</template>

<script setup lang="ts">
import { TaskResponse } from "@api-server";
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		tasks: TaskResponse[];
		hasPagination?: boolean;
		isLoadingMoreItems?: boolean;
	}>(),
	{ hasPagination: false, isLoadingMoreItems: false }
);

const emit = defineEmits<{ "load-more-tasks": [] }>();

const showSpinner = computed(() => props.hasPagination && props.isLoadingMoreItems);
const loadMore = (isIntersecting: boolean) => {
	if (isIntersecting) emit("load-more-tasks");
};
</script>
<style lang="scss" scoped>
.tasks-list-item:not(:last-child) {
	border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

li {
	list-style-type: none;
	margin-left: 0;
	padding-left: 0;
}

.anim-tasks {
	&-move,
	&-enter-active,
	&-leave-active {
		transition: all 0.25s ease;
	}

	&-enter-from,
	&-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}

	&-leave-active {
		position: absolute;
	}
}
</style>
