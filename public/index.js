const MOCK_COURSE_TILE_DATA = [
	{
		"courseId": 1,
		"courseTitle": "Learn to Program Apps on STEEM",
		"author": "Jeff B",
		"studentCount": 234,
		"themeColor": "purple"
	}, {
		"courseId": 7,
		"courseTitle": "Learn Great Stuff",
		"author": "Some Other Person",
		"studentCount": 1123,
		"themeColor": "blue"
	}, {
		"courseId": 5,
		"courseTitle": "MongoDB",
		"author": "Steve Stevenson",
		"studentCount": 500,
		"themeColor": "purple"
	}, {
		"courseId": 20,
		"courseTitle": "Learn CSS Grid",
		"author": "Gary Gridington",
		"studentCount": 4,
		"themeColor": "green"
	}, {
		"courseId": 17,
		"courseTitle": "JavaScript Fundamentals",
		"author": "Sally Student",
		"studentCount": 48,
		"themeColor": "orange"
	}, {
		"courseId": 55,
		"courseTitle": "Learn Some Really Neat Stuff!!",
		"author": "Me",
		"studentCount": 48,
		"themeColor": "pink"
	}, {
		"courseId": 1,
		"courseTitle": "Learn to Program Apps on STEEM",
		"author": "Jeff B",
		"studentCount": 234,
		"themeColor": "yellow"
	}, {
		"courseId": 7,
		"courseTitle": "Learn Great Stuff",
		"author": "Some Other Person",
		"studentCount": 1123,
		"themeColor": "green"
	}, {
		"courseId": 20,
		"courseTitle": "Learn CSS Grid",
		"author": "Gary Gridington",
		"studentCount": 4,
		"themeColor": "blue"
	}
];

function getCourseTiles() {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(MOCK_COURSE_TILE_DATA);
	})
}

function renderCourseTiles() {
	getCourseTiles()
		.then(data => {
			data.forEach(courseInfo => {
				$('.course-grid').append(`
					<div class="course-grid-tile ${courseInfo.themeColor}-tile">
						<div class="course-grid-info-container">
							<div class="course-grid-tile-title">${courseInfo.courseTitle}</div>
							<div class="course-grid-tile-author">by ${courseInfo.author}</div>
						</div>	
						<br>
						<div class="course-grid-enroll-container">
							<button type="submit" class="course-grid-enroll-button">Enroll &#x1F680;</button>&nbsp;&nbsp;
							<span class="course-grid-students-count">${courseInfo.studentCount} students</span>
						</div>
					</div>`);
			});
		})
}

$(renderCourseTiles);