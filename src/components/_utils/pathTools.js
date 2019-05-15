/**
 * 解析当前页路径，生成父级路径
 * @param {String} url 当前页路径
 */
export const urlToList = url => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((it, index) => `/${urllist.slice(0, index+1).join('/')}`)
}
