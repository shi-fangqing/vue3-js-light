// 根据url得到文件后缀
export function getFileSuffix(url){
    return url.substring(url.lastIndexOf('.')+1);
}

// 根据url得到文件名
export function getFileName(url){
    return url.substring(url.lastIndexOf('/')+1);
}
