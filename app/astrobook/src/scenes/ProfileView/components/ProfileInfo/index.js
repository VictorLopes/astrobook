import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import {
  Icon,
  ListItem
} from 'react-native-elements';

import IMAGES from '@constants/images'
import COLORS from '@constants/colors'

const moment = require('moment')

export default ProfileInfo = (props) => {

  let items = [
    {
      id: 'phone',
      title: props.user.phone ? props.user.phone : false,
      icon: 'phone',
      textColor: COLORS.DEEP_GRAY_TEXT
    },
    {
      id: 'email',
      title: props.user.email ? props.user.email : false,
      icon: 'email-outline',
      textColor: COLORS.DEEP_GRAY_TEXT
    },
    {
      id: 'birthdate',
      title: props.user.birthdate ? moment(props.user.birthdate).format('DD.MM.YYYY') : false,
      icon: 'cake-variant',
      textColor: COLORS.DEEP_GRAY_TEXT
    },
    {
      id: 'address',
      title: props.user.address ? props.user.address : false,
      icon: 'map-marker-outline',
      textColor: COLORS.GRAY_TEXT
    },
    {
      id: 'lastGame',
      title: props.user.lastGame ? `Último jogo ${moment(props.user.lastGame).format('DD.MM.YYYY')}` : false,
      icon: 'clock-outline',
      textColor: COLORS.GRAY_TEXT
    },
    {
      id: 'instagramId',
      title: props.user.instagramId ? props.user.instagramId : false,
      icon: 'instagram',
      textColor: COLORS.GRAY_TEXT
    },
    {
      id: 'facebookId',
      title: props.user.facebookId ? props.user.facebookId : false,
      icon: 'facebook-box',
      textColor: COLORS.GRAY_TEXT
    }
  ]

  return (
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: 16,
        shadowColor: '#455B63',
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      {
        items.map(item => {

          if (item.title) {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: '#FFF',
                  paddingVertical: 12,
                  paddingHorizontal: 32
                }}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Icon
                    type='material-community'
                    name={item.icon}
                    size={26}
                    color='#383A3C'
                  />
                </View>

                <View
                  style={{
                    flex: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: item.textColor,
                      fontSize: 13,
                      textAlign: 'left'
                    }}
                  >
                    {item.title}
                  </Text>
                </View>

              </View>
            )
          }

        })
      }
    </View>
  )
}
