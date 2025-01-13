import gql from 'graphql-tag'

export const UPDATE_SETTING = gql`
  mutation UpdateSetting($name: String!, $value: Boolean!) {
    updateSetting(updateSettingInput: { name: $name, value: $value }) {
      id
      name
      value
      __typename
    }
  }
`
