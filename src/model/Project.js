class Project{
    constructor(employeeId, projectId, client, content, role, language,
        os, db, etc, startDate, endDate){
            this.employeeId = employeeId;
            this.projectId = projectId;
            this.client = client;
            this.content = content;
            this.role = role;
            this.language = language;
            this.os = os;
            this.db = db;
            this.etc = etc;
            this.startDate = startDate;
            this.endDate = endDate;
        }
}

export default Project