import React, { useState } from 'react';
import { View } from './types';
import { Layout } from './components/Layout';
import { ChatView } from './components/ChatView';
import { ImageView } from './components/ImageView';
import { SearchView } from './components/SearchView';
import { LiveView } from './components/LiveView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.CHAT);

  const renderView = () => {
    switch (activeView) {
      case View.CHAT:
        return <ChatView />;
      case View.IMAGE:
        return <ImageView />;
      case View.SEARCH:
        return <SearchView />;
      case View.LIVE:
        return <LiveView />;
      default:
        return <ChatView />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;


