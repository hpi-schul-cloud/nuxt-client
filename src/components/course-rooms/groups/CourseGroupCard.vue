<template>
	<VCard
		:to="{ name: 'course-room-group-details', params: { id: group.courseId, groupId: group.id } }"
		:aria-label="group.name"
		variant="outlined"
		class="h-100"
		data-testid="group-name-entry"
	>
		<VCardTitle class="text-wrap">{{ group.name }}</VCardTitle>
		<VCardText v-if="group.members.length" class="d-flex flex-wrap ga-1">
			<VChip v-for="member in group.members" :key="member.id" size="small" data-testid="group-member-chip">
				{{ member.fullName }}
			</VChip>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import { CourseGroup } from "@data-course-group";
import { PropType } from "vue";

defineProps({
	group: {
		type: Object as PropType<CourseGroup>,
		required: true,
	},
});
</script>
