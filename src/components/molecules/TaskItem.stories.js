import { storiesOf } from "@storybook/vue";
import TaskItem from "@components/molecules/TaskItem";
import ExampleImage from "@assets/img/courses/draft.svg";
import { boolean, text } from "@storybook/addon-knobs";

storiesOf("5 Molecules/TaskItem", module)
	.add("with knobs", () => ({
		components: { TaskItem },
		data: () => ({
			imgSrc: ExampleImage,
			title: text("title", "Das Nervensystem"),
			subtitle: text("subtitle", "Editor-Dokument"),
			status: text("status", "Entwurf"),
			actionNeeded: boolean("actionNeeded", false),
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
			contextOpen: false,
		}),
		template: `<div>
		<TaskItem :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">	
		</TaskItem>
	</div>`,
	}))
	.add("with image (triple)", () => ({
		components: { TaskItem },
		data: () => ({
			imgSrc: ExampleImage,
			title: "Das Nervensystem",
			subtitle: "Editor-Dokument",
			status: "Entwurf",
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
		}),
		template: `<div>
		<TaskItem :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
		</TaskItem>
        <TaskItem :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
        </TaskItem>
        <TaskItem :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
        </TaskItem>
	</div>`,
	}))
	.add("with pulsating dot", () => ({
		components: { TaskItem },
		data: () => ({
			imgSrc: ExampleImage,
			title: "Das Nervensystem",
			subtitle: "Editor-Dokument",
			status: "Entwurf",
			actionNeeded: true,
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
		}),
		template: `<div>
    <TaskItem :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
    </TaskItem>
    </div>`,
	}));
