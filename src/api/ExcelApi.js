import AxiosClient from "./AxiosClient";

class ExcelApi {
    constructor(){
        this.client = new AxiosClient('/excel');
    }

    async downloadList(employeeIdList){
        return await this.client.postExceltype('/excelDownload', employeeIdList
        );
    }
}

const instance = new ExcelApi();

export default instance;
   