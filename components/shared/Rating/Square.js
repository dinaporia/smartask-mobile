import React, {PureComponent} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';

const SQUARE_IMAGE = require( './images/square-clear.png' );
const SQUARE_SELECTED_IMAGE = require( './images/square-selected.png' );
const SQUARE_SIZE = 40;

export default class Square extends PureComponent {
  static defaultProps = {
    selectedColor: '#f1c40f'
  };

  constructor() {
    super();
    this.springValue = new Animated.Value( 1 );

    this.state = {
      selected: false
    };
  }

  spring() {
    const { position, squareSelectedInPosition } = this.props;

    this.springValue.setValue( 1.2 );

    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2,
        tension: 1,
        useNativeDriver: true,
      }
    ).start();

    this.setState( { selected: !this.state.selected } );
    squareSelectedInPosition( position );
  }

  render() {
    const { fill, size, selectedColor, isDisabled, squareStyle } = this.props;
    const squareSource = fill && selectedColor === null ? SQUARE_SELECTED_IMAGE : SQUARE_IMAGE;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind( this )} disabled={isDisabled}>
        <Animated.Image
          source={squareSource}
          style={[
            styles.squareStyle,
            {
              tintColor: fill && selectedColor ? selectedColor : '#e5e5e5',
              width: size || SQUARE_SIZE,
              height: size || SQUARE_SIZE,
              transform: [{ scale: this.springValue }]
            },
            squareStyle
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create( {
  squareStyle: {
    margin: 3
  }
} );
