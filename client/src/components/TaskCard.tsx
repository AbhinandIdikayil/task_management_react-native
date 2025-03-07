// src/components/TaskCard.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';

const TaskCard = ({ task, onPress }:any) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{task.title}</Title>
          <Paragraph numberOfLines={2}>{task.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
});

export default TaskCard;
