import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/EvilIcons";
import ExerciseItem from "./ExerciseItem";
import * as actions from "../../actions";
import { routes } from "../navigation_new/app-routes";
import { Button, Container } from "native-base";





const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 20,
  },
});

class ExercisesHome extends Component {
state = {
prevScreen: ""
}
  componentDidMount() {
let [previousScreen] = this.props.navigation.dangerouslyGetState().routes
if (previousScreen.state) {
      this.props.navigation.setOptions({
        tabBarVisible: false,
      });
  const name = previousScreen.state.routes[previousScreen.state.routes.length - 1].name;
  this.setState({
    prevScreen: name,
  });
} else if (previousScreen.name === "Main" && previousScreen.params ) {

  const name2 = previousScreen.params.screen;
  this.setState({
    prevScreen: name2,
  });
}

this.props.loadInitialExercises(this.props.token);
}
 
  render() {
  
    const { token, loading, error, exercises, workoutExercises } = this.props;
    if (loading || (!error && exercises.length === 0))
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
            onPress={() => this.props.loadInitialExercises(token)}
          />
        </View>
      );
    
    if (this.state.prevScreen === "ADDWORKOUT")
    
      return (
        <Container>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseItem
                navigation={this.props.navigation}
                prevScreen={this.state.prevScreen}
                addWorkoutExercises={
                  this.props.route.params?.passMethod.addWorkoutExercises
                }
                passFormElementsBackToAddWorkout={this.passFormElementsBackToAddWorkout}
                workoutExercises={workoutExercises}
                workout_name={this.props.workout_name}
                exercises={item}
              />
            )}
            keyExtractor={(exercise, index) => index.toString()}
          ></FlatList>
        </Container>
      );
      
        return (
          <Container>
            <FlatList
              data={exercises}
              renderItem={({ item }) => <ExerciseItem exercises={item} />}
              keyExtractor={(exercise, index) => index.toString()}
            />
          </Container>
        );

        
  }
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercise.exercises,
    workoutExercises: state.workout.workoutExercises,
    workout_name: state.workout.workout_name,
    loading: state.exercise.loading,
    error: state.exercise.error,
    token: state.people.token,
  };
};

export default connect(mapStateToProps, actions)(ExercisesHome);
