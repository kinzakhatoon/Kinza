  class Employee {
    constructor(name = "", dep = "general") {
      this.name = name;
      this.dep = dep;
    }
  }
  
  class Manager extends Employee {
    constructor(name = "", dep = "general", report = []) {
      super(name, dep);
      this.report = report;
    }
  }
  
  class WorkerBee extends Employee {
    constructor(name = "", dep = "general", projects = []) {
      super(name, dep);
      this.projects = projects;
    }
  }
  
  class SalesPerson extends WorkerBee {
    constructor(name = "", dep = "sales", projects = [], quota = 100) {
      super(name, dep, projects);
      this.quota = quota;
    }
  }
  
  class Engineer extends WorkerBee {
    constructor(name = "", dep = "engineering", projects = [], machine = "") {
      super(name, dep, projects);
      this.machine = machine;
    }
  }
  