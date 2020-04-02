<template>
	<base-modal :active="true">
		<template v-slot:header>
			{{ title }}
		</template>
		<template v-slot:body>
			<slot />
		</template>
		<template v-slot:footer>
			<modal-footer>
				<template v-slot:right>
					<base-button design="text" @click="$emit('cancle')">
						{{ labelCancle }}
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

export default {
	components: {
		ModalFooter,
	},
	props: {
		title: { type: String, required: true },
		labelApply: { type: String, required: true },
		labelCancle: { type: String, required: true },
		labelRemove: { type: String, required: true },
	},
};
</script>
