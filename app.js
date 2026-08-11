'use strict';

// ══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'aimtria_os_v1';

// ══════════════════════════════════════════════════════════════════════════════
// INITIAL DATA  — shown on first load, then overridden by localStorage
// ══════════════════════════════════════════════════════════════════════════════

const INITIAL_DATA = {
    settings: { userName: 'Your Name', niche: 'Intelligent Operations & Continuous Improvement Platform', initials: 'AI' },

    leads: [
        { id: 'L001', name: 'Sarah Mitchell',  email: 'smitchell@apexmfg.com',    company: 'Apex Manufacturing',    source: 'LinkedIn',   status: 'Qualified',   score: 8,  value: 45000, addedAt: '2026-07-12', lastContact: '2026-07-28', notes: 'Director of CI at 3-plant automotive parts manufacturer. Struggling with inconsistent shift performance and zero cross-site visibility. Decision maker.' },
        { id: 'L002', name: 'James Okafor',    email: 'jokafor@fastfreight.com',   company: 'FastFreight Logistics', source: 'Referral',   status: 'Proposal',    score: 9,  value: 72000, addedAt: '2026-07-18', lastContact: '2026-08-04', notes: 'VP Operations at 5-warehouse 3PL. Managing all CI in spreadsheets. Very interested in the Detect → Sustain closed loop. Strong fit.' },
        { id: 'L003', name: 'Elena Chen',      email: 'echen@nutripak.com',        company: 'NutriPak Foods',        source: 'Cold Email', status: 'Contacted',   score: 6,  value: 38000, addedAt: '2026-07-22', lastContact: '2026-07-25', notes: 'COO at food processing company. Responded to cold email. Interested in WMS integration and HACCP compliance tracking.' },
        { id: 'L004', name: 'Robert Walsh',    email: 'rwalsh@steelcore.com',      company: 'SteelCore Industries',  source: 'LinkedIn',   status: 'New',         score: 7,  value: 55000, addedAt: '2026-08-02', lastContact: null,         notes: 'Plant Manager at heavy manufacturer. Connected on LinkedIn after post on OEE visibility. No outreach yet.' },
        { id: 'L005', name: 'Maria Santos',    email: 'msantos@meddistribute.com', company: 'MedDistribute',         source: 'Website',    status: 'New',         score: 6,  value: 62000, addedAt: '2026-08-05', lastContact: null,         notes: 'Supply Chain Director at pharma distributor. Submitted demo request form. Wants to see AIMTRIA handle DMAIC workflows.' },
        { id: 'L006', name: 'Karen Brooks',    email: 'kbrooks@freshflow.com',     company: 'FreshFlow Produce',     source: 'Referral',   status: 'Contacted',   score: 7,  value: 48000, addedAt: '2026-07-30', lastContact: '2026-08-06', notes: 'VP Manufacturing at perishables distributor. Referred by James Okafor. Exploring CI platform for cold chain operations.' },
        { id: 'L007', name: 'Thomas Nguyen',   email: 'tnguyen@packfirst.com',     company: 'PackFirst Packaging',   source: 'Cold Email', status: 'New',         score: 5,  value: 33000, addedAt: '2026-08-07', lastContact: null,         notes: 'CI Director at packaging manufacturer. Received cold email. No reply yet.' },
        { id: 'L008', name: 'David Park',      email: 'dpark@globalpartsauto.com', company: 'GlobalParts Auto',      source: 'LinkedIn',   status: 'Qualified',   score: 8,  value: 41000, addedAt: '2026-07-15', lastContact: '2026-08-01', notes: 'Operations Excellence Manager at automotive OEM supplier. Wants to move off paper A3 forms to a digital closed-loop system.' },
    ],

    deals: [
        { id: 'D001', leadId: 'L002', name: 'FastFreight Logistics — Platform Pilot',   value: 18000, stage: 'Proposal',    probability: 70, createdAt: '2026-07-18' },
        { id: 'D002', leadId: 'L001', name: 'Apex Manufacturing — CI Platform License', value: 45000, stage: 'Negotiating', probability: 55, createdAt: '2026-07-12' },
        { id: 'D003', leadId: 'L008', name: 'GlobalParts Auto — Discovery Pilot',       value: 12000, stage: 'Proposal',    probability: 50, createdAt: '2026-07-15' },
        { id: 'D004', leadId: 'L006', name: 'FreshFlow Produce — Demo & Scoping',       value: 48000, stage: 'Contacted',   probability: 30, createdAt: '2026-07-30' },
        { id: 'D005', leadId: 'L003', name: 'NutriPak Foods — Initial Discovery',       value: 38000, stage: 'Contacted',   probability: 25, createdAt: '2026-07-22' },
        { id: 'D006', leadId: 'L005', name: 'MedDistribute — Inbound Demo Request',     value: 62000, stage: 'New',         probability: 15, createdAt: '2026-08-05' },
    ],

    revenue: {
        months:  ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        monthly: [0, 0, 0, 0, 8000, 15000],
        bySource: { LinkedIn: 12000, Referral: 8000, 'Cold Email': 3000, Website: 0 },
    },

    content: [
        { id: 'C001', type: 'LinkedIn Post',  topic: 'The hidden cost of undetected operational gaps', body: 'Most operations leaders don\'t have a visibility problem.\n\nThey have a closed-loop problem.\n\nThey see the gap. They start an improvement project. They get distracted.\n\n3 months later, the problem is back — and no one knows why.\n\nThe real cost isn\'t the initial performance drop. It\'s the regression.\n\nAt AIMTRIA, we call it the "improvement decay curve" — and we\'ve seen it cost manufacturers 8–15% of operational efficiency every year.\n\nThe fix isn\'t more meetings or better spreadsheets.\n\nIt\'s a closed-loop system:\n\nDetect → Analyze → Prioritize → Act → Verify → Sustain.\n\nWhat does your current CI process actually look like when you\'re honest about it? 👇', status: 'Published', createdAt: '2026-07-28' },
        { id: 'C002', type: 'Cold Email',     topic: 'Ops Director outreach — warehouse productivity',  body: 'Subject: Productivity gap at {{Company}}\n\nHi {{First Name}},\n\nI noticed {{Company}} has been scaling its operations — congrats on the growth.\n\nI\'m reaching out because operations leaders at similar companies tell me the same thing: as you scale, improvement projects scatter across spreadsheets, emails, and meetings — and results don\'t stick.\n\nAIMTRIA fixes that. We connect to your existing systems (ERP, WMS, HR), detect performance gaps automatically, and manage the full improvement cycle — from root cause to verified result — in one place.\n\nWould a 20-minute call make sense?\n\n{{Your Name}}\nAIMTRIA Systems', status: 'Published', createdAt: '2026-08-01' },
        { id: 'C003', type: 'Follow-up Email', topic: 'CI platform demo follow-up',                     body: 'Subject: Still thinking about the CI platform?\n\nHi {{First Name}},\n\nJust circling back — no pressure at all.\n\nI know evaluating a new operational platform isn\'t a small decision, especially when the team is already stretched.\n\nIf it helps: we offer a scoped 8-week pilot on one site with your real data — no long-term commitment required. You see AIMTRIA working in your environment before anything else.\n\nLet me know if that\'s worth a look.\n\n{{Your Name}}\nAIMTRIA Systems', status: 'Draft', createdAt: '2026-08-05' },
    ],

    agentLog: [
        { agent: 'Lead Generation',   action: 'Found 3 new Operations Director prospects from LinkedIn',           timestamp: '2026-08-09T14:32:00Z' },
        { agent: 'Content Creator',   action: 'Generated LinkedIn post: "The hidden cost of undetected operational gaps"', timestamp: '2026-08-08T10:15:00Z' },
        { agent: 'Sales & Follow-up', action: 'Queued 2 follow-up emails for stale demo requests',                timestamp: '2026-08-07T09:00:00Z' },
        { agent: 'Analytics',         action: 'Generated pipeline insights and lead source breakdown',             timestamp: '2026-08-06T16:45:00Z' },
    ],

    followUpQueue: [],
    insights: [],
};

// ══════════════════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════════════════

let state = {};

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    state = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_DATA));
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ══════════════════════════════════════════════════════════════════════════════
// LEAD POOL  — the agent picks from this list when "finding" new leads
// ══════════════════════════════════════════════════════════════════════════════

