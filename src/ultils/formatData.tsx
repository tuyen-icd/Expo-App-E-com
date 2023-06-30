import { groupBy } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

export const FormatDatetime = (date: any, mode: any) => {
    if (!date) return '';
    if (typeof date === 'string') {
        date = new Date(date);
    }
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    let result = [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
    if (mode === 'datetime') {
        result = result + ' ' + (hour > 9 ? '' : '0') + hour + ':' + (min > 9 ? '' : '0') + min;
    }
    if (mode === 'time') {
        result = (hour > 9 ? '' : '0') + hour + ':' + (min > 9 ? '' : '0') + min;
    }
    if (mode === 'date') {
        result = upperCaseFirstLetter(moment(date).format('Do MMMM, YYYY'));
    }
    if (mode === 'longdate') {
        // result = date.toLocaleString('vi-VN', { dateStyle: 'full' });
        result = upperCaseFirstLetter(moment(date).format('dddd, Do MMMM, YYYY'));
    }
    if (mode === 'longdatetime') {
        // result = date.toLocaleString('vi-VN', { dateStyle: 'full', timeStyle: 'medium' });
        result = upperCaseFirstLetter(moment(date).format('HH:mm dddd, Do MMMM, YYYY'));
    }

    return result;
};

export function upperCaseFirstLetter(str: string | any[]) {
    return str[0].toUpperCase() + str.slice(1);
}

export const SplitFullName = (fullName: string) => {
    let firstName = fullName.split(' ').slice(0, -1).join(' ');
    let lastName = fullName.split(' ').slice(-1).join(' ');
    return { firstName, lastName };
};

export const GetFullName = (firstName: string, middleName: string, lastName: string) => {
    let fullName = '';
    if (firstName && firstName !== '') {
        fullName = fullName + firstName;
    }
    if (middleName && middleName !== '') {
        fullName = fullName + ' ' + middleName;
    }
    if (lastName && lastName !== '') {
        fullName = fullName + ' ' + lastName;
    }
    return fullName;
};

export const GetFullAddress = (address: string, district: string, city: string, country: string) => {
    return address + ' ' + district + ' ' + city + ' ' + country;
};

//Temporary display sub address
export const GetSubAddress = (fullAddress: string) => {
    const subAddressArr = fullAddress.split(' Quận');
    if (subAddressArr && subAddressArr.length > 1) {
        return subAddressArr[0];
    }
    return '';
};

export const ConvertSecondsToTwoDigitsMinutes = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const removeFieldsFromObject = (object: any, removeIfNull = true, removeIfEmpty = true) => {
    const data = JSON.parse(JSON.stringify(object));

    for (let key in data) {
        if (removeIfNull && data[key] === null) {
            delete data[key];
        }
        if (removeIfEmpty && data[key] === '') {
            delete data[key];
        }
    }
    return data;
};

export const MonthDiff = (fromDay: any, toDay: any) => {
    if (typeof fromDay === 'string') {
        fromDay = new Date(fromDay);
    }
    if (typeof toDay === 'string') {
        toDay = new Date(toDay);
    }
    let months;
    months = (toDay.getFullYear() - fromDay.getFullYear()) * 12;
    months -= fromDay.getMonth();
    months += toDay.getMonth();
    return months <= 0 ? 0 : months;
};

export function removeVietnameseTones(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');

    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    str = str.replace(/\u02C6|\u0306|\u031B/g, '');

    str = str.replace(/ + /g, ' ');
    str = str.trim();

    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' ',
    );
    return str;
}

export const createSectionListByDate = (dataList: any[]) => {
    const groupByDate = groupBy(
        dataList?.map((transaction: { createdAt: any; }) => ({
            ...transaction,
            date: FormatDatetime(transaction.createdAt, 'longdate'),
        })),
        'date',
    );
    const sectionListData = Object.keys(groupByDate).reduce((result: any, date) => {
        const dataByDate = groupByDate[date];
        return [...result, { date, data: dataByDate }];
    }, []);

    return sectionListData;
};
