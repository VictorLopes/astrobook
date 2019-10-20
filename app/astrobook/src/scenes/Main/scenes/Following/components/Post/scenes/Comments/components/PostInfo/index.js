import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import { NavigationActions } from 'react-navigation'
import { Icon as IconE } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import FitImage from 'react-native-fit-image'

import Swiper from 'react-native-swiper';


const { height, width } = Dimensions.get('screen');
export default class PostInfo extends Component {
    state = {
        loading: false
    }

    render() {
        const { name, time, message, profilePhoto, isLiked, photos, check_in } = this.props
        return (
            <View style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                marginBottom: 24,
                borderBottomColor: 'rgba(0,0,0,0.1)',
                borderBottomWidth: 0.3,
                paddingBottom: 20
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 16
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <View
                            style={{
                                width: 41,
                                height: 41,
                                borderRadius: 20.5,
                            }}
                        >
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: '#343434'
                                }}
                                source={{ uri: profilePhoto }}
                                resizeMode='cover'
                            />
                        </View>

                        <Text style={{
                            paddingLeft: 8,
                            color: '#383A3C',
                            fontSize: 14,
                            fontWeight: '500',
                            paddingRight: 40
                        }}>
                            {name}
                        </Text>
                    </View>
                    <View style={{

                    }}>
                        <Text style={{
                            color: '#B9B9B9',
                            fontSize: 12
                        }}>
                            {time}
                        </Text>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    paddingTop: 10,
                    paddingBottom: 12

                }} >
                    {
                        (check_in != '') && (

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
                                    {`${check_in}`}
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
                        {message}
                    </Text>
                </View>

                {
                    (photos) && (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: 200
                        }}>
                            <Swiper
                                style={{

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
                                    photos.map((photo, i) => (

                                        <FitImage
                                            key={`photoPost-${i}`}
                                            style={{
                                                width: '100%',
                                                height: 200
                                            }}
                                            source={{ uri: photo.url }}
                                            resizeMode='cover'

                                        />

                                    ))
                                }
                            </Swiper>

                        </View>

                    )
                }

            </View>
        )
    }
}


