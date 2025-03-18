const getEl = () => {
  const fileInput = document.querySelector("#uploadfile") as HTMLInputElement;
  const box = document.querySelector("#uploadbox") as HTMLElement;
  return { fileInput, box };
};

const processFile = async (
  files: FileList | null,
  maxFile: number,
  maxSize: number,
  maxWidth: number,
  maxHeight: number
) => {
  try {
    const res = await filePromise(files, maxFile, maxSize, maxWidth, maxHeight);
    return res;
  } catch (err) {
    return err;
  }
};

const clickHandler = () => {
  const { fileInput } = getEl();
  fileInput?.click();
};

const dragoverHandler = () => {
  const { box } = getEl();
  box.style.borderColor = "chartreuse";
};

const dragleaveHandler = () => {
  const { box } = getEl();
  box.style.borderColor = "#ccc";
};

const filePromise = (
  fileList: FileList | null,
  maxFile: number,
  maxSize: number,
  maxWidth: number,
  maxHeight: number
) => {
  return new Promise((resolve, reject) => {
    const { fileInput, box } = getEl();
    box.style.borderColor = "#ccc";
    maxSize = maxSize * 1024;

    if (fileList) {
      // if (fileList.length <= maxFile) {
      const fileArray = Array.from(fileList);
      for (let file of fileArray) {
        if (file.size <= maxSize) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            if (img.width > maxWidth || img.height > maxHeight) {
              reject(
                `Each image must be less than ${maxWidth}x${maxHeight} pixels.`
              );
            }
          };
        } else {
          reject(`file must not exceed 200kb.`);
        }
      }
      fileInput.files = fileList;
      resolve(fileArray);
      // } else {
      //   reject(`Error: number of uploads must not exceed ${maxFile}`);
      // }
    }
  });
};

export const uiscript = {
  click: clickHandler,
  dragover: dragoverHandler,
  dragleave: dragleaveHandler,
  drop: processFile,
};
