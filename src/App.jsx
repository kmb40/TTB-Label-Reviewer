import { useState, useCallback } from "react";

const COLORS = {
  bg: "#F8F7F4",
  navy: "#1B2A4A",
  amber: "#C8871A",
  pass: "#2D7A4F",
  fail: "#B83232",
  warn: "#8B6914",
  border: "#D4CFC8",
  surface: "#FFFFFF",
  muted: "#6B6560",
};

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: COLORS.bg,
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
    color: COLORS.navy,
  },
  header: {
    backgroundColor: COLORS.navy,
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  headerBadge: {
    backgroundColor: COLORS.amber,
    color: COLORS.navy,
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    padding: "3px 8px",
    borderRadius: "2px",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    margin: 0,
  },
  headerSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
    margin: 0,
    marginTop: "2px",
  },
  main: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "40px 24px",
  },
  uploadZone: {
    border: `2px dashed ${COLORS.border}`,
    borderRadius: "6px",
    backgroundColor: COLORS.surface,
    padding: "48px 32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.15s, background-color 0.15s",
  },
  uploadZoneActive: {
    borderColor: COLORS.amber,
    backgroundColor: "#FFFBF2",
  },
  uploadIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  uploadTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: COLORS.navy,
    margin: "0 0 6px 0",
  },
  uploadSub: {
    fontSize: "13px",
    color: COLORS.muted,
    margin: 0,
  },
  btn: {
    display: "inline-block",
    padding: "10px 24px",
    backgroundColor: COLORS.amber,
    color: COLORS.navy,
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.05em",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "16px",
  },
  btnSecondary: {
    backgroundColor: "transparent",
    color: COLORS.navy,
    border: `1px solid ${COLORS.border}`,
    fontWeight: "600",
  },
  previewSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "32px",
  },
  previewCard: {
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "6px",
    overflow: "hidden",
  },
  previewImg: {
    width: "100%",
    height: "280px",
    objectFit: "contain",
    backgroundColor: "#F0EEE9",
    display: "block",
  },
  previewMeta: {
    padding: "12px 16px",
    borderTop: `1px solid ${COLORS.border}`,
    fontSize: "12px",
    color: COLORS.muted,
    fontFamily: "'IBM Plex Mono', monospace",
  },
  resultsCard: {
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "6px",
    overflow: "hidden",
  },
  resultsHeader: {
    padding: "16px 20px",
    borderBottom: `1px solid ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultsTitle: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: 0,
    color: COLORS.navy,
  },
  verdictBadge: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    padding: "4px 10px",
    borderRadius: "2px",
  },
  fieldRow: {
    padding: "14px 20px",
    borderBottom: `1px solid ${COLORS.border}`,
    display: "grid",
    gridTemplateColumns: "160px 1fr 80px",
    gap: "12px",
    alignItems: "start",
  },
  fieldLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: COLORS.muted,
    paddingTop: "2px",
  },
  fieldValue: {
    fontSize: "13px",
    fontFamily: "'IBM Plex Mono', monospace",
    color: COLORS.navy,
    lineHeight: "1.5",
  },
  fieldStatus: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textAlign: "right",
    paddingTop: "2px",
  },
  fieldNote: {
    gridColumn: "2 / 4",
    fontSize: "11px",
    color: COLORS.muted,
    marginTop: "4px",
    lineHeight: "1.5",
  },
  summaryRow: {
    padding: "16px 20px",
    backgroundColor: "#F8F7F4",
    fontSize: "12px",
    color: COLORS.muted,
    lineHeight: "1.6",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
    gap: "16px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: `3px solid ${COLORS.border}`,
    borderTopColor: COLORS.amber,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: "13px",
    color: COLORS.muted,
  },
  batchList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "16px",
  },
  batchItem: {
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "4px",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  tabBar: {
    display: "flex",
    gap: "0",
    borderBottom: `1px solid ${COLORS.border}`,
    marginBottom: "24px",
  },
  tab: {
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: COLORS.muted,
    borderBottom: "2px solid transparent",
    transition: "color 0.15s",
  },
  tabActive: {
    color: COLORS.navy,
    borderBottomColor: COLORS.amber,
  },
  errorBox: {
    backgroundColor: "#FDF2F2",
    border: `1px solid #E8CACA`,
    borderRadius: "4px",
    padding: "16px",
    fontSize: "13px",
    color: COLORS.fail,
    marginTop: "16px",
  },
};

