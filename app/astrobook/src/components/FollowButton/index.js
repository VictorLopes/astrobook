import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen');

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class FollowButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: '#E8E8E8',
                width:100,
                height:40,
                borderRadius:13
            }}>
                <Icon name='plus-circle-outline' size={23} color='#A2A2A2' />
                <Text style={{
                    fontSize:13,
                    fontWeight:'400',
                    color:'#A2A2A2',
                    marginLeft: 11
                }}>
                    SEGUIR
                </Text>
            </TouchableOpacity>
        )
    }
}
