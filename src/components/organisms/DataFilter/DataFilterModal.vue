<template>
	<base-modal :active="true" @onBackdropClick="$emit('cancel')">
		<template v-slot:header> Filter: {{ title | entities }} </template>
		<template v-slot:body>
			<slot />
		</template>
		<template v-slot:footer>
			<modal-footer>
				<template v-slot:left>
					<base-button class="btn-left" design="text" @click="$emit('remove')">
						{{ labelRemove }}
					</base-button>
				</template>
				<template v-slot:right>
					<base-button design="text" @click="$emit('cancel')">
						{{ labelCancel }}
					</base-button>
					<base-button design="primary" @click="$emit('apply')">
						{{ labelApply }}
					</base-button>
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
<style lang="scss" scoped>
@import "@styles";
</style>
