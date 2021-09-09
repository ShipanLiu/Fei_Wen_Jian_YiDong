import {ADDNEWDOC, REMOVEDOC, DELETEPAGES, ADDPAGES} from './actions';

const initialState = [
  {
    fileId: 'file1',
    content: [
      {
        coordinates: {
          bottomLeft: [Object],
          bottomRight: [Object],
          topLeft: [Object],
          topRight: [Object],
        },
        croppedImage:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
        height: 1280,
        id: '7efc17d6-bbba-4d6b-a4b0-4262e27afc8c',
        initialImage:
          'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Od495833c-718e-404c-b8e8-577d77a2d1cb.png',
        ratio: 1.4917620189661966,
        width: 720,
      },
      {
        coordinates: {
          bottomLeft: [Object],
          bottomRight: [Object],
          topLeft: [Object],
          topRight: [Object],
        },
        croppedImage:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
        height: 1280,
        id: '4f70617b-ce1a-46bc-b162-18cd1a3f895b',
        initialImage:
          'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O23d47691-9e8d-4d62-a52f-8889aedf705f.png',
        ratio: 0.9390681003584226,
        width: 720,
      },
    ],
  },
  {
    fileId: 'file2',
    content: [
      {
        coordinates: {
          bottomLeft: [Object],
          bottomRight: [Object],
          topLeft: [Object],
          topRight: [Object],
        },
        croppedImage:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
        height: 1280,
        id: '7efc17d6-bbba-4d6b-a4b0-4262e27afc8c',
        initialImage:
          'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Od495833c-718e-404c-b8e8-577d77a2d1cb.png',
        ratio: 1.4917620189661966,
        width: 720,
      },
    ],
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDNEWDOC: {
      return [...state, action.payload];
    }
    case DELETEPAGES: {
      const {fileId, content} = action.payload;
      const newState = state.map(itemObj => {
        if (itemObj.fileId === fileId) {
          return {
            fileId: fileId,
            content: content,
          };
        } else {
          return itemObj;
        }
      });
      return newState;
    }
    case REMOVEDOC: {
      const fileId = action.payload;
      return state.filter(itemObj => itemObj.fileId !== fileId);
    }
    case ADDPAGES: {
      console.log('进入reducer');
      const {fileId, extraArr} = action.payload;
      const newState = state.map(itemObj => {
        if (itemObj.fileId === fileId) {
          return {
            fileId: fileId,
            content: [...itemObj.content, ...extraArr],
          };
        } else {
          return itemObj;
        }
      });
      console.log(newState[1]);
      return newState;
    }
    default:
      return state;
  }
};

export {reducer};