const LEAD_POOL = [
    { name: 'Frank Osei',       email: 'fosei@stellarpack.com',     company: 'StellarPack',         source: 'LinkedIn',   value: 48000 },
    { name: 'Diane Kozlowski',  email: 'dkoz@midwestfab.com',       company: 'Midwest Fabrication', source: 'Referral',   value: 65000 },
    { name: 'Marcus Reid',      email: 'm.reid@logixchain.io',       company: 'LogixChain',          source: 'LinkedIn',   value: 38000 },
    { name: 'Nadia Petersen',   email: 'npetersen@arcticsupply.no',  company: 'Arctic Supply Co',    source: 'Cold Email', value: 72000 },
    { name: 'Carlos Medina',    email: 'cmedina@precisionauto.mx',   company: 'Precision Auto MX',   source: 'LinkedIn',   value: 55000 },
    { name: 'Helen Burke',      email: 'hburke@freshlogic.ie',       company: 'FreshLogic',          source: 'Referral',   value: 42000 },
    { name: 'Sanjay Patel',     email: 'spatel@induspharma.in',      company: 'Indus Pharma',        source: 'Website',    value: 85000 },
    { name: 'Rachel Dumas',     email: 'rdumas@euroflex.fr',         company: 'EuroFlex Ops',        source: 'LinkedIn',   value: 60000 },
    { name: 'Paul Thornton',    email: 'pthornton@thorntonmill.com', company: 'Thornton Mill',       source: 'Cold Email', value: 34000 },
    { name: 'Amara Diallo',     email: 'adiallo@westafrica3pl.com',  company: 'WestAfrica 3PL',      source: 'Referral',   value: 47000 },
    { name: 'Jin-Ho Bae',       email: 'jbae@korealogis.kr',         company: 'KoreaLogis',          source: 'LinkedIn',   value: 92000 },
    { name: 'Ingrid Larsson',   email: 'ilarsson@nordicops.se',      company: 'NordicOps',           source: 'Cold Email', value: 58000 },
    { name: 'Derek Munroe',     email: 'dmunroe@crestpack.ca',       company: 'CrestPack Canada',    source: 'LinkedIn',   value: 44000 },
    { name: 'Fatima Al-Rashid', email: 'falrashid@gulfchain.ae',     company: 'GulfChain',           source: 'Website',    value: 110000 },
    { name: 'Boris Novak',      email: 'bnovak@centralwms.cz',       company: 'CentralWMS',          source: 'Referral',   value: 51000 },
];

// ══════════════════════════════════════════════════════════════════════════════
// CONTENT TEMPLATES — picked randomly when the Content Agent generates content
// ══════════════════════════════════════════════════════════════════════════════

const CONTENT_TEMPLATES = {
    'LinkedIn Post': [
        (topic) =>
`Here's the CI problem no one talks about:

Operations teams detect the problem.
They assign it. They meet about it.

Then life happens.

The improvement stalls. The spreadsheet gets archived. The problem comes back.

This is the "improvement decay curve" — and it silently costs manufacturers 8–15% of operational efficiency every year.

${topic} is a perfect example of it.

The root cause is almost never the original process gap.

It's the absence of a closed-loop system that takes you from detection all the way to sustained results.

Detect → Analyze → Prioritize → Act → Verify → Sustain.

Most organizations only execute the first two steps consistently.

If your CI projects live in spreadsheets, inboxes, and meeting notes — this is for you.

What does your current improvement follow-through actually look like? Be honest 👇`,

        (topic) =>
`A warehouse I visited recently had 140 open Kaizen initiatives.

14 had been completed in the past 12 months.

The problem wasn't effort. It wasn't buy-in. It wasn't even resources.

The problem was visibility.

Nobody could answer: "Is this improvement working? Did we verify the result? Is it holding?"

${topic} is a signal — not just a performance metric.

When you can't verify whether your last improvement held, you're not doing continuous improvement.

You're doing continuous reacting.

The operations leaders who consistently outperform their competitors build systems that verify and sustain results automatically.

That's the gap AIMTRIA was built to close.

What percentage of your improvement projects actually get verified and sustained? 👇`,

        (topic) =>
`The most dangerous number in operations isn't on your P&L.

It's the performance gap you haven't detected yet.

${topic} doesn't announce itself. It shows up slowly — in shift handover notes, in overtime creep, in quality complaints.

By the time it's visible to leadership, it's been bleeding for weeks.

The organizations that consistently outperform their peers have one thing in common: they find these gaps before they escalate.

Not because they're smarter. Because they've built a system that monitors, alerts, and acts — continuously.

Detect early. Analyze fast. Act with ownership. Verify the result. Sustain the gain.

That's the AIMTRIA model — and it changes what operations leadership looks like.

What gap in your operation would you most want to detect earlier? 👇`,
    ],

    'Cold Email': [
        (topic) =>
`Subject: ${topic} — quick question for {{Company}}

Hi {{First Name}},

I noticed {{Company}} has been scaling its operations — congrats on the momentum.

I'm reaching out because operations leaders at similar companies describe the same challenge: as you grow, improvement projects scatter across spreadsheets, emails, and meetings — and results don't stick.

AIMTRIA fixes that. We connect to your existing systems (ERP, WMS, HR), automatically detect performance gaps, and manage the full improvement cycle — from root cause to verified result — in one place.

Would a 20-minute call make sense to see if we could help {{Company}}?

{{Your Name}}
AIMTRIA Systems`,

        (topic) =>
`Subject: CI visibility question for {{Company}}

Hi {{First Name}},

Quick question: if productivity dropped in one of your facilities today, how long would it take your team to detect it, identify the root cause, and assign a corrective action?

For most operations teams, the honest answer is "days — maybe weeks."

AIMTRIA cuts that to hours. We connect to your existing systems, continuously monitor performance, and surface gaps with likely root causes and recommended countermeasures (Lean, DMAIC, A3) — before they escalate.

Worth a 20-minute look?

{{Your Name}}
AIMTRIA Systems`,
    ],

    'Follow-up Email': [
        (topic) =>
`Subject: Re: ${topic}

Hi {{First Name}},

Just following up — I know evaluating a new platform is not a small decision, especially when the team is already stretched.

If it helps: we offer an 8-week scoped pilot on one site with your real operational data — no long-term commitment required. You see AIMTRIA working in your environment before anything else.

Let me know if that's worth exploring.

{{Your Name}}
AIMTRIA Systems`,

        (topic) =>
`Subject: Thought of you, {{First Name}}

Hi {{First Name}},

Came across something relevant to ${topic} at {{Company}} and wanted to share — no agenda.

[Insert: relevant case study or industry benchmark on this topic]

Hope it's useful. Happy to reconnect whenever the timing is right.

{{Your Name}}
AIMTRIA Systems`,

        (topic) =>
`Subject: Last note from me, {{First Name}}

Hi {{First Name}},

I don't want to overstay my welcome, so this will be my last message for now.

If operational visibility or CI management becomes a priority at {{Company}}, I'd love to reconnect — the door's always open.

Wishing you and the team all the best.

{{Your Name}}
AIMTRIA Systems`,
    ],

    'Proposal Intro': [
        (topic) =>
`PROPOSAL: AIMTRIA Platform Engagement
Prepared for {{Company}}  |  ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

────────────────────────────────────
EXECUTIVE SUMMARY
────────────────────────────────────

This proposal outlines a scoped 8-week pilot to deploy AIMTRIA at {{Company}} and demonstrate measurable impact on ${topic}.

Based on our discovery conversation, the core operational challenges are:
• [Challenge 1 — e.g. no cross-site visibility into productivity gaps]
• [Challenge 2 — e.g. improvement projects managed in spreadsheets with no verification]
• [Challenge 3 — e.g. performance regression after initial fixes]

AIMTRIA's closed-loop cycle — Detect → Analyze → Prioritize → Act → Verify → Sustain — is designed to solve all three.

────────────────────────────────────
WHAT YOU WILL GET
────────────────────────────────────

✓ AIMTRIA platform access (1 site, up to 3 system integrations)
✓ Connection to your existing data sources (ERP / WMS / spreadsheets)
✓ Automated performance monitoring and gap detection
✓ Root cause analysis and countermeasure recommendation engine
✓ Action plan management with ownership, milestones, and due dates
✓ Result verification against original baseline
✓ Weekly review sessions with the AIMTRIA team
✓ Full pilot report and ROI analysis at week 8

────────────────────────────────────
INVESTMENT
────────────────────────────────────

Pilot engagement: $[X] (8 weeks, 1 site)
Annual platform license (post-pilot): $[Y]/year per site

────────────────────────────────────
NEXT STEPS
────────────────────────────────────

1. Confirm pilot site and integration scope
2. Sign pilot agreement and submit first invoice
3. Technical kickoff call — begin data integration this week

Ready to start? Reply "go" and we'll kick things off immediately.`,
    ],
};

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════

