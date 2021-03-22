import store from '@/store'

class PositionSortUtil {
    constructor(){
        this.positionCodeList = [];
        this.positionCodeParentCodeMap = new Map();
        this.positionCodeNameLevelMap = new Map();
    }
    
    initpositionCodeMaps(){
        this.positionCodeList = store.getters.getCommonCodeList.B;
        this.makepositionCodeParentCodeMap();
        this.makepositionCodeNameLevelMap();
    }

    makepositionCodeNameLevelMap(){
        let map = new Map();
        this.positionCodeList.forEach(positionCode =>{
            const level = this.findpositionCodeDepth(positionCode.code, 0);
            map.set(positionCode.codeName, level);
        })
        this.positionCodeNameLevelMap = map;
    }

    makepositionCodeParentCodeMap(){
        let map = new Map();
        this.positionCodeList.forEach(positionCode => {
            map.set(positionCode.code, positionCode.parentCode);
        });
        this.positionCodeParentCodeMap = map;
    }

    findpositionCodeDepth(code, depth){
        if(this.positionCodeParentCodeMap.get(code) == null){
            return depth;
        }else{
            return this.findpositionCodeDepth(this.positionCodeParentCodeMap.get(code), ++depth);
        }
    }

    comparePosition(prop){
        const positionCodeNameLevelMap = this.positionCodeNameLevelMap;
        return function (a, b) {
            let aLevel = positionCodeNameLevelMap.get(a[prop]);
            let bLevel = positionCodeNameLevelMap.get(b[prop]);
            //level이 같을 경우 직급 이름순으로 정렬
            if(aLevel === bLevel){
                return a[prop].localeCompare(b[prop]);
            }
            return aLevel - bLevel;
        };
    }

    comparePositionReverse(prop){
        const positionCodeNameLevelMap = this.positionCodeNameLevelMap;
        return function (a, b) {
            let aLevel = positionCodeNameLevelMap.get(a[prop]);
            let bLevel = positionCodeNameLevelMap.get(b[prop]);
            //level이 같을 경우 직급 이름순으로 정렬
            if(aLevel === bLevel){
                return a[prop].localeCompare(b[prop]);
            }
            return bLevel - aLevel;
        };
    }
}

const instance = new PositionSortUtil();

export default instance;