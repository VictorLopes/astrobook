import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';
import {
    View,
    Image,
    StatusBar,
    ImageBackground,
    Dimensions
} from 'react-native'

// Constants
import IMAGES from '@constants/images';
import COLORS from '@constants/colors';
import FitImage from 'react-native-fit-image';



class Splash extends Component {
    componentDidMount() {
        setTimeout(() => this._redirectTo('Main'), 1500);
    }


    _redirectTo = (scene) => {
        this.props.navigation.replace(scene);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.PURPLE_DARK,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                    barStyle='light-content'
                />

                <Image
                    source={IMAGES.ICON_LOGO}
                    style={{
                        width: 180,
                        height: 180
                    }}
                />


            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

const mapDispatchToProps = dispatch => ({
    getUserInfo(id) {
        dispatch({
            type: 'USER_GET_USER_INFO_TRIGGER',
            payload: { id }
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Splash))
