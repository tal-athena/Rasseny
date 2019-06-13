
import React from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, } from 'react-navigation';


import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import NavigationDrawerStructure from './components/NavigationDrawerStructure';
import Voting from './screens/Voting';
import Rating from './screens/Rating';
import BrainStorming from './screens/BrainStorming';
import Admin from './screens/Admin';
import AdminVoting from './screens/AdminVoting';
import AdminRating from './screens/AdminRating';
import AdminBrainStorming from './screens/AdminBrainStorming';
import AdminFinish from './screens/AdminFinish';

import Main from './screens/Main';
import TopTrends from './screens/TopTrends';
import Private from './screens/Private';
import CustomSideMenu from './components/CustomSideMenu';

const navigationBarColor = 'rgb(56, 66, 72)';

const LoginStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions : {header: null,},
  },
  Login: {
    screen: Login,
    navigationOptions : {header: null,},    
  },
  Register: {
    screen: Register,
    navigationOptions : {header: null,},    
  },
},{
  navigationOptions : {header: null,},    
});

const AdminActivity = createStackNavigator({
  Admin: {
    screen: Admin,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});

const MainActivity = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});
const TopTrendsActivity = createStackNavigator({
  TopTrends: {
    screen: TopTrends,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});
const PrivateActivity = createStackNavigator({
  Private: {
    screen: Private,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});
const MainTabActivity = createMaterialTopTabNavigator({

  Main: {
    screen: MainActivity,    
    navigationOptions: {
      title: "Main",      
    }
  },
  TopTrends: {
    screen: TopTrendsActivity,
    navigationOptions: {
      title: "Top Trends",      
    }    
  },
  Private: {
    screen: PrivateActivity,    
    navigationOptions: {
      title: "Private",      
    }
  },
},{
  tabBarPosition: 'bottom',
  tabBarOptions: {    
    style: {
      backgroundColor: navigationBarColor,
    },
  },
  navigationOptions: ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
      console.log('onPress:', scene.route);
      alert(jumpToIndex);
    },
  }),
})
const ProfileActivity = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({      
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});
const VotingActivity = createStackNavigator({
  Voting: {
    screen: Voting,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});
const RatingActivity = createStackNavigator({
  Rating: {
    screen: Rating,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});

const BrainStormingActivity = createStackNavigator({
  BrainStorming: {
    screen: BrainStorming,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});

const AdminVotingActivity = createStackNavigator({
  Voting: {
    screen: AdminVoting,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});
const AdminRatingActivity = createStackNavigator({
  Rating: {
    screen: AdminRating,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});

const AdminBrainStormingActivity = createStackNavigator({
  BrainStorming: {
    screen: AdminBrainStorming,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});

const AdminFinishActivity = createStackNavigator({
  ADminFinish: {
    screen: AdminFinish,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: navigationBarColor,
      },
      headerTintColor: '#fff',
    }),
  }
});

const MainDrawerNavigator = createDrawerNavigator({
  //Drawer Optons and indexing
  Main: { //Title
    screen: MainTabActivity,
    navigationOptions: {
      drawerLabel: "Main"
    }
  },
  Profile: {//Title
    screen: ProfileActivity,
    navigationOptions: {
      drawerLabel: "Profile"
    }
  },
  Voting: {
    screen: VotingActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  Rating: {
    screen: RatingActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  BrainStorming: {
    screen: BrainStormingActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  Admin: {
    screen: AdminActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  AdminRating: {
    screen: AdminRatingActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  AdminVoting: {
    screen: AdminVotingActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  AdminBrainStorming: {
    screen: AdminBrainStormingActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  AdminFinish: {
    screen: AdminFinishActivity,
    navigationOptions: {
      drawerLabel: () => null,
    }
  }
},{
  contentComponent: CustomSideMenu,
  navigationOptions: {header :null, gesturesEnabled: true},  
});

const AppNavigator = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawStack: { screen : MainDrawerNavigator }, 
}, {
  navigationOptions : {header: null,},
  initialRouteName: 'loginStack',
});


const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
