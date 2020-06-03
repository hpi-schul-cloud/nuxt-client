<template>
	<section>
		<base-modal :success.sync="success">
			<template v-slot:header></template>
			<template v-slot:body>
				<ModalBodyInfo title="Das neue Schuljahr hat soeben begonnen">
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="info"
							style="color: var(--color-success);"
						/>
					</template>
				</ModalBodyInfo>
			</template>
			<template v-slot:footer>
				<ModalFooterConfirm text="Ok" @click="success" />
			</template>
		</base-modal>

		<form-edit-user-data @success="success" @error="error">
			<template v-slot:inputs="{ userData }">
				<base-input
					v-model="userData.email"
					type="email"
					:label="$t('common.labels.email')"
					:placeholder="$t('common.placeholder.email.update')"
					class="mt--md"
					data-testid="jjjjjjj"
				>
				</base-input>
			</template>
		</form-edit-user-data>
	</section>
</template>

<script>
import FormEditUserData from "@components/organisms/FormEditUserData";

export default {
	components: {
		FormEditUserData,
	},
	data() {
		return {
			showModal: false,
		};
	},
	methods: {
		error() {
			this.$toast.error("Leider ist etwas schief gegangen");
		},
		success() {
			// this.$router.push({
			// 	path: `/account/`,
			// });
		},
	},
};
</script>
