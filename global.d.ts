declare namespace NodeJS {
    interface Global {
      mongoose: {
        conn: any | null;
        promise: Promise<any> | null;
      };
    }
  }
  
  // Allow it on `globalThis`
  declare var global: NodeJS.Global;
  