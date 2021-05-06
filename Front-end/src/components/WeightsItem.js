
import React from 'react';
import {
  
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {getTheme} from 'react-native-material-kit';
import * as actions from '../actions';
import {
    Button,
  Container,
  Content,
  Header,
  Card,
  Body,
  CardItem,
  Text,
  Icon,
} from "native-base";

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    
  },
  title: {
    top: 20,
    left: 80,
    fontSize: 24,
  },
  image: {
    height: 100,
  },
  action: {
    backgroundColor: 'black',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

const WeightsItem = (props) => {
 
  return (
    <Content>
      <Card>
        <CardItem>
          <Body>
            <Text>{props.weights.weight} KG</Text>
            <Button 
            small
            onPress={() => props.deleteWeight(props.token,props.weights._id)}
            >              
            <Icon name="trash" />
            </Button>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

export default connect(null, actions)(WeightsItem);
