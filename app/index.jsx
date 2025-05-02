import { Text, View, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'; // Adiciona o ícone de lixeira

import { data } from "@/data/todos";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Digite algo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.todoList}>
        {todos.map(todo => (
          <View key={todo.id} style={styles.todoItemContainer}>
            <Pressable 
              onPress={() => toggleTodo(todo.id)} 
              style={[
                styles.todoItem, 
                todo.completed && styles.todoItemCompleted
              ]}
            >
              <Text style={styles.todoText}>
                {todo.title}
              </Text>
            </Pressable>
            <Pressable onPress={() => removeTodo(todo.id)} style={styles.deleteButton}>
              <Feather name="trash-2" size={24} color="white" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    color: 'white',
  },
  addButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoList: {
    paddingTop: 10,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  todoItem: {
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 5,
    flex: 1,
  },
  todoItemCompleted: {
    backgroundColor: '#444',
    opacity: 0.6,
  },
  todoText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
});
