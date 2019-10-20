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


const moment = require('moment')

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
          source: props.tournament.photo ? { uri: props.tournament.photo } : IMAGES.FIELD_LOGO,
          avatarStyle: {
          }
        }}
        title={
          <Text
            style={{
              color: COLORS.MEDIUM_GRAY,
              fontSize: 15,
              fontWeight: '600',
            }}
          >
            {props.tournament.title ? props.tournament.title : ''}
          </Text>
        }
        subtitle={
          <Text
            style={{
              color: COLORS.AVATAR_SUBTITLE_TEXT_COLOR,
              fontSize: 13,
            }}
          >
            {props.tournament.start_at ? moment(props.tournament.start_at.toDate()).format('DD [de] MMMM [de] YYYY [às] HH:mm') : '--'}
          </Text>
        }
        rightIcon={
          (
            <View>
              {
                props.showStar && (
                  <Icon
                    type='material-community'
                    name='crown'
                    color={COLORS.YELLOW_STAR}
                    size={40}
                  />
                )
              }
              {
                props.showTrashIcon && (
                  <Icon
                    type='material-community'
                    name='delete'
                    color={COLORS.RED_HEART}
                    size={40}
                  />
                )
              }
            </View>
          )
        }
      />
    </View>
  )
}
