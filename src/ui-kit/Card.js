import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet
} from 'react-native';
import { Dimension } from '.';

const Card = ({ style, children }) => (
    <View style={[styles.card, style]} >
        {children}
    </View>);

Card.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onSwipedLeft: PropTypes.func,
    onSwipedRight: PropTypes.func,
    onSwipedTop: PropTypes.func,
    onSwipedBottom: PropTypes.func,
    onSwiped: PropTypes.func,
}
Card.defaultProps = {
    style: {},
    onSwiped: () => { },
    onSwipedLeft: () => { },
    onSwipedRight: () => { },
    onSwipedTop: () => { },
    onSwipedBottom: () => { },
}
const styles = StyleSheet.create({
    card: {
        elevation: 8,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: 'white',
        borderRadius: Dimension(10),
    },
});

export default Card;