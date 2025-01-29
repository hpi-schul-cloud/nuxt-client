<template>
	<v-card ref="changeRoleContent">
		<template v-slot:prepend>
			<div ref="textTitle" class="text-h4 mt-2">
				Raumberechtigungen bearbeiten
			</div>
		</template>

		<template v-slot:default>
			<div class="ml-6 mr-6 mt-2">
				<div>
					<div class="mb-4">
						{{ infoText }}
					</div>
					<v-radio-group v-model="selection" class="ml-n2">
						<v-radio
							label="Lesen"
							:value="RoleName.Roomviewer"
							color="primary"
							selected
						/>
						<div class="ml-10 mt-n2 mb-2 text-sm">
							Inhalte erstellen und bearbeiten
						</div>

						<v-radio
							label="Bearbeiten"
							:value="RoleName.Roomeditor"
							color="primary"
						/>
						<div class="ml-10 mt-n2 mb-2 text-sm">
							Auf die Bereiche im Raum zugreifen und Inhalte ansehen
						</div>

						<v-radio
							label="Verwalten"
							:value="RoleName.Roomadmin"
							color="primary"
						/>
						<div class="ml-10 mt-n2 mb-2 text-sm">
							Gleiche Berechtigungen wie „Bearbeiten”, zusätzlich andere
							Mitglieder hinzufügen, entfernen, deren Raumberechtigungen ändern
							sowie Raum bearbeiten
						</div>
					</v-radio-group>
				</div>
			</div>
		</template>

		<template v-slot:actions>
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					class="ms-auto mr-2"
					color="primary"
					:text="t('common.actions.cancel')"
					data-testid="change-role-cancel-btn"
					@click="onCancel"
				/>
				<v-btn
					ref="addButton"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.confirm')"
					data-testid="change-role-confirm-btn"
					@click="onConfirm"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VCard, VRadio } from "vuetify/lib/components/index.mjs";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
		default: () => [],
	},
	roomName: {
		type: String,
		required: true,
	},
});
const { t } = useI18n();
const selection = ref<string | null>(null);
const memberToChangeRole = toRef(props, "members")?.value;

if (memberToChangeRole.length === 1) {
	selection.value = memberToChangeRole[0]?.roomRoleName;
}

const infoText = computed(() => {
	if (memberToChangeRole.length === 1) {
		const memberName = `${memberToChangeRole[0]?.firstName} ${memberToChangeRole[0]?.lastName}`;
		return `${memberName} erhält die folgenden Raumberechtigungen in „${props.roomName}”:`;
	}
	return `Die ausgewählten Mitglieder erhalten die folgenden Raumberechtigungen in „${props.roomName}”:`;
});

const emit = defineEmits<{
	(e: "confirm", selection: string): void;
	(e: "cancel"): void;
}>();

const onConfirm = () => {
	if (selection.value) {
		emit("confirm", selection.value);
	}
};
const onCancel = () => emit("cancel");

const changeRoleContent = ref();
useFocusTrap(changeRoleContent, {
	immediate: true,
});
</script>
