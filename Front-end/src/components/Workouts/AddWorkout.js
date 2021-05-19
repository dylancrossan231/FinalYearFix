import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert , FlatList,SafeAreaView} from "react-native";
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Container, Header, Content, Item, Button, Input ,Label,Form} from "native-base";
import ExerciseWorkoutItem from '../Exercises/ExerciseWorkoutItem';
import {routes} from "../navigation_new/app-routes";
import Icon from "react-native-vector-icons/AntDesign";

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
    this.props.navigation.navigate(routes.HOME_WORKOUT);
  }
  componentDidMount() {
    console.log("HOWDY PARTNER")
    // this.setState({
    //   // this.props.workout_name 
    // })
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false,
    });

  }
  addSet(id) {
    let setObject = {
      rep: "",
      weight: "",
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
          rep: "",
          weight: "",
        },
      ],
    };

    this.addWorkoutExercise(exerciseObject);
  }
  navigateBackAndClearWorkoutExercises(){
  this.props.clearWorkoutExercisesArray();
  this.props.navigation.navigate(routes.HOME_WORKOUT);
  }
  render() {
        const { workout_name,workoutExercises } = this.props;

    return (
      <ScrollView>
        <Header />
        <View style={styles.form}>
          <Button
            transparent
            style={{ position: "absolute", left: 0, paddingTop: 10 }}
            onPress={() => this.navigateBackAndClearWorkoutExercises()}
          >
            <Icon style={{ color: "#5DB075" }} name="arrowleft" size={60} />
          </Button>
          <Button
            transparent
            style={{ position: "absolute", right: 0 }}
            onPress={() =>
              this.props.navigation.navigate(routes.EXERCISEHOME, {
                passMethod: {
                  addWorkoutExercises: this.addWorkoutExercises,
                },
              })
            }
          >
            <Icon
              style={{ color: "#5DB075", paddingTop: 10 }}
              name="plussquareo"
              size={50}
            />
          </Button>
          <Text>Add a new Workout</Text>

          <Content>
            <Item
              rounded
              style={styles.textFieldStyle}
              placeholder={"workout_name"}
            >
              <Input
                value={workout_name}
                onChangeText={(value) =>
                  this.props.formUpdateWorkout({ prop: "workout_name", value })
                }
                placeholder="workout_name"
              />
            </Item>
          </Content>

          <FlatList
            data={workoutExercises}
            renderItem={({ item }) => (
              <ExerciseWorkoutItem
                workoutExercise={item}
                addSet={this.addSet}
                workoutExercises={this.props.workoutExercises}
                formUpdateWorkoutRep={this.formUpdateWorkoutRep}
                formUpdateWorkoutWeight={this.formUpdateWorkoutWeight}
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
