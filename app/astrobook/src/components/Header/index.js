import React from 'react';
import { withNavigation } from 'react-navigation'
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View
} from 'react-native';

import {
    Header as HeaderBase,
    Icon
} from 'react-native-elements';

// Constants
import COLORS from '@constants/colors';

Header = ({ hasNext, hasPrev, backButton, callback,rightButton, ...props }) => {
    if (hasNext != undefined) {
        props.rightComponent = {
            text: 'Avançar',
            onPress: hasNext.onPress,
            style: styles.button
        }
    }

    if (hasPrev != undefined) {
        props.leftComponent = {
            text: 'Cancelar',
            onPress: hasPrev.onPress,
            style: [styles.button, { fontWeight: 'normal' }]
        }
    }

    if (backButton != undefined) {

        props.leftComponent = (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (props.clear != null) {
                            props.clear()
                        }
                        if (backButton.onPress)
                            return backButton.onPress()

                        return props.navigation.goBack()
                    }}

                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingTop: 20
                    }}
                >
                    <Icon
                        type='material-icon'
                        name='arrow-back'
                        color={COLORS.PRIMARY_HEADER_TEXT_COLOR}
                        size={26}
                    />
                    <Text style={[styles.button, { fontWeight: 'normal' }]}>
                        {(backButton.title) ? backButton.title : ''}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 35,
                            color: COLORS.PRIMARY_HEADER_TEXT_COLOR
                        }}
                    >
                        {props.title}
                    </Text>
                </View>
            </View>
        )
    }else{
        props.leftComponent = (
            <View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 35,
                            color: COLORS.PRIMARY_HEADER_TEXT_COLOR
                        }}
                    >
                        {props.title}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <HeaderBase
                containerStyle={{
                    paddingHorizontal: 32,
                    height: 156,
                }}
                {...props}
                backgroundColor={COLORS.MENU_BACKGROUND}
                placement='center'
                centerComponent={{
                    text: props.centerTitle,
                    style: styles.title
                }}
                leftContainerStyle={{
                    flex: 4
                }}
                centerContainerStyle={{
                    flex: 0
                }}
                rightContainerStyle={{
                    flex: 2,
                }}
                rightComponent={props.rightComponent}
                statusBarProps={{
                    translucent: true,
                    barStyle: 'default',
                    backgroundColor: COLORS.MENU_BACKGROUND
                }}
            />
        </View>
    )
}

export default withNavigation(Header)

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: 'black'
    },
    button: {
        fontSize: 24,
        color: COLORS.PRIMARY_HEADER_TEXT_COLOR,
        fontWeight: 'bold'
    }
});
