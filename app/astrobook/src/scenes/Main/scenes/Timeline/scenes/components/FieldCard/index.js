import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native'

import StarRating from 'react-native-star-rating';



// Components

// Constants
import COLORS from '@constants/colors'
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';


import PhotoSlider from '../PhotoSlider';



class FieldCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: 1
    }
  }

  render() {

    return (
      
        <View
          style={{
            marginHorizontal: 16,
            marginBottom:20
          }}
        >
          <View
            style={{
              height: 200
            }}
          >
            <PhotoSlider />
            <View style={{
              position: 'absolute',
              top: 12,
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <Icone
                style={{
                  marginRight: 12,
                  zIndex: 10
                }}
                name={this.state.isLike ? 'heart' : 'heart-outline'}
                color={this.state.isLike ? COLORS.RED_HEART : COLORS.PRIMARY_TEXT}
                size={25}
                onPress={() => { console.log('') }}
              />
            </View>
          </View>
          <View
            style={{
              height: 80,
              backgroundColor: '#fff',
              shadowColor: '#455B63',
              shadowRadius: 3,
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              padding: 16,
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <Text style={{
                color: COLORS.DEEP_GRAY_TEXT,
                fontSize: 18,
                fontWeight: '700',
                paddingBottom: 4
              }}>
                Pinheiros Golf Club
              </Text>
              <Text style={{
                color: COLORS.SOFT_GRAY_TEXT,
                fontSize: 12
              }}>
                12 km . São Paulo . SP
              </Text>
            </View>
            <View style={{
              paddingBottom: '5%'
            }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={parseInt(5)}
                fullStarColor={COLORS.YELLOW_STAR}
                starStyle={{
                  paddingRight: 6
                }}
                starSize={18}
                containerStyle={{
                  justifyContent: 'center',

                }}
              />
            </View>

          </View>

        </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
  }
}

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FieldCard));
