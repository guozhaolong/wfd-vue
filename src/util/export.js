export function exportImg(canvasPanel,filename,createFile = true) {
  filename = filename || 'flow'
  let canvas = canvasPanel.querySelector('canvas')
  let context = canvas.getContext('2d')

  let imgData = context.getImageData(0, 0, canvas.width, canvas.height).data
  let left = canvas.width;
  let right = 0;
  let top = canvas.height;
  let bottom = 0
  for (let i = 0; i < canvas.width; i++) {
    for (let j = 0; j < canvas.height; j++) {
      let pos = (i + canvas.width * j) * 4
      if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
        bottom = Math.max(j, bottom) // 找到有色彩的最下端
        right = Math.max(i, right) // 找到有色彩的最右端
        top = Math.min(j, top) // 找到有色彩的最上端
        left = Math.min(i, left) // 找到有色彩的最左端
      }
    }
  }
  let c = document.createElement('canvas')
  // 四周空白余量
  let blankWidth = 60
  c.width = right - left + blankWidth*2
  c.height = bottom - top + blankWidth*2
  let ctx = c.getContext('2d')
  // 设置白底
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(canvas, left-blankWidth, top-blankWidth, c.width, c.height, 0, 0, c.width, c.height)
  let data = c.toDataURL("image/jpeg")
  if(createFile) {
    let parts = data.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    downloadFile(uInt8Array, contentType, `${filename}.jpg`)
  }
  return data
}

function downloadFile(data, type, filename) {
  const blob = new Blob([data], { type });
  let link = document.createElement('a');
  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
