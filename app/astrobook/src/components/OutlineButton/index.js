import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

const { height, width } = Dimensions.get('screen');

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class OutlineButton extends Component {
    render() {
        return (

            <TouchableOpacity
                onPress={this.props.onPress}
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderColor: '#383A3C',
                    borderWidth: 1,
                    width: 280,
                    height: 48,
                    borderRadius: 13
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
