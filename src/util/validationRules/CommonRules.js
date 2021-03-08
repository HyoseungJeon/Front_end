import { extend } from 'vee-validate'
import { max, min, between, digits, integer, required } from 'vee-validate/dist/rules';

extend('max', {
    ...max,
    message : '최대 {length}까지 입력 가능합니다.'
})

extend('min', {
    ...min,
    message : '{length}자리 이상으로 입력해주세요.'
})

extend('between', {
    ...between,
    message : '{min}자 이상 {max}자 이하로 입력해주세요.'
})

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