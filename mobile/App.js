import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Providers. After 3 or more total provider components, provider wrapper component could be used
// Check "react provider hell"
import { DatabaseProvider } from './db/DatabaseProvider';
import { ActiveProjectProvider } from './db/ActiveProjectContext';

// Screens
import ProjectsScreen from './screens/ProjectsScreen';
import DashboardScreen from './screens/DashboardScreen';
import BudgetScreen from './screens/BudgetScreen';
import TasksScreen from './screens/TasksScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // DatabaseProvider migrates local database before rendering anything else
    <DatabaseProvider>
      <ActiveProjectProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Projects"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Projects" component={ProjectsScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Budget" component={BudgetScreen} />
            <Stack.Screen name="Tasks" component={TasksScreen} />
          </Stack.Navigator>
        </NavigationContainer>

        <StatusBar style="auto" />
      </ActiveProjectProvider>
    </DatabaseProvider>
  );
}
