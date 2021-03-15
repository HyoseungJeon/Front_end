import { extend } from 'vee-validate'
import './CommonRules'

extend('codeName', {
    validate : value => {
        let regex = /^[가-힣|a-z|A-Z|0-9]+$/.test(value);
        if(!regex){
            return '한글,영문자,숫자 로만 입력해주세요.';
        }else{
            return true;
        }
    }
})