function uid() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function fmt(n) {
    return '$' + Number(n).toLocaleString();
}

function timeAgo(isoString) {
    if (!isoString) return 'Never';
    const diff = Date.now() - new Date(isoString).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(h / 24);
    if (d > 1) return `${d}d ago`;
    if (d === 1) return 'Yesterday';
    if (h > 0) return `${h}h ago`;
    return 'Just now';
}

function statusBadge(status) {
    const map = {
        'New':         'badge-blue',
        'Contacted':   'badge-amber',
        'Qualified':   'badge-purple',
        'Proposal':    'badge-amber',
        'Negotiating': 'badge-amber',
        'Closed Won':  'badge-green',
        'Closed Lost': 'badge-red',
        'Unqualified': 'badge-grey',
        'Published':   'badge-green',
        'Draft':       'badge-grey',
    };
    return `<span class="badge ${map[status] || 'badge-grey'}">${status}</span>`;
}

function scoreFillClass(score) {
    if (score >= 8) return 'high';
    if (score >= 5) return 'mid';
    return 'low';
}

function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3500);
}

function setDot(agent, state) {
    const map = { leads: 'dot-leads', sales: 'dot-sales', content: 'dot-content', analytics: 'dot-analytics' };
    const el = document.getElementById(map[agent]);
    if (!el) return;
    el.className = 'dot' + (state === 'running' ? ' running' : '');
}

function logActivity(agent, action) {
    state.agentLog.unshift({ agent, action, timestamp: new Date().toISOString() });
    if (state.agentLog.length > 20) state.agentLog.pop();
}

// ══════════════════════════════════════════════════════════════════════════════
// CLAUDE API HELPER
// ══════════════════════════════════════════════════════════════════════════════

async function callClaude(userPrompt) {
    const apiKey = state.settings.claudeApiKey;
    if (!apiKey) return null;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            messages: [{ role: 'user', content: userPrompt }],
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    return data.content[0]?.text || '';
}

// ══════════════════════════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════════════════════════

const VIEWS = { dashboard: viewDashboard, leads: viewLeads, sales: viewSales, content: viewContent, analytics: viewAnalytics, pricing: viewPricing, settings: viewSettings };

function getView() {
    return location.hash.slice(1) || 'dashboard';
}

function renderView(view) {
    const renderer = VIEWS[view] || VIEWS.dashboard;
    document.getElementById('main').innerHTML = renderer();
    afterRender(view);
}

function updateNav(view) {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.view === view);
    });
}

window.addEventListener('hashchange', () => {
    const v = getView();
    renderView(v);
    updateNav(v);
});

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ══════════════════════════════════════════════════════════════════════════════

function viewDashboard() {
    const openDeals = state.deals.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage));
    const pipeline  = openDeals.reduce((s, d) => s + d.value * (d.probability / 100), 0);
    const wonRevenue = state.deals.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + d.value, 0);
    const activeLeads = state.leads.filter(l => !['Closed Won', 'Closed Lost', 'Unqualified'].includes(l.status)).length;
    const avgDeal = openDeals.length ? Math.round(openDeals.reduce((s, d) => s + d.value, 0) / openDeals.length) : 0;

    const prevMonth = state.revenue.monthly.slice(-2, -1)[0];
    const thisMonth = state.revenue.monthly.slice(-1)[0];
    const moDelta   = prevMonth ? Math.round((thisMonth - prevMonth) / prevMonth * 100) : 0;

    const topLeads = [...state.leads]
        .filter(l => l.status !== 'Unqualified')
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    return `
<div class="view-header">
    <div>
        <h1>Good morning, ${state.settings.userName.split(' ')[0]} 👋</h1>
        <p>Here's your revenue overview for today.</p>
    </div>
</div>

<div class="stat-grid">
    <div class="stat-card">
        <span class="stat-label">This Month Revenue</span>
        <span class="stat-value">${fmt(thisMonth)}</span>
        <span class="stat-delta ${moDelta < 0 ? 'down' : ''}">${moDelta >= 0 ? '↑' : '↓'} ${Math.abs(moDelta)}% vs last month</span>
    </div>
    <div class="stat-card">
        <span class="stat-label">Weighted Pipeline</span>
        <span class="stat-value">${fmt(Math.round(pipeline))}</span>
        <span class="stat-delta">${openDeals.length} open deals</span>
    </div>
    <div class="stat-card">
        <span class="stat-label">Active Leads</span>
        <span class="stat-value">${activeLeads}</span>
        <span class="stat-delta">${state.leads.filter(l => l.status === 'New').length} new this week</span>
    </div>
    <div class="stat-card">
        <span class="stat-label">Avg Deal Size</span>
        <span class="stat-value">${fmt(avgDeal)}</span>
        <span class="stat-delta">${state.deals.filter(d => d.stage === 'Closed Won').length} closed</span>
    </div>
</div>

<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:20px;">

    <div class="card">
        <div class="card-title">Top Leads by Score</div>
        <div class="table-wrap">
        <table>
            <thead><tr><th>Name</th><th>Company</th><th>Status</th><th>Score</th><th>Value</th></tr></thead>
            <tbody>
            ${topLeads.map(l => `
            <tr>
                <td><strong>${l.name}</strong><br><span style="font-size:0.8rem;color:var(--muted)">${l.source}</span></td>
                <td>${l.company}</td>
                <td>${statusBadge(l.status)}</td>
                <td>
                    <div class="score-bar">
                        <div class="score-track"><div class="score-fill ${scoreFillClass(l.score)}" style="width:${l.score * 10}%"></div></div>
                        <span style="font-size:0.8rem;font-weight:600">${l.score}</span>
                    </div>
                </td>
                <td style="font-weight:600">${fmt(l.value)}</td>
            </tr>`).join('')}
            </tbody>
        </table>
        </div>
    </div>

    <div class="card">
        <div class="card-title">Agent Activity</div>
        ${state.agentLog.slice(0, 6).map(entry => `
        <div class="log-item">
            <div class="log-dot"></div>
            <div>
                <span class="log-agent">${entry.agent}</span><br>
                <span style="font-size:0.83rem;color:var(--muted)">${entry.action}</span>
            </div>
            <span class="log-time">${timeAgo(entry.timestamp)}</span>
        </div>`).join('')}
    </div>

</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// LEADS VIEW
// ══════════════════════════════════════════════════════════════════════════════

function viewLeads() {
    const counts = {
        All:       state.leads.length,
        New:       state.leads.filter(l => l.status === 'New').length,
        Active:    state.leads.filter(l => ['Contacted','Qualified','Proposal','Negotiating'].includes(l.status)).length,
        'Closed Won': state.leads.filter(l => l.status === 'Closed Won').length,
    };

    const filter = window._leadFilter || 'All';
    const filtered = filter === 'All' ? state.leads :
                     filter === 'Active' ? state.leads.filter(l => ['Contacted','Qualified','Proposal','Negotiating'].includes(l.status)) :
                     state.leads.filter(l => l.status === filter);

    return `
<div class="view-header">
    <div>
        <h1>🎯 Lead Generation Agent</h1>
        <p>Automatically finds and qualifies new consulting leads.</p>
    </div>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" onclick="toggleAddLead()">+ Add Lead</button>
        <button class="btn btn-run" id="btn-run-leads" onclick="runLeadAgent()">▶ Run Agent</button>
    </div>
</div>

