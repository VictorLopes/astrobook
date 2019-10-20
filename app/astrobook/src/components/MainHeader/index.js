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

MainHeader = ({ hasNext, hasPrev, backButton, styleTitle, callback, ...props }) => {
    if (hasNext) {
        props.rightComponent = {
            text: 'Avançar',
            onPress: hasNext.onPress,
            style: styles.button
        }
    }

    if (hasPrev) {
        props.leftComponent = {
            text: 'Cancelar',
            onPress: hasPrev.onPress,
            style: [styles.button, { fontWeight: 'normal' }]
        }
    }

    if (backButton) {

        props.leftComponent = (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (props.clear != null) {
                        props.clear()
                    }
                    if (backButton.onPress)
                        return backButton.onPress()

                    props.navigation.goBack()
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <Icon
                    type='material-icon'
                    name='arrow-back'
                    color='#FFF'
                    size={26}
                />
                <Text style={[styles.button, { fontWeight: 'normal' }]}>
                    {(backButton.title) ? backButton.title : ''}
                </Text>
            </TouchableOpacity>
        )
    }
    if (styleTitle) {
        styles.title = styleTitle
    }

    return (
        <View>
            <HeaderBase
                containerStyle={{
                    paddingHorizontal: 32,
                    height: 88
                }}
                {...props}
                backgroundColor={COLORS.PURPLE_DARK}
                placement='center'
                centerComponent={{
                    text: props.title,
                    style: styles.title
                }}
                leftContainerStyle={{
                    flex: 3
                }}
                centerContainerStyle={{
                    flex: 6,
                }}
                rightContainerStyle={{
                    flex: 3,
                }}
                rightComponent={props.rightComponent}
                statusBarProps={{
                    translucent: true,
                    barStyle: 'light-content',
                    backgroundColor: COLORS.PRIMARY_HEADER_BACKGROUND,
                    hidden: false
                }}
            />
        </View>
    )
}

export default withNavigation(MainHeader)

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '500',
        color: 'white'
    },
    button: {
        fontSize: 24,
        color: COLORS.PRIMARY_HEADER_TEXT_COLOR,
        fontWeight: 'bold'
    }
});
