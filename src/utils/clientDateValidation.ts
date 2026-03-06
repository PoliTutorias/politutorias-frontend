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

export function clientValidarFecha(
  dateString: string,
  fieldName: 'fechaInicio' | 'fechaFin'
): { isValid: boolean; message?: string } {
  // Si el campo está vacío, no validar
  if (!dateString.trim()) {
    return { isValid: true };
  }

  // CA2: Si es fechaFin y es "Presente", es válido
  if (fieldName === 'fechaFin' && dateString.toLowerCase() === 'presente') {
    return { isValid: true };
  }

  // CA4: Validar longitud máxima (7 caracteres para MM/AAAA)
  if (dateString.length > 7) {
    return { isValid: false, message: 'Máximo 7 caracteres' };
  }

  // CA2: Validar formato MM/AAAA
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegex.test(dateString)) {
    return { isValid: false, message: 'Formato: MM/AAAA' };
  }

  // Extraer mes y año
  const [monthStr, yearStr] = dateString.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Validar rango de mes (01-12)
  if (month < 1 || month > 12) {
    return { isValid: false, message: 'Mes inválido (01-12)' };
  }

  // Validar año razonable (no demasiado lejano)
  const currentYear = new Date().getFullYear();
  if (year < 1950 || year > currentYear + 10) {
    return { isValid: false, message: 'Año inválido' };
  }

  return { isValid: true };
}