<!-- Add Lead Form (hidden by default) -->
<div class="add-lead-form" id="add-lead-form">
    <div class="card-title">Add New Lead</div>
    <div class="form-row">
        <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="f-name" placeholder="Jane Smith">
        </div>
        <div class="form-group">
            <label>Email *</label>
            <input type="email" id="f-email" placeholder="jane@company.com">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group">
            <label>Company</label>
            <input type="text" id="f-company" placeholder="Acme Corp">
        </div>
        <div class="form-group">
            <label>Source</label>
            <select id="f-source">
                <option>LinkedIn</option>
                <option>Referral</option>
                <option>Cold Email</option>
                <option>Website</option>
                <option>Event</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group">
            <label>Est. Value ($)</label>
            <input type="number" id="f-value" placeholder="5000">
        </div>
        <div class="form-group">
            <label>Lead Score (1–10)</label>
            <input type="number" id="f-score" min="1" max="10" placeholder="7">
        </div>
    </div>
    <div class="form-group">
        <label>Notes</label>
        <textarea id="f-notes" rows="2" placeholder="Key details about this lead..."></textarea>
    </div>
    <div style="display:flex;gap:10px">
        <button class="btn btn-primary" onclick="submitAddLead()">Save Lead</button>
        <button class="btn btn-ghost" onclick="toggleAddLead()">Cancel</button>
    </div>
</div>

<!-- Filter tabs -->
<div class="tabs">
    ${Object.entries(counts).map(([label, count]) =>
        `<button class="tab ${filter === label ? 'active' : ''}" onclick="setLeadFilter('${label}')">${label} (${count})</button>`
    ).join('')}
</div>

<div class="card">
    <div class="table-wrap">
    <table>
        <thead><tr><th>Name</th><th>Company</th><th>Source</th><th>Status</th><th>Score</th><th>Value</th><th>Last Contact</th><th>Actions</th></tr></thead>
        <tbody>
        ${filtered.length === 0 ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">🎯</div>No leads found. Run the agent or add one manually.</div></td></tr>` :
        filtered.map(l => `
        <tr>
            <td>
                <strong>${l.name}</strong><br>
                <span style="font-size:0.8rem;color:var(--muted)">${l.email}</span>
            </td>
            <td>${l.company}</td>
            <td><span class="badge badge-grey">${l.source}</span></td>
            <td>
                <select class="status-select" style="font-size:0.82rem;padding:4px 8px;border-radius:4px;border:1px solid var(--border)"
                    onchange="updateLeadStatus('${l.id}', this.value)">
                    ${['New','Contacted','Qualified','Proposal','Negotiating','Closed Won','Unqualified'].map(s =>
                        `<option ${s === l.status ? 'selected' : ''}>${s}</option>`
                    ).join('')}
                </select>
            </td>
            <td>
                <div class="score-bar">
                    <div class="score-track"><div class="score-fill ${scoreFillClass(l.score)}" style="width:${l.score * 10}%"></div></div>
                    <span style="font-size:0.8rem;font-weight:600">${l.score}</span>
                </div>
            </td>
            <td style="font-weight:600">${l.value > 0 ? fmt(l.value) : '—'}</td>
            <td style="font-size:0.83rem;color:var(--muted)">${l.lastContact ? timeAgo(l.lastContact) : '<span style="color:var(--red)">Never</span>'}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteLead('${l.id}')">Remove</button></td>
        </tr>`).join('')}
        </tbody>
    </table>
    </div>
</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// SALES VIEW
// ══════════════════════════════════════════════════════════════════════════════

const PIPELINE_STAGES = ['New', 'Contacted', 'Proposal', 'Negotiating', 'Closed Won'];

