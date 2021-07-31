/*
image picker data format:

[{"bucketId": -1739773001, "chooseModel": 1, "duration": 0, "fileName": "IMG_20210726_200932.jpg",
 "height": 1280, "localIdentifier": 32, "mime": "image/jpeg", "parentFolderName": "Camera",
  "path": "content://media/external/file/32", "position": 1,
  "realPath": "/storage/emulated/0/DCIM/Camera/IMG_20210726_200932.jpg",
   "size": 123428, "type": "image", "width": 960}]

*/
import {useState} from 'react';
import uuid from 'react-native-uuid';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

export default function imagePicker() {
  const [selectedImage, setSelectedImage] = useState([]);

  function buildImgObj(imgObj) {
    return {
      id: uuid.v4(),
      localIdentifier: imgObj.localIdentifier,
      path: imgObj.path,
      realPath: imgObj.realPath,
      fileName: imgObj.fileName,
      mime: imgObj.mime,
      height: imgObj.height,
      width: imgObj.width,
    };
  }

  const handleOpenLibrary = async () => {
    try {
      const result = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        isPreview: false,
      });
      const newImgArr = result.map(imgObj => buildImgObj(imgObj));
      console.log(newImgArr);
      setSelectedImage(newImgArr);
    } catch (error) {
      log(error);
    }
  };

  return {selectedImage, handleOpenLibrary};
}
