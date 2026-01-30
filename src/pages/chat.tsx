import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ChatView } from 'src/sections/chat/view';

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Helmet>
        <title> {`Chat - ${CONFIG.appName}`}</title>
      </Helmet>

      <ChatView />
    </>
  );
}
