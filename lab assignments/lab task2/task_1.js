function Person(name = "", age = 0, city = "null") {
    this.name = name;
    this.age = age;
    this.city = city;
  }
  
  function Student(name, age, city, reg = "null", cgpa = "null") {
    Person.call(this, name, age, city);
    this.reg = reg;
    this.cgpa = cgpa;
  }

  function Employee(name, age, city, dep = "null", designation = "null", salary = 0) {
    Person.call(this, name, age, city);
    this.dep = dep;
    this.designation = designation;
    this.salary = salary;
  }
  
  function Teacher(name, age, city, dep, designation, salary, subject = "null") {
    Employee.call(this, name, age, city, dep, designation, salary);
    this.subject = subject;
  }

  function Staff(name, age, city, designation, salary, working_hours = 0) {
    Employee.call(this, name, age, city,designation, salary);
    this.working_hours = working_hours;
  }
  
  function Courses() {
    constructor() 
    {
        this.stu = []; 
        this.tec = [];
    }
    
    addStudent(Student) 
    {
    this.add(Student);
    }
    addTeacher(Teacher) 
    {
    this.add(Teacher);
    }
  }
  
  const s1 = new Student("kinza", 21, "HASSAN ABDAL", "015", "3.3");
  const s2 = new Student("mahnoor", 20, "ATTOCK", "016", "3.5");
  
  const t1 = new Teacher("mr. kamran", 35, "ATTOCK", "Professor", 2000000 , "MAD");
  const t2 = new Teacher("mr. qasim", 40, "WAH", "coordinator", 6000000, "CV");

  const st1 = new Staff("mr ali", 30, "ATTOCK", "CLERK",  500000, 10);
  const st2 = new Staff("mr jamal", 58, "ATTOCK", "ACADEMICS",  300000, 12);

    console.log(s1);
    console.log(s2);

    console.log(t1);
    console.log(t2);

    console.log(st1);
    console.log(st2);
