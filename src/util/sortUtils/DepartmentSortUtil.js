import store from '@/store'

class DepartmentSortUtil {
    constructor(){
        this.deptCodeList = [];
        this.deptCodeParentCodeMap = new Map();
        this.deptCodeNameLevelMap = new Map();
    }
    
    initDeptCodeMaps(){
        this.deptCodeList = store.getters.getCommonCodeList.A;
        this.makeDeptCodeParentCodeMap();
        this.makeDeptCodeNameLevelMap();
    }

    makeDeptCodeNameLevelMap(){
        let map = new Map();
        this.deptCodeList.forEach(deptCode =>{
            const level = this.findDeptCodeDepth(deptCode.code, 0);
            map.set(deptCode.codeName, level);
        })
        this.deptCodeNameLevelMap = map;
    }

    makeDeptCodeParentCodeMap(){
        let map = new Map();
        this.deptCodeList.forEach(deptCode => {
            map.set(deptCode.code, deptCode.parentCode);
        });
        this.deptCodeParentCodeMap = map;
    }

    findDeptCodeDepth(code, depth){
        if(this.deptCodeParentCodeMap.get(code) == null){
            return depth;
        }else{
            return this.findDeptCodeDepth(this.deptCodeParentCodeMap.get(code), ++depth);
        }
    }

    compareDept(prop){
        const deptCodeNameLevelMap = this.deptCodeNameLevelMap;
        return function (a, b) {
            let aLevel = deptCodeNameLevelMap.get(a[prop]);
            let bLevel = deptCodeNameLevelMap.get(b[prop]);
            //level이 같을 경우 부서 이름순으로 정렬
            if(aLevel === bLevel){
                return a[prop].localeCompare(b[prop]);
            }else{
                return aLevel - bLevel;
            }
        };
    }

    compareDeptReverse(prop){
        const deptCodeNameLevelMap = this.deptCodeNameLevelMap;
        return function (a, b) {
            let aLevel = deptCodeNameLevelMap.get(a[prop]);
            let bLevel = deptCodeNameLevelMap.get(b[prop]);
            //level이 같을 경우 부서 이름순으로 정렬
            if(aLevel === bLevel){
                return a[prop].localeCompare(b[prop]);
            }else{
                return bLevel - aLevel;
            }
        };
    }
}

const instance = new DepartmentSortUtil();

export default instance;