import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

import {
  View,
  Text,
  Image
} from 'react-native'

import {
  Card,
  ListItem,
  Button,
  Icon
} from 'react-native-elements'

// Constants
import IMAGES from '@constants/images'

class HeaderCard extends Component {

  render() {
    return (
      <Card
        containerStyle={{
          margin: 0,
          borderWidth: 0,
          borderColor: '#FFF'
        }}
        image={ IMAGES.TIMELINE_BANNER_1 }
        imageStyle={{
          width: '92%',
          height: 222
        }}
      >

      </Card>
    )
  }

}

export default withNavigation(HeaderCard);
