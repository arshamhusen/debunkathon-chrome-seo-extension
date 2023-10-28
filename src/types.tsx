//  create a type for  DOMMessage, DOMMessageResponse

// Path: src/index.tsx

const rootElement = document.getElementById("root");

export interface DOMMessage {
  type: string;
  payload: any;
}

export interface DOMMessageResponse {
  title: string;
  type?: string;
  payload?: any;
  headlines: any;
  image: any;
}

// Path: src/index.tsx
