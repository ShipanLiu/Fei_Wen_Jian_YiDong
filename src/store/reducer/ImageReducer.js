import * as actions from '../actions/actions';

export const initialState = [
  {
    coordinates: {
      bottomLeft: {x: 249, y: 782},
      bottomRight: {x: 468.99999999999994, y: 783.0000000000001},
      topLeft: {x: 256, y: 589},
      topRight: {x: 461.99999999999994, y: 596},
    },
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_6356447344025088661.jpg',
    height: 1280,
    id: 'ed1cb188-aff0-4aa6-b922-a8ee526ca43d',
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O4aeb8bd4-818e-4a70-ba1e-0c91751ad66b.png',
    ratio: 1.0673575129533677,
    width: 720,
  },
];

export const imageReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD:
      return [...state, action.payload];
    case actions.MODIFY:
      return state.map(imgObj => {
        if (imgObj.id === action.payload.id) {
          return action.payload;
        } else {
          return imgObj;
        }
      });
    default:
      return state;
  }
};
