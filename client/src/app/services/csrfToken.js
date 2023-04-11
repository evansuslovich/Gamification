

export function saveCsrfToken(csrfTOKEN) {
  return window.CSRF_TOKEN = csrfTOKEN
    // <>
    //   <form action="/posts/create" method="POST">
    //     <input type="hidden" name="_csrf" value={csrfTOKEN} />
    //     Title : <input type="text" name="title" />
    //     Text : <input type="text" name="text" />
    //     <button type="submit">Submit</button>
    //   </form>
    // </>
  
}



