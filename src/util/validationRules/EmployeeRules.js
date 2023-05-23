import { extend } from 'vee-validate'
import { email } from 'vee-validate/dist/rules';
import './CommonRules'

extend('koreanName', {
    validate : value => {
        let regex = /^[가-힣]{2,10}$/.test(value);
        if(!regex){
            return '2자 이상 10자 이하의 한글만 입력해주세요.';
        }else{
            return true;
        }
    }
})

extend('englishName', {
    validate : value => {
        let regex = /^[a-zA-Z\s]{2,20}$/.test(value);
        if(!regex){
            return '2자 이상 20자 이하의 영문자만 입력해주세요.';
        }else{
            return true;
        }
    }
})

extend('chineseName', {
    validate : value =>{
        let regex = /^[一-龥]{2,10}$/.test(value);
        if(!regex){
            return '2자 이상 10자 이하의 한문으로만 입력해주세요.';
        }else{
            return true;
        }
    }
})

extend('email', {
    ...email,
    message : '이메일 형식에 맞춰주세요.'
});

extend('hp', {
    validate : value => {
        let regex = /^\d{3}-\d{3,4}-\d{4}$/.test(value);
        if(!regex){
            return '휴대폰 번호 형식에 맞춰주세요.';
        }else{
            return true;
        }
    }
});

extend('tel', {
    validate : value => {
        let regex = /^\d{2,3}-\d{3,4}-\d{4}$/.test(value);

        if(!regex){
            return '전화번호 형식에 맞춰주세요.';
        }else{
            return true;
        }
    }
});

extend('rrn',{
    validate : value => {
        let regex = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/.test(value);
        if(!regex){
            return '주민등록 형식에 맞춰주세요.';
        }else{
           return checkLastNum(value);
        }
    }
});

function checkLastNum (value){
    let rruNumsStr = value.replace(/[^0-9]/,'');
    let rrnNumsIntArr = rruNumsStr.split('').map(Number);
    let compareNums = [2,3,4,5,6,7,8,9,2,3,4,5];
    let sum =0;
    
    compareNums.forEach((value, index) => {
        sum += value * rrnNumsIntArr[index]
    });

    sum = (11 - (sum % 11)) % 10;
    
    return sum == rrnNumsIntArr[12] ? true : '올바른 주민등록번호를 입력해주세요.';
}
