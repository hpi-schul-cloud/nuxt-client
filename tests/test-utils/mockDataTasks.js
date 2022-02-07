/* eslint-disable max-lines */

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
		},
		props
	);

const overDueTasks = [
	{
		id: "59cce4171113d1132c98dc07",
		_id: "59cce4171113d1132c98dc07",
		name: "Aufgabe an Marla (Mathe) - abgelaufen",
		duedate: "2017-07-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus(),
	},
	{
		id: "59cce2c61113d1132c98dc06",
		_id: "59cce2c61113d1132c98dc06",
		name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
		duedate: "2017-07-28T13:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus(),
	},
	{
		id: "59cce352c6abf042248e888c",
		_id: "59cce352c6abf042248e888c",
		name: "zu archivierende Aufgabe von Marla",
		duedate: "2017-06-07T09:30:00.000Z",
		courseName: "Chemie",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus(),
	},
];
const openTasksWithDueDate = [
	{
		id: "59cce4c3c6abf042248e888e",
		_id: "59cce4c3c6abf042248e888e",
		name: "Private Aufgabe von Cord - mit Kurs, offen",
		duedate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		description: "Malen nach Zahlen",
		createdAt: "2017-09-28T12:02:11.432Z",
		status: generateStatus(),
	},
	{
		id: "59cce1d381297026d02cdc4b",
		_id: "59cce1d381297026d02cdc4b",
		name: "Private Aufgabe von Marla - mit Kurs, offen",
		duedate: "2300-09-28T13:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus(),
	},
	{
		id: "59cce3f6c6abf042248e888d",
		_id: "59cce3f6c6abf042248e888d",
		name: "Aufgabe an Marla (Mathe) - offen",
		duedate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus(),
	},
	{
		id: "59cce6c6d5e50214e47b601d",
		_id: "59cce6c6d5e50214e47b601d",
		name: "Archivierte Aufgaben von Cord - mit Kurs, offen",
		duedate: "2300-10-25T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:10:46.180Z",
		status: generateStatus(),
	},
];
const openTasksWithoutDueDate = [
	{
		id: "59cce4171113d1132c98dc08",
		_id: "59cce4171113d1132c98dc08",
		name: "Aufgabe an Marla (Mathe) - ohne Abgabedatum",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus(),
	},
];

const submittedTasks = [
	{
		id: "59cce4c3c6abf042248e968e",
		_id: "59cce4c3c6abf042248e968e",
		name: "Aufgabe von Cord - mit Kurs, abgegeben",
		displayColor: "#00E5FF",
		duedate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:02:11.432Z",
		status: generateStatus({
			submitted: 1,
		}),
	},
];

const missedButGradedTasks = [
	{
		id: "59cce352c6abf001248e888c",
		_id: "59cce352c6abf001248e888c",
		name: "Aufgabe von Marla - abgelaufen, bewertet",
		displayColor: "#1DE9B6",
		duedate: "2017-06-07T09:30:00.000Z",
		courseName: "Biologie",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			graded: 1,
		}),
	},
];

const gradedTasks = [
	{
		id: "59cce7u6c6abf042248e888d",
		_id: "59cce7u6c6abf042248e888d",
		name: "Aufgabe an Marla (Mathe) - abgegeben, bewertet",
		displayColor: "#00E5FF",
		duedate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 1,
			graded: 1,
		}),
	},
	{
		id: "59cce352c6abf001248e888c",
		_id: "59cce352c6abf001248e888c",
		name: "Aufgabe von Marla - abgelaufen, bewertet",
		displayColor: "#1DE9B6",
		duedate: "2017-06-07T09:30:00.000Z",
		courseName: "Biologie",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			graded: 1,
		}),
	},
];

const openTasks = [
	...openTasksWithDueDate,
	...overDueTasks,
	...openTasksWithoutDueDate,
];
const completedTasks = [...submittedTasks, ...gradedTasks];
const tasks = [...openTasks, ...completedTasks];

const invalidTasks = [
	{
		_id: "59cce4c3c6abf042248e888e",
		name: "Private Aufgabe von Cord - mit Kurs, offen",
		duedate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:02:11.432Z",
	},
	{
		id: "59cce1d381297026d02cdc4b",
		_id: "59cce1d381297026d02cdc4b",
		duedate: "2300-09-28T13:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:49:39.924Z",
	},
	{
		_id: "59cce3f6c6abf042248e888d",
		name: "Aufgabe an Marla (Mathe) - offen",
		duedate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
	},
	{
		id: "59cce6c6d5e50214e47b601d",
		_id: "59cce6c6d5e50214e47b601d",
		name: "Archivierte Aufgaben von Cord - mit Kurs, offen",
		duedate: "2300-10-25T15:00:00.000Z",
		courseName: "Mathe",
	},
	{
		id: "59cce4171113d1132c98dc08",
		_id: "59cce4171113d1132c98dc08",
		name: "Aufgabe an Marla (Mathe) - ohne Abgabedatum",
		createdAt: "2017-07-28T11:58:46.601Z",
	},
];

