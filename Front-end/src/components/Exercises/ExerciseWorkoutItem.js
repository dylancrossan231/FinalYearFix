import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { ColoredRaisedButton, getTheme } from "react-native-material-kit";
import Icon from "react-native-vector-icons/EvilIcons";
import * as actions from "../../actions";
import { Text, Button,Label,Input,Form,Content,Item } from "native-base";
import { render } from "react-dom";
import log from "react-native-log-to-file";

const theme = getTheme();

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
const ExerciseWorkoutItem = (props) => {


  function handleChangeOnReps(e){

    console.log(e);

    log.logToFile('Testing123').then(res => {
      console.log(res);
    });


    // props.workoutExercises.map((item, index) => {
      // const index = props.workoutExercises.findIndex(
      //   (item) => item.exercise === e.exercise,
      // );

      // console.log(e,index,setIndex);
  //     // let currentRepField = e.target.value;

  //     // const updateRepState = props.workoutExercise.filter(
  //     //   (item, index) => item.exercise === currentRepField.exercise
  //     // );
  //     // console.log("yeehaw")
  //     // props.formUpdateWorkout({
  //     //   prop: props.workoutExercise[index],
  //     //   value,
  //     // })
    // });
  };


  // (value) =>
  //   props.formUpdateRep({
  //     prop: workoutExercise,
  //     value,
  //   });



  return (
    <View style={[theme.cardStyle, styles.card]}>
      <Button
        block
        rounded
        title="Add Set"
        style={styles.btnStyle}
        onPress={() => props.addSet(props.workoutExercise.exercise)}
      >
        <Text>Add Set</Text>
      </Button>

      {props.workoutExercise.sets.map((item, index) => {

        const [rep, setRep] = useState('');
        return (
          <Content>
            <Form style={{ flexDirection: "row" }} key={index}>
              <Text>{props.workoutExercise.exercise_name}</Text>
              <Label htmlFor={index}>
                <Text>Set {index + 1}</Text>
              </Label>

              <Content rounded>
                <Item
                  rounded
                  style={styles.textFieldStyle}
                  placeholder={"rep field"}
                  value={rep}
                >
                  {/* {console.log(props.workoutExercises[index])} */}

                  <Label htmlFor={index}>
                    <Text>Reps</Text>
                  </Label>
                  <Input
                    type="text"
                    name={index}
                    data-id={index}
                    id={index}
                    className="rep"
                    onChange={handleChangeOnReps}
                  />
                </Item>
              </Content>
              <Content>
                <Item
                  rounded
                  style={styles.textFieldStyle}
                  placeholder={"weight field"}
                  // value={props.workoutExercise.sets[index].rep}
                >
                  <Label htmlFor={index}>
                    <Text>Weight</Text>
                  </Label>
                  <Input
                    type="text"
                    name={index}
                    data-id={index}
                    id={index}
                    className="weight"
                    // onChangeText={props.handleChangeOnReps(index)}
                  />
                </Item>
              </Content>
            </Form>
          </Content>
        );
      })}
      {/* <FlatList
        data={props.workoutExercise.sets}
        renderItem={({ item, index }) => (
          
          
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      {/* {props.workoutExercise.sets.map((currentSet, indexSet) => {

        return (
          <Form key={indexSet} style={{ flexDirection: "row" }}>
            <Content>
              <Text>Set {indexSet + 1}</Text>
            </Content>

            <Content style={{ flex: 1 }}>
              <Item
                rounded
                style={styles.textFieldStyle}
                placeholder={"rep field"}
                value=""
              >
                <Label htmlFor={indexSet}>
                  <Text>Reps</Text>
                </Label>
                <Input
                  type="text"
                  name={indexSet}
                  data-id={indexSet}
                  id={indexSet}
                  className="rep"
                  onChangeText={(value) =>
                    props.formUpdateWorkout({
                      prop: currentSet.rep,
                      value,
                    })
                  }
                />
              </Item>
            </Content>

            <Content>
              <Item
                rounded
                style={styles.textFieldStyle}
                placeholder={"weight field"}
                value=""
              >
                <Label htmlFor={indexSet}>
                  <Text>Weight</Text>
                </Label>
                <Input
                  type="text"
                  name={indexSet}
                  data-id={indexSet}
                  id={indexSet}
                  className="weight"
                  onChangeText={(value) =>
                    props.formUpdateWorkout({
                      prop: currentSet.rep,
                      value,
                    })
                  }
                />
              </Item>
            </Content>

            <Content>
              <Item>
                <Button
                  block
                  rounded
                  title="Add Set"
                  style={styles.btnStyle}
                  onPress={() =>
                    props.addSet(props.workoutExercise.exercise)
                  }
                >
                  <Text>Add Set</Text>
                </Button>
              </Item>
            </Content>
          </Form>
        );
      })} */}
    </View>
  );
};

export default connect(null, actions)(ExerciseWorkoutItem);


