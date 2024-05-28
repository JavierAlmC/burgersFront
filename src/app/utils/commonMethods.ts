/*
*   Common methods between components
*/
export function renderErrors(error: any): { [key: string]: string } {
  const errorMessages: { [key: string]: string } = {};
  for (const key in error.error) {
    if (error.error.hasOwnProperty(key)) {
      errorMessages[key] = error.error[key];
    }
  }
  return errorMessages;
}

