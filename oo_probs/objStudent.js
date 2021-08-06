
// eslint-disable-next-line max-lines-per-function
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    info: function() {
      console.log(`${this.name} is a ${year} year student`);
    },
    listCourses: function() {
      return this.courses;
    },
    addCourse: function(course) {
      this.courses.push(course);
    },
    addNote: function(code, note) {
      let course = this.courses.find(course => course.code === code);

      if (!course.note) course.note = [];
      course.note.push(note);
    },
    updateNote: function (code, note) {
      let course = this.courses.find(course => course.code === code);
      course.note = [note];
    },
    viewNotes: function() {
      let coursesWithNotes = this.courses.filter(course => course.note);
      coursesWithNotes.forEach(course => {
        console.log(`${course.name}: ${course.note.join('; ')}`);
      });
    }
  };
}

let foo = createStudent('Foo', '1st');


foo.info();
foo.listCourses();

foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();

foo.addNote(102, 'Difficult subject');
foo.viewNotes();

foo.updateNote(101, 'Fun course');
foo.viewNotes();