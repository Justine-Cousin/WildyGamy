// Declare global namespace for Express
declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Extend Express Request with custom properties
      user?: IUser;
      /* ************************************************************************* */
    }
  }
}

// This export makes the file a module
export {};
