import { useState } from "react";
import BrowserToolbar from "./components/BrowserToolbar";
import TabBar from "./components/TabBar";
import "./style.css";

type Tab = {
  id: number;
  title: string;
  url: string;
};

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: "新しいタブ", url: "" },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs((current) =>
      current.map((tab) =>
        tab.id === activeTabId ? { ...tab, ...updates } : tab
      )
    );
  };

  const navigate = (url: string) => {
    updateActiveTab({ url, title: url });
  };

  const newTab = () => {
    const id = Math.max(0, ...tabs.map((tab) => tab.id)) + 1;
    setTabs((current) => [
      ...current,
      { id, title: "新しいタブ", url: "" },
    ]);
    setActiveTabId(id);
  };

  const closeTab = (id: number) => {
    if (tabs.length === 1) {
      setTabs([{ id: 1, title: "新しいタブ", url: "" }]);
      setActiveTabId(1);
      return;
    }

    const remaining = tabs.filter((tab) => tab.id !== id);
    setTabs(remaining);

    if (activeTabId === id) {
      setActiveTabId(remaining[0].id);
    }
  };

  return (
    <main className="browser">
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelect={setActiveTabId}
        onClose={closeTab}
        onNewTab={newTab}
      />

      <BrowserToolbar
        onNavigate={navigate}
        onBack={() => window.history.back()}
        onForward={() => window.history.forward()}
        onReload={() => window.location.reload()}
      />

      <section className="browser-content">
        {activeTab?.url ? (
          <div className="page-placeholder">
            <h2>Game Browser</h2>
            <p>URL: {activeTab.url}</p>
            <p>ページ表示機能はまだ未実装です。</p>
          </div>
        ) : (
          <div className="new-tab-page">
            <h1>Game Browser</h1>
            <p>ゲーム用ブラウザへようこそ</p>
          </div>
        )}
      </section>
    </main>
  );
}
