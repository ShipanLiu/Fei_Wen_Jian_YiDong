import * as actions from '../actions/actions';

export const initialState = [
  {
    coordinates: {
      bottomLeft: [Object],
      bottomRight: [Object],
      topLeft: [Object],
      topRight: [Object],
    },
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_5326055504788480105.jpg',
    height: 1280,
    id: '2fe09a7c-033e-43d9-a149-e2ef3f5027f8',
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O823ca5a8-ab12-4418-8553-a94a7db1e4ec.png',
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
      'file:///data/user/0/com.flydocs/cache/RNPM_166162410089552035.jpg',
    height: 1280,
    id: '6068024a-324e-4f1d-850f-1ce4d7c1eb7d',
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O823ca5a8-ab12-4418-8553-a94a7db1e4ec.png',
    width: 720,
  },
];

export const imageReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};
