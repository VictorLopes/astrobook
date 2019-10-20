import React from 'react';
import { YellowBox, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import { Icon } from 'react-native-elements'


// Scenes
import Home from './scenes/Timeline'
import Settings from './scenes/Settings'

// Constants
import COLORS from '@constants/colors'
import IMAGES from '@constants/images'

// Resolve problema warning do navigation
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const TabBarComponent = props => <BottomTabBar {...props} />;

export default createBottomTabNavigator(
    {

        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon
                        name='rocket'
                        color=''
                        size={30}
                    />
                )
            })
        },

        Settings: {
            screen: Settings,
            navigationOptions: ({ navigation }) => ({
                tabBarVisible: false,
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon
                        // type='material-icon'
                        name='menu'
                        color={tintColor}
                        size={25}
                    />
                )
            })
        }
    },
    {
        tabBarOptions: {

            showLabel: false,
            showIcon: true,
            activeTintColor: COLORS.FOOTER_BUTTON_ACTIVE_COLOR,
            inactiveTintColor: COLORS.FOOTER_BUTTON_INACTIVE_COLOR,
            inactiveBackgroundColor: COLORS.FOOTER_BUTTON_INACTIVE_BACKGROUND,
            style: {
                backgroundColor: COLORS.FOOTER_BUTTON_ACTIVE_BACKGROUND,
                elevation: 4,
            }
        },
        initialRouteName: 'Home'
    }
);
