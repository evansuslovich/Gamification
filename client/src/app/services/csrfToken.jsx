import React from 'react';

export default function saveCsrfToken() {
  return (
    <>
      <form action="/posts/create" method="POST">
        <input type="hidden" name="_csrf" value="{{csrfToken}}" />
        Title : <input type="text" name="title" />
        Text : <input type="text" name="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}



