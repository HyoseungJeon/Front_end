import { extend } from 'vee-validate'
import './CommonRules'

extend('codeName', {
    
    validate : value => {
        let regex = /^[가-힣|a-z|A-Z|0-9|~!@#$%^&*()_+|<>?:{}]+$/.test(value);
        if(!regex){
            return '한글,영문자,숫자,특수문자로만 입력해주세요.';
        }else{
            return true;
        }
    }
})