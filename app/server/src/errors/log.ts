export const logError = (error: Error | unknown, context?: string) => {
  if (context) {
    console.error(`Error in ${ context }:`, error);
  } else {
    console.error("Error:", error);
  }
};
