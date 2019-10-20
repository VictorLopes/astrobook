import React from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

import {
  Icon,
  ListItem
} from 'react-native-elements';



import IMAGES from '@constants/images'
import COLORS from '@constants/colors'

export default FieldCard = (props) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.GRAY_BACKGROUND,
        ...props.containerStyle
      }}
    >
      <ListItem
        containerStyle={{
          backgroundColor: props.grayBackground ? COLORS.AVATAR_GRAY_BACKGROUND : COLORS.AVATAR_DEFAULT_BACKGROUND,
          paddingVertical: 26,
          paddingLeft: 26,
          paddingRight: 32,
        }}
        onPress={() => props.onPress ? props.onPress() : null}
        topDivider={true}
        leftAvatar={{
          rounded: true,
          source: props.field.photo ? { uri: props.field.photo } : IMAGES.FIELD_LOGO,
          avatarStyle: {
          }
        }}
        title={
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.MEDIUM_GRAY,
              fontSize: 15,
              fontWeight: '600',
            }}
          >
            {props.field.name ? props.field.name : ''}
          </Text>
        }
        subtitle={
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.AVATAR_SUBTITLE_TEXT_COLOR,
              fontSize: 13,
            }}
          >
            {props.field.address ? props.field.address.formatted_address : ''}
          </Text>
        }
        rightIcon={(
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              type='material-icon'
              name='star'
              color={COLORS.YELLOW_STAR}
              size={25}
            />
            <Text
              style={{
                color: COLORS.BLACK_TEXT,
                marginLeft: 5
              }}
            >
              {props.field.rating ? props.field.rating : '--'}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
