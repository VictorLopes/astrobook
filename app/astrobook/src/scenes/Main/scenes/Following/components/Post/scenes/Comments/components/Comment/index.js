import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import { NavigationActions } from 'react-navigation'
import { Icon as IconE } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import FitImage from 'react-native-fit-image'

import Swiper from 'react-native-swiper';
const moment = require('moment');


const { height, width } = Dimensions.get('screen');

export default class Comment extends Component {
    state = {
        loading: false
    }

    render() {

        const { name, created_at, message, profile_photo } = this.props
        let aux = moment(created_at)
        let created_at_formated = aux.fromNow().replace('há ', '')
        return (
            <View style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                marginBottom: 8,
                paddingBottom: 20,
                flexDirection: 'row'
            }}>

                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 0.5,
                        borderColor: '#343434'
                    }}
                    source={{ uri: profile_photo }}
                    resizeMode='cover'
                />
                <View
                    style={{
                        flex: 1
                    }}
                >

                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 12,
                            flex: 1,
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: '#000'
                            }}
                        >
                            {`${name}  `}
                        </Text>
                        <Text
                            style={{
                                // marginLeft: 12,
                                fontSize: 11,
                                fontWeight: '700',
                                color: 'rgba(0,0,0,0.3)'
                            }}
                        >
                            {created_at_formated}
                        </Text>


                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 12,
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 8,
                                fontSize: 13,
                                fontWeight: '400',
                                color: 'rgba(0,0,0,0.7)',
                                textAlign: 'justify'
                            }}
                        >
                            {message}
                        </Text>
                    </View>


                </View>

            </View>
        )
    }
}


