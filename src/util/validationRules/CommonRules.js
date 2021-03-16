import { extend } from 'vee-validate'
import { max, min, between, digits, integer, required, max_value } from 'vee-validate/dist/rules';

extend('max', {
    ...max,
    message : '최대 {length}까지 입력 가능합니다.'
})

extend('min', {
    ...min,
    message : '{length}자리 이상으로 입력해주세요.'
})

extend('max_value', {
    ...max_value,
    message : '최대 숫자로 {max}까지 입력 가능합니다.'
})

extend('between', {
    ...between,
    message : '{min}글자 이상 {max} 이하여야 합니다.'
});

extend('digits',{
    ...digits,
    message : '숫자 {length}자리로 입력해주세요.'
})

extend('integer', {
    ...integer,
    message : '숫자만 입력가능합니다.'
})

extend('required', {
    ...required,
    message : '필수 항목입니다.'
});

extend('korean', {
    validate : value => {
        let regex = /^[가-힣]{1,10}$/.test(value);
        if(!regex){
            return '한글을 입력해주세요';
        }else{
            return true;
        }
    }
});