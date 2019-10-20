import React, { Component } from 'react'
import { withNavigation } from 'react-navigation';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Icon
} from 'react-native-elements';

import COLORS from '@constants/colors'
import IMAGES from '@constants/images'

class FooterButtonCentered extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return(
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: COLORS.DEEP_GRAY_TEXT,
          padding: 16,
        }}
      >
        <View
          style={{
            flex: 2,
          }}
        >
          <Image
            style={{
              marginLeft: 8
            }}
            source={ this.props.source ? this.props.source : IMAGES.NANO_LOGO }
          />
        </View>

        <View
          style={{
            flex: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              textAlign: 'center',
              color: COLORS.PRIMARY_TEXT,
            }}
          >
            { this.props.name ? this.props.name : '' }
          </Text>
        </View>

        <View
          style={{
            flex: 2
          }}
        >
        </View>

      </View>
    )
  }
}

export default withNavigation(FooterButtonCentered)
