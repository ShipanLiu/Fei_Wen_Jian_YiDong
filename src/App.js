import React from 'react';
import AppButton from './components/AppButton';
import AppIcon from './components/AppIcon';

export default function App(props) {
  return (
    <>
      <AppButton title="button" onPress={() => alert('btn clicked')} />
      <AppIcon />
    </>
  );
}
