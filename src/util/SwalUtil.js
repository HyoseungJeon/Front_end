import swal from 'sweetalert'

class SwalUtil{
    serverError(){
        swal({
            title: "에러",
            text: '서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.',
            icon: "error",
        })
    }
    serverSuccess(text){
        swal({
            title: "성공",
            text: text,
            icon: "success",
            timer : 2000,
            buttons:{
                confirm : false
            }
        });
    }
    warning(text){
        swal({
            title: "경고",
            text: text,
            icon: "warning",
        });
    }
    error(text){
        swal({
            title: "에러",
            text: text,
            icon: "error",
        });
    }
    info(text){
        swal({
            title: "안내",
            text: text,
            icon: "info",
        });
    }
}

const instance = new SwalUtil();


export default instance