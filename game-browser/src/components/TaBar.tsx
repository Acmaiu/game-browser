type Tab = {
  id: number;
  title: string;
  url: string;
};

type TabBarProps = {
  tabs: Tab[];
  activeTabId: number;
  onSelect: (id: number) => void;
  onClose: (id: number) => void;
  onNewTab: () => void;
};

export default function TabBar({
  tabs,
  activeTabId,
  onSelect,
  onClose,
  onNewTab,
}: TabBarProps) {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTabId ? "active" : ""}`}
          onClick={() => onSelect(tab.id)}
        >
          <span>{tab.title || tab.url || "新しいタブ"}</span>

          <button
            type="button"
            aria-label="タブを閉じる"
            onClick={(event) => {
              event.stopPropagation();
              onClose(tab.id);
            }}
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        className="new-tab"
        onClick={onNewTab}
        aria-label="新しいタブ"
      >
        +
      </button>
    </div>
  );
}
