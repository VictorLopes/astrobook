import React, { Component } from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'

import Swiper from 'react-native-swiper';
import FitImage from 'react-native-fit-image';

export default class PhotoHeader extends Component {
  render() {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>

            <Swiper
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 222
              }}
              scrollEnabled={true}
              showsPagination={false}
              loop={false}
            >
              {
                this.props.images.map((item, i) => (
                  <View
                    key={`photo-${i}`}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                  >
                    <FitImage
                      style={{
                        width: '95%',
                        height: 222
                      }}
                      source={item.source}
                    />
                  </View>

                ))
              }

            </Swiper>
          </View>
    )
  }
}
