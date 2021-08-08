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
      'file:///data/user/0/com.flydocs/cache/RNPM_3908260859340439601.jpg',
    height: 1280,
    id: '6654ee61-dcb2-4a0c-89d1-749fb1668287',
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Of5f073c0-a223-4f54-ba11-a88390778945.png',
    ratio: 1.0677083333333337,
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
      'file:///data/user/0/com.flydocs/cache/RNPM_2348691667691106421.jpg',
    height: 1280,
    id: 'ee8a5f10-3496-4e92-b9d7-bf7ac4ad0e2a',
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Oa7653d79-0095-410c-b4b2-1f61571dbdbf.png',
    ratio: 0.36768233675021256,
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
      'file:///data/user/0/com.flydocs/cache/RNPM_516475351843073681.jpg',
    height: 1280,
    id: '782c48c3-669e-4b4f-8ba3-82555347bb0d',
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O8fb264c7-d4d7-4c3f-a8aa-897cc40a1832.png',
    ratio: 2.710290272675043,
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
