export function handleDateInputFormat(
  event: React.KeyboardEvent<HTMLInputElement>,
  fieldName: 'fechaInicio' | 'fechaFin',
  currentValue: string
): string {
  const input = event.currentTarget;
  const key = event.key;
  
  // Permitir teclas de control
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(key)) {
    return currentValue;
  }

  // Obtener el valor actual y el nuevo carácter
  const newValue = currentValue + key;

  // CA3: Si es fechaFin, permitir la palabra "Presente"
  if (fieldName === 'fechaFin') {
    const presenteMatch = newValue.toLowerCase().match(/presente/);
    if (presenteMatch) {
      return 'Presente';
    }
  }

  // CA3: Bloquear caracteres no-numéricos (excepto '/')
  if (!/^\d|\//.test(key)) {
    event.preventDefault();
    return currentValue;
  }

  // CA4: Prevenir si excede longitud máxima (7 para MM/AAAA)
  if (currentValue.length >= 7) {
    event.preventDefault();
    return currentValue;
  }

  // Auto-formatear a MM/AAAA
  let formattedValue = newValue;
  if (currentValue.length === 2 && /^\d$/.test(key)) {
    formattedValue = currentValue + '/' + key;
  }

  return formattedValue;
}

export function formatDateInput(value: string, fieldName: 'fechaInicio' | 'fechaFin'): string {
  if (!value) return '';

  // Si es Presente, retornar como está
  if (fieldName === 'fechaFin' && value.toLowerCase() === 'presente') {
    return 'Presente';
  }

  // Remover caracteres que no sean dígitos
  let digits = value.replace(/\D/g, '');

  // Limitar a 6 dígitos para MM/AAAA
  digits = digits.slice(0, 6);

  // Formatear a MM/AAAA
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return value;
}
