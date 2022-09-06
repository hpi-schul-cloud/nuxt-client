<template>
	<div>
		<div>
			<h2 class="text-h2">
				{{ persistentValue }} <v-icon>{{ mdiHome }}</v-icon
				><v-icon>{{
					"M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
				}}</v-icon>
			</h2>
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
import { mdiHome } from "@mdi/js";
import { defineComponent, ref } from "vue";
import { useCounterStore } from "@/store/counter";
import { computed } from "vue";
import vCustomDialog from "@/components/vCustomDialog.vue";
export default defineComponent({
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
			mdiHome,
		};
	},
});
</script>
