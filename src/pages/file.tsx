import { CONFIG } from 'src/config-global';

import { FileView } from 'src/sections/file/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`File - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="File management and storage overview"
      />
      <meta name="keywords" content="file,storage,upload,folder" />

      <FileView />
    </>
  );
}
