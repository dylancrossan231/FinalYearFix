import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert , FlatList,SafeAreaView} from "react-native";
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Container, Header, Content, Item, Button, Input ,Label,Form} from "native-base";
import ExerciseWorkoutItem from '../Exercises/ExerciseWorkoutItem';

const styles = StyleSheet.create({
  useNativeDriver: true,

  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  fieldStyles: {
    height: 40,
  },
  addButton: {
    marginTop: 40,
    color: "#5DB075",
  },
  btnStyle: {
    backgroundColor: "#5DB075",
  },
  btnText: {
    color: "white",
  },
  textFieldStyle: {
    backgroundColor: "#F5F5F5",
    marginTop: 40,
  },
  titleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
});

class AddWorkout extends Component {
  onAddPress() {
    const { workout_name, workoutExercises } = this.props;

    this.props.createNewWorkout({
      workoutExercises,
      workout_name,
      token: this.props.token,
    });
    this.props.navigation.navigate("HOMEWORKOUT");
  }
  componentDidMount() {
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false,
    });
  }
  addSet(id) {
    let setObject = {
      rep: "22",
      weight: "22",
    };

    this.addWorkoutExerciseSet(setObject, id);
  }

  addWorkoutExercises(exerciseName, id) {
    let exerciseObject = {};
    // let workoutExerciseArray = [];

    exerciseObject = {
      exercise_name: exerciseName,
      exercise: id,
      sets: [
        {
          rep: "22",
          weight: "22",
        },
      ],
    };

    this.addWorkoutExercise(exerciseObject);
  }
  // handleChangeOnReps = (e) => {
  //   let currentRepField = e.target.value;

  //   const updateRepState = props.workoutExercise.filter(
  //     (item, index) => item.exercise === currentRepField.exercise
  //   );
  //   console.log("yeehaw")
  //   props.formUpdateWorkout({
  //     prop: props.workoutExercise[index],
  //     value,
  //   })

  // };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text>Add a new Workout</Text>

          <Content>
            <Item
              rounded
              style={styles.textFieldStyle}
              placeholder={"workout_name"}
              value={this.props.workout_name}
            >
              <Input
                onChangeText={(value) =>
                  this.props.formUpdateWorkout({ prop: "workout_name", value })
                }
                placeholder="workout_name"
              />
            </Item>
          </Content>

          <View style={styles.addButton}>
            <Button
              block
              rounded
              title="Add Exercise"
              style={styles.btnStyle}
              addWorkoutExercises={this.addWorkoutExercises}
              onPress={() =>
                this.props.navigation.navigate("EXERCISEHOME", {
                  passMethod: {
                    addWorkoutExercises: this.addWorkoutExercises,
                  },
                })
              }
            >
              <Text style={styles.btnText}>Add Exercise</Text>
            </Button>
          </View>
          <FlatList
            data={this.props.workoutExercises}
            renderItem={({ item }) => (
              <ExerciseWorkoutItem
                workoutExercise={item}
                addSet={this.addSet}
                workoutExercises={this.props.workoutExercises}
                onChangeText={this.handleChangeOnReps}
              />
            )}
            keyExtractor={(workoutExercise, index) => index.toString()}
          />
          <View style={styles.addButton}>
            <Button
              block
              rounded
              title="Finish"
              style={styles.btnStyle}
              onPress={this.onAddPress.bind(this)}
            >
              <Text style={styles.btnText}>Finish</Text>
            </Button>
          </View>
          <View style={styles.addButton}>
            <Button title="Add Workout" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
    const { workout_name, workoutExercises } = state.workout;
    return { workout_name, workoutExercises, token: state.people.token };
};

export default connect(mapStateToProps, actions)(AddWorkout);
