import { useState } from "react";

type BrowserToolbarProps = {
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
};

export default function BrowserToolbar({
  onNavigate,
  onBack,
  onForward,
  onReload,
}: BrowserToolbarProps) {
  const [url, setUrl] = useState("");

  const navigate = () => {
    const input = url.trim();
    if (!input) return;

    const formattedUrl = /^https?:\/\//i.test(input)
      ? input
      : `https://${input}`;

    onNavigate(formattedUrl);
  };

  return (
    <div className="browser-toolbar">
      <button onClick={onBack} aria-label="戻る">
        ←
      </button>

      <button onClick={onForward} aria-label="進む">
        →
      </button>

      <button onClick={onReload} aria-label="再読み込み">
        ↻
      </button>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate();
        }}
      >
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="URLを入力"
          aria-label="URL"
        />
      </form>
    </div>
  );
}
