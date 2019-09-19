let model = {
  input: {
    id: String,
    label: String,
    maxLength: Number,
    placeholder: String
  },
  checkbox:
  {
    id: String,
    label: String,
  },
  Radiobutton: {
    id: String,
    label: String,

    options:
    {
      label: String,
      value: String,
      multiple: true

    }
  },
  checkboxGroup: {
    id: String,
    label: String,
    options:
    {
      label: String,
      value: String,
      multiple: true

    }
  },
  slider: {
    id: String,
    min: Number,
    max: Number,
    vertical: Boolean

  },
  textarea: {
    id: String,
    label: String
  }

}