function viewSales() {
    const queue = state.followUpQueue || [];

    return `
<div class="view-header">
    <div>
        <h1>💼 Sales & Follow-up Agent</h1>
        <p>Manages your pipeline and generates follow-up messages automatically.</p>
    </div>
    <button class="btn btn-run" id="btn-run-sales" onclick="runSalesAgent()">▶ Run Agent</button>
</div>

<!-- Pipeline board -->
<div class="pipeline">
${PIPELINE_STAGES.map(stage => {
    const stageDeals = state.deals.filter(d => d.stage === stage);
    const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
    return `
    <div class="pipeline-col">
        <div class="pipeline-col-header">
            <span>${stage}</span>
            <span class="pipeline-total">${fmt(stageTotal)}</span>
        </div>
        ${stageDeals.length === 0 ? '<div style="font-size:0.82rem;color:var(--muted);text-align:center;padding:12px 0">Empty</div>' :
        stageDeals.map(d => {
            const lead = state.leads.find(l => l.id === d.leadId);
            return `
            <div class="deal-card">
                <div class="deal-name">${d.name}</div>
                <div class="deal-value">${fmt(d.value)}</div>
                <div class="deal-prob">${d.probability}% probability</div>
                ${lead ? `<div style="font-size:0.78rem;color:var(--muted);margin-top:4px">${lead.company}</div>` : ''}
                ${stage !== 'Closed Won' ? `
                <button class="btn btn-sm btn-secondary" style="margin-top:8px;width:100%"
                    onclick="advanceDeal('${d.id}')">Move to next stage →</button>` : ''}
            </div>`;
        }).join('')}
    </div>`;
}).join('')}
</div>

<!-- Follow-up queue -->
<div class="card">
    <div class="card-title">
        Follow-up Queue
        <span style="font-size:0.82rem;font-weight:400;color:var(--muted)">Generated by the Sales Agent</span>
    </div>
    ${queue.length === 0 ? `
    <div class="empty">
        <div class="empty-icon">📭</div>
        Run the Sales Agent to generate follow-up messages for leads that need attention.
    </div>` :
    queue.map((item, i) => `
    <div class="followup-item">
        <div class="followup-to">To: <strong>${item.to}</strong> &nbsp;·&nbsp; ${item.company} &nbsp;·&nbsp; ${statusBadge(item.status)}</div>
        <div class="followup-body">${item.body}</div>
        <div style="display:flex;gap:8px">
            <button class="btn btn-primary btn-sm" onclick="markSent(${i})">✓ Mark as Sent</button>
            <button class="btn btn-ghost btn-sm" onclick="dismissFollowup(${i})">Dismiss</button>
        </div>
    </div>`).join('')}
</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// CONTENT VIEW
// ══════════════════════════════════════════════════════════════════════════════

function viewContent() {
    return `
<div class="view-header">
    <div>
        <h1>✍️ Content Creator Agent</h1>
        <p>Generates LinkedIn posts, cold emails, follow-ups, and proposals.</p>
    </div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start">

    <!-- Generator panel -->
    <div class="card">
        <div class="card-title">Generate Content</div>
        <div class="form-group">
            <label>Content Type</label>
            <select id="c-type">
                <option>LinkedIn Post</option>
                <option>Cold Email</option>
                <option>Follow-up Email</option>
                <option>Proposal Intro</option>
            </select>
        </div>
        <div class="form-group">
            <label>Topic or Goal</label>
            <input type="text" id="c-topic" placeholder="e.g. Why consultants undercharge, Revenue audit offer">
        </div>
        <div class="form-group">
            <label>Your Niche / Context <span style="font-weight:400;color:var(--muted)">(optional)</span></label>
            <input type="text" id="c-niche" placeholder="${state.settings.niche}" value="${state.settings.niche}">
        </div>
        <button class="btn btn-run" id="btn-run-content" onclick="runContentAgent()" style="width:100%;margin-bottom:16px">
            ▶ Generate
        </button>
        <div class="form-group">
            <label>Output</label>
            <div class="content-output" id="content-output">Your generated content will appear here...</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-secondary btn-sm" onclick="copyContent()">Copy</button>
            <button class="btn btn-primary btn-sm" onclick="saveContent()">Save to Library</button>
        </div>
    </div>

    <!-- Library panel -->
    <div class="card">
        <div class="card-title">Content Library <span style="font-size:0.82rem;font-weight:400;color:var(--muted)">${state.content.length} pieces</span></div>
        ${state.content.length === 0 ? `<div class="empty"><div class="empty-icon">📝</div>No content yet. Generate your first piece.</div>` :
        [...state.content].reverse().map(c => `
        <div class="content-item">
            <div class="content-item-header">
                <span class="content-item-topic">${c.topic}</span>
                <div style="display:flex;gap:6px;align-items:center">
                    ${statusBadge(c.status)}
                    <button class="btn btn-sm btn-ghost" onclick="loadContent('${c.id}')">Load</button>
                </div>
            </div>
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px">
                <span class="badge badge-purple">${c.type}</span>
                <span style="font-size:0.78rem;color:var(--muted)">${timeAgo(c.createdAt)}</span>
            </div>
            <div class="content-item-preview">${c.body.slice(0, 100)}…</div>
        </div>`).join('')}
    </div>

</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// ANALYTICS VIEW
// ══════════════════════════════════════════════════════════════════════════════

function viewAnalytics() {
    return `
<div class="view-header">
    <div>
        <h1>📈 Analytics Agent</h1>
        <p>Tracks your revenue trends and surfaces actionable insights.</p>
    </div>
    <button class="btn btn-run" id="btn-run-analytics" onclick="runAnalyticsAgent()">▶ Run Agent</button>
</div>

<div class="chart-grid">
    <div class="chart-box">
        <div class="card-title">Revenue by Month</div>
        <canvas id="chart-revenue"></canvas>
    </div>
    <div class="chart-box">
        <div class="card-title">Revenue by Source</div>
        <canvas id="chart-source"></canvas>
    </div>
</div>

<!-- Conversion funnel -->
<div class="card" style="margin-bottom:20px">
    <div class="card-title">Lead Conversion Funnel</div>
    <div style="display:flex;gap:0;overflow-x:auto">
        ${['New','Contacted','Qualified','Proposal','Negotiating','Closed Won'].map(stage => {
            const count = state.leads.filter(l => l.status === stage).length;
            const pct   = state.leads.length ? Math.round(count / state.leads.length * 100) : 0;
            return `
            <div style="flex:1;min-width:90px;text-align:center;padding:12px 6px;border-right:1px solid var(--border)">
                <div style="font-size:1.6rem;font-weight:700;color:var(--brand)">${count}</div>
                <div style="font-size:0.75rem;color:var(--muted);margin:2px 0">${stage}</div>
                <div style="font-size:0.82rem;font-weight:600;color:var(--text)">${pct}%</div>
            </div>`;
        }).join('')}
    </div>
</div>

<!-- Insights -->
<div class="card">
    <div class="card-title">AI Insights</div>
    ${state.insights && state.insights.length > 0 ?
        state.insights.map(ins => `<div class="insight-item ${ins.type}">${ins.text}</div>`).join('') :
        `<div class="empty"><div class="empty-icon">💡</div>Run the Analytics Agent to generate personalized insights from your data.</div>`
    }
</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// AFTER RENDER — binds charts and events after HTML is injected
// ══════════════════════════════════════════════════════════════════════════════

const chartInstances = {};

function afterRender(view) {
    // Destroy old chart instances to avoid "canvas already in use" errors
    Object.values(chartInstances).forEach(c => c.destroy());
    Object.keys(chartInstances).forEach(k => delete chartInstances[k]);

    if (view === 'analytics') {
        renderCharts();
    }

    // Update sidebar user info
    const nameEl = document.getElementById('sidebar-username');
    const avatarEl = document.getElementById('sidebar-avatar');
    if (nameEl) nameEl.textContent = state.settings.userName;
    if (avatarEl) avatarEl.textContent = state.settings.initials;
}

function renderCharts() {
    const revenueCtx = document.getElementById('chart-revenue');
    const sourceCtx  = document.getElementById('chart-source');

    if (revenueCtx) {
        chartInstances.revenue = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: state.revenue.months,
                datasets: [{
                    label: 'Revenue',
                    data: state.revenue.monthly,
                    backgroundColor: 'rgba(123,74,234,0.75)',
                    borderRadius: 5,
                }],
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k' } },
                },
            },
        });
    }

    if (sourceCtx) {
        const src = state.revenue.bySource;
        chartInstances.source = new Chart(sourceCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(src),
                datasets: [{
                    data: Object.values(src),
                    backgroundColor: ['#7B4AEA', '#22c55e', '#f59e0b', '#3b82f6'],
                    borderWidth: 2,
                    borderColor: '#fff',
                }],
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
            },
        });
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// AGENT RUNNERS
// ══════════════════════════════════════════════════════════════════════════════

function runLeadAgent() {
    const btn = document.getElementById('btn-run-leads');
    if (!btn || btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Scanning…';
    setDot('leads', 'running');

    setTimeout(() => {
        // Pick 2–3 leads from pool not already in state
        const existing = new Set(state.leads.map(l => l.email));
        const pool = LEAD_POOL.filter(p => !existing.has(p.email));
        const count = Math.min(pool.length, 2 + Math.floor(Math.random() * 2));
        const picked = pool.sort(() => Math.random() - 0.5).slice(0, count);

        picked.forEach(p => {
            state.leads.unshift({
                id: 'L' + uid(),
                name: p.name,
                email: p.email,
                company: p.company,
                source: p.source,
                status: 'New',
                score: 5 + Math.floor(Math.random() * 5),
                value: p.value,
                addedAt: new Date().toISOString().slice(0, 10),
                lastContact: null,
                notes: `Found by Lead Gen Agent via ${p.source}.`,
            });
        });

        logActivity('Lead Generation', `Found ${count} new lead${count !== 1 ? 's' : ''} from LinkedIn, cold email, and referrals`);
        saveState();
        setDot('leads', 'active');
        showToast(`✅ Agent found ${count} new lead${count !== 1 ? 's' : ''}!`);
        window._leadFilter = 'New';
        renderView('leads');
        updateNav('leads');
    }, 2600);
}

function runSalesAgent() {
    const btn = document.getElementById('btn-run-sales');
    if (!btn || btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Reviewing pipeline…';
    setDot('sales', 'running');

    setTimeout(() => {
        // Find leads needing follow-up (New with no contact, or stale)
        const needsFollowUp = state.leads.filter(l =>
            ['New', 'Contacted', 'Proposal'].includes(l.status) &&
            l.status !== 'Unqualified'
        ).slice(0, 3);

        const messages = {
            New: (l) =>
`Subject: Operational visibility at ${l.company}

Hi ${l.name.split(' ')[0]},

I noticed ${l.company} has been growing its operations — I'd love to learn more about what you're working on.

AIMTRIA helps operations and CI teams detect performance gaps automatically and manage the full improvement cycle — from root cause to verified result — in one platform. No more scattered spreadsheets.

Would a 20-minute call make sense this week?

${state.settings.userName}
AIMTRIA Systems`,
            Contacted: (l) =>
`Subject: Following up — AIMTRIA pilot for ${l.company}

Hi ${l.name.split(' ')[0]},

Just circling back — I know things get hectic in operations.

One thing that often helps: we offer an 8-week scoped pilot on a single site with your real data, so you can see AIMTRIA working in ${l.company}'s environment before any long-term commitment.

Worth a look?

${state.settings.userName}
AIMTRIA Systems`,
            Proposal: (l) =>
`Subject: Any questions on the AIMTRIA proposal?

Hi ${l.name.split(' ')[0]},

Checking in on the proposal I sent over for ${l.company}. Happy to walk through the pilot structure or answer any integration questions on a call.

What are your thoughts so far?

${state.settings.userName}
AIMTRIA Systems`,
        };

        state.followUpQueue = needsFollowUp.map(l => ({
            to: l.name,
            company: l.company,
            status: l.status,
            body: (messages[l.status] || messages['Contacted'])(l),
        }));

        logActivity('Sales & Follow-up', `Queued ${needsFollowUp.length} follow-up message${needsFollowUp.length !== 1 ? 's' : ''} for pipeline review`);
        saveState();
        setDot('sales', 'active');
        showToast(`✅ Generated ${needsFollowUp.length} follow-up message${needsFollowUp.length !== 1 ? 's' : ''}!`);
        renderView('sales');
        updateNav('sales');
    }, 2400);
}

async function runContentAgent() {
    const btn   = document.getElementById('btn-run-content');
    const type  = document.getElementById('c-type')?.value;
    const topic = document.getElementById('c-topic')?.value.trim();
    const niche = document.getElementById('c-niche')?.value.trim() || state.settings.niche;

    if (!topic) { showToast('Please enter a topic first.'); return; }
    if (!btn || btn.disabled) return;

    btn.disabled = true;
    const hasKey = !!state.settings.claudeApiKey;
    btn.innerHTML = `<span class="spinner"></span> ${hasKey ? 'Asking Claude…' : 'Generating…'}`;
    setDot('content', 'running');

    let output = null;

    if (hasKey) {
        const prompts = {
            'LinkedIn Post':   `You are a B2B thought-leadership content creator for AIMTRIA Systems, an intelligent operations and continuous-improvement platform. AIMTRIA helps manufacturing, logistics, and distribution companies detect performance gaps automatically, analyze root causes, recommend Lean/Six Sigma/DMAIC countermeasures, assign ownership, and sustain results — the full cycle: Detect → Analyze → Prioritize → Act → Verify → Sustain. Write a compelling LinkedIn post about "${topic}" targeting Operations Directors, CI Managers, COOs, and Plant Managers. 150-250 words, thought-leadership style, use line breaks, end with a question or CTA. Write only the post content, nothing else.`,
            'Cold Email':      `You are a B2B sales copywriter for AIMTRIA Systems, an intelligent operations and CI platform for manufacturing, logistics, and distribution companies. Write a cold email targeting an operations or CI leader about "${topic}". Include a subject line, keep body to 4-6 sentences, use {{First Name}}, {{Company}}, and {{Your Name}} as placeholders. Mention the closed-loop CI cycle (Detect → Analyze → Act → Sustain) naturally. Focus on pain: improvement projects scattered across spreadsheets, lack of visibility, performance regression. Close by offering a 20-minute call. Write only the email, nothing else.`,
            'Follow-up Email': `You are a B2B sales copywriter for AIMTRIA Systems. Write a warm follow-up email about "${topic}" targeting an operations or CI leader. Include subject line, 3-4 sentences, use {{First Name}}, {{Company}}, {{Your Name}} as placeholders. Mention AIMTRIA's 8-week scoped pilot (1 site, real data, no long-term commitment) as a low-risk entry point. Be warm, not pushy. Write only the email, nothing else.`,
            'Proposal Intro':  `You are writing a professional proposal for AIMTRIA Systems, an intelligent operations and CI platform (Detect → Analyze → Prioritize → Act → Verify → Sustain). Write a proposal introduction for an engagement with {{Company}} addressing "${topic}". Include: executive summary of the problem, what the client gets (platform access, integrations, 8-week pilot, weekly reviews, ROI report), investment section with placeholders, and next steps. Use {{Company}} and {{First Name}} as placeholders. Write only the proposal content, nothing else.`,
        };

        try {
            output = await callClaude(prompts[type] || prompts['LinkedIn Post']);
        } catch (err) {
            showToast(`Claude API error: ${err.message}`);
            output = null;
        }
    }

    // Fall back to template if no key or API error
    if (!output) {
        const templates = CONTENT_TEMPLATES[type] || CONTENT_TEMPLATES['LinkedIn Post'];
        output = templates[Math.floor(Math.random() * templates.length)](topic, niche);
    }

    const outEl = document.getElementById('content-output');
    if (outEl) outEl.textContent = output;

    window._pendingContent = { type, topic, body: output, niche };

    btn.disabled = false;
    btn.innerHTML = '▶ Generate';
    setDot('content', 'active');
    logActivity('Content Creator', `Generated ${type}: "${topic}"${hasKey ? ' (Claude AI)' : ''}`);
    saveState();
    showToast(`✅ ${type} generated!`);
}

