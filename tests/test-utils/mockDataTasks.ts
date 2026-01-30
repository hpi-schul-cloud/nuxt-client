import { RichTextTypeEnum, TaskResponse } from "@/serverApi/v3/api";
import { TaskStatus } from "@/store/types/tasks";

/*
	Mockdata for tasks dashboards
	This data is also used for unit tests, to ensure that the store works properly.
	Do not tamper with this data.
*/

const generateStatus = (props = {}) =>
	Object.assign(
		{
			submitted: 0,
			graded: 0,
			isDraft: false,
			isSubstitutionTeacher: false,
			maxSubmissions: 1,
			isFinished: false,
		},
		props
	);

const overDueTasks: TaskResponse[] = [
	{
		id: "59cce4171113d1132c98dc07",
		name: "Aufgabe an Marla (Mathe) - abgelaufen",
		dueDate: "2017-07-28T15:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-07-28T11:58:46.601Z",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus(),
		lessonHidden: false,
	},
	{
		id: "59cce2c61113d1132c98dc06",
		name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
		dueDate: "2017-07-28T13:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T11:49:39.924Z",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus(),
		lessonHidden: false,
	},
	{
		id: "59cce352c6abf042248e888c",
		name: "zu archivierende Aufgabe von Marla",
		dueDate: "2017-06-07T09:30:00.000Z",
		courseName: "Chemie",
		courseId: "59cce4171113d1132c01dc07",
		updatedAt: "2017-09-28T11:56:02.897Z",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus(),
		lessonHidden: false,
	},
];

const openTasksWithDueDate: TaskResponse[] = [
	{
		id: "59cce4c3c6abf042248e888e",
		name: "Private Aufgabe von Cord - mit Kurs, offen",
		description: { content: "Test", type: RichTextTypeEnum.PlainText },
		dueDate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T12:02:11.432Z",
		lessonName: "Malen nach Zahlen",
		createdAt: "2017-09-28T12:02:11.432Z",
		status: generateStatus(),
		lessonHidden: false,
	},
	{
		id: "59cce1d381297026d02cdc4b",
		name: "Private Aufgabe von Marla - mit Kurs, offen",
		dueDate: "2300-09-28T13:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T11:49:39.924Z",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus(),
		lessonHidden: false,
	},
	{
		id: "59cce3f6c6abf042248e888d",
		name: "Aufgabe an Marla (Mathe) - offen",
		dueDate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T11:58:46.601Z",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus(),
		lessonHidden: false,
	},
	{
		id: "59cce6c6d5e50214e47b601d",
		name: "Archivierte Aufgaben von Cord - mit Kurs, offen",
		dueDate: "2300-10-25T15:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T12:10:46.180Z",
		createdAt: "2017-09-28T12:10:46.180Z",
		status: generateStatus(),
		lessonHidden: false,
	},
];
const openTasksWithoutDueDate: TaskResponse[] = [
	{
		id: "59cce4171113d1132c98dc08",
		name: "Aufgabe an Marla (Mathe) - ohne Abgabedatum",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-07-28T11:58:46.601Z",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus(),
		lessonHidden: false,
	},
];

const submittedTasks: TaskResponse[] = [
	{
		id: "59cce4c3c6abf042248e968e",
		name: "Aufgabe von Cord - mit Kurs, abgegeben",
		displayColor: "#00E5FF",
		dueDate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T12:02:11.432Z",
		createdAt: "2017-09-28T12:02:11.432Z",
		status: generateStatus({
			submitted: 1,
		}),
		lessonHidden: false,
	},
];

const missedButGradedTasks: TaskResponse[] = [
	{
		id: "59cce352c6abf001248e888c",
		name: "Aufgabe von Marla - abgelaufen, bewertet",
		displayColor: "#1DE9B6",
		dueDate: "2017-06-07T09:30:00.000Z",
		courseName: "Biologie",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T11:56:02.897Z",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			graded: 1,
		}),
		lessonHidden: false,
	},
];

