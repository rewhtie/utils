/**
 * 等待script资源动态加载完成
 * @param url - 资源url链接.
 * @returns this
 */
export const loadScript = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    script.onload = function () {
      resolve(this);
    };
    script.onerror = function () {
      reject(this);
    };
  });
};

/**
 * 示例：
 * 使用一般不接收返回值，加载完状态即可
 * await loadScript('https//www.baidu.com')
 */
