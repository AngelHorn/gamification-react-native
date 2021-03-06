import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import MaterialKit from 'react-native-material-kit';
import {Icon} from 'react-native-icons/index.ios';

import QuestModalComponent from './QuestModalComponent.jsx';

const {
  Navigator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} = React;

const {
  MKIconToggle,
  MKCardStyles,
  MKButton
} = MaterialKit;

const routeMapper = {
  LeftButton: (route, navigator, index, navState) => {
    // if (index === 0) {
    //   return null;
    // }
    // var previousRoute = navState.routeStack[index];
    return (
      <TouchableOpacity
        onPress={() => global.drawer.open()}>
        <Icon
          name='material|square-right'
          size={30}
          color='#FFFFFF'
          style={{width: 30, height: 30, marginLeft:10}}
          />
      </TouchableOpacity>
    );
  },
  RightButton: function(route, navigator, index, navState) {
    return (
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity
          onPress={() => {
            //或者写成 const navigator = this.props.navigator;
            //为什么这里可以取得 props.navigator?请看上文:
            //<Component {...route.params} navigator={navigator} />
            //这里传递了navigator作为props
            let nav = {name: "add_quest_modal", title:"添加任务", component: QuestModalComponent};
            if(global.navigator) {
              global.drawer.close();
              global.navigator.push({...nav});
            } else {
              global.navigator.pop();
            }
          }}>
          <Icon
            name='material|plus-circle-o'
            size={30}
            color='#FFFFFF'
            style={{width: 40, height: 30}}
            />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name='material|menu'
            size={30}
            color='#FFFFFF'
            style={{width: 40, height: 30}}
            />
        </TouchableOpacity>
      </View>
    );
  },
  Title: function(route, navigator, index, navState) {
    return (
      <View style={{height: 30, justifyContent:"center"}}>
      <Text style={{fontSize: 20, color: "#FFFFFF"}}>
        {route.title}
      </Text>
    </View>
    );
  },
};


var styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

function mapStateToProps(state) {
  let quests = state.quests.filter((quest) => quest.type === 1 && quest.state === 0);
  return {
      quests
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default routeMapper
