export type Query = {
	$limit: number;
	$skip: number;
	searchQuery: string;
};

export type Resource = {
	access: string[];
	aspects: string[];
	collection: any;
	commentCount: number | null;
	content: {};
	createdAt: any;
	createdBy: {};
	downloadUrl: string | null;
	iconURL: string | null;
	isDirectory: boolean;
	license: {};
	mediatype: string;
	metadataset: string;
	mimetype: string;
	modifiedAt: any;
	modifiedBy: {};
	name: string;
	owner: {};
	parent: {};
	preview: {};
	properties: {};
	rating: any;
	ref: {};
	remote: any;
	repositoryType: string;
	size: string;
	title: string;
	type: string;
};

export type Renderer = {
	code: string;
}

export type Resources = {
	total: number;
	limit: number;
	skip: number;
	data: Resource[];
	pagination: undefined;
};

export type Elements = {
	data: any[];
	limit: number;
	skip: number;
	total: number;
	pagination: undefined;
};

export type Lesson = {
	contents: any[];
	courseId: string;
	createdAt: string;
	date: string;
	hidden: boolean;
	isCopyFrom: any;
	materialIds: string[];
	name: string;
	position: number;
	time: string;
	updatedAt: string;
	__v: number;
	_id: string;
};

export type Lessons = {
	data: Lesson[];
	limit: number;
	skip: number;
	total: number;
};

export type AddToLessonQuery = {
	lessonId: string;
	event: {};
	material: {
		client: string;
		merlinReference: string;
		title: string;
		url: string;
	};
};