function StatusBadge({ status }) {
  const map = {
    PASS: { bg: "#EBF5EE", color: COLORS.pass, label: "PASS" },
    FAIL: { bg: "#FAEAEA", color: COLORS.fail, label: "FAIL" },
    WARN: { bg: "#FDF6E3", color: COLORS.warn, label: "REVIEW" },
    MISSING: { bg: "#FAEAEA", color: COLORS.fail, label: "MISSING" },
    "N/A": { bg: "#F0EEE9", color: COLORS.muted, label: "N/A" },
  };
  const s = map[status] || map["N/A"];
  return (
    <span
      style={{
        ...styles.fieldStatus,
        color: s.color,
        backgroundColor: s.bg,
        padding: "2px 8px",
        borderRadius: "2px",
        display: "inline-block",
      }}
    >
      {s.label}
    </span>
  );
}

function OverallBadge({ verdict }) {
  const pass = verdict === "APPROVED";
  return (
    <span
      style={{
        ...styles.verdictBadge,
        backgroundColor: pass ? "#EBF5EE" : "#FAEAEA",
        color: pass ? COLORS.pass : COLORS.fail,
      }}
    >
      {pass ? "✓ APPROVED" : "✗ REJECTED"}
    </span>
  );
}

async function analyzeLabel(base64Image, mediaType, filename) {
  const systemPrompt = `You are a TTB (Alcohol and Tobacco Tax and Trade Bureau) label compliance specialist. 
Analyze the provided alcohol beverage label image and extract all required fields, then assess compliance.

You MUST respond with ONLY valid JSON, no markdown, no explanation, just the JSON object.

Required JSON structure:
{
  "extracted": {
    "brandName": "extracted value or null",
    "classType": "extracted value or null", 
    "alcoholContent": "extracted value or null",
    "netContents": "extracted value or null",
    "bottlerInfo": "extracted value or null",
    "countryOfOrigin": "extracted value or null",
    "governmentWarning": "full extracted warning text or null"
  },
  "compliance": {
    "brandName": { "status": "PASS|FAIL|MISSING|WARN", "note": "brief note" },
    "classType": { "status": "PASS|FAIL|MISSING|WARN", "note": "brief note" },
    "alcoholContent": { "status": "PASS|FAIL|MISSING|WARN", "note": "brief note" },
    "netContents": { "status": "PASS|FAIL|MISSING|WARN", "note": "brief note" },
    "bottlerInfo": { "status": "PASS|FAIL|MISSING|WARN", "note": "brief note" },
    "countryOfOrigin": { "status": "PASS|FAIL|MISSING|WARN|N/A", "note": "brief note" },
    "governmentWarning": { "status": "PASS|FAIL|MISSING|WARN", "note": "brief note" }
  },
  "verdict": "APPROVED|REJECTED",
  "summary": "2-3 sentence plain English summary of findings",
  "imageQuality": "GOOD|POOR",
  "imageQualityNote": "note if image quality affected analysis or null"
}

Government Warning compliance rules (STRICT):
- Must begin with "GOVERNMENT WARNING:" in ALL CAPS and bold
- Must contain exact statutory text about (1) surgeon general warning about women/pregnancy/birth defects and (2) operating machinery/alcohol impairment
- Any deviation in capitalization, wording, or omission = FAIL
- If warning present but you cannot verify exact wording due to image quality = WARN

Verdict logic: REJECTED if ANY field is FAIL or MISSING. APPROVED only if all required fields PASS (N/A is acceptable for optional fields).`;

  const response = await fetch("http://localhost:3001/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 700,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64Image },
            },
            {
              type: "text",
              text: `Analyze this alcohol beverage label for TTB compliance. File: ${filename}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "API error");

  //console.log("Token usage:", data.usage); //used to track realtime token usage and costs during development
  const text = data.content[0]?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const MAX_PX = 1024;
    const QUALITY = 0.82;
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const { width, height } = img;
        let w = width;
        let h = height;
        if (w > MAX_PX || h > MAX_PX) {
          if (w > h) { h = Math.round((h / w) * MAX_PX); w = MAX_PX; }
          else { w = Math.round((w / h) * MAX_PX); h = MAX_PX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
        resolve(dataUrl.split(",")[1]);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const FIELD_LABELS = {
  brandName: "Brand Name",
  classType: "Class / Type",
  alcoholContent: "Alcohol Content",
  netContents: "Net Contents",
  bottlerInfo: "Bottler / Producer",
  countryOfOrigin: "Country of Origin",
  governmentWarning: "Gov't Warning",
};

function ResultsPanel({ result, filename }) {
  if (!result) return null;
  const fields = Object.keys(FIELD_LABELS);

  return (
    <div style={styles.resultsCard}>
      <div style={styles.resultsHeader}>
        <p style={styles.resultsTitle}>Compliance Review — {filename}</p>
        <OverallBadge verdict={result.verdict} />
      </div>

      {result.imageQuality === "POOR" && (
        <div style={{ padding: "10px 20px", backgroundColor: "#FDF6E3", borderBottom: `1px solid ${COLORS.border}`, fontSize: "12px", color: COLORS.warn }}>
          ⚠ {result.imageQualityNote || "Image quality may have affected analysis accuracy."}
        </div>
      )}

      {fields.map((key) => {
        const val = result.extracted[key];
        const comp = result.compliance[key];
        return (
          <div key={key} style={styles.fieldRow}>
            <span style={styles.fieldLabel}>{FIELD_LABELS[key]}</span>
            <span style={styles.fieldValue}>
              {val || <span style={{ color: COLORS.muted, fontStyle: "italic" }}>Not found</span>}
              {comp?.note && <div style={styles.fieldNote}>{comp.note}</div>}
            </span>
            <div style={{ textAlign: "right" }}>
              <StatusBadge status={comp?.status || "N/A"} />
            </div>
          </div>
        );
      })}

      <div style={styles.summaryRow}>{result.summary}</div>
    </div>
  );
}

function SingleMode() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(null);

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    setError(null);
    setElapsed(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  }, [handleFile]);

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const start = Date.now();
    try {
      const b64 = await fileToBase64(file);
      const res = await analyzeLabel(b64, "image/jpeg", file.name);
      // setElapsed(((Date.now() - start) / 1000).toFixed(1));
      const seconds = ((Date.now() - start) / 1000).toFixed(1);
      setElapsed(seconds);
      if (parseFloat(seconds) > 5) setError("Analysis took longer than 5 seconds. Try a clearer or smaller image for faster results.");
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setElapsed(null);
  };

  return (
    <div>
      {!file ? (
        <div
          style={{ ...styles.uploadZone, ...(dragOver ? styles.uploadZoneActive : {}) }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input").click()}
        >
          <div style={styles.uploadIcon}>🏷️</div>
          <p style={styles.uploadTitle}>Drop a label image here</p>
          <p style={styles.uploadSub}>or click to browse — JPG, PNG, WEBP supported</p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div>
          <div style={styles.previewSection}>
            <div style={styles.previewCard}>
              <img src={preview} alt="Label preview" style={styles.previewImg} />
              <div style={styles.previewMeta}>
                {file.name} · {(file.size / 1024).toFixed(0)} KB
                {elapsed && ` · analyzed in ${elapsed}s`}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {!result && !loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button style={styles.btn} onClick={analyze}>
                    Run Compliance Check
                  </button>
                  <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={reset}>
                    Choose Different Label
                  </button>
                </div>
              )}
              {loading && (
                <div style={styles.loading}>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <div style={styles.spinner} />
                  <p style={styles.loadingText}>Analyzing label...</p>
                </div>
              )}
              {result && (
                <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={reset}>
                  Check Another Label
                </button>
              )}
            </div>
          </div>

          {error && <div style={styles.errorBox}>Error: {error}</div>}

          {result && (
            <div style={{ marginTop: "24px" }}>
              <ResultsPanel result={result} filename={file.name} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BatchMode() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState({});
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleFiles = (fileList) => {
    const imgs = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    setFiles(imgs);
    setResults({});
  };

  const runBatch = async () => {
    setRunning(true);
    for (const file of files) {
      setCurrent(file.name);
      try {
        const b64 = await fileToBase64(file);
        const res = await analyzeLabel(b64, "image/jpeg", file.name);
        setResults((prev) => ({ ...prev, [file.name]: { status: "done", data: res } }));
      } catch (err) {
        setResults((prev) => ({ ...prev, [file.name]: { status: "error", error: err.message } }));
      }
    }
    setCurrent(null);
    setRunning(false);
  };

  const done = Object.keys(results).length;
  const approved = Object.values(results).filter((r) => r.data?.verdict === "APPROVED").length;
  const rejected = Object.values(results).filter((r) => r.data?.verdict === "REJECTED").length;

  return (
    <div>
      <div
        style={{ ...styles.uploadZone }}
        onClick={() => document.getElementById("batch-input").click()}
      >
        <div style={styles.uploadIcon}>📦</div>
        <p style={styles.uploadTitle}>Select multiple label images</p>
        <p style={styles.uploadSub}>Hold Ctrl/Cmd to select multiple files</p>
        <input
          id="batch-input"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", color: COLORS.muted }}>{files.length} labels selected</span>
            {done > 0 && (
              <span style={{ fontSize: "12px", color: COLORS.muted }}>
                {approved} approved · {rejected} rejected · {done - approved - rejected} errors
              </span>
            )}
            {!running && (
              <button style={styles.btn} onClick={runBatch}>
                {done > 0 ? "Re-run All" : `Run ${files.length} Labels`}
              </button>
            )}
            {running && (
              <span style={{ fontSize: "13px", color: COLORS.muted }}>
                Analyzing {current}...
              </span>
            )}
          </div>

          <div style={styles.batchList}>
            {files.map((f) => {
              const r = results[f.name];
              return (
                <div key={f.name} style={styles.batchItem}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>{f.name}</span>
                  {!r && current === f.name && (
                    <span style={{ fontSize: "12px", color: COLORS.amber }}>Analyzing...</span>
                  )}
                  {!r && current !== f.name && (
                    <span style={{ fontSize: "12px", color: COLORS.muted }}>Queued</span>
                  )}
                  {r?.status === "done" && <StatusBadge status={r.data.verdict === "APPROVED" ? "PASS" : "FAIL"} />}
                  {r?.status === "error" && <span style={{ fontSize: "12px", color: COLORS.fail }}>Error</span>}
                </div>
              );
            })}
          </div>

          {Object.entries(results).filter(([, r]) => r.status === "done").map(([name, r]) => (
            <div key={name} style={{ marginTop: "20px" }}>
              <ResultsPanel result={r.data} filename={name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("single");

  return (
    <div style={styles.app}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono&display=swap"
        rel="stylesheet"
      />
      <header style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p style={styles.headerTitle}>TTB Label Compliance Reviewer</p>
            <span style={styles.headerBadge}>PROTOTYPE</span>
          </div>
          <p style={styles.headerSub}>Alcohol and Tobacco Tax and Trade Bureau · AI-Assisted Review</p>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.tabBar}>
          <button
            style={{ ...styles.tab, ...(tab === "single" ? styles.tabActive : {}) }}
            onClick={() => setTab("single")}
          >
            Single Label
          </button>
          <button
            style={{ ...styles.tab, ...(tab === "batch" ? styles.tabActive : {}) }}
            onClick={() => setTab("batch")}
          >
            Batch Review
          </button>
        </div>

        {tab === "single" ? <SingleMode /> : <BatchMode />}
      </main>
    </div>
  );
}
