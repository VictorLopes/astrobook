import React, { Component } from 'react'
import { Text, View, ActivityIndicator, Image } from 'react-native'
import FitImage from 'react-native-fit-image';

export default class FollowInfo extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                marginBottom: 16,
                marginTop: 16,
                height: 108,
                width: 346,
                alignSelf: 'center',
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#424446',
                    paddingLeft: 16,
                    paddingTop: 12
                }}>
                    {
                        (this.props.loading) ? (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1
                                }}
                            >
                                <ActivityIndicator size='large' color='#fff' />
                            </View>
                        ) : (
                                <React.Fragment>

                                    <Text style={{
                                        color: '#C4EE68',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }} >
                                        {this.props.followers.length}
                                    </Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 12,
                                    }} >
                                        seguidores
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingTop: 10,

                                    }}>
                                        {
                                            this.props.followers.map((item, i) => {
                                                if (i < 4) {
                                                    return (

                                                        <View key={`follower-${i}`} style={{
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: '#fff',
                                                            borderRadius: 14,
                                                            marginRight: -8,
                                                            overflow: 'hidden'
                                                        }} >
                                                            <FitImage
                                                                resizeMethod='auto'
                                                                resizeMode='center'
                                                                style={{
                                                                    width: 28,
                                                                    height: 28,
                                                                    borderRadius: 14,
                                                                }}
                                                                borderRadius={14}
                                                                source={{ uri: (item.photo) ? item.photo : 'http://agendamentosfpc.2rm.eb.mil.br/img/sem-imagem-avatar.png' }}
                                                            />
                                                        </View>
                                                    )
                                                } else if (i === 4) {
                                                    return (
                                                        <View key={`follower-${i}`} style={{
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: '#383A3C',
                                                            borderRadius: 14,
                                                            borderColor: '#fff',
                                                            borderWidth: 1,
                                                            marginRight: -8,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }} >
                                                            <Text style={{
                                                                color: '#C4EE68',
                                                                fontSize: 11,
                                                            }} >
                                                                {this.props.followers.length - 4}
                                                            </Text>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }

                                    </View>
                                </React.Fragment>

                            )
                    }

                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: '#383A3C',
                    paddingLeft: 16,
                    paddingTop: 12
                }}>
                    {
                        (this.props.followingLoading) ? (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1
                                }}
                            >
                                <ActivityIndicator size='large' color='#fff' />
                            </View>
                        ) : (
                                <React.Fragment>


                                    <Text style={{
                                        color: '#C4EE68',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }} >
                                        {this.props.following.length}
                                    </Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 12,
                                    }} >
                                        seguindo
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingTop: 10,
                                    }}>
                                        {
                                            this.props.following.map((item, i) => {
                                                if (i < 4) {
                                                    return (

                                                        <View key={`following-${i}`} style={{
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: '#fff',
                                                            borderRadius: 14,
                                                            marginRight: -8,
                                                            overflow: 'hidden'
                                                        }} >
                                                            <FitImage
                                                                resizeMethod='auto'
                                                                resizeMode='center'
                                                                style={{
                                                                    width: 28,
                                                                    height: 28,
                                                                    borderRadius: 14,
                                                                }}
                                                                borderRadius={14}
                                                                source={{ uri: (item.photo) ? item.photo : 'http://agendamentosfpc.2rm.eb.mil.br/img/sem-imagem-avatar.png' }}
                                                            />
                                                        </View>
                                                    )
                                                } else if (i === 4) {
                                                    return (
                                                        <View key={`following-${i}`} style={{
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: '#383A3C',
                                                            borderRadius: 14,
                                                            borderColor: '#fff',
                                                            borderWidth: 1,
                                                            marginRight: -8,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }} >
                                                            <Text style={{
                                                                color: '#C4EE68',
                                                                fontSize: 11,
                                                            }} >
                                                                {this.props.following.length - 4}
                                                            </Text>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }
                                    </View>
                                </React.Fragment>

                            )
                    }
                </View>
            </View>
        )
    }
}
