import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen');

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class ContactButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: '#C4EE68',
                width:212,
                height:40,
                borderRadius:13
            }}>
                <Icon name='message-outline' size={20} color='#383A3C' />
                <Text style={{
                    fontSize:13,
                    fontWeight:'400',
                    color:'#383A3C',
                    marginLeft: 11
                }}>
                    CONTATO
                </Text>
            </TouchableOpacity>
        )
    }
}