const gradedTasks: TaskResponse[] = [
	{
		id: "59cce7u6c6abf042248e888d",
		name: "Aufgabe an Marla (Mathe) - abgegeben, bewertet",
		displayColor: "#00E5FF",
		dueDate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T11:58:46.601Z",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 1,
			graded: 1,
		}),
		lessonHidden: false,
	},
	{
		id: "59cce352c6abf001248e888c",
		name: "Aufgabe von Marla - abgelaufen, bewertet",
		displayColor: "#1DE9B6",
		dueDate: "2017-06-07T09:30:00.000Z",
		courseName: "Biologie",
		courseId: "59cce4171113d1132c00dc07",
		updatedAt: "2017-09-28T11:56:02.897Z",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			graded: 1,
		}),
		lessonHidden: false,
	},
];

const openTasks = [...openTasksWithDueDate, ...overDueTasks, ...openTasksWithoutDueDate];
const completedTasks = [...submittedTasks, ...gradedTasks];
const tasks: TaskResponse[] = [...openTasks, ...completedTasks];

const invalidTasks = [
	{
		_id: "59cce4c3c6abf042248e888e",
		name: "Private Aufgabe von Cord - mit Kurs, offen",
		dueDate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:02:11.432Z",
	},
	{
		id: "59cce1d381297026d02cdc4b",
		dueDate: "2300-09-28T13:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:49:39.924Z",
	},
	{
		_id: "59cce3f6c6abf042248e888d",
		name: "Aufgabe an Marla (Mathe) - offen",
		dueDate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
	},
	{
		id: "59cce6c6d5e50214e47b601d",
		_id: "59cce6c6d5e50214e47b601d",
		name: "Archivierte Aufgaben von Cord - mit Kurs, offen",
		dueDate: "2300-10-25T15:00:00.000Z",
		courseName: "Mathe",
	},
	{
		id: "59cce4171113d1132c98dc08",
		_id: "59cce4171113d1132c98dc08",
		name: "Aufgabe an Marla (Mathe) - ohne Abgabedatum",
		createdAt: "2017-07-28T11:58:46.601Z",
	},
];

