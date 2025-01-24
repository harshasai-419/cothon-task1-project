import React from 'react'

const SelectContext = React.createContext({
  selectedTask:'dashboard',
  toggleTask: () => {},
})

export default SelectContext
