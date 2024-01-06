/**
 * 获取视频链接的帧动画导出png.
 * @param videoUrl - 视频url链接.
 * @param options - 额外字段.
 * @param options.width - 导出图片宽度.
 * @param options.height - 导出图片高度.
 * @param options.num - 选择视频第几帧动画.
 * @returns base64图片
 */
export const getFirstFrame = (
  videoUrl: string,
  { width = 300, height = 150, num = 1 }: options = {}
): Promise<string> => {
  const video = document.createElement('video');
  video.width = 640;
  video.height = 360;
  video.controls = true;
  video.src = videoUrl;
	video.crossOrigin = 'Anonymous'
	video.currentTime = num

  Object.assign(video.style, {
    position: 'fixed',
    zIndex: '-999',
    opacity: '0',
  });

  document.body.appendChild(video);

  return new Promise((resolve, reject) => {
    video.addEventListener('loadeddata', async () => {
      const canvas = document.createElement('canvas');
      document.body.appendChild(canvas);

      Object.assign(canvas.style, {
        position: 'fixed',
        zIndex: '-999',
        opacity: '0',
      });

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context is not supported.'));
        return;
      }

      ctx.drawImage(video, 0, 0, width, height);
      const dataURL = canvas.toDataURL();
      resolve(dataURL);

      setTimeout(() => {
        document.body.removeChild(canvas);
        document.body.removeChild(video);
      }, 100);
    });

    video.addEventListener('error', (error) => {
      reject(error);

      setTimeout(() => {
        document.body.appendChild(video);
      }, 100);
    });
  });
};


type options = {
  width?: number;
  height?: number;
  num?: number
};

/**
 * 示例：
 * 获取第二帧动画导出920*1080尺寸的图片
 * const data = await getFirstFrame('video.mp4', { width: 1920, height: 1080, num:2 })
 */
