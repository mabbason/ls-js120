
const school = {
  students: [],
  addStudent: function(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      console.log('Invalid Year');
    } else {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    }
  },
  enrollStudent: function(name, course) {
    let student = this.students.find(student => student.name === name);
    student.addCourse(course);
  },
  addGrade: function(name, code, grade) {
    let student = this.students.find(student => student.name === name);
    let course = student.courses.find(course => course.code === code);
    course.grade = grade;
  },
  getReportCard: function(studentName) {
    let student = this.students.find(student => student.name === studentName);
    student.courses.forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },

  courseReport: function(courseName) {
    let studentsWithGrade = this.students.filter(student => {
      return student.courses.filter(course => {
        return (course.name === courseName && course.grade);
      }).length !== 0;
    });

    if (studentsWithGrade.length === 0) return console.log(undefined);

    let allGrades = [];

    console.log(`=${courseName} Grades=`);

    studentsWithGrade.forEach(student => {
      let course = student.courses.find(course => course.name === courseName);
      console.log(`${student.name}: ${course.grade}`);
      allGrades.push(course.grade);
    });

    console.log('---');
    console.log(`Course Average: ${allGrades.reduce((a, b) => a + b) / allGrades.length}`);
  }
};


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

school.addStudent('foo', '3rd');
school.enrollStudent('foo', { name: 'Math', code: 101});
school.enrollStudent('foo', { name: 'Advanced Math', code: 102});
school.enrollStudent('foo', { name: 'Physics', code: 202, });

school.addStudent('bar', '1st');
school.enrollStudent('bar', { name: 'Math', code: 101});

school.addStudent('qux', '2nd');
school.enrollStudent('qux', { name: 'Math', code: 101});
school.enrollStudent('qux', { name: 'Advanced Math', code: 102});

school.addGrade('foo', 101, 95);
school.addGrade('foo', 102, 90);

school.addGrade('bar', 101, 91);

school.addGrade('qux', 101, 93);
school.addGrade('qux', 102, 90);

school.getReportCard('foo');
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');