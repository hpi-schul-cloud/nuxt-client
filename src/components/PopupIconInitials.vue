<template>
	<div v-click-outside="removePopup" class="popup" @click="popup">
		<div class="icon">{{ initials }}</div>
		<div class="popuptext" :class="{ visible }">
			<div class="username">
				<user-has-role v-for="roleDisplayName in rolesDisplayName" :key="roleDisplayName.name" :role="roleDisplayName.name">
					<template v-slot:true>
						<span> {{ firstname }} {{ lastname }} ({{ roleDisplayName.displayName }}) </span>
					</template>
				</user-has-role>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
import UserHasRole from "@components/UserHasRole";

export default {
	components: {
		UserHasRole,
	},
	props: {
		firstname: {
			type: String,
			default: "",
		},
		lastname: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			visible: false,
			rolesDisplayName: [
				{
					name: 'teacher',
					displayName: 'Lehrer',
				},
				{
					name: 'student',
					displayName: 'Schüler',
				},
				{
					name: 'administrator',
					displayName: 'Administrator',
				},
				{
					name: 'superhero',
					displayName: 'Schul-Cloud Admin',
				},
					{
					name: 'demo',
					displayName: 'Demo',
				},
				{
					name: 'demoTeacher',
					displayName: 'Demo',
				},
				{
					name: 'demoStudent',
					displayName: 'Demo',
				},
				{
					name: 'helpdesk',
					displayName: 'Helpdesk',
				},
				{
					name: 'betaTeacher',
					displayName: 'Beta',
				},
				{
					name: 'expert',
					displayName: 'Experte',
				}
			],
		};
	},
	computed: {
		initials() {
			return this.firstname.slice(0, 1) + this.lastname.slice(0, 1);
		},
	},
	methods: {
		popup() {
			this.visible = !this.visible;
		},
		removePopup() {
			this.visible = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	padding: var(--space-xxs);
	font-size: var(--text-md);
	color: var(--color-white);
	-webkit-user-select: None;
	background-color: var(--color-tertiary-dark);
	border: none;
	border-radius: var(--radius-round);

	&:hover {
		background-color: var(--color-gray-dark);
	}
}

.popup {
	position: relative;
	display: inline-block;
	user-select: none;

	.popuptext {
		position: absolute;
		top: 100%;
		right: 0%;
		z-index: var(--layer-dropdown);
		display: none;
		flex-direction: column;
		width: 214px;
		padding: var(--space-xs) 0;
		margin-top: var(--space-xxxxs);
		font-size: var(--text-lg);
		color: var(--color-tertiary-dark);
		white-space: nowrap;
		background-color: var(--color-white);
		border: 1px solid var(--color-disabled);
		border-radius: var(--radius-sm);

		&.visible {
			display: flex;
		}

		.username {
			height: 40px;
			/* stylelint-disable sh-waqar/declaration-use-variable */
			padding: 10px 15px;
			/* stylelint-enable */
			border-bottom: 1px solid var(--color-disabled);
		}
	}
}
</style>
