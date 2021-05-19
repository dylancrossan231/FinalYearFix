import React, {Component} from 'react';
import {StyleSheet,FlatList} from 'react-native';
import {connect} from 'react-redux';
import WorkoutItem from './WorkoutItem';
import * as actions from '../../actions';
import {routes} from "../navigation_new/app-routes"
import Icon from "react-native-vector-icons/AntDesign";
import {
  View,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Right,
} from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 20,
  },
  btnStyle: {
    backgroundColor: "#5DB075",
  },
});

class WorkoutsHome extends Component {
  componentDidMount() {
        console.log("YEEEEEEEHAW")
        this.props.navigation.dangerouslyGetParent().setOptions({
          tabBarVisible: true,
        });
        console.log("mounted")
    this.props.loadInitialWorkouts(this.props.token,this.props.user);

  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'pencil'} size={50} color={tintColor} />
    ),
  };

  render() {
    const {token, loading, error, workouts} = this.props;
    if (loading || (!error && workouts.length === 0))
      return (
        <View>
          <Header transparent />

          <Text>You have no workouts recorded yet</Text>
          <Button transparent
            style={{ position: "absolute", right: 0, paddingTop: 100 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_WORKOUT)}
          >
            <Icon
              style={{ color: "#5DB075" }}
              name="plussquareo"
              size={50}
            />
          </Button>
        </View>
      );
    if (error)
      return (
        <View>
          <Text>{error}</Text>
          <Button
            title="Retry"
            onPress={() => this.props.loadInitialWorkouts(token)}
          />
        </View>
      );
    return (
      <Container>
        <Header transparent>
            <Button
              transparent
              style={{ color: "#5DB075" }}
              style={{ position: "absolute", right: 0 }}
              styles={styles.btnStyle}
              onPress={() => this.props.navigation.navigate(routes.ADD_WORKOUT)}
            >
              <Icon
                style={{ color: "#5DB075", paddingTop: 65}}
                name="plussquareo"
                size={50}
              />
            </Button>
          
        </Header>
        {/* <Button
          styles={styles.btnStyle}
          title=""
          style={{ position: "absolute", right: 0 }}
          onPress={() => this.props.navigation.navigate(routes.ADD_WORKOUT)}
        >
          <Icon
            style={{
              color: "#5DB075",
              backgroundColor: "white",
            }}
            name="plussquareo"
            size={50}
          />
        </Button> */}

        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <WorkoutItem
              workout={item}
              deleteWorkout={this.deleteWorkout}
              token={this.props.token}
            />
          )}
          keyExtractor={(workout, index) => index.toString()}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workout.workouts,
    loading: state.workout.loading,
    error: state.workout.error,
    token: state.people.token,
    user: state.people._id,
  };
};

export default connect(mapStateToProps, actions)(WorkoutsHome);
