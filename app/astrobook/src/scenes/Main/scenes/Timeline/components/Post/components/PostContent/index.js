import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import FitImage from 'react-native-fit-image'
import Swiper from 'react-native-swiper';

import IMAGES from '@constants/images'

const { height, width } = Dimensions.get('screen');

export default PostContent = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 12
      }} >
        {
          (props.check_in != '') && (
            <Text>
              <Text style={{
                flex: 1,
                color: 'rgba(0,0,0,0.7)',
                fontSize: 13,
                fontWeight: '500',
                textAlign: 'left'
              }}>
                {`Fez check-in em `}
              </Text>
              <Text style={{
                flex: 1,
                color: 'rgba(0,0,0,0.7)',
                fontSize: 13,
                fontWeight: '700',
                textAlign: 'left'
              }}>
                {`${props.check_in}`}
              </Text>
            </Text>
          )
        }
        <Text style={{
          marginTop: 8,
          flex: 1,
          color: '#B9B9B9',
          fontSize: 12,
          fontWeight: '400',
          textAlign: 'left'
        }}>
          {props.message}
        </Text>
      </View>

      {
        (props.photos) && (
          <Swiper
            style={{
              width: (width - 64),
              height: 200,
              paddingTop: 16
            }}
            horizontal={true}
            automaticallyAdjustContentInsets={true}
            showsPagination={true}
            activeDotColor='#fff'
            dotColor='rgba(255, 255, 255, 0.1)'
            dotStyle={{
              borderWidth: 1,
              borderColor: '#fff',
              marginRight: 10,
              marginBottom: -10
            }}
            activeDotStyle={{
              marginRight: 10,
              marginBottom: -10
            }}
          >
            {
              props.photos.map((photo, i) => {
                return (
                  <FitImage
                    key={`photoPost-${i}`}
                    style={{
                      width: (width - 64),
                      height: 200,
                    }}
                    source={{ uri: photo }}
                    resizeMode='cover'
                    loadMinimal={true}
                    loadMinimalSize={1}
                  />
                )
              })
            }
          </Swiper>
        )
      }
    </View>
  )
}
