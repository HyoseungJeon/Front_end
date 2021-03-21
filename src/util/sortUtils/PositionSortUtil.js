import store from '@/store'

class PositionSortUtil {
    constructor(){
        this.positionCodeList = store.getters.getCommonCodeList.B;
        this.positionCodeParentCodeMap = new Map();
        this.positionCodeNameLevelMap = new Map();
        this.initpositionCodeMaps();
       
    }
    
    initpositionCodeMaps(){
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
            return aLevel - bLevel;
        };
    }
}

const instance = new PositionSortUtil();

export default instance;