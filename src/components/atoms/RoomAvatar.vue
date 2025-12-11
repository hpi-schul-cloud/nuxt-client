<template>
	<div
		class="room-avatar"
		:data-testid="item.id"
		:class="isDragging ? 'dragging' : 'room-avatar'"
		:draggable="draggable"
		:style="{ width: size }"
		@dragstart="startDragAvatar"
		@drop.prevent="dropAvatar"
		@dragover.prevent
		@dragend="dragend"
	>
		<v-badge
			class="ma-0 badge-component rounded avatar-badge"
			bordered
			:model-value="!!badgeIcon"
			:icon="badgeIcon"
			:data-testid="badgeType"
		>
			<VBtn
				:size="size"
				:color="avatarColor"
				variant="flat"
				:class="avatarClass"
				:rounded="condenseLayout ? 0 : 'lg'"
				:ripple="false"
				:disabled="condenseLayout"
				@click="onClick"
				@keypress.enter="onClick"
				@dragenter.prevent.stop="dragEnter"
			>
				<v-avatar :aria-label="avatarAriaLabel" :size="size" data-testid="course-icon" :show-badge="showBadge">
					<span :class="avatarTextClass" data-testid="course-short-title">
						{{ item.shortTitle }}
					</span>
				</v-avatar>
			</VBtn>
		</v-badge>
		<div v-if="!condenseLayout" aria-hidden="true" :class="titleClasses" data-testid="course-title">
			{{ title }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { mdiLock, mdiSync } from "@icons/material";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
	size: {
		type: String,
		default: "3em",
	},
	draggable: {
		type: Boolean,
	},
	condenseLayout: {
		type: Boolean,
	},
	showBadge: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["startDrag", "dragendAvatar", "dropAvatar"]);

const { t } = useI18n();
const router = useRouter();

const badgeType = computed(() => {
	if (props.item.isLocked) {
		return "course-badge-lock";
	}

	if (props.item.isSynchronized) {
		return "course-badge-sync";
	}

	return "course-badge";
});

const badgeIcon = computed(() => {
	if (!props.showBadge) {
		return undefined;
	}

	if (props.item.isLocked) {
		return mdiLock;
	}

	if (props.item.isSynchronized) {
		return mdiSync;
	}

	return undefined;
});

const stillBeingCopied = computed(() => props.item.copyingSince !== undefined);

const avatarAriaLabel = computed(() => {
	const course = t("common.labels.course");
	if (stillBeingCopied.value) {
		const ariaLabelSuffix = t("components.molecules.copyResult.courseCopy.ariaLabelSuffix");
		return `${course} ${props.item.title}: ${ariaLabelSuffix}`;
	}
	return `${course} ${props.item.title}`;
});

const avatarTextClass = computed(() => {
	const classes = ["text-h7"];
	if (props.condenseLayout) {
		classes.push("group-avatar", "text-h7");
	} else {
		classes.push("single-avatar", "text-h3");
	}

	if (stillBeingCopied.value) {
		classes.push("text-grey", "text-darken-1");
	} else {
		classes.push("text-white");
	}

	return classes;
});

const avatarClass = computed(() => (stillBeingCopied.value ? ["grey-lighten-2"] : []));

const avatarColor = computed(() => (stillBeingCopied.value ? undefined : props.item.displayColor));

const title = computed(() => {
	if (props.item.copyingSince) {
		return t("components.molecules.copyResult.courseCopy.info");
	}

	if (props.item.titleDate) {
		return `${props.item.title}\n${props.item.titleDate}`;
	}

	return props.item.title;
});

const titleClasses = computed(() => {
	const marginClass = props.item.titleDate ? "mb-5" : "mb-7";
	const copyingClass = stillBeingCopied.value ? ["text-grey", "text-darken-1"] : [];

	return ["justify-center", "mt-2", "subtitle", marginClass, ...copyingClass];
});

const isDragging = ref(false);

const onClick = () => {
	if (!props.condenseLayout && stillBeingCopied.value === false) {
		if (props.item.to) {
			router.push({
				path: `/rooms/${props.item.id}`,
			});
			return;
		}
		if (props.item.href) {
			window.location.href = `/rooms/${props.item.id}`;
		}
	}
};

const startDragAvatar = () => {
	isDragging.value = true;
	if (props.draggable) {
		emit("startDrag", props.item);
	}
};

const dragEnter = () => {
	isDragging.value = false;
};

const dragend = () => {
	isDragging.value = false;
	emit("dragendAvatar");
};

const dropAvatar = () => {
	emit("dropAvatar");
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;
@use "@/utils/multiline-ellipsis.scss" as *;

.v-avatar {
	width: 500px;
	cursor: pointer;
	border-radius: 0.5em;

	&:focus {
		outline-offset: 2px;
	}
}

.single-avatar {
	font-size: 3em;
	user-select: none;
}

.single-avatar::first-letter {
	text-transform: capitalize;
}

.subtitle {
	margin-right: -20px;
	margin-left: -20px;
	text-align: center;
	overflow-wrap: break-word;
	white-space: pre-wrap;

	@include excerpt($font-size: 16px, $line-height: var(--line-height-lg), $lines-to-show: 4);
}

@media #{map.get($display-breakpoints, 'xs')} {
	.subtitle {
		margin-right: unset;
		margin-left: unset;
		font-size: 14px;
	}
}

.group-avatar {
	font-size: 0.5em;
	user-select: none;
}

.rounded-xl {
	background-color: transparent;
}

.avatar-badge {
	max-width: 100%;
}

.dragging {
	opacity: 0.5;
}
</style>
