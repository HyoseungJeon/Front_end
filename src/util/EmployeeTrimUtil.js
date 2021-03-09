class EmployeeTrimUtil{
    employeeTrim(employee){
        employee.educationList = this.educationListTrim(employee.educationList);
        employee.licenseList = this.licenseListTrim(employee.licenseList);
        employee.careerList = this.careerListTrim(employee.careerList);
        employee.familyList = this.familyListTrim(employee.familyList);
        employee.projectList = this.projectListTrim(employee.projectList);
        return employee;
    }
    
     educationListTrim(educationList){
        return educationList.filter(
            function(education) {
                if(education.school && education.major && education.graduation){
                    return education;
                }
            } 
        )
    }
    
     licenseListTrim(licenseList){
        return licenseList.filter(
            function(license){
                if(license.kind && license.score && license.division && license.getDate){
                    return license;
                }
            }
        )
    }
    
     careerListTrim(careerList){
        return careerList.filter(
            function(career){
                if(career.company && career.position && career.position && career.work && career.startDate && career.endDate){
                    return career;
                }
            }
        )
    }
    
     familyListTrim(familyList){
        return familyList.filter(
            function(family){
                if(family.name && family.relation && family.birthday){
                    return family;
                }
            }
        )
    }
    
     projectListTrim(projectList){
        return projectList.filter(
            function(project){
                if(project.client && project.content && project.role
                    && project.language && project.os && project.db
                    && project.startDate && project.endDate){
                    return project
                }
            } 
        )
    }
}

const instance = new EmployeeTrimUtil();

export default instance;


