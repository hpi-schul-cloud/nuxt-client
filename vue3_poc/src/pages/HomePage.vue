<template>
	<div>
		<div>
			<h2 class="text-h2">{{ persistentValue }} <v-icon>mdi-home</v-icon></h2>
			<h2>{{ reactiveValue }}</h2>
			<br />
			<div>
				<v-text-field
					v-model="reactiveValue"
					variant="outlined"
					label="value"
				/>
			</div>
			<br />
			<div>
				<sass-variables-in-components-poc></sass-variables-in-components-poc>
			</div>
			<div>
				<v-btn color="primary" @click="onIncreaseCounter">
					Counter in the component {{ counter }}
				</v-btn>
			</div>
			<br />
			<div>
				<v-btn @click="onIncreaseStoreCounter">
					Counter in the store {{ storeCounter }}
				</v-btn>
			</div>
			<br />
			<div>
				<v-btn @click="dialogIsOpen = true">Open Dialog</v-btn>
			</div>
		</div>
	</div>
	<v-custom-dialog
		v-model="dialogIsOpen"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onCloseDialog"
	>
		<template #title><h4>Dialog Title</h4></template>
	</v-custom-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCounterStore } from "@/store/counter";
import { computed } from "vue";
import vCustomDialog from "@/components/vCustomDialog.vue";
import SassVariablesInComponentsPoc from "@/components/SassVariablesInComponentsPoc.vue";
export default defineComponent({
	components: {
		SassVariablesInComponentsPoc,
		vCustomDialog,
	},
	setup() {
		const store = useCounterStore();
		const persistentValue = "Composition api page";
		const reactiveValue: object = ref("Reactive value");
		const counter = ref(0);
		const storeCounter = computed(() => store.counter);
		const onIncreaseCounter = (): void => {
			counter.value++;
		};

		const onIncreaseStoreCounter = (): void => {
			store.increment();
		};

		const dialogIsOpen = ref(false);
		const onCloseDialog = () => {
			dialogIsOpen.value = false;
		};

		return {
			persistentValue,
			reactiveValue,
			onIncreaseCounter,
			counter,
			storeCounter,
			onIncreaseStoreCounter,
			dialogIsOpen,
			onCloseDialog,
		};
	},
});
</script>
<style lang="scss">
@use "@/styles/vuetify-settings.scss" as vuetify;
@debug vuetify.$border-radius-root;
</style>
