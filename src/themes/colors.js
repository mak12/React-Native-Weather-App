
// basic colors theme to do

const basicColors = {
  blue: '#008ae6',
  lightBlue: '#4db8ff',
  black: '#000000',
  white: '#FFFFFF',
  green: '#98CFB6',
  lightGreen: '#f0f7f4', // rgba(201, 233, 219, 0.41)
  red: '#FF7F6C',
  pink: 'rgba(255, 193, 184, 0.41)',
  lightSkyGreen: '#F7FFFB',
  darkGray: '#353535',
  gray: '#697A81',


  ////
  primary: '#1292B4',

  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
};

const colors = {
  primaryColor: basicColors.green,
  primaryBGText: basicColors.white,
  primaryBGTextSelected: basicColors.darkGray,
  primaryBorderColor: basicColors.lightGray,

  secondaryColor: basicColors.white,
  secondaryBGText: basicColors.green,
  secondaryBorderColor: basicColors.lightGray,

  appTextColorDark: basicColors.black,
  appTextColorLighter: basicColors.white
};

export default {
  ...colors,
  ...basicColors,
};
