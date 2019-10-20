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

import FitImage from 'react-native-fit-image'


export default AvatarProfile = ({ deleteMode = false, ...props }) => {

  if (props.showRightIcon) {
    props.rightIcon = (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: COLORS.AVATAR_ARROW_BACKGROUND,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        onPress={() => props.onPress ? props.onPress() : null}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon
            type='material-icon'
            name='keyboard-arrow-right'
            color={COLORS.AVATAR_ARROW_COLOR}
            size={26}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={[{
        backgroundColor: COLORS.MENU_BACKGROUND,
        padding: 16,

      }, props.containerStyle]}
    >
      <ListItem
        containerStyle={[{
          backgroundColor: props.grayBackground ? COLORS.AVATAR_GRAY_BACKGROUND : COLORS.AVATAR_DEFAULT_BACKGROUND
        }, props.containerStyle]}
        leftAvatar={
          () => (
            <View style={{
              shadowColor: '#455B63',
              shadowRadius: 6,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 5,
              backgroundColor: 'white',
              width: 68,
              height: 68,
              borderRadius: 68,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FitImage
                source={{ uri: (props.source) ? props.source : 'http://agendamentosfpc.2rm.eb.mil.br/img/sem-imagem-avatar.png' }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderColor: '#fff',
                  borderWidth: 2
                }}
                borderRadius={20}
              />
              )}
            </View>
          )
          //   {
          //   rounded: true,
          //   source: props.source,
          //   containerStyle: {
          //     width: 65,
          //     height: 65,
          //     marginRight: 12
          //   },
          //   avatarStyle: {
          //     // borderRadius: 120
          //   }
          // }
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
        rightIcon={props.rightIcon}
      />
    </View>
  )
}
