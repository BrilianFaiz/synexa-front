import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewPrimaryStyles } from '@/src/components/pagesTemplate/ViewPrimaryStyle';

export const GradientContainer = ({ children }: { children: React.ReactNode }) => (
  <LinearGradient
    colors={['#add8e6', '#ffffff']}
    style={StyleSheet.absoluteFill}
  >
    <View style={ViewPrimaryStyles.container}>
      {children}
    </View>
  </LinearGradient>
);