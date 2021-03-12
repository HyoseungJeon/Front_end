import {SuiDropdown} from '~/model/'

class DropdownUtil{
    addDropdown(dropdowns, commonCode){
        if(commonCode.groupCode){
            dropdowns[commonCode.groupCode] = []
        }
        else{
            dropdowns[commonCode.code].push(new SuiDropdown(commonCode.codeName, commonCode.code))
        }
    }

    deleteDropdown(dropdowns, commonCode){
        if(commonCode.groupCode){
            delete dropdowns[commonCode.groupCode]
        }
        else{
            let temp = dropdowns[commonCode.code]
            delete temp[dropdowns[commonCode.code].findIndex(e => e.code === commonCode.code)]
        }
    }

    toDropdowns(commonCodeList){
        let tempCommonCodeList = JSON.parse(JSON.stringify(commonCodeList))
        let dropdowns = []
        tempCommonCodeList.group.forEach(group =>{
            dropdowns[group.groupCode] = [];
        })
        delete tempCommonCodeList.group
        Object.entries(tempCommonCodeList).forEach(([key, value]) =>{
            value.forEach(code =>{
                dropdowns[key].push(new SuiDropdown(code.codeName, code.code))
            })
        })

        dropdowns = this.addDefalut(dropdowns)

        return dropdowns
    }
    addDefalut(dropdowns){
        let defalutCode = new SuiDropdown('선택없음', null)
        for(var dropdown in dropdowns){
            dropdowns[dropdown].unshift(defalutCode)
        }
        return dropdowns
    }
}

const instance = new DropdownUtil();

export default instance;