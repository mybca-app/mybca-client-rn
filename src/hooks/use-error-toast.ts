import { useToast } from 'heroui-native';
import { useCallback } from 'react';

export function useErrorToast() {
  const { toast } = useToast();

  const showErrorToast = useCallback(
    (title: string, description: string) => {
      toast.show({
        variant: 'danger',
        label: title,
        description: description,
        duration: 'persistent',
        placement: 'bottom',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
    [toast],
  );

  return { showErrorToast };
}
