import * as React from 'react'
import { Component } from 'react'
import { View, StyleSheet, Text, Image, Platform, Dimensions } from 'react-native'

import Swiper from 'react-native-swiper'
import * as firebase from 'firebase'

import { showPaperList } from './actions'
import { connect } from 'react-redux'

import ArticleCard from './components/article-card.js'
import Paper from './components/paper.js'
import Loading from './components/loading.js'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBXoXdWcHdvihMtQRUs4TKd3gcMCPjaPa4",
    authDomain: "flickering-heat-5152.firebaseapp.com",
    databaseURL: "https://flickering-heat-5152.firebaseio.com",
    storageBucket: "flickering-heat-5152.appspot.com",
    messagingSenderId: "1038664267499"
}
const firebaseApp = firebase.initializeApp(config)

// const lastestRef = new DB('https://flickering-heat-5152.firebaseio.com/lastest')

class App extends Component {
    swiper;
    constructor(...args) {
        super(...args)
        this.state = {
            url: false,
        }
    }
    componentDidMount() {
        firebaseApp.database().ref().child('lastest').on('value', (snapshot) => {
            this.props.dispatch(showPaperList(snapshot.val()))
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.list.length === '' || this.props.list !== nextProps.list) {
            this.swiper = (
                <Swiper style={styles.swiper} loop={false} bounces={true} showsPagination={Platform.OS === 'ios'}
                    dot={<View style={styles.swiperDot} />}
                    activeDot={<View style={styles.swiperActiveDot} />}>
                    {
                        nextProps.list.map((v, i) => <View style={styles.swiperItem} key={i}><ArticleCard onPress={() => this.handlePaperEnter(v.url)} style={{ flex: 1 }} data={v} /></View>)
                    }
                </Swiper>
            )
        }
    }
    handlePaperEnter(url) {
        this.setState({
            url: url
        })
    }
    handlePaperCancel() {
        this.setState({
            url: false
        })
    }
    render() {
        const { dispatch } = this.props

        if (this.props.date === '') {
            return <Loading show={true} text={'数据拉取中...'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        }
        return (
            <View style={styles.body}>
                <View style={styles.timeTag}>
                    <Text style={styles.timeTagText}>{this.props.date}</Text>
                </View>
                {this.swiper}
                <Paper url={this.state.url} onCancel={() => this.handlePaperCancel()} />
            </View>
        )
    }
}

function select(state) {
    console.log(state)
    return {
        date: state.date,
        list: state.list,
    }
}

export default connect(select)(App)

const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fafafa',
        flex: 1,
    },
    timeTag: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 1.5,
        shadowOffset: {
            height: 0.5,
        },
        position: 'absolute',
        top: 35,
        left: 0,
        backgroundColor: '#eceff1',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    timeTagText: {
        fontSize: 12,
        color: '#666',
    },
    swiper: {
        flex: 1,
    },
    swiperItem: {
        flex: 1,
        paddingTop: 80,
        paddingBottom: 60,
        paddingLeft: 20,
        paddingRight: 20,
    },
    swiperDot: {
        backgroundColor: '#e4e4e4',
        height: 6,
        width: 6,
        borderRadius: 3,
        marginRight: 6,
        marginLeft: 6,
    },
    swiperActiveDot: {
        backgroundColor: '#ee6e73',
        height: 10,
        width: 10,
        borderRadius: 5,
        marginRight: 4,
        marginLeft: 4,
    },
})
