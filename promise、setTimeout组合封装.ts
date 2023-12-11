/**
 * 延迟函数.
 * @param time - 延迟时间.
 * @returns promise.resolve()
 */
const delay = (time = 300 as number) => new Promise(resolve => setTimeout(resolve, time))

export default delay