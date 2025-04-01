const getEl = (inputId: string, boxId: string) => {
  const fileInput = document.querySelector(`#${inputId}`) as HTMLInputElement;
  const box = document.querySelector(`#${boxId}`) as HTMLElement;
  return { fileInput, box };
};

const processFile = async (
  files: FileList | null,
  maxFile: number,
  maxSize: number,
  maxWidth: number,
  maxHeight: number,
  inputId: string,
  boxId: string
) => {
  try {
    const res = await filePromise(
      files,
      maxFile,
      maxSize,
      maxWidth,
      maxHeight,
      inputId,
      boxId
    );
    return res;
  } catch (err) {
    return err;
  }
};

const clickHandler = (inputId: string, boxId: string) => {
  const { fileInput } = getEl(inputId, boxId);
  fileInput?.click();
};

const dragoverHandler = (inputId: string, boxId: string) => {
  const { box } = getEl(inputId, boxId);
  box.style.borderColor = "chartreuse";
};

const dragleaveHandler = (inputId: string, boxId: string) => {
  const { box } = getEl(inputId, boxId);
  box.style.borderColor = "#ccc";
};

const filePromise = (
  fileList: FileList | null,
  maxFile: number,
  maxSize: number,
  maxWidth: number,
  maxHeight: number,
  inputId: string,
  boxId: string
) => {
  return new Promise((resolve, reject) => {
    const { fileInput, box } = getEl(inputId, boxId);
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
  click: (inputId: string, boxId: string) => clickHandler(inputId, boxId),
  dragover: (inputId: string, boxId: string) => dragoverHandler(inputId, boxId),
  dragleave: (inputId: string, boxId: string) =>
    dragleaveHandler(inputId, boxId),
  drop: processFile,
};
