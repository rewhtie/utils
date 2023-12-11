/**
 * 点击获取值复制
 * @param text - 需要复制的值
 * @returns promise.reslove()
 */
export const copyText = (text: string) => {
  return new Promise<void>((resolve) => {
    const input = document.createElement("input");
    input.value = text;
    Object.assign(input.style, {
      position: 'fixed',
      zIndex: '-999',
      opacity: '0',
    });
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    resolve()
  })
};

/**
 * 示例：
 * await copyText('我是要被复制的文本')
 */