async function runAnalyticsAgent() {
    const btn = document.getElementById('btn-run-analytics');
    if (!btn || btn.disabled) return;
    btn.disabled = true;
    const hasKey = !!state.settings.claudeApiKey;
    btn.innerHTML = `<span class="spinner"></span> ${hasKey ? 'Asking Claude…' : 'Analyzing…'}`;
    setDot('analytics', 'running');

    let insights = null;

    if (hasKey) {
        const leads   = state.leads;
        const deals   = state.deals;
        const rev     = state.revenue;
        const lastTwo = rev.monthly.slice(-2);
        const wonRev  = deals.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + d.value, 0);
        const openPipe= Math.round(deals.filter(d => !['Closed Won','Closed Lost'].includes(d.stage))
                            .reduce((s, d) => s + d.value * d.probability / 100, 0));
        const neverContacted = leads.filter(l => !l.lastContact && l.status !== 'Unqualified').length;

        const statusCounts = [...new Set(leads.map(l => l.status))]
            .map(s => `${s}: ${leads.filter(l => l.status === s).length}`).join(', ');

        const dataSnapshot = `
Business type: ${state.settings.niche}
Revenue trend: ${rev.months.slice(-3).join(', ')} → ${rev.monthly.slice(-3).map(v => '$' + v.toLocaleString()).join(', ')}
Revenue by source: ${JSON.stringify(rev.bySource)}
Lead breakdown: ${statusCounts}
Leads never contacted: ${neverContacted}
Closed won revenue: $${wonRev.toLocaleString()}
Weighted open pipeline: $${openPipe.toLocaleString()}
Open deals: ${deals.filter(d => !['Closed Won','Closed Lost'].includes(d.stage))
    .map(d => `${d.name} (${d.stage}, ${d.probability}%, $${d.value.toLocaleString()})`).join('; ')}
`;

        const prompt = `You are an expert business analytics consultant. Analyze this consulting business data and write exactly 4 specific, actionable insights.

${dataSnapshot}

Rules:
- Start each insight with a relevant emoji
- Be specific — use the exact numbers from the data
- Each insight must end with one concrete action to take right now
- Keep each insight to 1-2 sentences max
- Separate insights with a blank line
- Write nothing else — just the 4 insight paragraphs`;

        try {
            const text = await callClaude(prompt);
            if (text) {
                const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 20).slice(0, 4);
                insights = paragraphs.map((p, i) => ({
                    type: i === 0 ? (lastTwo[1] >= lastTwo[0] ? 'positive' : 'warning') : (i === 3 ? 'warning' : ''),
                    text: p.trim(),
                }));
            }
        } catch (err) {
            showToast(`Claude API error: ${err.message}`);
        }
    }

    if (!insights) insights = generateInsights();

    state.insights = insights;
    logActivity('Analytics', hasKey ? 'Claude AI generated revenue insights' : 'Generated revenue insights');
    saveState();
    setDot('analytics', 'active');
    showToast('✅ Analytics insights ready!');
    renderView('analytics');
    updateNav('analytics');
}

function generateInsights() {
    const leads   = state.leads;
    const deals   = state.deals;
    const rev     = state.revenue.monthly;
    const lastTwo = rev.slice(-2);
    const trend   = lastTwo[1] >= lastTwo[0];
    const trendPct= lastTwo[0] ? Math.round(Math.abs(lastTwo[1] - lastTwo[0]) / lastTwo[0] * 100) : 0;

    // Best converting source
    const bySource = {};
    leads.forEach(l => {
        if (!bySource[l.source]) bySource[l.source] = { total: 0, won: 0 };
        bySource[l.source].total++;
        if (l.status === 'Closed Won') bySource[l.source].won++;
    });
    let bestSrc = null, bestRate = 0;
    Object.entries(bySource).forEach(([src, d]) => {
        const r = d.total > 0 ? d.won / d.total : 0;
        if (r > bestRate) { bestRate = r; bestSrc = src; }
    });

    const openDeals     = deals.filter(d => !['Closed Won','Closed Lost'].includes(d.stage));
    const weightedPipe  = Math.round(openDeals.reduce((s, d) => s + d.value * (d.probability / 100), 0));
    const newLeads      = leads.filter(l => l.status === 'New').length;
    const neverContacted= leads.filter(l => !l.lastContact && l.status !== 'Unqualified').length;

    return [
        {
            type: trend ? 'positive' : 'warning',
            text: `📊 Revenue is ${trend ? 'up' : 'down'} ${trendPct}% month-over-month (${fmt(lastTwo[0])} → ${fmt(lastTwo[1])}). ${trend ? 'Momentum is strong — this is a great time to raise your rates.' : 'Focus on closing the deals in your pipeline to recover.'}`,
        },
        bestSrc ? {
            type: 'positive',
            text: `🎯 ${bestSrc} is your highest-converting lead source (${Math.round(bestRate * 100)}% close rate). Consider increasing your ${bestSrc} activity by 50% this month.`,
        } : null,
        {
            type: '',
            text: `💰 Your weighted pipeline is ${fmt(weightedPipe)}. Priority: close the ${deals.find(d => d.stage === 'Negotiating')?.name || 'deals in negotiation'} first — they have the highest close probability.`,
        },
        neverContacted > 0 ? {
            type: 'warning',
            text: `⚠️ You have ${neverContacted} lead${neverContacted > 1 ? 's' : ''} that ${neverContacted > 1 ? 'have' : 'has'} never been contacted. Run the Sales Agent to generate outreach messages for them now.`,
        } : null,
    ].filter(Boolean);
}

// ══════════════════════════════════════════════════════════════════════════════
// LEAD ACTIONS
// ══════════════════════════════════════════════════════════════════════════════

function toggleAddLead() {
    const el = document.getElementById('add-lead-form');
    if (el) el.classList.toggle('open');
}

