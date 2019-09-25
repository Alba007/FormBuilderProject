export interface Event {
  type: string;
  payload?: any;
  formData?: any;
}

export interface NewForm {
  id: string;
  name: string;
  description: string;
}