const overDueTasksTeacher = [
	{
		id: "59cce352c6abf042248e888c",
		_id: "59cce352c6abf042248e888c",
		name: "Trigonometrie",
		duedate: "2017-06-07T09:30:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			submitted: 1,
			maxSubmissions: 1,
			graded: 1,
			isFinished: false,
		}),
	},
	{
		id: "59cce2c61113d1132c98dc06",
		_id: "59cce2c61113d1132c98dc06",
		name: "Schaubilder und Diagramme auswerten",
		duedate: "2017-07-28T13:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus({
			submitted: 5,
			maxSubmissions: 15,
			isFinished: true,
		}),
	},
	{
		id: "59cce4171113d1132c98dc07",
		_id: "59cce4171113d1132c98dc07",
		name: "Schriftlich multiplizieren mit Dezimalzahlen",
		duedate: "2017-07-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 10,
			graded: 9,
		}),
	},
];

const dueDateTasksTeacher = [
	{
		id: "59cce4c3c6abf042248e888e",
		_id: "59cce4c3c6abf042248e888e",
		name: "Logarithmus",
		duedate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:02:11.432Z",
		description: "Malen nach Zahlen",
		status: generateStatus({
			maxSubmissions: 1,
			isSubstitutionTeacher: true,
		}),
	},
	{
		id: "59cce3f6c6abf042248e888d",
		_id: "59cce3f6c6abf042248e888d",
		name: "Morphologie",
		duedate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 15,
			graded: 7,
		}),
	},
	{
		id: "59cce6c6d5e50214e47b601d",
		_id: "59cce6c6d5e50214e47b601d",
		name: "Nomen mit Wortbausteinen",
		duedate: "2300-10-25T15:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T12:10:46.180Z",
		status: generateStatus({
			submitted: 3,
			maxSubmissions: 15,
		}),
	},
	{
		id: "59cce1d381297026d02cdc4b",
		_id: "59cce1d381297026d02cdc4b",
		name: "Bildung des Konjunktiv I",
		duedate: "2300-09-28T13:00:00.000Z",
		courseName: "Deutsch",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 12,
			graded: 4,
		}),
	},
];

const noDueDateTasksTeacher = [
	{
		id: "59cce4171113d1132c98dc08",
		_id: "59cce4171113d1132c98dc08",
		name: "Analytischen Geometrie zusammen mit Vektorrechnung",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 1,
			maxSubmissions: 1,
		}),
	},
];

const tasksTeacher = [
	...overDueTasksTeacher,
	...dueDateTasksTeacher,
	...noDueDateTasksTeacher,
];

const drafts = [
	{
		id: "59cce2c61113d1132c98dcw2",
		_id: "59cce2c61113d1132c98dcw2",
		name: "Der Buchstabe O",
		courseName: "Deutsch",
		description: "Das Alphabet",
		createdAt: "2017-09-28T11:49:39.924Z",
		status: generateStatus({
			isDraft: true,
		}),
	},
	{
		id: "59ccr252c6abf042248e888c",
		_id: "59ccr252c6abf042248e888c",
		name: "Das 1x1",
		courseName: "",
		description: "",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			isDraft: true,
			isSubstitutionTeacher: true,
		}),
	},
	{
		id: "59ccr252c6t5f042248e888c",
		_id: "59ccr252c6t5f042248e888c",
		name: "Aufgabe ohne Kurs",
		courseName: "",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			isDraft: true,
		}),
	},
];

const plannedTask = {
	id: "59cce1d38129702re02cdc4b",
	_id: "59cce1d38129702re02cdc4b",
	name: "Bildung des Konjunktiv I",
	availableDate: "2200-09-28T13:00:00.000Z",
	duedate: "2300-09-28T13:00:00.000Z",
	courseName: "Deutsch",
	createdAt: "2017-09-28T11:49:39.924Z",
	status: generateStatus({
		submitted: 10,
		maxSubmissions: 12,
		graded: 4,
	}),
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

const mathTasks = [
	{
		id: "59cce352c6abf042248e888c",
		_id: "59cce352c6abf042248e888c",
		name: "Trigonometrie",
		duedate: "2017-06-07T09:30:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:56:02.897Z",
		status: generateStatus({
			submitted: 1,
			graded: 1,
		}),
	},
	{
		id: "59cce4171113d1132c98dc07",
		_id: "59cce4171113d1132c98dc07",
		name: "Schriftlich multiplizieren mit Dezimalzahlen",
		duedate: "2017-07-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 10,
			graded: 9,
		}),
	},
	{
		id: "59cce4c3c6abf042248e888e",
		_id: "59cce4c3c6abf042248e888e",
		name: "Logarithmus",
		duedate: "2300-06-11T14:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T12:02:11.432Z",
		status: generateStatus(),
	},
	{
		id: "59cce3f6c6abf042248e888d",
		_id: "59cce3f6c6abf042248e888d",
		name: "Morphologie",
		duedate: "2300-09-28T15:00:00.000Z",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 10,
			maxSubmissions: 15,
			graded: 7,
		}),
	},
	{
		id: "59cce4171113d1132c98dc08",
		_id: "59cce4171113d1132c98dc08",
		name: "Analytischen Geometrie zusammen mit Vektorrechnung",
		courseName: "Mathe",
		createdAt: "2017-07-28T11:58:46.601Z",
		status: generateStatus({
			submitted: 1,
		}),
	},
];

const hex = (value) => Math.floor(value).toString(16);
const rnd = () => Math.random() * 16;
const ObjectId = () =>
	hex(Date.now() / 1000) + " ".repeat(16).replace(/./g, () => hex(rnd()));

const generateTask = (status, props) => {
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
