class EmployeeSearchDto {
    constructor(name, hireDateStart, hireDateEnd, retirementDateStart,
        retirementDateEnd, position, department){
            this.name = name;
            this.hireDateStart = hireDateStart;
            this.hireDateEnd = hireDateEnd;
            this.retirementDateStart = retirementDateStart;
            this.retirementDateEnd = retirementDateEnd;
            this.position = position;
            this.department = department;
        }
}

export default EmployeeSearchDto