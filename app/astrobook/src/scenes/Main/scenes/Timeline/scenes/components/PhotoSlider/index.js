import React, { Component } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Platform,
    Image,
    ActivityIndicator
} from 'react-native';
const { width, height } = Dimensions.get("screen");
import IMAGES from '@constants/images'
import Swiper from 'react-native-swiper';
import FitImage from 'react-native-fit-image';



export default class PhotoSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoading: false,
            items: [
                {
                    source: { uri: 'https://bloximages.newyork1.vip.townnews.com/southbendtribune.com/content/tncms/assets/v3/editorial/f/6f/f6ff3414-0325-53e1-b144-ec3dbaffc96b/5af2c3d291c1d.image.jpg?resize=1200%2C800' }
                },
                {
                    source: {uri: 'http://comiteolimpicoportugal.pt/wp-content/uploads/2014/02/Golfe.jpg'}
                },
                {
                    source: { uri: 'http://i0.statig.com.br/bancodeimagens/c1/es/to/c1estoiq8p493e3xw8mp7kwf6.jpg' }
                }
            ]
        }
    }
    render() {
        return (

            <Swiper
                style={styles.wrapper}
                loop={true}
                scrollEnabled={true}
                showsPagination={true}
                automaticallyAdjustContentInsets
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
                    this.state.items.map((item, i) => (

                        <FitImage
                            key={`imageItem-${i}`}
                            style={styles.image}
                            source={item.source}
                        />

                    ))
                }
            </Swiper>

        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: width,
        height: 200
    }
})
