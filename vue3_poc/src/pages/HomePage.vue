<template>
	<div class="container">
		<div>
			<h2>{{ persistentValue }}</h2>
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
				<v-btn @click="onIncreaseCounter">
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
		hasButtons
		:buttons="['close']"
		@dialog-closed="onCloseDialog"
	>
		<template v-slot:title><h4>Dialog Title</h4></template>
	</v-custom-dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import { useCounterStore } from "@/store/counter";
import { computed } from "@vue/reactivity";
import vCustomDialog from "@/components/vCustomDialog.vue";
export default {
	components: {
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
};
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	max-width: 720px;
}
</style>
