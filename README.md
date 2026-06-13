# TTB-Label-Reviewer

An AI-powered prototype for Alcohol and Tobacco Tax and Trade Bureau (TTB) alcohol beverage label compliance review.  

Built as a take-home assessment for the U.S. Department of the Treasury.

---

## What It Does

Upload an alcohol beverage label image. The app uses Claude's vision API to extract all TTB-required fields and assess compliance — returning a field-by-field verdict in under 5 seconds.

**Supported fields:**
- Brand Name
- Class / Type designation
- Alcohol Content (ABV)
- Net Contents
- Bottler / Producer name and address
- Country of Origin
- Government Health Warning Statement

**Verdict logic:** REJECTED if any required field is missing or fails compliance. APPROVED only when all required fields pass.

---

## Key Features

**Single label review** — drag-and-drop or browse to upload one label image. Results render as a structured compliance card modeled on the field-by-field checklist agents already use.

**Batch review** — select multiple images at once. Labels are queued and processed sequentially, with a running summary of approved vs. rejected counts.

**Government warning strict check** — the statutory warning is validated for exact wording, "GOVERNMENT WARNING:" in all caps, and presence of both required clauses (pregnancy/birth defects and impairment). Any deviation = FAIL.

**Image quality detection** — if lighting, angle, or glare degrades analysis confidence, the app flags it with a WARN status rather than a false PASS or FAIL.

**Response time display** — elapsed time shown per label, targeting the sub-5-second threshold identified as the adoption threshold by compliance staff.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React (JSX) | Component model maps cleanly to per-field compliance cards |
| AI / Vision | Claude Sonnet (`claude-sonnet-4-6`) via Anthropic API | Multimodal, fast, strong instruction-following for structured JSON output |
| Fonts | IBM Plex Sans + IBM Plex Mono | Federal-adjacent, high legibility across user tech comfort levels |
| Deployment | Vercel | Zero-config static deployment, public URL, free tier |

---

## Label Submission Guidelines
TTB-required fields are typically distributed across both the front and back label surfaces. Brand name, class/type designation, and alcohol content are commonly found on the front label. The government warning statement, net contents, and bottler information are commonly found on the back label.

This prototype analyzes whatever label surface is uploaded. For a complete compliance review, upload each label surface as a separate image. Batch mode supports this workflow, upload front and back labels together and review results for each.

Multi-surface review within a single upload is a known limitation of the current version and a candidate for a future enhancement.

---

## Architecture Decisions

**Structured JSON output from the model**

The system prompt instructs Claude to return only a strict JSON schema — no markdown, no preamble. The response is parsed directly into the compliance card UI. This eliminates fragile regex parsing and keeps the extraction and compliance logic in one pass.

**Single API call per label**

Field extraction and compliance assessment happen in one prompt. This keeps latency low and avoids chained calls that would push response time past the 5-second threshold.

**Verdict conservatism**

The verdict logic defaults to REJECTED on any MISSING or FAIL status. This mirrors the real-world stakes: a false approval is a worse outcome than sending a valid label back for resubmission.

**Batch processing is sequential, not parallel**

Labels are processed one at a time to stay within API rate limits and avoid overwhelming the UI with concurrent state updates. A production version could parallelize with a queue and worker model.

---

## Assumptions and Trade-offs

**No COLA system integration** — this is a standalone proof-of-concept per the assessment scope. The compliance rules are implemented directly in the model prompt based on TTB public guidelines.

**Government warning text is validated by the model, not hardcoded regex** — this handles real-world variation in label photography (partial occlusion, font rendering) better than exact string matching, at the cost of occasional model uncertainty flagged as WARN.

**Images are processed client-side and sent directly to the Anthropic API** — no server-side storage. For a production deployment with PII/document retention requirements, a backend intermediary with logging controls would be required.

**Batch mode does not export results** — a production version should support CSV or PDF export per agent workflow needs.

---

## Setup and Run

**Prerequisites**

- Node.js 18+
- Anthropic API key

**Install**

```bash
git clone https://github.com/your-username/ttb-label-reviewer
cd ttb-label-reviewer
npm install
```

**Configure**

Create a `.env` file in the project root:

```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

**Run locally**

```bash
npm run dev
```

Open `http://localhost:5173`

**Deploy to Vercel**

```bash
npm install -g vercel
vercel
```

Set `VITE_ANTHROPIC_API_KEY` as an environment variable in your Vercel project settings.

---

## Project Structure

```
/
├── src/
│   └── App.jsx          # Full application — single-file React component
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Tools Used

- React + Vite
- Anthropic Messages API (`claude-sonnet-4-6`)
- Vercel (deployment)
- IBM Plex font family (Google Fonts)

---

## Author

Kyle M. Brown
Solutions Architect | DevSecOps | Intelligent Automation
[kyle@kylembrown.com](mailto:kyle@kylembrown.com)