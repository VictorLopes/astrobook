import React from 'react'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import FitImage from 'react-native-fit-image'

import IMAGES from '@constants/images'

export default PostHeader = (props) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16
    }}>
      <View
        style={{
          width: 41,
          height: 41,
          borderRadius: 20.5,
        }}
      >
        <FitImage
          style={{
            width: 41,
            height: 41,
            borderRadius: 20.5,
          }}
          borderRadius={20.5}
          source={{ uri: props.profilePhoto }}
        />
      </View>

      <Text style={{
        paddingLeft: 8,
        color: '#383A3C',
        fontSize: 14,
        fontWeight: '500',
        paddingRight: 40
      }}>
        {props.name}
      </Text>
    </View>
  )
}
