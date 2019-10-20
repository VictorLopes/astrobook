import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
    StatusBar,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform,
    ActivityIndicator
} from 'react-native'

import {
    Icon,
    Slider,
    SearchBar
} from 'react-native-elements';

import FieldCard from './components/FieldCard'


// Constants
import COLORS from '@constants/colors'
import IMAGES from '@constants/images'

class FinderCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            coursesFinderList: [],
            coursesFinderLoader: true,
            filter: ''
        };

        this._timeout = null;
    }

    componentDidMount() {
        // Create listener
        this._sub = this.props.navigation.addListener('didFocus', this.didFocusFunctions);

        // Call didFocus on mount
        this.didFocusFunctions();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user)
            state.user = props.user;

        if (props.coursesFinderList)
            state.coursesFinderList = props.coursesFinderList;

        state.coursesFinderLoader = props.coursesFinderLoader;

        return state;
    }

    didFocusFunctions = () => {
        this.searchCourses();
    }

    searchCourses = () => {
        if (this._timeout !== null)
            clearTimeout(this._timeout);

        this._timeout = setTimeout(() => {
            this.props.getFinderCourses(this.state.filter)
        }, 500);
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#F2F3F4',
                    flex: 1
                }}>

                <SearchBar
                    platform={Platform.OS}
                    placeholder="nome do clube"
                    onChangeText={(value) => this.setState({ filter: value }, this.searchCourses)}
                    onClear={() => this.setState({ filter: '' }, this.searchCourses)}
                    value={this.state.filter}
                    searchIcon={(
                        <TouchableOpacity
                            onPress={() => this.searchCourses()}>

                            <Icon
                                type='material'
                                name='search'
                                color={COLORS.DEEP_GRAY_TEXT}
                                size={40}
                            />

                        </TouchableOpacity>
                    )}
                    lightTheme={true}
                />

                <View>
                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: '#F2F3F4',
                            paddingBottom: 20
                        }}>
                            
                        {
                            this.state.coursesFinderLoader == true && (
                                <ActivityIndicator
                                    size='large'
                                    color='#212121'
                                    style={{
                                        marginVertical: 8
                                    }}
                                />
                            )
                        }

                        {
                            this.state.coursesFinderList.map((course, i) => {
                                return (
                                    <FieldCard
                                        key={`courseItem-${i}`}
                                        field={course.d}
                                        onPress={() => this.props.getCourseDetails(course.id)}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
        coursesFinderList: state.course.coursesFinderList,
        coursesFinderLoader: state.course.coursesFinderLoader
    }
}

const mapDispatchToProps = dispatch => ({
    getFinderCourses(filter) {
        dispatch({
            type: 'COURSES_FINDER_GET_COURSES_TRIGGER',
            filter
        })
    },
    getCourseDetails(uid) {
        dispatch({
            type: 'COURSES_GET_COURSE_DETAILS_TRIGGER',
            uid
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FinderCourses));