function submitAddLead() {
    const name  = document.getElementById('f-name')?.value.trim();
    const email = document.getElementById('f-email')?.value.trim();
    if (!name || !email) { showToast('Name and email are required.'); return; }

    state.leads.unshift({
        id: 'L' + uid(),
        name,
        email,
        company:  document.getElementById('f-company')?.value.trim() || '',
        source:   document.getElementById('f-source')?.value || 'Other',
        status:   'New',
        score:    parseInt(document.getElementById('f-score')?.value) || 5,
        value:    parseInt(document.getElementById('f-value')?.value) || 0,
        addedAt:  new Date().toISOString().slice(0, 10),
        lastContact: null,
        notes:    document.getElementById('f-notes')?.value.trim() || '',
    });

    saveState();
    showToast('✅ Lead added!');
    window._leadFilter = 'All';
    renderView('leads');
    updateNav('leads');
}

function deleteLead(id) {
    state.leads = state.leads.filter(l => l.id !== id);
    state.deals = state.deals.filter(d => d.leadId !== id);
    saveState();
    renderView('leads');
    updateNav('leads');
}

function updateLeadStatus(id, status) {
    const lead = state.leads.find(l => l.id === id);
    if (lead) {
        lead.status = status;
        lead.lastContact = new Date().toISOString().slice(0, 10);
        saveState();
        showToast(`Lead updated to "${status}"`);
    }
}

function setLeadFilter(filter) {
    window._leadFilter = filter;
    renderView('leads');
    updateNav('leads');
}

// ══════════════════════════════════════════════════════════════════════════════
// SALES ACTIONS
// ══════════════════════════════════════════════════════════════════════════════

function advanceDeal(id) {
    const deal = state.deals.find(d => d.id === id);
    if (!deal) return;
    const idx = PIPELINE_STAGES.indexOf(deal.stage);
    if (idx < PIPELINE_STAGES.length - 1) {
        deal.stage = PIPELINE_STAGES[idx + 1];
        deal.probability = [20, 40, 60, 80, 100][idx + 1] || 100;

        // Sync lead status
        const lead = state.leads.find(l => l.id === deal.leadId);
        if (lead && deal.stage !== 'Closed Won') lead.status = deal.stage;
        if (lead && deal.stage === 'Closed Won') lead.status = 'Closed Won';
        if (lead) lead.lastContact = new Date().toISOString().slice(0, 10);

        saveState();
        showToast(`Deal moved to "${deal.stage}"`);
        renderView('sales');
        updateNav('sales');
    }
}

function markSent(i) {
    state.followUpQueue.splice(i, 1);
    saveState();
    showToast('✅ Follow-up marked as sent.');
    renderView('sales');
    updateNav('sales');
}

function dismissFollowup(i) {
    state.followUpQueue.splice(i, 1);
    saveState();
    renderView('sales');
    updateNav('sales');
}

// ══════════════════════════════════════════════════════════════════════════════
// CONTENT ACTIONS
// ══════════════════════════════════════════════════════════════════════════════

function copyContent() {
    const text = document.getElementById('content-output')?.textContent;
    if (text && text !== 'Your generated content will appear here...') {
        navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
    }
}

function saveContent() {
    const pending = window._pendingContent;
    if (!pending) { showToast('Generate content first.'); return; }
    state.content.push({
        id:        'C' + uid(),
        type:      pending.type,
        topic:     pending.topic,
        body:      pending.body,
        status:    'Draft',
        createdAt: new Date().toISOString(),
    });
    saveState();
    showToast('✅ Saved to Content Library!');
}

function loadContent(id) {
    const piece = state.content.find(c => c.id === id);
    if (!piece) return;
    const outEl = document.getElementById('content-output');
    const typeEl = document.getElementById('c-type');
    const topicEl = document.getElementById('c-topic');
    if (outEl) outEl.textContent = piece.body;
    if (typeEl) typeEl.value = piece.type;
    if (topicEl) topicEl.value = piece.topic;
    window._pendingContent = { type: piece.type, topic: piece.topic, body: piece.body };
    showToast('Content loaded into editor.');
}

// ══════════════════════════════════════════════════════════════════════════════
// PRICING AGENT VIEW
// ══════════════════════════════════════════════════════════════════════════════

function viewPricing() {
    const tiers = state.pricingTiers || null;

    return `
<div class="view-header">
    <div>
        <h1>💰 Pricing Agent</h1>
        <p>Designs your 3-tier consulting packages and calculates value-based rates.</p>
    </div>
    <button class="btn btn-run" id="btn-run-pricing" onclick="runPricingAgent()">▶ Generate Packages</button>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start">

    <!-- Rate calculator -->
    <div class="card">
        <div class="card-title">Rate Calculator</div>
        <div class="form-group">
            <label>Target Annual Revenue ($)</label>
            <input type="number" id="p-revenue" placeholder="120000" value="${state.settings.targetRevenue || ''}">
        </div>
        <div class="form-group">
            <label>Client slots per month</label>
            <input type="number" id="p-slots" placeholder="4" value="${state.settings.clientSlots || ''}">
        </div>
        <div class="form-group">
            <label>Avg engagement length (months)</label>
            <input type="number" id="p-months" placeholder="3" value="${state.settings.engagementMonths || ''}">
        </div>
        <div class="form-group">
            <label>Your niche / service</label>
            <input type="text" id="p-niche" placeholder="${state.settings.niche}" value="${state.settings.niche}">
        </div>
        <button class="btn btn-primary" onclick="calcRate()" style="width:100%">Calculate My Rates</button>
        <div class="calc-result" id="calc-result" style="display:none"></div>
    </div>

    <!-- Package generator -->
    <div class="card">
        <div class="card-title">3-Tier Package Builder</div>
        ${tiers ? renderTiers(tiers) : `
        <div class="empty">
            <div class="empty-icon">💰</div>
            Fill in the rate calculator and click <strong>Generate Packages</strong> to create your 3-tier offer structure.
        </div>`}
    </div>

</div>

${tiers ? `
<div class="card">
    <div class="card-title">Your Offer One-Liner</div>
    <div class="content-output">${tiers.oneLiner}</div>
    <div style="margin-top:10px;display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="copyOneLiner()">Copy</button>
    </div>
</div>` : ''}`;
}

