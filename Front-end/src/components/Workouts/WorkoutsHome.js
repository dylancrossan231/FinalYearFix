import React, {Component} from 'react';
import {View, Button, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import WorkoutItem from './WorkoutItem';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 20,
  },
});

class WorkoutsHome extends Component {
  componentDidMount() {
    
        this.props.navigation.dangerouslyGetParent().setOptions({
          tabBarVisible: true,
        });
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
          <Text>Loading</Text>
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
      <View style={styles.container}>
        <Button
          title="Add New Workout"
          navigation={this.props.navigation}
          onPress={() => this.props.navigation.navigate("ADDWORKOUT")}
        />

        <FlatList
          data={workouts}
          renderItem={({ item }) => <WorkoutItem workouts={item} />}
          keyExtractor={(workout, index) => index.toString()}
        />
      </View>
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
