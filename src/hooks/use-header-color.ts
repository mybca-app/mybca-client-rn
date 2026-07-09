import { Platform } from 'react-native';
import { useColorScheme } from './use-color-scheme';

export function useHeaderColor(): { background: string; foreground: string } {
  const scheme = useColorScheme();

  return {
    background:
      Platform.OS === 'ios'
        ? 'transparent'
        : scheme === 'dark'
          ? 'rgb(10, 16, 29)'
          : 'rgb(255 254 240)',
    foreground: scheme === 'dark' ? '#fff' : '#000',
  };
}
