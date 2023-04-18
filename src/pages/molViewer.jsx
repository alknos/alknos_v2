import { useEffect, useState } from 'react'
import Parser from 'html-react-parser'

export default function MolViewer() {
  const [html, setHtml] = useState('')

  useEffect(() => {
    fetch('/molViewer.html')
      .then((response) => response.text())
      .then((data) => setHtml(data))
  }, [])

  return ( <div>{Parser(html) }</div> )
}