const overDueTasksTeacher: TaskResponse[] = [
	{
		id: "59cce352c6abf042248e888c",
		name: "Trigonometrie",
		dueDate: "2017-06-07T09:30:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			submitted: 1,
			maxSubmissions: 1,
			graded: 1,
			isFinished: false,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce2c61113d1132c98dc06",
		name: "Schaubilder und Diagramme auswerten",
		dueDate: "2017-07-28T13:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus({
			submitted: 5,
			maxSubmissions: 15,
			isFinished: true,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce4171113d1132c98dc07",
		name: "Schriftlich multiplizieren mit Dezimalzahlen",
		dueDate: "2017-07-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 10,
			graded: 9,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
];

const dueDateTasksTeacher: TaskResponse[] = [
	{
		id: "59cce4c3c6abf042248e888e",
		name: "Logarithmus",
		dueDate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		lessonName: "Malen nach Zahlen",
		createdAt: "2017-09-28T12:02:11.432Z",
		description: { content: "Test", type: RichTextTypeEnum.PlainText },
		status: generateStatus({
			maxSubmissions: 1,
			isSubstitutionTeacher: true,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce3f6c6abf042248e888d",
		name: "Morphologie",
		dueDate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 15,
			graded: 7,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce6c6d5e50214e47b601d",
		name: "Nomen mit Wortbausteinen",
		dueDate: "2300-10-25T15:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T12:10:46.180Z",
		status: generateStatus({
			submitted: 3,
			maxSubmissions: 15,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce1d381297026d02cdc4b",
		name: "Bildung des Konjunktiv I",
		dueDate: "2300-09-28T13:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 12,
			graded: 4,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce1d381297026d02cdc4b",
		name: "Task with unpublished lesson",
		dueDate: "2300-09-28T13:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T11:49:39.924Z",
		lessonHidden: true,
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 12,
			graded: 4,
		}),
		courseId: "",
		updatedAt: "",
	},
];

const noDueDateTasksTeacher: TaskResponse[] = [
	{
		id: "59cce4171113d1132c98dc08",
		name: "Analytischen Geometrie zusammen mit Vektorrechnung",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 1,
			maxSubmissions: 1,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
];

const tasksTeacher = [...overDueTasksTeacher, ...dueDateTasksTeacher, ...noDueDateTasksTeacher];

const drafts: TaskResponse[] = [
	{
		id: "59cce2c61113d1132c98dcw2",
		name: "Der Buchstabe O",
		courseName: "Deutsch",
		description: { content: "Das Alphabet", type: RichTextTypeEnum.PlainText },
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus({
			isDraft: true,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59ccr252c6abf042248e888c",
		name: "Das 1x1",
		courseName: "",
		description: { content: "", type: RichTextTypeEnum.PlainText },
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			isDraft: true,
			isSubstitutionTeacher: true,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59ccr252c6t5f042248e888c",
		name: "Aufgabe ohne Kurs",
		courseName: "",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			isDraft: true,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
];

const plannedTask: TaskResponse = {
	id: "59cce1d38129702re02cdc4b",
	name: "Bildung des Konjunktiv I",
	availableDate: "2200-09-28T13:00:00.000Z",
	dueDate: "2300-09-28T13:00:00.000Z",
	courseName: "Deutsch",
	createdAt: "2017-09-28T11:49:39.924Z",
	status: generateStatus({
		submitted: 10,
		maxSubmissions: 12,
		graded: 4,
	}),
	courseId: "",
	lessonHidden: false,
	updatedAt: "",
};

const allTasksTeacher = [...tasksTeacher, ...drafts];

const coursesStudent = ["Mathe", "Chemie", "Biologie"];
const coursesTeacher = ["Mathe", "Deutsch", ""];

const tasksCountStudent = {
	open: { Mathe: 7, Chemie: 1, Biologie: 0 },
	completed: { Mathe: 2, Chemie: 0, Biologie: 1 },
};

const tasksCountTeacher = {
	open: { Mathe: 5, Deutsch: 3, "": 0 },
	drafts: { Mathe: 0, Deutsch: 1, "": 2 },
};

const mathTasks: TaskResponse[] = [
	{
		id: "59cce352c6abf042248e888c",
		name: "Trigonometrie",
		dueDate: "2017-06-07T09:30:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			submitted: 1,
			graded: 1,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce4171113d1132c98dc07",
		name: "Schriftlich multiplizieren mit Dezimalzahlen",
		dueDate: "2017-07-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 10,
			graded: 9,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce4c3c6abf042248e888e",
		name: "Logarithmus",
		dueDate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:02:11.432Z",
		status: generateStatus(),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce3f6c6abf042248e888d",
		name: "Morphologie",
		dueDate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 15,
			graded: 7,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
	{
		id: "59cce4171113d1132c98dc08",
		name: "Analytischen Geometrie zusammen mit Vektorrechnung",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 1,
		}),
		courseId: "",
		lessonHidden: false,
		updatedAt: "",
	},
];

const hex = (value: number) => Math.floor(value).toString(16);
const rnd = () => Math.random() * 16;
const ObjectId = () => hex(Date.now() / 1000) + " ".repeat(16).replace(/./g, () => hex(rnd()));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateTask = (status: TaskStatus, props: any) => {
	const id = ObjectId();

	return Object.assign(
		{
			id,
			_id: id,
			courseName: "course " + Date.now() + rnd(),
			name: "task " + Date.now() + rnd(),
			createdAt: Date.now(), // todo: formating
			status: generateStatus(status),
		},
		props
	);
};

export default {
	mathTasks,
	tasksCountTeacher,
	tasksCountStudent,
	coursesTeacher,
	coursesStudent,
	allTasksTeacher,
	drafts,
	tasksTeacher,
	noDueDateTasksTeacher,
	dueDateTasksTeacher,
	overDueTasksTeacher,
	invalidTasks,
	tasks,
	completedTasks,
	openTasks,
	gradedTasks,
	missedButGradedTasks,
	submittedTasks,
	openTasksWithoutDueDate,
	openTasksWithDueDate,
	overDueTasks,
	plannedTask,
	generateTask,
};
