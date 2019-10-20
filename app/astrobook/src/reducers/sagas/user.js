import { Alert, Platform } from 'react-native'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { StackActions, NavigationActions } from 'react-navigation'

import { callApi } from '../../services/api'

import { decode as atob, encode as btoa } from 'base-64'

import _ from 'lodash'

// import AsyncStorage from '@react-native-community/async-storage';

// Services


// Aux
import Toast from 'react-native-root-toast';
const moment = require('moment');


function* login({ payload }) {
    try {
        yield put({
            type: 'USER_SET_LOADING',
            payload: true
        });
        //Get all people that the user that is logged in is following
        let response = yield call(callApi, {
            endpoint: '/users/login',
            method: 'POST',
            data: {
                username: payload.email,
                password: payload.password
            },
            title: 'USER USER_LOGIN_TRIGGER '
        })
        if (response.data) {
            console.log('[USER USER_LOGIN_TRIGGER RESPONSE]', response)
            yield put({
                type: 'USER_SET',
                payload: response.data
            });

            yield put(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })]
            }))

        } else {
            Alert.alert('Erro', 'Login ou senha estão incorretos!')
        }
        yield put({
            type: 'USER_SET_LOADING',
            payload: false
        });
    } catch ({ message, error }) {
        yield put({
            type: 'USER_SET_LOADING',
            payload: false
        });
        console.warn('[USER USER_LOGIN_TRIGGER ERROR]', message, error)
    }
}
function* createAccount({ payload }) {
    try {
        yield put({
            type: 'USER_SET_CREATE_ACCOUNT_LOADING',
            payload: true
        });
        //Get all people that the user that is logged in is following
        let response = yield call(callApi, {
            endpoint: '/users/insert',
            method: 'POST',
            data: {
                name: payload.name,
                lastName: payload.lastName,
                nickname: payload.nickname,
                email: payload.email,
                password: payload.password,
                profilePhoto: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            },
            title: 'USER USER_CREATE_ACCOUNT_TRIGGER '
        })
        if (response.data) {
            Alert.alert('Erro', 'Cadastro Realizado com sucesso!')
            yield put(StackActions.pop())

        } else {
            Alert.alert('Erro', 'Ocorreu um erro no cadastro!')
        }
        yield put({
            type: 'USER_SET_CREATE_ACCOUNT_LOADING',
            payload: false
        });
    } catch ({ message, error }) {
        yield put({
            type: 'USER_SET_CREATE_ACCOUNT_LOADING',
            payload: false
        });
    }
}

export default function* rootUser() {
    yield takeEvery('USER_LOGIN_TRIGGER', login)
    yield takeEvery('USER_CREATE_ACCOUNT_TRIGGER', createAccount)

}
