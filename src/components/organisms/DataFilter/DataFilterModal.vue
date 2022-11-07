<template>
	<base-modal :active="true" @onBackdropClick="$emit('cancel')">
		<template #header> Filter: {{ title | entities }} </template>
		<template #body>
			<slot />
		</template>
		<template #footer>
			<modal-footer>
				<template #left>
					<v-btn text class="btn-left" @click="$emit('remove')">
						{{ labelRemove }}
					</v-btn>
				</template>
				<template #right>
					<v-btn text @click="$emit('cancel')">
						{{ labelCancel }}
					</v-btn>
					<v-btn color="primary" depressed @click="$emit('apply')">
						{{ labelApply }}
					</v-btn>
				</template>
			</modal-footer>
		</template>
	</base-modal>
</template>

<script>
import ModalFooter from "@components/molecules/ModalFooter";
import { XmlEntities } from "html-entities";
const entities = new XmlEntities();

export default {
	components: {
		ModalFooter,
	},
	filters: {
		entities(value) {
			return entities.decode(value);
		},
	},
	props: {
		title: { type: String, required: true },
		labelApply: { type: String, required: true },
		labelCancel: { type: String, required: true },
		labelRemove: { type: String, required: true },
	},
};
</script>
