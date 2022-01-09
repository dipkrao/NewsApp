/* eslint-disable prettier/prettier */
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  white: '#FFFFFF',
  modalBackground: 'rgba(196,196,196,0.5)',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  paddingExtraLarge: 48,
  paddingLarge: 34,
  padding1: 28,
  padding2: 24,
  padding3: 22,
  padding4: 20,
  padding5: 18,
  padding6: 16,

  // font sizes
  largeTitle: 36,
  header: 24,
  buttonText: 22,
  h1: 20,
  h2: 18,
  h3: 16,
  h4: 14,
  h5: 12,
  h6: 10,

  // app dimensions
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
