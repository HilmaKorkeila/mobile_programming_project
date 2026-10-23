import { View, Text, Pressable, Alert } from 'react-native';
import { useActiveProject } from '../db/ActiveProjectContext';

import { globalStyles as gs } from '../styles/globalStyles';

// Components
import NavigationCard from '../components/NavigationCard';
import ProjectOverviewPanel from '../components/ProjectOverviewPanel';

export default function DashboardScreen({ route, navigation }) {
  const { activeProject, deleteProject } = useActiveProject();
  // Function for deleting a project from the database
  const handleDeleteProject = async () => {
    if (!activeProject?.id) return;
    // Delete active project
    await deleteProject(activeProject.id);
    // Return to the projects screen after deleting
    navigation.goBack();
  };

  const centsToEuros = (amount) => {
    return (amount / 100).toFixed(2) + ' €';
  };

  // Function for confirming project deletion
  const confirmDelete = () => {
    // Show confirmation dialog before deleting
    Alert.alert(
      'Remove project',
      'Are you sure you want to remove this project?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: handleDeleteProject,
        },
      ],
    );
  };

  return (
    <View style={gs.mainContainer}>
      {/* Small heading above the main title */}
      <Text style={gs.smallTitle}>{activeProject?.name}</Text>
      {/* Main title of the screen */}
      <Text style={gs.mainTitle}>Dashboard</Text>

      {/* Budget */}
      <NavigationCard
        title="Budget"
        description={centsToEuros(activeProject?.budget)}
        onPress={() => {
          navigation.navigate('Budget');
        }}
      />

      {/* Expenses */}
      <NavigationCard
        title="Expenses"
        description={centsToEuros(activeProject?.totalExpenses)}
        onPress={() => {
          navigation.navigate('Expenses');
        }}
      />

      {/* Tasks */}
      <NavigationCard
        title="Tasks"
        description={
          activeProject?.taskStats.total
            ? activeProject?.taskStats.completed +
              '/' +
              activeProject?.taskStats.total +
              ' completed'
            : 'No tasks'
        }
        onPress={() => {
          navigation.navigate('Tasks');
        }}
      />

      <ProjectOverviewPanel />

      {/* Button for removing the selected project */}
      <Pressable style={gs.buttonDanger} onPress={confirmDelete}>
        <Text style={gs.buttonTextDanger}>Remove project</Text>
      </Pressable>

      {/* Button going back to project list */}
      <Pressable
        style={gs.buttonSecondary}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={gs.buttonTextSecondary}>Back to projects</Text>
      </Pressable>
    </View>
  );
}
