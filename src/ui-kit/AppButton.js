import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Dimension } from './dimension';
import colors from '../themes/colors';
import { AppText } from './AppText';

const AppButton = (props) => {
  return (
    <TouchableOpacity
      disabled={!props.isEnabled}
      style={[
        styles.button,
        props.isEnabled ? styles.blueButton : styles.blueButtonDisabled,
        props.style,
      ]}
      onPress={() => {
        props.onPress && props.onPress();
      }}>
      <AppText
        style={[
          styles.text,
          {
            opacity: props.isEnabled ? 1 : 0.5,
          },
          props.textStyle,
        ]}>
        {props.text}
      </AppText>
    </TouchableOpacity>
  );
};

AppButton.defaultProps = {
  isEnabled: true,
};

const styles = StyleSheet.create({
  text: {
    fontSize: Dimension(16),
    letterSpacing: Dimension(0.3),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    borderRadius: Dimension(28),
    borderWidth: 0,
    height: Dimension(42),
    justifyContent: 'center',
    alignItems: 'center',

  },
  blueButton: {
    backgroundColor: colors.blue,
  },
  blueButtonDisabled: {
    backgroundColor: colors.light,
    opacity: 0.5,
  },
});

export { AppButton };
