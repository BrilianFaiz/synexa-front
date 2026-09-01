import { View, TextInput } from 'react-native';
import { SecondaryButton } from '@/components/buttons';
import { GradientContainer } from '@/components/pages/GradientContainer';
import { FormWrapper } from '@/components/pages/FormWrapper';
import { typography } from '@/src/theme/typography';

export const Login = () => {
  const handleLogin = () => console.log('Login');

  return (
    <GradientContainer>
      <FormWrapper>
        <TextInput placeholder="Username" style={typography.input} />
        <TextInput placeholder="Password" secureTextEntry style={typography.input} />
        <SecondaryButton onPress={handleLogin} title="Sudah Punya Akun? Login" />
      </FormWrapper>
    </GradientContainer>
  );
};
