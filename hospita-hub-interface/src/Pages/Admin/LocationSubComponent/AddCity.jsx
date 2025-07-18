import React from 'react'

export default function AddCity() {
  return (
    <div>
      <form>
        <label>City:</label>
        <input type="text" name="city" />
        <label>State ID:</label>
        <input type="text" name="state" />
        <button type="submit">Add City</button>
      </form>
    </div>
  )
}
