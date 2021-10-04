import { storiesOf } from "@storybook/vue";
import DefaultWireframe from "@components/templates/DefaultWireframe";
import { text } from "@storybook/addon-knobs";
import { mdiDotsVertical } from "@mdi/js";

const headline = "Lorem ipsum dolor";

storiesOf("0 Vuetify/Templates/DefaultWireframe", module)
	.add("Full Width Without Breadcrumbs", () => ({
		components: {
			DefaultWireframe,
		},
		data: () => ({
			headline: text("headline", headline),
		}),
		template: `
		<v-app>
			<default-wireframe :full-width="true" :headline="headline">
				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lorem a quam interdum posuere ac at massa. Maecenas dignissim lorem libero, et vestibulum odio condimentum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ultricies dolor nec quam porttitor molestie. Nunc tempor risus sed feugiat tempus. Integer non lobortis turpis, sit amet ultricies magna. Suspendisse sodales, ligula sed dignissim euismod, massa lacus facilisis velit, ut porta tellus magna in sem. Aenean pellentesque ante sit amet dui eleifend tristique. Nullam enim odio, consectetur eu pretium eu, aliquam id ex. Donec sapien est, luctus fermentum mi et, interdum aliquam tortor. Phasellus et sodales purus. Duis pulvinar erat ac tellus posuere scelerisque. Aliquam nec neque ut arcu porta mattis. Maecenas finibus, ligula vel pellentesque rhoncus, dolor urna interdum sapien, vitae hendrerit nibh lectus eu leo. Donec sit amet purus imperdiet, aliquam justo et, ultricies leo.</p>
				</div>
			</default-wireframe>
		</v-app>`,
	}))
	.add("Content Width With Breadcrumbs", () => ({
		components: {
			DefaultWireframe,
		},
		data: () => ({
			headline: text("headline", headline),
			breadcrumbs: [
				{
					text: "Lorem",
					href: "../",
				},
				{
					text: "Ipsum",
					disabled: true,
				},
			],
		}),
		template: `
		<v-app>
			<default-wireframe :full-width="false" :headline="headline" :breadcrumbs="breadcrumbs">
				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lorem a quam interdum posuere ac at massa. Maecenas dignissim lorem libero, et vestibulum odio condimentum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ultricies dolor nec quam porttitor molestie. Nunc tempor risus sed feugiat tempus. Integer non lobortis turpis, sit amet ultricies magna. Suspendisse sodales, ligula sed dignissim euismod, massa lacus facilisis velit, ut porta tellus magna in sem. Aenean pellentesque ante sit amet dui eleifend tristique. Nullam enim odio, consectetur eu pretium eu, aliquam id ex. Donec sapien est, luctus fermentum mi et, interdum aliquam tortor. Phasellus et sodales purus. Duis pulvinar erat ac tellus posuere scelerisque. Aliquam nec neque ut arcu porta mattis. Maecenas finibus, ligula vel pellentesque rhoncus, dolor urna interdum sapien, vitae hendrerit nibh lectus eu leo. Donec sit amet purus imperdiet, aliquam justo et, ultricies leo.</p>
				</div>
			</default-wireframe>
		</v-app>`,
	}))
	.add("With Breadcrumbs and Custom Header", () => ({
		components: {
			DefaultWireframe,
		},
		data: () => ({
			breadcrumbs: [
				{
					text: "Lorem",
					href: "../",
				},
				{
					text: "Ipsum",
					disabled: true,
				},
			],
			menuIcon: mdiDotsVertical,
		}),
		template: `
		<v-app>
			<default-wireframe :full-width="true" :breadcrumbs="breadcrumbs">
				<div slot="header">
					<h2>Lorem ipsum <v-icon>{{menuIcon}}</v-icon></h2>
				</div>
				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lorem a quam interdum posuere ac at massa. Maecenas dignissim lorem libero, et vestibulum odio condimentum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ultricies dolor nec quam porttitor molestie. Nunc tempor risus sed feugiat tempus. Integer non lobortis turpis, sit amet ultricies magna. Suspendisse sodales, ligula sed dignissim euismod, massa lacus facilisis velit, ut porta tellus magna in sem. Aenean pellentesque ante sit amet dui eleifend tristique. Nullam enim odio, consectetur eu pretium eu, aliquam id ex. Donec sapien est, luctus fermentum mi et, interdum aliquam tortor. Phasellus et sodales purus. Duis pulvinar erat ac tellus posuere scelerisque. Aliquam nec neque ut arcu porta mattis. Maecenas finibus, ligula vel pellentesque rhoncus, dolor urna interdum sapien, vitae hendrerit nibh lectus eu leo. Donec sit amet purus imperdiet, aliquam justo et, ultricies leo.</p>
				</div>
			</default-wireframe>
		</v-app>`,
	}));
