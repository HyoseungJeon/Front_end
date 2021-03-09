
class DropdownUtil{
    addDefalut(dropdowns){
        let defalutCode =
        {
            "text": "선택없음",
            "value": null
        }
        for(var dropdown in dropdowns){
            dropdowns[dropdown].unshift(defalutCode)
        }
        return dropdowns
    }
}

const instance = new DropdownUtil();

export default instance;