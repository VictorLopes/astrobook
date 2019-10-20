import React from 'react';
import { YellowBox, Image, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import { Icon } from 'react-native-elements'


// Scenes
import Home from './scenes/Timeline'
import Settings from './scenes/Settings'
import Publish from './scenes/Publish'
import EditProfile from '../EditProfile'

// Constants
import COLORS from '@constants/colors'
import IMAGES from '@constants/images'

// Resolve problema warning do navigation
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const TabBarComponent = props => <BottomTabBar {...props} />;

export default createBottomTabNavigator(
    {

        Timeline: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    // <View>

                    // </View>
                    <Icon
                        type='font-awesome'
                        name='rocket'
                        color={tintColor}
                        size={34}
                    />
                )
            })
        },
        Seguindo: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    // <View>

                    // </View>
                    <Icon

                        name='people'
                        color={tintColor}
                        size={34}
                    />
                )
            })
        },
        Publicar: {
            screen: Publish,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    // <View>

                    // </View>
                    <Icon
                        type='antdesign'
                        name='camera'
                        color={tintColor}
                        size={34}
                    />
                )
            })
        },
        Perfil: {
            screen: EditProfile,
            navigationOptions: ({ navigation }) => ({
                tabBarVisible: false,
                tabBarIcon: ({ focused, tintColor }) => (

                    <Icon
                        type='antdesign'
                        name='profile'
                        color={tintColor}
                        size={30}
                    />
                )
            })
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#343434',
            inactiveBackgroundColor: '#FFF',
            style: {
                height: 60,
                padding: 0,
                backgroundColor: COLORS.PURPLE_DARK,
            },
        },

        initialRouteName: 'Timeline'
    }
);
