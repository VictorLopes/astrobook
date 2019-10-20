import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';

import FitImage from 'react-native-fit-image'
import Swiper from 'react-native-swiper';

import IMAGES from '@constants/images'
import { Icon } from 'react-native-elements';

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

        <Text style={{
          marginTop: 8,
          flex: 1,
          color: '#B9B9B9',
          fontSize: 16,
          fontWeight: '400',
          textAlign: 'justify'
        }}>
          {props.message}
        </Text>
      </View>
      {
        !props.imageViewerModal && (
          <Swiper
            style={{
              width: (width - 64),
              height: 200,
              paddingTop: 16,

            }}
            horizontal={true}
            automaticallyAdjustContentInsets={false}
            showsPagination={true}
            scrollEnabled
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
                  <TouchableOpacity
                    key={`photoPost-${i}`}
                    onPress={props.onPress}
                  >

                    <FitImage
                      style={{
                        width: (width - 64),
                        height: 200,

                      }}
                      borderRadius={4}
                      source={{ uri: photo.url }}
                      resizeMode='cover'
                      loadMinimal={true}
                      loadMinimalSize={1}
                    />
                  </TouchableOpacity>
                )
              })
            }
          </Swiper>

        )
      }

      {
        (props.photos && props.imageViewerModal) && (
          <Modal
            onDismiss={() => props.onRequestClose}
            visible={props.imageViewerModal}
            transparent={true}
            presentationStyle='fullScreen'
          >
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                backgroundColor: '#FFF',
                position: 'absolute',
                zIndex: 10,
                alignSelf: 'flex-end',
                right: 16,
                top: 28,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16
              }}
              onPress={() => props.onRequestClose()}
            >
              <Icon
                name='close'
                size={20}
              />
            </TouchableOpacity>
            <ImageViewer imageUrls={props.photos} />
          </Modal>

        )
      }


    </View>
  )
}
