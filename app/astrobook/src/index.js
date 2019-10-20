import React from 'react'
import {
    BackHandler,
    Alert
} from 'react-native';

import { Provider } from 'react-redux'

// Navigation
import {
    createStackNavigator,
    createAppContainer,
    NavigationActions
} from 'react-navigation'

// Get store (redux)
import _store from './store'

// Scenes : Splash
import Splash from './scenes/Splash'
// Entrance
import Entrance from './scenes/Entrance'
import EntranceForgotPassword from './scenes/Entrance/scenes/ForgotPassword'
import EntranceResetPasswordEmailSent from './scenes/Entrance/scenes/EntranceResetPasswordEmailSent'
// User Registration
import CreateAccount from './scenes/Entrance/scenes/Register/scenes/CreateAccount'
// Profile
import ProfileView from './scenes/ProfileView';
// Main
import Main from './scenes/Main/'
import Home from './scenes/Main/scenes/Timeline'
import Settings from './scenes/Main/scenes/Settings'

// Timeline
import TimelineFinder from './scenes/Main/scenes/Timeline/scenes/TimelineFinder'
import Share from './scenes/Main/scenes/Timeline/components/ShareMomment/scenes/Share'
import CheckIn from './scenes/Main/scenes/Timeline/components/ShareMomment/scenes/CheckIn'
import Comments from './scenes/Main/scenes/Timeline/components/Post/scenes/Comments'
import EditProfile from './scenes/EditProfile'
const AppNavigator = createStackNavigator({
    EntranceResetPasswordEmailSent: {
        screen: EntranceResetPasswordEmailSent,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Comments: {
        screen: Comments,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    CheckIn: {
        screen: CheckIn,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Share: {
        screen: Share,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Splash: {
        screen: Splash,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Entrance: {
        screen: Entrance,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    EntranceForgotPassword: {
        screen: EntranceForgotPassword,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    CreateAccount: {
        screen: CreateAccount,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    ProfileView: {
        screen: ProfileView,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Main: {
        screen: Main,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    },
    TimelineFinder: {
        screen: TimelineFinder,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false
        },
    }
}, {
    initialRouteName: 'Splash',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
        swipeEnabled: false
    },
});

const Store = _store(AppNavigator)

export default class RootApp extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        const { store } = Store
        const { nav } = store.getState()

        if ((nav.routes.length > 2 || nav.routes[0].index > 0)) {
            console.log('ON BACK >>>>>');
            store.dispatch(NavigationActions.back());
            return true;
        }

        return true
    }

    render() {
        console.disableYellowBox = true

        return (
            <Provider store={Store.store}>
                <React.Fragment>
                    <Store.AppWithNavigationState />
                </React.Fragment>
            </Provider>
        )
    }
}
