import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

export default class Album extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: 16,
                backgroundColor: '#fff',
                shadowColor: '#455B63',
                shadowRadius: 3,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                paddingHorizontal: 24,
                marginBottom: 16,
                height: 285
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    paddingBottom: 12,
                }}>
                    <Text style={{
                        flex: 1,
                        color: 'rgba(56, 58, 60, 1)',
                        fontSize: 18,
                        fontWeight: '300'
                    }}>
                        Seu album
                    </Text>
                    <TouchableOpacity style={{
                        height: 28,
                        width: 100,
                        borderRadius: 25,
                        backgroundColor: '#C4EE68',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            <Icon
                                type='material-community'
                                name='camera'
                                color='#383A3C'
                                size={15}
                            />
                            <Text style={{
                                paddingLeft: 8,
                                color: 'rgba(56, 58, 60, 1)',
                                fontSize: 12,
                                fontWeight: '500'
                            }}>
                                add foto
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}
