import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/src/components/buttons/ButtonPrimary/ButtonPrimary';
import SecondaryButton from '@/src/components/buttons/SecondaryButton/ButtonSecondary';
import { ViewPrimaryStyles } from '@/src/components/pagesTemplate/ViewPrimaryStyle';
import { GradientContainer } from '@/src/components/pagesTemplate/GradientContainer';
import Login from '@/src/app/pages/login';

export default function HomeScreen() {
  const router = useRouter();
  
  const styles = StyleSheet.create({
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    }
    

  })

  return (
    
    <GradientContainer>
      
        <Text style={styles.title}>Monitor Pasien Pasca-Stroke</Text>
        
        <Login />
    

    </GradientContainer>
  );
}