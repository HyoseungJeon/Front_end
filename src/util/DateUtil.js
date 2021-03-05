class DateUtil {
    masks = {
        input : 'YYYY-MM-DD'
    }
    dateModelConfig = {
        type : 'string',
        mask : 'YYYY-MM-DD',
    }
}

const instance = new DateUtil();

export default instance;