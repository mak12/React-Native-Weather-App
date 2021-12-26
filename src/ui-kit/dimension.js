import {Dimensions} from 'react-native';

export const Dimension = (size) => {
  const {width} = Dimensions.get('window');
  const designBenchmark = 375;
  return (size / designBenchmark) * width;
};
