import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadCode } from '../handler/craftBenchHandler';

function PreviewPage() {
  const { craftId } = useParams();
  const [htmlContent, setHtmlContent] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (craftId) {
      downloadCode(craftId).then((res) => {
        if (typeof res === 'string') setHtmlContent(res);
        else
          setIsError(true);
      });
    }
  }, [craftId]);

  if (!craftId) {
    return <div className="text-center text-red-500">Craft ID is missing</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">You don't have permission to view this folio</div>;
  }

  return (
    <div className="w-full h-screen">
      {htmlContent ? (
        <iframe
          srcDoc={htmlContent}
          title="Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className='animate-pulse text-3xl'>Loading your folio...</p>
        </div>
      )}
    </div>
  );
}

export default PreviewPage;
