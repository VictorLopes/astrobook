import React from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native'
import {
  Icon,
  ListItem
} from 'react-native-elements';

import IMAGES from '@constants/images'
import COLORS from '@constants/colors'

import FitImage from 'react-native-fit-image';

const moment = require('moment')

export default AvatarProfile = ({ deleteMode = false, ...props }) => {

  return (
    <View
      style={{
        backgroundColor: COLORS.GRAY_BACKGROUND,
        // padding: 16,
        ...props.containerStyle
      }}
    >
      <ListItem
        containerStyle={{
          backgroundColor: props.grayBackground ? COLORS.AVATAR_GRAY_BACKGROUND : COLORS.AVATAR_DEFAULT_BACKGROUND
        }}
        onPress={() => props.onPress ? props.onPress() : null}
        leftAvatar={
          () => (
            <View style={{
              shadowColor: '#455B63',
              shadowRadius: 6,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 5,
              width: 68,
              height: 68,
              borderRadius: 34,
              justifyContent: 'center',
              alignItems: 'center'
            }}>

                {props.source && (
                    <FitImage
                        source={props.source}
                        style={{
                            width: 68,
                            height: 68,
                            borderRadius: 34,
                            borderColor: '#fff',
                            borderWidth: 2,
                        }}
                        borderRadius={34}
                    />
                )}
                {!props.source && (
                    <Icon
                        type='material-community'
                        name='camera-outline'
                        color={COLORS.DEEP_GRAY_TEXT}
                        size={40}
                    />
                )}

            </View>
          )
        }
        title={
          <Text
            style={{
              color: COLORS.AVATAR_TITLE_TEXT_COLOR,
              fontSize: 18,
              fontWeight: '600',
            }}
          >
            {props.name}
          </Text>
        }
        subtitle={
          <Text
            style={{
              color: COLORS.AVATAR_SUBTITLE_TEXT_COLOR,
              fontSize: 13,
            }}
          >
            {props.subtitle}
          </Text>
        }
      />
    </View>
  )
}
