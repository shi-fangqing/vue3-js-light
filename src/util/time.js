export const TimeFormat={
    'HH:mm:ss':'HH:mm:ss',
    'YYYY-MM-dd HH:mm:ss':'YYYY-MM-dd HH:mm:ss'
}

export function formatDate(timestamp, format) {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    // 创建一个带有指定时区的日期格式化对象
    const formatter = new Intl.DateTimeFormat('zh-CN', options);

    // 获取格式化后的日期时间各部分
    let formattedDate = formatter.format(date);
    let [year, month, day, hour, minute, second] = formattedDate.match(/\d+/g).map(Number);

    // 确保所有时间部分都是两位数字
    month = ('0' + month).slice(-2); // 月份可能是 1-12，需要补零
    day = ('0' + day).slice(-2); // 日期可能是 1-31，需要补零
    hour = ('0' + hour).slice(-2); // 小时可能是 0-23，需要补零
    minute = ('0' + minute).slice(-2); // 分钟可能是 0-59，需要补零
    second = ('0' + second).slice(-2); // 秒可能是 0-59，需要补零

    // 使用模板字符串替换格式
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, matched => ({
        'yyyy': year,
        'MM': month,
        'dd': day,
        'HH': hour,
        'mm': minute,
        'ss': second
    })[matched]);
}


