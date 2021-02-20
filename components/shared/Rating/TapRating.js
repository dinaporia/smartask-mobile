import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Square from './Square'

export default class TapRating extends Component {
  static defaultProps = {
    defaultRating: 3,
    reviews: ["Terrible", "Bad", "Okay", "Good", "Great"],
    count: 5,
    showRating: true,
    reviewColor: 'rgba(230, 196, 46, 1)',
    reviewSize: 25
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultRating } = nextProps;

    if (defaultRating !== prevState.defaultRating) {
      return {
        position: defaultRating,
        defaultRating
      }
    }
    return null;
  }

  constructor() {
    super()

    this.state = {
      position: 5
    }
  }

  componentDidMount() {
    const { defaultRating } = this.props

    this.setState({ position: defaultRating })
  }

  renderSquares(rating_array) {
    return _.map(rating_array, (square, index) => {
      return square
    })
  }

  squareSelectedInPosition(position) {
    const { onFinishRating } = this.props

    if (typeof onFinishRating === 'function') onFinishRating(position);

    this.setState({ position: position })
  }

  render() {
    const { position } = this.state
    const { count, reviews, showRating, reviewColor, reviewSize } = this.props
    const rating_array = []
    const squareContainerStyle = [styles.squareContainer]

    if (this.props.squareContainerStyle) {
        squareContainerStyle.push(this.props.squareContainerStyle);
    }

    _.times(count, index => {
      rating_array.push(
        <Square
          key={index}
          position={index + 1}
          squareSelectedInPosition={this.squareSelectedInPosition.bind(this)}
          fill={position >= index + 1}
          {...this.props}
        />
      )
    })

    return (
      <View style={styles.ratingContainer}>
        { showRating &&
          <Text style={[styles.reviewText, {fontSize: reviewSize, color: reviewColor}]}>
            {reviews[position - 1]}
          </Text>
        }
        <View style={squareContainerStyle}>
          {this.renderSquares(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontWeight: 'bold',
    margin: 10,
  },
  squareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
