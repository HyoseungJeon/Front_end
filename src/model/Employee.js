import {Education, License, Career, Family, Spec, Project} from '@/model'

class Employee {
    constructor(employeeId, name, englishName, chinesesName, hireDate, retirementDate,
        hireType, familyOrigin, rrn, address, department, position, tel, hp, email,
        militaryStartDate, militaryEndDate, militaryRank, reasonExemption, gender, age, finalEducation,imageUrl,
    ){
        this.employeeId = employeeId;
        this.name = name;
        this.englishName = englishName;
        this.chinesesName = chinesesName;
        this.hireDate = hireDate;
        this.retirementDate = retirementDate;
        this.hireType = hireType;
        this.isMarried = 'E02';
        this.familyOrigin = familyOrigin;
        this.rrn = rrn;
        this.address = address;
        this.department = department;
        this.position = position;
        this.tel = tel;
        this.hp = hp;
        this.email = email;
        this.militaryStartDate = militaryStartDate;
        this.militaryEndDate = militaryEndDate;
        this.militaryRank = militaryRank;
        this.reasonExemption = reasonExemption;
        this.gender = gender;
        this.age = age;
        this.finalEducation = '초등학교';
        this.imageUrl = imageUrl;
        this.educationList = [new Education(), new Education(), ];
        this.licenseList = [new License(), ];
        this.careerList = [new Career(), ];
        this.familyList = [new Family(), ]
        this.spec = new Spec();
        this.projectList = [new Project(), ];
    }
}

export default Employee