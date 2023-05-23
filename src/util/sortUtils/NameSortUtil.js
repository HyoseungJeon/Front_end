class NameSortUtil {

    compareName(prop) {
        return function (a, b) {
          return a[prop].localeCompare(b[prop]);
        };
    }

    compareNameReverse(prop) {
        return function (a, b) {
          return b[prop].localeCompare(a[prop]);
        };
    }
}

const instance = new NameSortUtil();

export default instance;