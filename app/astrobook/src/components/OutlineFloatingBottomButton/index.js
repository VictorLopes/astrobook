import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import COLORS from '@constants/colors'

const { height, width } = Dimensions.get('screen');

export default class OutlineFloatingBottomButton extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.PRIMARY,
                    // borderColor: '#383A3C',
                    // borderWidth: 1,
                    width: width,
                    height: 48,
                    // borderRadius: 13,
                    position: 'absolute',
                    bottom: 0
                }, this.props.style]}>
                {
                    (this.props.loading) ?
                        (
                            <ActivityIndicator color='#000' size='large' />
                        )
                        : (
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#383A3C',
                                marginLeft: 11
                            }}>
                                {this.props.title}
                            </Text>
                        )
                }
            </TouchableOpacity>
        )
    }
}
