import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export interface ITask {
  task: string,
  day: string
}

export default function App() {
  const [task, setTask] = useState('');
  const [day, setDay] = useState('');
  const [tasks, setTasks] = useState([] as Array<ITask>);

  const handleAddTask = () => {
    if(task.trim() && day.trim()) {
      setTasks([...tasks, {task, day}]);
      setTask('');
      setDay('');
    }
  }

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText]}>Tarefa</Text>
            <Text style={[styles.cell, styles.headerText, styles.headerDay]}>Dia</Text>
            <Text style={[styles.cell, styles.headerText]}></Text>
          </View>
        </View>
        {tasks.map((item: ITask, index: number) => (
          <View key={index} style={[styles.row, index !== tasks.length - 1 && styles.borderBottom]}>
            <Text style={[styles.cell, styles.borderRight]}>{item.task}</Text>
            <Text style={[styles.cell, styles.borderRight]}>{item.day}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(index)} style={[styles.deleteButton, styles.borderRight]}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.taskInput]}
          placeholder="Tarefa"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TextInput
          style={[styles.input, styles.dayInput]}
          placeholder="Dia para realizar a tarefa"
          value={day}
          onChangeText={(text) => setDay(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addButton}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#94b2e9',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  scrollContainer: {
    flexShrink: 1
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  header: {
    backgroundColor: '#f8f8f8'
  }, 
  cell: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: 'bold'
  },
  headerDay: {
    textAlign: 'center'
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  },
  deleteButton: {
    padding: 10,
  },
  buttonText: {
    color: '#ff5555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10
  },
  taskInput: {
    marginRight: 10
  },
  dayInput: {
    marginRight: 10
  },
  addButton: {
    backgroundColor: '#8be9fd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10
  }
});