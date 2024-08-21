
/**
 * 单位换算.
 * @param kb - 文件字节数值.
 * @returns 携带单位的字符串.
 */
const formatSizeUnits = (kb: number) => {
  let units = ['KB', 'MB', 'GB', 'TB', 'PB'];
  let unitIndex = 0;
  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024;
    unitIndex++;
  }
  return `${kb.toFixed(2)} ${units[unitIndex]}`;
}

/*
** formatSizeUnits(2048)
** return 2.00 MB
*/