import * as React from 'react'
import { Component } from 'react'
import { View, StyleSheet, Dimensions, WebView, PanResponder, Animated } from 'react-native'

import Loading from './loading.js'


export default class Paper extends Component {
    _panResponder;
    url;
    releasePos;
    constructor(...args) {
        super(...args)
        this.state = {
            webviewRotateZ: new Animated.Value(0),
            webviewTranslateX: new Animated.Value(0),
            webviewTranslateY: new Animated.Value(windowHeight),
            loading: true,
        }
        this.url = false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.url && nextProps.url !== this.url) {
            this.state.loading = true
            this.url = nextProps.url
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.url && !this.props.url) {
            // console.log(this.state.webviewTranslateX)
            this.resetPosition(this.move)
        }
        if (this.props.url && prevProps.url !== this.props.url) {
            this.state.webviewTranslateY.setValue(windowHeight)
            this.resetPosition(0)
        }
    }



    resetPosition(status = 0) {
        status = status > 0 ? 1 : (status < 0 ? -1 : status);
        Animated.parallel([
            Animated.spring(this.state.webviewRotateZ, { toValue: 2 * windowWidth * status }),
            Animated.spring(this.state.webviewTranslateX, { toValue: 2 * windowWidth * status }),
            Animated.spring(this.state.webviewTranslateY, { toValue: 0 }),
        ]).start()
    }

    componentWillMount() {
        let startX = false
        let webviewResponderMode = false

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                if (!webviewResponderMode) {
                    if (Math.abs(gestureState.dy) * 3 > Math.abs(gestureState.dx)
                        || gestureState.dy < -0.5) {
                        webviewResponderMode = 'reading'
                    } else {
                        webviewResponderMode = 'outing'
                    }
                }
                if (webviewResponderMode === 'reading') {
                    return
                } else if (webviewResponderMode === 'outing') {
                    this.move = gestureState.moveX - gestureState.x0
                    this.state.webviewRotateZ.setValue(this.move)
                    this.state.webviewTranslateX.setValue(this.move)
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (webviewResponderMode === 'outing') {
                    if (
                        gestureState.vx > 4
                        || gestureState.vx < -4
                        || gestureState.moveX - gestureState.x0 > windowWidth / 2
                        || gestureState.x0 - gestureState.moveX > windowWidth / 2
                    ) {
                        this.props.onCancel()
                        this.move = gestureState.moveX - gestureState.x0
                    } else {
                        this.resetPosition(0)
                    }
                }
                startX = false
                webviewResponderMode = false
            },
        })
    }
    render() {
        if (!this.url) {
            return null;
        }
        return (
            <Animated.View {...this._panResponder.panHandlers}
                style={[
                    styles.webviewContainer,
                    {
                        transform: [
                            {
                                rotateZ: this.state.webviewRotateZ.interpolate({
                                    inputRange: [-windowWidth * 2, windowWidth * 2],
                                    outputRange: ['-80deg', '80deg']
                                })
                            }, {
                                translateX: this.state.webviewTranslateX
                            }, {
                                translateY: this.state.webviewTranslateY
                            }
                        ]
                    },
                ]}>
                <WebView source={{ uri: this.url }} onLoadEnd={() => this.setState({ loading: false })} />
                <Loading show={this.state.loading} text={'页面加载中...'} style={styles.loading} />
            </Animated.View>
        )
    }
}

Paper.defaultProps = {
    onCancel() { }
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    webviewContainer: {
        position: 'absolute',
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.20,
        shadowRadius: 5,
        shadowOffset: {
            height: 0.5,
        },
    },
    loading: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: 0.8,
    }
})
