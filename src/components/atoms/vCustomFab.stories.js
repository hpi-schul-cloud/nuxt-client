import { storiesOf } from "@storybook/vue";
import vCustomFab from "@components/atoms/vCustomFab";
import { mdiPlus, mdiAccountPlus, mdiCloudUpload } from "@mdi/js";

storiesOf("0 Vuetify/Atoms/vCustomFab", module)
	.add("simple action", () => ({
		components: {
			vCustomFab,
		},
		data: () => ({
			mdiPlus,
		}),
		template: `
		<v-app>
			<h1 class="h4">vCustomFab</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus venenatis laoreet. Quisque condimentum, elit nec aliquet pretium, eros massa ultricies elit, at rhoncus turpis ligula ut justo. Cras eget tincidunt risus. Aenean nec sem a mi venenatis posuere quis sed libero. Quisque tincidunt velit eros, et consectetur urna malesuada a. Sed dapibus rutrum porttitor. Vestibulum id iaculis tellus, sed dictum enim. Sed sit amet rutrum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus mi magna, scelerisque in ante nec, mattis dictum arcu. Cras eu tincidunt ligula. In hac habitasse platea dictumst. Pellentesque at lorem dignissim, vestibulum risus et, auctor nulla. Fusce feugiat quam sed dignissim condimentum. In lobortis consectetur erat eu dictum.
			Suspendisse potenti. Etiam at mi sed justo sagittis ullamcorper. Pellentesque sit amet ipsum aliquam ligula elementum consectetur ut ac ante. Pellentesque non fermentum nulla. Suspendisse at feugiat ante. Sed nisl neque, aliquam at nisi id, lobortis gravida risus. Sed urna ex, molestie a tellus ut, sodales dignissim mauris. Etiam a dolor in tortor tempor condimentum. Curabitur egestas bibendum nulla in viverra. Donec a placerat nisi. Aenean lobortis nunc metus. Pellentesque bibendum nunc ipsum, vitae lacinia lectus dapibus vitae. Proin eget tristique metus. Etiam pellentesque arcu ante, ac elementum augue vestibulum vel. Praesent malesuada, leo non rhoncus finibus, dolor sapien varius erat, quis semper magna felis ut magna.
			</p>
			<v-custom-fab
				:icon="mdiPlus"
				title="Task"
			></v-custom-fab>
		</v-app>`,
	}))
	.add("multiple actions", () => ({
		components: {
			vCustomFab,
		},
		data: () => ({
			mdiPlus,
			mdiAccountPlus,
			mdiCloudUpload,
		}),
		template: `
		<v-app>
			<h1 class="h4">vCustomFab</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus venenatis laoreet. Quisque condimentum, elit nec aliquet pretium, eros massa ultricies elit, at rhoncus turpis ligula ut justo. Cras eget tincidunt risus. Aenean nec sem a mi venenatis posuere quis sed libero. Quisque tincidunt velit eros, et consectetur urna malesuada a. Sed dapibus rutrum porttitor. Vestibulum id iaculis tellus, sed dictum enim. Sed sit amet rutrum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus mi magna, scelerisque in ante nec, mattis dictum arcu. Cras eu tincidunt ligula. In hac habitasse platea dictumst. Pellentesque at lorem dignissim, vestibulum risus et, auctor nulla. Fusce feugiat quam sed dignissim condimentum. In lobortis consectetur erat eu dictum.
			Suspendisse potenti. Etiam at mi sed justo sagittis ullamcorper. Pellentesque sit amet ipsum aliquam ligula elementum consectetur ut ac ante. Pellentesque non fermentum nulla. Suspendisse at feugiat ante. Sed nisl neque, aliquam at nisi id, lobortis gravida risus. Sed urna ex, molestie a tellus ut, sodales dignissim mauris. Etiam a dolor in tortor tempor condimentum. Curabitur egestas bibendum nulla in viverra. Donec a placerat nisi. Aenean lobortis nunc metus. Pellentesque bibendum nunc ipsum, vitae lacinia lectus dapibus vitae. Proin eget tristique metus. Etiam pellentesque arcu ante, ac elementum augue vestibulum vel. Praesent malesuada, leo non rhoncus finibus, dolor sapien varius erat, quis semper magna felis ut magna.
			</p>
			<v-custom-fab
				:icon="mdiPlus"
				title="Task"
				:actions="[
					{
						label: 'Create',
						icon: mdiAccountPlus,
					},
					{
						label: 'Import',
						icon: mdiCloudUpload,
					},
				]"
			></v-custom-fab>
		</v-app>`,
	}));
