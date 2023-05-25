import { useEffect, useState } from 'react';

const MolecularViewer = () => {

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
  
    fetch('/molViewer.html')
      .then(response => response.text())
      .then(html => {
        // Reemplazar el contenido {{mol2Content}} con el contenido del archivo mol2
        const mol2Content = `http://34.125.67.36:8000/media/file.mol2`;
        const htmlContent = html.replace('http://34.125.67.36:8000/media/file.mol2', mol2Content);
        setHtmlContent(htmlContent);
      });
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MolecularViewer;
