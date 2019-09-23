  export interface center {
    INPUT: {
        id: 'Text'
        label: 'Text'
        maxLength: 'Number'
        placeholder: 'Text'
        required: 'Boolean'
}

    EMAIL: {
        id: 'Text'
        label: 'Text'
        maxLength: 'Number'
        placeholder: 'Text'
        validators: {
            required: 'Boolean'
        }}
      CHECKBOX :{
          id: 'Text'
          label: 'Text'
          required: 'Boolean'
      }
      RADIO_GROUP: {
          id: 'Text'
          label: 'Text'
          options:
              [{
                  label: 'Text',
                  value: 'Text'
              }]
          required: 'Boolean'
      }

    CHECKBOX_GROUP: {
          id: 'Text'
          label: 'Text'
          options:
              [{
                  id: 'Text',
                  label: 'Text'
              }]
          required: 'Boolean'
      }

      SLIDER: {
          id: 'Text'
          min: 'Number'
          max: 'Number'
          vertical: 'Boolean'
          required: 'Boolean'
      }

     TEXTAREA: {
          id: 'Text'
          label: 'Text'
          required: 'Boolean'
      }

    SELECT: {
          id: 'Text'
          label: 'Text'
          options:
              [{
                  label: 'Text',
                  value: 'Text'
              }]
          required: 'Boolean'
      
    }}