function renderTiers(tiers) {
    return `
<div class="tier-grid" style="grid-template-columns:1fr">
    ${tiers.packages.map((pkg, i) => `
    <div class="tier-card ${i === 1 ? 'featured' : ''}">
        ${i === 1 ? '<span class="tier-recommended">Most Popular</span>' : ''}
        <div class="tier-name">${pkg.name}</div>
        <div class="tier-price">${fmt(pkg.price)}</div>
        <div class="tier-period">${pkg.period}</div>
        <ul class="tier-features">
            ${pkg.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
    </div>`).join('')}
</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS VIEW
// ══════════════════════════════════════════════════════════════════════════════

function viewSettings() {
    return `
<div class="view-header">
    <div>
        <h1>⚙️ Settings</h1>
        <p>Personalize your Revenue OS workspace.</p>
    </div>
</div>

<div class="settings-section">
    <h2>Your Profile</h2>
    <div class="form-row">
        <div class="form-group">
            <label>Your Name</label>
            <input type="text" id="s-name" value="${state.settings.userName}" placeholder="Alex Rivera">
        </div>
        <div class="form-group">
            <label>Avatar Initials (2 letters)</label>
            <input type="text" id="s-initials" value="${state.settings.initials}" maxlength="2" placeholder="AR">
        </div>
    </div>
    <div class="form-group">
        <label>Your Niche / Business Type</label>
        <input type="text" id="s-niche" value="${state.settings.niche}" placeholder="Business & Revenue Consulting">
    </div>
    <button class="btn btn-primary" onclick="saveSettings()">Save Profile</button>
</div>

<div class="settings-section">
    <h2>Revenue Targets</h2>
    <div class="form-row">
        <div class="form-group">
            <label>Annual Revenue Target ($)</label>
            <input type="number" id="s-target" value="${state.settings.targetRevenue || ''}" placeholder="120000">
        </div>
        <div class="form-group">
            <label>Client Slots / Month</label>
            <input type="number" id="s-slots" value="${state.settings.clientSlots || ''}" placeholder="4">
        </div>
    </div>
    <button class="btn btn-primary" onclick="saveSettings()">Save Targets</button>
</div>

<div class="settings-section">
    <h2>Claude AI Integration</h2>
    <p style="font-size:0.88rem;color:var(--muted);margin-bottom:10px">
        Add your Anthropic API key to power the Content Creator and Analytics agents with real Claude AI.
        The key is stored in your browser only and sent directly to Anthropic — never to any other server.
    </p>
    <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:0.82rem;color:#92400e">
        ⚠️ <strong>Security note:</strong> Browser apps expose API keys to anyone who inspects the page.
        Use a key with low spending limits, or only use this on a private trusted device.
        Get your key at <strong>console.anthropic.com</strong>.
    </div>
    <div class="form-group">
        <label>Anthropic API Key</label>
        <input type="password" id="s-apikey" value="${state.settings.claudeApiKey || ''}" placeholder="sk-ant-api03-…">
    </div>
    <p style="font-size:0.82rem;margin-bottom:12px;${state.settings.claudeApiKey ? 'color:var(--green)' : 'color:var(--muted)'}">
        ${state.settings.claudeApiKey ? '✅ API key is set — Content and Analytics agents will use Claude AI' : 'No key set — agents use built-in templates'}
    </p>
    <button class="btn btn-primary" onclick="saveApiKey()">Save API Key</button>
</div>

<div class="settings-section">
    <h2>Data</h2>
    <p style="font-size:0.88rem;color:var(--muted);margin-bottom:14px">
        All your data is stored locally in your browser. Reset clears everything and restores the sample data.
    </p>
    <button class="btn btn-danger" onclick="resetData()">Reset All Data</button>
</div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// PRICING AGENT RUNNER
// ══════════════════════════════════════════════════════════════════════════════

function runPricingAgent() {
    const btn = document.getElementById('btn-run-pricing');
    if (!btn || btn.disabled) return;

    const revenue = parseInt(document.getElementById('p-revenue')?.value) || parseInt(state.settings.targetRevenue) || 120000;
    const slots   = parseInt(document.getElementById('p-slots')?.value)   || parseInt(state.settings.clientSlots) || 4;
    const months  = parseInt(document.getElementById('p-months')?.value)  || parseInt(state.settings.engagementMonths) || 3;
    const niche   = document.getElementById('p-niche')?.value.trim() || state.settings.niche;

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Designing packages…';
    setDot('pricing', 'running');

    setTimeout(() => {
        const monthlyTarget = Math.round(revenue / 12);
        const perClient     = Math.round(monthlyTarget / slots);
        const projectFee    = Math.round(perClient * months);

        // Round to clean pricing numbers
        const round = n => Math.ceil(n / 500) * 500;

        const starter = round(projectFee * 0.55);
        const core    = round(projectFee);
        const premium = round(projectFee * 1.65);

        const tiers = {
            packages: [
                {
                    name: 'Discovery Pilot',
                    price: starter,
                    period: '8-week pilot / 1 site',
                    features: [
                        'AIMTRIA platform access — 1 operational site',
                        'Up to 2 system integrations (ERP, WMS, or spreadsheets)',
                        'Automated performance monitoring & gap detection',
                        'Root cause analysis engine',
                        'Action plan management (A3 / Kaizen / DMAIC)',
                        'Weekly review sessions with AIMTRIA team',
                        'Full ROI report at week 8',
                    ],
                },
                {
                    name: 'Growth License',
                    price: core,
                    period: 'annual license / up to 3 sites',
                    features: [
                        'Everything in Discovery Pilot',
                        'Up to 3 operational sites',
                        'Full system integrations (ERP, WMS, HR, Finance)',
                        'Cross-site performance benchmarking',
                        'Lean, Six Sigma & DMAIC countermeasure library',
                        'Improvement replication across sites',
                        'Quarterly executive reviews',
                    ],
                },
                {
                    name: 'Enterprise',
                    price: premium,
                    period: 'annual license / unlimited sites',
                    features: [
                        'Everything in Growth License',
                        'Unlimited sites and users',
                        'Custom integrations & API access',
                        'Dedicated Customer Success Manager',
                        'Executive dashboard & board-level reporting',
                        'SLA-backed uptime guarantee',
                        'Priority support & onboarding',
                    ],
                },
            ],
            oneLiner: `AIMTRIA helps ${niche.toLowerCase()} teams detect operational performance gaps automatically, manage improvement projects end-to-end, and sustain results long-term — starting with an 8-week pilot at ${fmt(starter)} so you see ROI before committing.`,
        };

        state.pricingTiers = tiers;
        state.settings.targetRevenue   = revenue;
        state.settings.clientSlots     = slots;
        state.settings.engagementMonths = months;

        logActivity('Pricing Agent', `Designed 3-tier package: ${fmt(starter)} / ${fmt(core)} / ${fmt(premium)}`);
        saveState();
        setDot('pricing', 'active');
        showToast('✅ 3-tier packages ready!');
        renderView('pricing');
        updateNav('pricing');
    }, 2200);
}

function calcRate() {
    const revenue = parseInt(document.getElementById('p-revenue')?.value);
    const slots   = parseInt(document.getElementById('p-slots')?.value);
    const months  = parseInt(document.getElementById('p-months')?.value);

    if (!revenue || !slots || !months) {
        showToast('Fill in all three fields first.');
        return;
    }

    const monthly   = Math.round(revenue / 12);
    const perClient = Math.round(monthly / slots);
    const project   = Math.round(perClient * months);
    const daily     = Math.round(revenue / 220);
    const hourly    = Math.round(daily / 6);

    const el = document.getElementById('calc-result');
    if (el) {
        el.style.display = 'block';
        el.innerHTML = `
            To hit <strong>${fmt(revenue)}/year</strong> with ${slots} clients/month:<br><br>
            📦 Minimum project fee &nbsp; <strong>${fmt(project)}</strong> (${months}-month engagement)<br>
            📅 Monthly retainer &nbsp;&nbsp;&nbsp;&nbsp; <strong>${fmt(perClient)}/month</strong><br>
            🕐 Effective hourly rate &nbsp; <strong>${fmt(hourly)}/hr</strong><br>
            📆 Day rate equivalent &nbsp;&nbsp; <strong>${fmt(daily)}/day</strong>
        `;
    }
}

function copyOneLiner() {
    const text = state.pricingTiers?.oneLiner;
    if (text) navigator.clipboard.writeText(text).then(() => showToast('One-liner copied!'));
}

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS ACTIONS
// ══════════════════════════════════════════════════════════════════════════════

function saveSettings() {
    const name     = document.getElementById('s-name')?.value.trim();
    const initials = document.getElementById('s-initials')?.value.trim().toUpperCase();
    const niche    = document.getElementById('s-niche')?.value.trim();
    const target   = document.getElementById('s-target')?.value;
    const slots    = document.getElementById('s-slots')?.value;

    if (name)     state.settings.userName = name;
    if (initials) state.settings.initials = initials;
    if (niche)    state.settings.niche    = niche;
    if (target)   state.settings.targetRevenue = parseInt(target);
    if (slots)    state.settings.clientSlots   = parseInt(slots);

    // Update sidebar immediately
    const nameEl   = document.getElementById('sidebar-username');
    const avatarEl = document.getElementById('sidebar-avatar');
    if (nameEl)   nameEl.textContent   = state.settings.userName;
    if (avatarEl) avatarEl.textContent = state.settings.initials;

    saveState();
    showToast('✅ Settings saved!');
}

function saveApiKey() {
    const key = document.getElementById('s-apikey')?.value.trim();
    if (key && !key.startsWith('sk-ant-')) {
        showToast('That doesn\'t look like an Anthropic key (should start with sk-ant-).');
        return;
    }
    state.settings.claudeApiKey = key || null;
    saveState();
    showToast(key ? '✅ API key saved! Agents will now use Claude AI.' : 'API key removed.');
    renderView('settings');
    updateNav('settings');
}

function resetData() {
    if (!confirm('This will erase all your data and restore the sample data. Continue?')) return;
    localStorage.removeItem(STORAGE_KEY);
    loadState();
    showToast('Data reset. Welcome back!');
    renderView('dashboard');
    updateNav('dashboard');
    location.hash = 'dashboard';
}

// ══════════════════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════════════════

function init() {
    loadState();
    ['leads', 'sales', 'content', 'analytics', 'pricing'].forEach(a => setDot(a, 'active'));

    const view = getView();
    renderView(view);
    updateNav(view);
}

document.addEventListener('DOMContentLoaded', init);
