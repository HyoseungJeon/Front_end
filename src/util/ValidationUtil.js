import { extend } from 'vee-validate'
import { max, required, digits } from 'vee-validate/dist/rules';

extend('max', {
    ...max,
    message : '최대 {length}까지 입력 가능합니다.'
})

// extend('between', {
//     ...between,
//     message : '{min}글자 이상 {max} 이하여야 합니다.'
// });
  
extend('required', {
    ...required,
    message : '필수 항목입니다.'
});

extend('digits', {
      ...digits,
      message : '{length}길이의 숫자만 가능합니다.'
})

