import type { InterviewGuide } from '#data/interview-guides'

export const investmentBankingGuide: InterviewGuide = {
  slug: 'investment-banking',
  title: 'Investment Banking Interview Guide',
  description:
    'Prepare for investment banking interviews with technical questions covering accounting, valuation, DCF, M&A, and LBO, plus behavioral questions and a structured prep plan.',
  role: 'Analyst / Associate',
  industry: 'Finance',
  lastUpdated: '2026-05-15',
  readingTimeMinutes: 28,
  sections: [
    // ── Overview ──────────────────────────────────────────────────────────────
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Investment banking interviews are among the most technically demanding in finance. Most banks run a multi-stage process: an online application, a HireVue or phone screen, a first-round interview, and a Superday with 4–8 back-to-back interviews. Technical and behavioral questions appear at every stage.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '4–8', label: 'Superday interviews' },
            { value: '~60%', label: 'Technical questions' },
            { value: '~10%', label: 'Superday offer rate' },
            { value: '4–6 wks', label: 'Recommended prep' },
          ],
        },
        {
          type: 'bullets',
          title: 'What interviewers are evaluating',
          items: [
            'Technical foundation — can you explain accounting, valuation, and modeling concepts clearly and under pressure?',
            'Deal awareness — do you read about markets and follow recent transactions in your target sector?',
            'Communication — can you explain complex ideas concisely without notes?',
            'Motivation — do you have a genuine, specific reason for wanting this role at this firm?',
            'Fit — would the team want to work late nights with you on a live deal?',
          ],
        },
        {
          type: 'tip',
          title: 'Start with technicals',
          text: 'Most candidates underestimate how technical IB interviews are, especially at bulge bracket and elite boutique firms. Get your three-statement walkthrough, DCF, and LBO mechanics completely locked before focusing on behavioral stories.',
        },
      ],
    },

    // ── Accounting ────────────────────────────────────────────────────────────
    {
      id: 'accounting',
      title: 'Accounting Questions',
      group: 'Technical Questions',
      intro:
        'Accounting questions test your understanding of how financial statements work and connect. Expect 2–4 accounting questions in every first-round interview.',
      blocks: [
        {
          type: 'key-term',
          title: 'Essential accounting vocabulary',
          terms: [
            {
              term: 'EBITDA',
              definition:
                'Earnings Before Interest, Taxes, Depreciation, and Amortization. A proxy for operating cash generation, widely used as a valuation base. Strips out capital structure and accounting choices to allow comparisons across companies.',
            },
            {
              term: 'Accounts Receivable',
              definition:
                'Revenue earned but not yet collected in cash. An asset on the balance sheet. Rising AR relative to revenue can signal collection problems or aggressive revenue recognition.',
            },
            {
              term: 'Accounts Payable',
              definition:
                'Expenses incurred but not yet paid. A liability. High AP relative to COGS can indicate strong supplier leverage or cash management discipline.',
            },
            {
              term: 'Deferred Revenue',
              definition:
                'Cash received before the associated service or product is delivered. A liability — the company still owes performance. Common in SaaS (annual subscriptions) and media (multi-year contracts).',
            },
            {
              term: 'Net Working Capital',
              definition:
                'Current operating assets minus current operating liabilities. Excludes cash and debt. Changes in NWC directly affect free cash flow — increases consume cash, decreases release it.',
            },
          ],
        },
        {
          type: 'concept',
          title: 'Accrual vs. cash-basis accounting',
          body: 'Under accrual accounting (required by GAAP), revenue is recorded when earned and expenses when incurred — regardless of when cash changes hands. This creates timing differences between net income and actual cash generation. Understanding this gap is the foundation for all three-statement analysis.',
        },
        {
          type: 'question',
          question: 'Walk me through the three financial statements.',
          difficulty: 'easy',
          category: 'Accounting',
          framework: 'IS → CFS → BS, linked through net income and cash',
          answer:
            'The three statements are the income statement, cash flow statement, and balance sheet — and they\'re tightly linked.\n\nThe income statement shows revenue minus expenses to arrive at net income over a period. Net income flows in two directions: it increases retained earnings on the balance sheet (boosting equity), and it\'s the starting point for the cash flow statement.\n\nThe cash flow statement adjusts net income for non-cash items (depreciation, amortization), changes in working capital (AR, inventory, AP), and capital expenditures to arrive at actual cash generated. It has three sections: operating, investing, and financing activities. The ending cash balance flows to the balance sheet\'s cash line.\n\nThe balance sheet is a point-in-time snapshot: assets = liabilities + shareholders\' equity. The cash line reflects the CFS output. PP&E is reduced each period by accumulated depreciation. Retained earnings accumulates net income over time minus any dividends paid.',
          followUps: [
            'How does a $10 increase in depreciation flow through all three statements?',
            'What\'s the difference between net income and free cash flow?',
            'If net income is positive, can a company still go bankrupt? How?',
          ],
        },
        {
          type: 'question',
          question: 'How does a $10 increase in depreciation affect the three financial statements? Assume a 40% tax rate.',
          difficulty: 'medium',
          category: 'Accounting',
          framework: 'Work IS → CFS → BS in order. Net income effect = depreciation × (1 − tax rate)',
          answer:
            'Work through each statement in order:\n\nIncome Statement: Depreciation is a non-cash expense. EBIT falls by $10. Taxes decrease by $4 (40%), so net income decreases by $6.\n\nCash Flow Statement: Net income is down $6, but we add back the full $10 depreciation as a non-cash item. Cash from operations increases by $4 net.\n\nBalance Sheet: On the asset side, PP&E decreases by $10 (accumulated depreciation rises). Cash increases by $4. Total assets change: −$10 + $4 = −$6. On the liability and equity side, retained earnings decreases by $6 (from lower net income). Change in L+E: −$6. Balanced.',
          followUps: [
            'What if the tax rate were 0%?',
            'How does amortization of an intangible differ from depreciation on the three statements?',
          ],
        },
        {
          type: 'question',
          question: 'What is working capital and why does it matter in a financial model?',
          difficulty: 'easy',
          category: 'Accounting',
          framework: 'Net WC = (AR + Inventory) − (AP + Accrued Liabilities)',
          answer:
            'Working capital = current assets − current liabilities. In finance, we typically use operating (net) working capital, which strips out cash and debt since those are financing items: NWC = (Accounts Receivable + Inventory + Other Operating Current Assets) − (Accounts Payable + Accrued Liabilities).\n\nAn increase in NWC is a use of cash — for example, if a company builds inventory, it spends cash before recognizing the sale. A decrease in NWC is a source of cash — for instance, collecting on AR faster.\n\nIn a DCF model, changes in NWC appear in cash from operations and directly reduce or add to free cash flow. This is why a profitable company can run out of cash: rapid growth often requires significant working capital investment before cash is collected.\n\nBusinesses with negative working capital (like subscriptions or retailers paid upfront) are especially valuable because customers fund operations before delivery.',
          followUps: [
            'How does working capital show up in a DCF model?',
            'Give an example of a business that benefits from structurally negative working capital.',
            'What does it signal if a company\'s DSO (days sales outstanding) is rising?',
          ],
        },
        {
          type: 'question',
          question: 'If you could only look at two financial statements, which would you choose and why?',
          difficulty: 'hard',
          category: 'Accounting',
          framework: 'IS + BS → back into CFS from changes in balance sheet accounts',
          answer:
            'The income statement and the balance sheet. From these two, you can reconstruct the cash flow statement.\n\nTo derive cash from operations: take net income from the income statement, then calculate period-over-period changes in balance sheet accounts (AR, inventory, AP, accrued liabilities, etc.). Add back depreciation, which you can estimate from changes in gross PP&E and accumulated depreciation on the balance sheet.\n\nFor investing activities, changes in PP&E (adjusted for depreciation) approximate capital expenditures.\n\nFor financing activities, changes in debt and equity balances plus any dividends (sometimes disclosed in the equity section) round out the picture.\n\nThe cash flow statement is fundamentally a bridge between the income statement and the balance sheet — it explains how cash moved given the P&L activity and the balance sheet changes. If you have both endpoints and the P&L, you can reconstruct the bridge.',
          followUps: [
            'What information would you lose versus having all three?',
            'If you could only pick ONE statement, which would it be?',
          ],
        },
        {
          type: 'question',
          question: 'What is the difference between cash-basis and accrual accounting? Why does it matter?',
          difficulty: 'easy',
          category: 'Accounting',
          framework: 'Cash: record when paid/received. Accrual: record when earned/incurred.',
          answer:
            'Under cash-basis accounting, revenue is recorded when cash is received and expenses when cash is paid. Under accrual accounting (required by GAAP for public companies), revenue is recorded when earned — when the product is delivered or service rendered — and expenses when incurred, regardless of cash timing.\n\nThis is why the income statement and cash flow statement often diverge. A company can book a large sale, record significant revenue and profit, and yet have negative operating cash flow if customers haven\'t paid yet — those uncollected amounts sit in accounts receivable.\n\nThe most important implications for finance: (1) AR represents revenue earned but not yet collected; (2) AP represents expenses incurred but not yet paid; (3) deferred revenue (e.g., annual subscriptions paid upfront) is a liability representing cash received before service is delivered. All three create structural differences between net income and cash flow.',
          followUps: [
            'How could accrual accounting be used to make a struggling business look healthier than it is?',
            'What is deferred revenue and give me a real-world example?',
          ],
        },
        {
          type: 'key-takeaway',
          text: 'Every accounting question ultimately tests the same thing: can you trace how a transaction flows through all three statements and keeps them balanced? When in doubt, start with the income statement impact, then work through the cash flow statement, and finally reconcile the balance sheet.',
        },
      ],
    },

    // ── Valuation ─────────────────────────────────────────────────────────────
    {
      id: 'valuation',
      title: 'Valuation Questions',
      group: 'Technical Questions',
      intro:
        'Valuation is the core skill of investment banking. Expect at least one valuation methodology question in every interview, often followed up with edge cases.',
      blocks: [
        {
          type: 'comparison-table',
          columnA: 'DCF',
          columnB: 'Trading Comps',
          rows: [
            {
              label: 'Basis',
              a: 'Intrinsic value — what the business is worth based on its future cash flows',
              b: 'Relative value — what similar public businesses trade for right now',
            },
            {
              label: 'Key input',
              a: 'Projected unlevered free cash flows + WACC + terminal value assumption',
              b: 'EV/EBITDA, EV/Revenue, or P/E multiples from comparable public companies',
            },
            {
              label: 'Best when',
              a: 'Stable, mature business with predictable cash flows; few close public comps',
              b: 'Many close public comparables; need a fast market-anchored sanity check',
            },
            {
              label: 'Main weakness',
              a: 'Extremely sensitive to WACC and terminal value; garbage in, garbage out',
              b: 'Anchored to current market sentiment — overvalued if whole sector is inflated',
            },
            {
              label: 'Control premium',
              a: 'Included if synergies and deal terms are modeled in',
              b: 'Not included — reflects minority, liquid trading prices',
            },
          ],
        },
        {
          type: 'question',
          question: 'What are the three main valuation methodologies?',
          difficulty: 'easy',
          category: 'Valuation',
          framework: 'Comps (market) → Precedents (transaction) → DCF (intrinsic)',
          answer:
            'The three core methodologies are:\n\n1. Comparable Company Analysis ("Trading Comps"): Values a company based on how similar public companies currently trade on multiples like EV/EBITDA, EV/Revenue, or P/E. Reflects real-time market sentiment. Subject to market cycles — if the whole sector is overvalued, comps will be too.\n\n2. Precedent Transactions ("Deal Comps"): Values based on multiples paid in prior M&A deals for similar companies. These are typically higher than trading comps because acquirers pay control premiums — usually 20–40% above market price — to gain ownership. Best used when there is a rich deal history in the sector.\n\n3. Discounted Cash Flow (DCF): Intrinsic value derived by projecting unlevered free cash flows and discounting them at WACC. Not dependent on current market pricing. Highly sensitive to assumptions but provides a fundamental view.\n\nBankers run all three and present the results as a "football field" chart showing implied valuation ranges. Each methodology cross-checks the others.',
          followUps: [
            'When would precedent transactions produce a higher valuation than trading comps?',
            'Which methodology do you personally find most reliable, and why?',
            'What is a football field chart and how do you read it?',
          ],
        },
        {
          type: 'question',
          question: 'When would you use a DCF versus comparable company analysis?',
          difficulty: 'medium',
          category: 'Valuation',
          framework: 'DCF for intrinsic/standalone value; comps for market-anchored benchmarking',
          answer:
            'Use a DCF when: (1) there are few or no good comparable public companies, making comps unreliable; (2) you have high conviction in long-term projections, such as for a stable, mature business with predictable cash flows; (3) the company is undergoing a transformation that makes current multiples misleading; (4) you need an intrinsic view independent of current market conditions — particularly important in fairness opinions and LBO models.\n\nUse trading comps when: (1) there are many closely comparable public companies and the market is reasonably efficient; (2) you need a quick market-anchored sanity check; (3) the company\'s cash flows are hard to project — early-stage, highly cyclical, or pre-revenue businesses; (4) market pricing is the most relevant reference point, such as in an IPO context.\n\nIn practice, you always run both. The DCF is more important in situations where intrinsic value matters (LBOs, fairness opinions, deeply distressed situations); comps are more important when you need to understand where markets are pricing similar businesses today.',
          followUps: [
            'What makes a DCF unreliable?',
            'Can the DCF and comps give you very different answers? What does that signal?',
          ],
        },
        {
          type: 'question',
          question: 'What makes a good comparable company?',
          difficulty: 'medium',
          category: 'Valuation',
          framework: 'Business model → Size → Growth → Margins → Geography',
          answer:
            'In order of importance:\n\n1. Business model similarity: Same industry, similar product or service mix, similar customer type (B2B vs. B2C, enterprise vs. SMB). This is the most critical factor — if the business models differ meaningfully, the multiples aren\'t comparable.\n\n2. Size: Similar revenue scale, ideally within 50–200% of the target. Very large companies trade at liquidity and scale premiums; very small ones at size discounts.\n\n3. Growth profile: Similar revenue and EBITDA growth rates. Higher-growth businesses command higher multiples, so mixing fast and slow growers without adjustment distorts the analysis.\n\n4. Margin structure: Similar EBITDA, EBIT, and net margin profiles. Especially important for EBITDA-based multiples — a 30%-margin business is structurally different from a 10%-margin peer.\n\n5. Geographic exposure: Domestic vs. international mix; developed vs. emerging market exposure affects risk profile and appropriate discount rate.\n\nIn practice, perfect comps rarely exist. The job is to select the most relevant set, acknowledge the limitations, and apply judgment when adjusting multiples for size, growth, or quality differences.',
          followUps: [
            'What do you do when there are no public comps?',
            'How do you handle companies with negative EBITDA in a comps set?',
            'Should you use the median or mean of your comp set multiples?',
          ],
        },
        {
          type: 'question',
          question: 'Why might two companies in the same industry trade at very different EV/EBITDA multiples?',
          difficulty: 'hard',
          category: 'Valuation',
          framework: 'Growth, margin quality, competitive position, revenue predictability, capital intensity',
          answer:
            'Multiple dispersion within an industry is driven by several factors:\n\nGrowth: The single biggest driver. A company growing revenue at 25% per year will trade at a dramatically higher multiple than a peer growing at 3%, because investors are paying for future earnings power, not just current EBITDA.\n\nMargin quality and ROIC: Higher EBITDA margins and returns on invested capital signal a structurally superior business. A 35%-margin business converts more EBITDA to free cash flow, justifying a higher multiple.\n\nRevenue predictability: Subscription or contractual revenue is worth more than transactional revenue. A company with 80% recurring revenue deserves a premium over a project-based peer with identical EBITDA.\n\nCapital intensity: A high-capex business converts much less EBITDA to free cash flow. EV/EBITDA can look cheap while EV/FCF is expensive — savvy investors see through this.\n\nCompetitive positioning: Businesses with pricing power, switching costs, or network effects deserve premium multiples because their cash flows are more durable.\n\nLeverage: Highly leveraged companies sometimes trade at discounts due to financial risk, even after stripping leverage from the EV/EBITDA calculation.',
          followUps: [
            'If two companies have identical EBITDA growth, why might one trade at a higher multiple?',
            'How does leverage affect EV-based multiples differently from equity-based multiples like P/E?',
          ],
        },
      ],
    },

    // ── DCF ───────────────────────────────────────────────────────────────────
    {
      id: 'dcf',
      title: 'DCF Analysis',
      group: 'Technical Questions',
      intro:
        'DCF is one of the most commonly tested topics in IB interviews. You should be able to walk through the full model step by step, explain WACC from scratch, and articulate its limitations.',
      blocks: [
        {
          type: 'formula',
          label: 'Unlevered Free Cash Flow',
          formula: 'UFCF = EBIT × (1 − Tax Rate)\n      + D&A\n      − Capital Expenditures\n      − Change in Net Working Capital',
          variables: [
            { symbol: 'EBIT', definition: 'Earnings before interest and taxes (operating income)' },
            { symbol: 'D&A', definition: 'Depreciation and amortization — added back as a non-cash charge' },
            { symbol: 'Capex', definition: 'Capital expenditures — investment in fixed assets to maintain or grow the business' },
            { symbol: 'ΔNWC', definition: 'Increase in NWC = use of cash; decrease = source of cash' },
          ],
          note: 'Unlevered FCF excludes interest expense, making it capital-structure-neutral — the correct input to a DCF discounted at WACC.',
        },
        {
          type: 'formula',
          label: 'WACC',
          formula: 'WACC = (E/V × Ke) + (D/V × Kd × (1 − T))',
          variables: [
            { symbol: 'E / V', definition: 'Equity as a proportion of total capital (market value)' },
            { symbol: 'D / V', definition: 'Debt as a proportion of total capital (market value)' },
            { symbol: 'Ke', definition: 'Cost of equity via CAPM: Rf + β × (Rm − Rf)' },
            { symbol: 'Kd', definition: 'Pre-tax cost of debt (yield on outstanding bonds or bank debt)' },
            { symbol: '(1 − T)', definition: 'Tax shield — interest is deductible, so the effective cost of debt is reduced' },
          ],
          note: 'Use market values for E and D, not book values. Cost of equity is always higher than cost of debt because equity holders bear residual risk.',
        },
        {
          type: 'formula',
          label: 'Terminal Value — Gordon Growth Model',
          formula: 'TV = FCF_n × (1 + g) / (WACC − g)',
          variables: [
            { symbol: 'FCF_n', definition: 'Free cash flow in the final projection year' },
            { symbol: 'g', definition: 'Perpetuity growth rate — typically 2–3%, in line with long-run nominal GDP growth' },
            { symbol: 'WACC − g', definition: 'The "spread" that must be positive; if g ≥ WACC, the formula breaks (implies infinite value)' },
          ],
          note: 'Terminal value often represents 60–80% of total DCF value, which is why sensitivity analysis on g and WACC is essential.',
        },
        {
          type: 'question',
          question: 'Walk me through a DCF analysis step by step.',
          difficulty: 'medium',
          category: 'DCF',
          framework: 'Project FCFs → Calculate WACC → Terminal Value → Discount → Bridge to equity value',
          answer:
            'A DCF values a company by discounting its projected future free cash flows back to the present at the weighted average cost of capital.\n\nStep 1 — Project unlevered free cash flows: Start from EBIT, calculate NOPAT (EBIT × (1 − tax rate)), add back D&A (non-cash), subtract capex, and adjust for changes in net working capital. Project for 5–10 years depending on industry.\n\nStep 2 — Calculate WACC: Weight the cost of equity (via CAPM) and after-tax cost of debt by their market-value proportions in the capital structure.\n\nStep 3 — Calculate terminal value: Use either the Gordon Growth Model — FCF_n × (1 + g) / (WACC − g) — or apply an exit EV/EBITDA multiple to the final projection year. Terminal value typically represents 60–80% of total enterprise value, which is why assumptions here matter so much.\n\nStep 4 — Discount all cash flows: Discount each year\'s UFCF and the terminal value back to the present using WACC. Sum them to get Enterprise Value.\n\nStep 5 — Bridge to equity value: Enterprise Value + Cash − Debt − Other non-operating liabilities = Equity Value. Divide by diluted share count for implied share price.',
          followUps: [
            'What\'s the most important assumption in a DCF and why?',
            'How do you sensitize a DCF output?',
            'Why does terminal value dominate most DCF outputs?',
          ],
        },
        {
          type: 'question',
          question: 'What is WACC and how do you calculate it?',
          difficulty: 'medium',
          category: 'DCF',
          framework: 'WACC = (E/V × Ke) + (D/V × Kd × (1 − T))',
          answer:
            'WACC is the weighted average cost of capital — the blended required rate of return across all of a company\'s capital providers, weighted by their proportion in the capital structure. It represents the minimum return the company must generate to create value for all stakeholders.\n\nFormula: WACC = (E/V × Ke) + (D/V × Kd × (1 − T))\nWhere: E = market value of equity, D = market value of debt, V = E + D, Ke = cost of equity, Kd = pretax cost of debt, T = marginal tax rate.\n\nCost of equity (Ke) via CAPM: Ke = Rf + β × (Rm − Rf), where Rf = risk-free rate (typically the 10-year Treasury yield), β = the company\'s levered beta, and (Rm − Rf) = equity risk premium, typically estimated at 5–6%.\n\nCost of debt (Kd): the company\'s current borrowing rate, estimated from its bond yield or credit rating. Multiplied by (1 − T) because interest is tax-deductible — this is the tax shield on debt.\n\nCommon errors: using book value instead of market value for equity; using the coupon rate of old debt instead of current market rates; forgetting to unlever and re-lever beta when applying a comparable company\'s beta to a different capital structure.',
          followUps: [
            'Why do you use after-tax cost of debt but not after-tax cost of equity?',
            'How does adding leverage affect WACC, and does it always lower it?',
            'How would you estimate beta for a private company?',
          ],
        },
        {
          type: 'question',
          question: 'How do you calculate terminal value and which method do you prefer?',
          difficulty: 'medium',
          category: 'DCF',
          framework: 'Gordon Growth: FCF × (1+g) / (WACC − g) | Exit Multiple: EBITDA × multiple',
          answer:
            'There are two standard methods:\n\nGordon Growth Model (perpetuity growth): Terminal Value = FCF_n × (1 + g) / (WACC − g), where g is the assumed long-term growth rate in perpetuity. The growth rate should be conservative — roughly in line with long-run nominal GDP growth (2–3%), since no company can grow faster than the overall economy forever. Very sensitive to small changes in g.\n\nExit Multiple Method: Apply an EV/EBITDA multiple (or EV/EBIT) to the final projection year\'s EBITDA. The multiple is typically derived from current trading comps or precedent transactions — the idea is that whatever the market pays for similar businesses today is a reasonable estimate of what it will pay in 5–10 years.\n\nI prefer the exit multiple method in most cases because it grounds the terminal value in current market reality rather than requiring a perpetuity growth assumption that is highly uncertain. It also cross-checks the DCF against comps.\n\nBest practice: run both methods and use them as a sanity check on each other. If they produce very different answers, understand why.',
          followUps: [
            'What happens to terminal value if WACC equals g in the Gordon Growth formula?',
            'If terminal value is 75% of your total DCF value, what does that tell you?',
          ],
        },
        {
          type: 'question',
          question: 'What are the main limitations of a DCF?',
          difficulty: 'easy',
          category: 'DCF',
          framework: 'Terminal value sensitivity, WACC sensitivity, projection quality, market disconnect',
          answer:
            'The DCF is powerful but has significant limitations:\n\n1. Terminal value dominates: In most DCFs, 60–80% of the total value comes from the terminal value. Yet this number rests on a long-term growth or exit multiple assumption that is highly uncertain. Small changes in terminal assumptions produce enormous valuation swings.\n\n2. WACC sensitivity: Small changes in beta, the equity risk premium, or the risk-free rate substantially change the discount rate and therefore the output. WACC is more of an estimate than a fact.\n\n3. Garbage in, garbage out: The model is only as good as the revenue, margin, and cash flow projections. For early-stage companies, high-growth technology businesses, or companies in distress, multi-year projections are largely speculative.\n\n4. Disconnected from markets: A DCF can produce an intrinsic value completely disconnected from current market pricing. This can be correct (markets are wrong) or a red flag (your assumptions are wrong). There\'s no automatic market anchor.\n\n5. Ignores optionality: DCFs struggle to value embedded options — a biotech pipeline, a real estate development optionality, or a platform company\'s adjacency moves.',
          followUps: [
            'When would you NOT use a DCF at all?',
            'How would you handle a company with negative free cash flows for the first several years of your projection?',
          ],
        },
        {
          type: 'worked-example',
          title: 'Simple DCF Bridge to Equity Value',
          scenario:
            'A company generates $50M of UFCF in Year 5. WACC is 10%. Terminal growth rate is 2.5%. PV of projected UFCFs (Years 1–5) sums to $180M. The company has $40M cash and $60M debt on its balance sheet.',
          steps: [
            {
              label: 'Terminal Value',
              content:
                'TV = $50M × (1 + 2.5%) / (10% − 2.5%) = $51.25M / 7.5% = $683M',
            },
            {
              label: 'PV of Terminal Value',
              content:
                'Discount TV back 5 years at 10%: $683M / (1.10)⁵ = $683M / 1.611 ≈ $424M',
            },
            {
              label: 'Enterprise Value',
              content:
                'EV = PV of UFCFs + PV of TV = $180M + $424M = $604M',
            },
            {
              label: 'Bridge to Equity Value',
              content:
                'Equity Value = EV + Cash − Debt = $604M + $40M − $60M = $584M',
            },
          ],
          result:
            'Implied equity value is $584M. Note: terminal value ($424M) is ~70% of total enterprise value — a reminder of how sensitive the output is to the perpetuity growth rate and WACC.',
        },
        {
          type: 'key-takeaway',
          text: 'In a DCF, the terminal value almost always dominates. If an interviewer asks you to "stress test" a DCF, the first two sensitivities to run are (1) WACC ±1% and (2) terminal growth rate ±0.5%. These two inputs together explain the vast majority of valuation variance.',
        },
      ],
    },

    // ── M&A ───────────────────────────────────────────────────────────────────
    {
      id: 'ma',
      title: 'M&A Questions',
      group: 'Technical Questions',
      intro:
        'M&A questions test your understanding of deal rationale, transaction mechanics, and how acquisitions flow through financial models. These come up heavily at M&A-focused groups.',
      blocks: [
        {
          type: 'question',
          question: 'Why do companies pursue M&A?',
          difficulty: 'easy',
          category: 'M&A',
          framework: 'Scale, capabilities, vertical integration, synergies, financial engineering',
          answer:
            'Acquisitions happen for strategic and financial reasons:\n\nStrategic: (1) Scale and market share — buying a competitor to gain size, pricing power, or geographic reach faster than organic growth allows; (2) Capabilities acquisition — buying technology, talent, or IP that would take years and higher risk to build internally; (3) Vertical integration — acquiring suppliers or distributors to control the value chain and protect margins; (4) Diversification — entering new markets or products to reduce concentration risk.\n\nFinancial: (5) EPS accretion — if the acquisition is structured so the cost of financing is less than the target\'s earnings yield, combined EPS increases; (6) Synergies — cost savings from eliminating redundant functions (G&A, overlapping sales teams) and revenue synergies from cross-selling or bundling; (7) Tax optimization — using a target\'s net operating loss carryforwards or optimizing capital structure.\n\nBad reasons that still happen: management empire-building, buying growth to mask organic decline, or overpaying due to competitive auction dynamics and hubris.',
          followUps: [
            'What\'s the difference between cost synergies and revenue synergies? Which are more reliable?',
            'Why might a deal look strategically compelling but still be a bad deal?',
          ],
        },
        {
          type: 'question',
          question: 'What is goodwill, how is it created, and what happens to it afterward?',
          difficulty: 'medium',
          category: 'M&A',
          framework: 'Goodwill = Purchase Price − Fair Value of Net Identifiable Assets',
          answer:
            'Goodwill is an intangible asset that appears on the acquirer\'s balance sheet when a company is purchased for more than the fair market value of its identifiable net assets.\n\nHow it\'s created: In purchase price allocation (PPA), the acquisition price is first allocated to all identifiable tangible assets (PP&E, working capital) and identifiable intangible assets (brand, customer relationships, patents, technology). Whatever cannot be specifically identified — the premium for future synergies, assembled workforce, market position, and strategic value — is recorded as goodwill.\n\nExample: Pay $100M for a company with $60M of identifiable net assets at fair value → $40M is recorded as goodwill.\n\nAfterward: Under US GAAP, goodwill is not amortized. Instead, it must be tested for impairment at least annually. If the carrying value of the reporting unit (including goodwill) exceeds its fair value, goodwill must be written down. This creates a non-cash impairment charge on the income statement, directly reducing net income — and often signals that the acquirer overpaid or the business has deteriorated.',
          followUps: [
            'How does goodwill impairment flow through the three financial statements?',
            'What\'s the difference between goodwill and other acquired intangible assets?',
            'Under IFRS, how does goodwill treatment differ from GAAP?',
          ],
        },
        {
          type: 'question',
          question: 'What is an accretion/dilution analysis and when is a deal accretive to EPS?',
          difficulty: 'hard',
          category: 'M&A',
          framework: 'Accretive if earnings yield of target > after-tax cost of acquisition financing',
          answer:
            'An accretion/dilution analysis compares the acquirer\'s standalone EPS to its pro forma EPS after closing the acquisition. If combined EPS is higher, the deal is accretive; if lower, dilutive.\n\nFor a stock deal: accretive if the target\'s P/E is lower than the acquirer\'s P/E (the acquirer is "buying" earnings at a cheaper multiple than the market values its own). Dilutive if the acquirer\'s stock is cheap relative to the target.\n\nFor a cash deal (debt-financed): accretive if the target\'s earnings yield (Net Income / Equity Purchase Price) exceeds the after-tax cost of debt used to fund it. If the target earns more on the capital than the interest cost, EPS increases.\n\nSynergies can flip an initially dilutive deal to accretive once cost savings or revenue upside are realized.\n\nImportant caveat: EPS accretion does not equal value creation. A deal can be accretive while still destroying economic value if the acquirer overpays and earns a return below its cost of capital. Bankers run accretion/dilution analysis as a metric, but IRR and NPV of synergies are more meaningful measures of value.',
          followUps: [
            'Walk me through how you\'d build an accretion/dilution model in Excel.',
            'Can a deal be EPS accretive but value-destroying at the same time?',
            'How does the acquisition premium affect the accretion/dilution result?',
          ],
        },
        {
          type: 'question',
          question: 'What is the difference between a stock deal and a cash deal in M&A?',
          difficulty: 'medium',
          category: 'M&A',
          framework: 'Cash: taxable, no dilution, adds debt. Stock: tax-free option, dilutive, no debt.',
          answer:
            'In a cash deal, the acquirer pays cash to target shareholders. Their equity is retired. The acquirer typically borrows to fund the purchase, relying on the target\'s cash flows to repay that debt over time.\n\nIn a stock deal, the acquirer issues new shares to target shareholders in exchange for their equity. No cash changes hands. Target shareholders become shareholders in the combined company.\n\nKey differences:\n\nTax: Cash deals are taxable to the target\'s shareholders — they realize a capital gain immediately at closing. Stock deals can be structured as tax-free reorganizations under IRC Section 368 if certain conditions are met.\n\nRisk sharing: In a stock deal, target shareholders participate in the combined entity\'s upside and downside. In a cash deal, they exit with certainty. The acquirer bears all integration and execution risk.\n\nDilution: Stock deals dilute existing acquirer shareholders by increasing share count. Cash deals do not dilute but increase financial leverage.\n\nSignaling: Acquirers often prefer to issue stock when they believe their shares are overvalued — they\'re using expensive currency. Savvy target shareholders and their advisors know to scrutinize the acquirer\'s valuation carefully in stock deals.',
          followUps: [
            'When might a target company prefer a stock deal over a cash deal?',
            'How does the form of consideration affect the accretion/dilution result?',
            'What is a "collar" in deal consideration and why is it used?',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Cash Deal',
          columnB: 'Stock Deal',
          rows: [
            {
              label: 'Financing',
              a: 'Funded with cash on hand or new debt raised by the acquirer',
              b: 'Acquirer issues new shares to target shareholders',
            },
            {
              label: 'Tax to target',
              a: 'Taxable event — shareholders realize capital gains at closing',
              b: 'Can be structured as tax-free reorganization (IRC §368)',
            },
            {
              label: 'Dilution',
              a: 'No dilution — existing share count unchanged',
              b: 'Dilutive — new shares issued increase total count',
            },
            {
              label: 'Risk sharing',
              a: 'Target shareholders exit with certainty; acquirer bears all risk',
              b: 'Target shareholders share upside and downside in combined entity',
            },
            {
              label: 'Signaling',
              a: 'Signals acquirer confidence; seen favorably by target shareholders',
              b: 'May signal acquirer thinks stock is overvalued (using expensive currency)',
            },
            {
              label: 'Balance sheet',
              a: 'Increases leverage; reduces liquidity',
              b: 'No leverage impact; equity base expands',
            },
          ],
        },
        {
          type: 'key-takeaway',
          text: 'In M&A, form of consideration is never purely financial — it signals who bears the post-deal risk and what both sides believe about the acquirer\'s intrinsic value. When an acquirer issues stock, sophisticated sellers always scrutinize whether the acquirer\'s currency is fairly priced.',
        },
      ],
    },

    // ── LBO ───────────────────────────────────────────────────────────────────
    {
      id: 'lbo',
      title: 'LBO Fundamentals',
      group: 'Technical Questions',
      intro:
        'LBO questions are essential for bulge bracket and elite boutique interviews. Even if you\'re not targeting a leveraged finance or sponsor coverage group, you should be able to walk through LBO mechanics and explain the return drivers.',
      blocks: [
        {
          type: 'question',
          question: 'What is a leveraged buyout?',
          difficulty: 'easy',
          category: 'LBO',
          framework: 'Buy with debt, improve operations, repay debt with cash flows, exit at a profit',
          answer:
            'A leveraged buyout is the acquisition of a company — typically by a private equity firm — using a significant amount of borrowed money to fund the purchase price, with the target company\'s future cash flows used to service and repay that debt.\n\nTypical deal structure: 50–70% debt (a mix of senior secured loans, high-yield bonds, and sometimes mezzanine or second-lien debt) and 30–50% equity from the PE sponsor. The target\'s assets and cash flows serve as collateral and debt service coverage.\n\nThe PE firm\'s goal: acquire the business at an attractive valuation, improve its operations or grow it during a 3–7 year hold period, repay the debt with the company\'s cash flows, and sell it — to a strategic acquirer, another PE firm, or via IPO — for more than it paid. Leverage amplifies equity returns because the sponsor puts in less equity upfront; a given increase in business value translates to a much larger percentage return on their invested capital.\n\nSuccess is measured by IRR (internal rate of return) and MOIC (multiple on invested capital). Most PE firms target 20–25%+ IRR and a 2–3× MOIC.',
          followUps: [
            'Why does leverage amplify equity returns?',
            'What\'s the difference between a financial sponsor (PE) LBO and a management buyout (MBO)?',
            'How does an LBO differ from a standard acquisition?',
          ],
        },
        {
          type: 'question',
          question: 'What characteristics make a good LBO candidate?',
          difficulty: 'medium',
          category: 'LBO',
          framework: 'Stable FCF → Strong margins → Defensible position → Improvement potential → Clear exit',
          answer:
            'PE firms look for these characteristics:\n\n1. Stable, predictable free cash flows: Debt must be serviced regardless of business conditions. Highly cyclical businesses with volatile cash flows are poor LBO candidates.\n\n2. Strong margins and low capex requirements: High EBITDA margins and limited reinvestment needs mean more cash is available for debt repayment rather than being consumed by the business.\n\n3. Defensible market position: Pricing power, loyal customers, or switching costs protect cash flows and margins under new ownership with significant leverage.\n\n4. Clear operational improvement opportunities: PE firms add value through cost rationalization, bolt-on acquisitions, geographic expansion, or pricing optimization. They need a thesis for how to grow EBITDA.\n\n5. Reasonable entry valuation: Paying a sensible multiple limits required leverage and creates margin of safety.\n\n6. Asset-light model: Businesses that don\'t require heavy ongoing capital investment can direct more cash to debt repayment.\n\n7. Multiple viable exit paths: Strategic buyers, other PE firms, or IPO viability must exist within 3–7 years.\n\nClassic examples: mature consumer brands, SaaS businesses with high retention, business services companies, healthcare services, specialty distribution.',
          followUps: [
            'Why would a high-growth technology company typically be a poor LBO candidate?',
            'How does a company\'s leverage capacity affect deal structuring?',
          ],
        },
        {
          type: 'question',
          question: 'What are the three main drivers of returns in an LBO?',
          difficulty: 'medium',
          category: 'LBO',
          framework: 'EBITDA growth + Multiple expansion + Debt paydown = LBO equity return',
          answer:
            'LBO equity returns come from three distinct levers:\n\n1. EBITDA growth: Growing revenue and/or expanding margins directly increases the exit enterprise value (exit EV = exit EBITDA × exit multiple). This is the most fundamental and controllable driver — PE firms create value by making the business bigger or more profitable.\n\n2. Multiple expansion: Buying at a lower EV/EBITDA multiple than the exit multiple captures the spread as pure return. For example, buying at 7× and selling at 9× on the same EBITDA generates 2 additional turns of value. PE firms don\'t rely on this (markets are unpredictable), but it contributes meaningfully when it occurs.\n\n3. Debt paydown (deleveraging): As the business uses its free cash flows to repay debt over the hold period, equity value increases mechanically — enterprise value stays roughly constant but debt shrinks, so the equity residual grows.\n\nSimple illustration: Buy a company for $100M with $70M debt and $30M equity. If at exit the company is worth $110M with only $50M of debt remaining (from paydown), equity is worth $60M — a 2× MOIC purely from deleveraging, with no EBITDA growth or multiple expansion.',
          followUps: [
            'Which of the three levers do PE firms have the most control over?',
            'How sensitive are returns to a 1-turn change in exit multiple?',
            'What is "multiple arbitrage" in private equity?',
          ],
        },
        {
          type: 'question',
          question: 'Walk me through the key components of a basic LBO model.',
          difficulty: 'hard',
          category: 'LBO',
          framework: 'Sources & Uses → Debt Schedule → Operating Model → Exit → Returns',
          answer:
            'An LBO model has five core components:\n\n1. Sources & Uses: Determine the total purchase price (entry multiple × LTM EBITDA + net debt). "Uses" shows where the money goes: acquire equity, refinance existing debt, pay transaction fees. "Sources" shows how it\'s funded: senior secured term loans, revolving credit facility, high-yield bonds, mezzanine debt, and PE equity. Sources must equal uses.\n\n2. Debt schedule: Model each debt tranche with its interest rate (fixed or floating), mandatory amortization requirements, cash sweep provisions, and repayment priority. Run for the full hold period. Available free cash flow is swept to pay down the most senior debt first.\n\n3. Operating model: Project P&L and cash flows. Revenue and EBITDA are driven by operating assumptions. Subtract interest expense (from the debt schedule), taxes, capex, and working capital changes to arrive at free cash flow available for debt service.\n\n4. Exit: Apply an exit EV/EBITDA multiple (often similar to entry, sometimes sensitized) to the final projection year\'s EBITDA. Subtract remaining debt to calculate equity proceeds.\n\n5. Returns: Calculate IRR (the rate that equates initial equity invested to exit equity proceeds, accounting for timing) and MOIC (exit equity / initial equity). Key sensitivities: entry multiple, exit multiple, revenue growth rate, EBITDA margin, and leverage ratio.',
          followUps: [
            'What\'s the relationship between the entry multiple and required EBITDA growth to hit a 20% IRR?',
            'How do you determine the right debt capacity for an LBO target?',
            'What is a PIK (payment-in-kind) instrument and when is it used?',
          ],
        },
        {
          type: 'worked-example',
          title: 'LBO Returns: Three Levers in Action',
          scenario:
            'A PE firm acquires a company at 8× LTM EBITDA of $50M ($400M EV). Deal is funded with $280M debt (70%) and $120M equity (30%). After 5 years, EBITDA has grown to $75M, debt has been paid down to $160M, and the firm exits at 9× EBITDA.',
          steps: [
            {
              label: 'Entry',
              content:
                'EV = $400M. Equity invested = $120M. Entry multiple = 8×. Entry EBITDA = $50M.',
            },
            {
              label: 'Exit Enterprise Value',
              content:
                'Exit EV = $75M EBITDA × 9× exit multiple = $675M',
            },
            {
              label: 'Exit Equity Proceeds',
              content:
                'Equity = Exit EV − Remaining Debt = $675M − $160M = $515M',
            },
            {
              label: 'MOIC',
              content:
                'MOIC = $515M / $120M ≈ 4.3× — more than quadrupling invested capital',
            },
            {
              label: 'Return attribution',
              content:
                'EBITDA growth ($50M → $75M): accounts for a portion of EV increase. Multiple expansion (8× → 9×): adds 1 additional turn × $75M = $75M of EV. Debt paydown ($280M → $160M): $120M less debt means $120M more equity proceeds.',
            },
          ],
          result:
            'IRR ≈ 34% over 5 years. Of the $395M equity gain, EBITDA growth drove the largest share, with multiple expansion and deleveraging each contributing meaningfully.',
        },
        {
          type: 'tip',
          title: 'LBO mental math shortcut',
          text: 'A useful rule of thumb: doubling invested equity in 5 years ≈ 15% IRR. Tripling in 5 years ≈ 25% IRR. Quadrupling in 5 years ≈ 32% IRR. Memorize these so you can quickly sanity-check return estimates in the interview.',
        },
      ],
    },

    // ── Behavioral ────────────────────────────────────────────────────────────
    {
      id: 'behavioral',
      title: 'Behavioral Questions',
      intro:
        'Behavioral questions are evaluated just as seriously as technicals, especially in the Superday. Interviewers are assessing genuine motivation, communication clarity, self-awareness, and cultural fit. Prepare specific, practiced answers — not scripts.',
      blocks: [
        {
          type: 'tip',
          title: 'The STAR framework',
          text: 'For experience-based questions: Situation (brief context), Task (your responsibility), Action (what YOU specifically did — not "we"), Result (measurable outcome). Keep each story to 90 seconds. Practice until it sounds natural, not rehearsed.',
        },
        {
          type: 'dodont',
          dos: [
            'Use specific, named examples — a real project, a real deal, a real person you worked with',
            'Quantify results where possible ("reduced turnaround time by 40%", "delivered the deck before the 6am deadline")',
            'Say "I" not "we" — interviewers are evaluating your contribution, not the team\'s',
            'Prepare 5–7 distinct stories that can flex across multiple question types',
            'Reference actual research about the bank — specific deals, sector coverage, people you\'ve spoken with',
          ],
          donts: [
            'Give generic answers that any candidate could say ("I\'m hardworking and detail-oriented")',
            'Ramble past 90 seconds — if you haven\'t made your point, you\'ve lost them',
            'Mention compensation as a motivation — even if it\'s true, it\'s not what they want to hear',
            'Bad-mouth former employers, managers, or colleagues under any circumstances',
            'Make up deals or experiences you can\'t speak to in detail — interviewers will probe',
          ],
        },
        {
          type: 'question',
          question: 'Why investment banking?',
          difficulty: 'easy',
          category: 'Motivation',
          framework: 'Origin story → Why IB specifically → Where it takes you',
          answer:
            'A strong answer has three components:\n\n1. A genuine origin story: When and why you first became interested — not "I\'ve always loved finance" but a specific experience. A deal you read about, an internship that exposed you to capital markets, a class or project, or a conversation with a banker.\n\n2. A logical connection to what IB offers: The transaction exposure, breadth of industries covered, analytical rigor, speed of learning, and client relationships. Be specific about what appeals to you, not generic.\n\n3. A forward-looking rationale: Where do you want to be in 5–10 years, and why does IB get you there? Private equity, corporate development, starting a company, staying in banking long-term? IB is often framed as the best two-year apprenticeship in business.\n\nWhat NOT to say: "I want to make a lot of money," "I\'m good at Excel," or anything generic that could apply to any business job. These signal lack of research or genuine interest.',
          followUps: [
            'Why this product group or sector coverage area specifically?',
            'Have you spoken with people at the firm? What did you learn?',
            'How does this role fit your longer-term plan?',
          ],
        },
        {
          type: 'question',
          question: 'Why this bank specifically?',
          difficulty: 'easy',
          category: 'Motivation',
          framework: 'Specific capabilities + People you\'ve met + Fit with your goals',
          answer:
            'The weakest answers reference league table rankings ("you\'re one of the top M&A advisors"). The strongest answers are specific and demonstrate genuine research and outreach.\n\nHit three points: (1) Something specific about the bank\'s deal flow, sector strength, or product capabilities — a recent transaction, a group they dominate, a strategic initiative you admire; (2) Conversations you\'ve had — specific individuals at the firm, what you discussed, what you learned about the culture and team; (3) How this particular platform fits your specific goals (e.g., you want to focus on healthcare TMT transactions and they are a leading advisor in that space).\n\nResearch to do beforehand: Read the bank\'s recent press releases and deal tombstones. Know their revenue breakdown and sector strengths. Talk to at least 2–3 analysts or associates before the interview and reference those conversations specifically.\n\nAvoid: "I liked the culture at your info session," "you\'re ranked #1 in M&A," or anything that could apply equally to any bulge bracket firm.',
          followUps: [
            'Have you spoken with anyone from this group specifically?',
            'What other banks are you interviewing with and why?',
          ],
        },
        {
          type: 'question',
          question: 'Walk me through your resume.',
          difficulty: 'easy',
          category: 'Communication',
          framework: 'Education → Most relevant experience → Supporting experiences → Why IB now',
          answer:
            'This is your 90-second elevator pitch. The goal is not to recite bullet points — the interviewer has your resume in front of them. The goal is to tell a coherent, forward-moving story that leads naturally to "which is why I\'m here today."\n\nStructure: Start with your school and major (briefly). Cover your most relevant experience first — focus on impact and what you learned, not just responsibilities. Mention any supporting experiences that reinforce the story. Close with a one-sentence bridge to why this specific role at this specific firm is the logical next step.\n\nCommon mistakes: running over 2 minutes; spending too much time on early or irrelevant experience; listing responsibilities without showing judgment or impact; sounding like you\'re reading; not practicing until it flows naturally.\n\nThis question sets the tone for the entire interview. Practice it until you could deliver it half-asleep.',
          followUps: [
            'Tell me more about [specific project or experience you mentioned].',
            'What was the most challenging part of that role?',
            'What\'s something that\'s not on your resume that you\'re proud of?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time you worked under significant time pressure.',
          difficulty: 'medium',
          category: 'STAR',
          framework: 'STAR: Situation → Task → Action (your specific decisions) → Result (quantified)',
          answer:
            'Use the STAR framework. Pick an example with genuine stakes — not just a busy week, but a situation where the outcome mattered and the timeline was tight.\n\nStrong examples: a deliverable that required a complete rebuild overnight due to new information, a live project where a key team member was unavailable and you stepped in, an unexpected data issue discovered hours before a client presentation.\n\nFocus on what YOU specifically did: how you triaged, what trade-offs you made, how you communicated with stakeholders, and what quality standards you maintained under pressure. Interviewers want to see your decision-making process, not just that you worked hard.\n\nQuantify the result where possible: "The deliverable was delivered on time and the client proceeded with the transaction" or "We flagged the error before it reached the client and resolved it within 4 hours." Keep it to 90 seconds.',
          followUps: [
            'What would you do differently in hindsight?',
            'How did you manage others involved in that situation?',
            'How do you generally prioritize when everything feels urgent?',
          ],
        },
        {
          type: 'question',
          question: 'What deal or market situation have you been following recently?',
          difficulty: 'medium',
          category: 'Market Awareness',
          framework: 'Parties + Strategic rationale + Structure + Market reaction + Your view',
          answer:
            'This question tests market awareness and genuine intellectual curiosity. You should always have one or two deals prepared — ideally in the sector you\'re interviewing for.\n\nA strong answer covers: (1) who the acquirer and target are, and what each does; (2) the strategic rationale — why this deal makes sense for the buyer; (3) deal structure — cash vs. stock, enterprise value, EV/EBITDA multiple paid; (4) market reaction — did the acquirer\'s stock go up or down at announcement and why; (5) your own informed view on whether this was a smart transaction and what the key risks are.\n\nWhere to find deals: The Wall Street Journal, Bloomberg, Financial Times, and Reuters M&A. Make it a daily habit to read at least one deal story every morning for 4–6 weeks before recruiting.\n\nCommon mistake: naming a deal you cannot speak to in depth. If you mention it, know the multiple, the synergy rationale, and whether the deal has closed or is pending regulatory review.',
          followUps: [
            'What multiple did they pay? Does that seem fair to you?',
            'What are the main risks to this transaction closing or succeeding?',
            'Why do you think the acquirer\'s stock moved the way it did at announcement?',
          ],
        },
        {
          type: 'question',
          question: 'Where do you see yourself in 5 years?',
          difficulty: 'easy',
          category: 'Motivation',
          framework: '2-year analyst foundation → specific next step → clear rationale',
          answer:
            'Be honest and specific. For most IB candidates, the genuine answer involves: spending 2 years as an analyst building technical and deal skills, then moving to a buyside role (private equity, growth equity, hedge fund) or continuing to associate and eventually VP, depending on what you discover you enjoy most.\n\nWhat interviewers want to hear: evidence that you\'ve thought deliberately about your career, that IB is a meaningful and logical step in a coherent plan, and that you\'re not just using it as a default or placeholder.\n\nDon\'t say: "I want to be a CEO in 5 years" (not credible) or "I\'m not sure yet" (signals lack of direction) or "I want to stay in banking forever" unless you genuinely mean it and can explain why.\n\nDo say: A specific, realistic path that flows logically from the IB experience — with the honest acknowledgment that your view may evolve as you learn more about what you enjoy.',
          followUps: [
            'Why that specific path over staying in banking?',
            'Have you thought about which types of buyside firms or sectors interest you most?',
          ],
        },
      ],
    },

    // ── Interview Process ─────────────────────────────────────────────────────
    {
      id: 'process',
      title: 'Interview Process',
      intro:
        'Understanding the structure of IB recruiting helps you prepare the right material for each stage and avoid being caught off guard by the format.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical recruiting stages',
          items: [
            'Online application & resume screen — resume, GPA, and school filter. Network to get referrals before applying.',
            'HireVue / recorded video interview — 3–5 behavioral questions, 30 seconds to prepare, 3 minutes to answer. Practice on camera until you\'re comfortable. These are often screened by AI before a human reviews them.',
            'First-round interview — 1–2 conversations (phone or video) covering behavioral questions and light technicals. Goal is to establish fit and basic technical competence.',
            'Superday — 4–8 back-to-back 30-minute interviews with analysts, associates, VPs, and MDs. Full technical and behavioral depth. Often includes a case study or modeling test at some firms.',
            'Offer and exploding deadline — most full-time and summer offers come with short decision windows. Have your preference ranking ready before Superday.',
          ],
        },
        {
          type: 'tip',
          title: 'Superday strategy',
          text: 'Treat every interview in the Superday as if it\'s the deciding one — you don\'t know whose vote carries the most weight. Analysts often have significant input on fit decisions. Be equally engaged with the most junior and most senior person in the room.',
        },
        {
          type: 'warning',
          title: 'HireVue common mistakes',
          text: 'Don\'t look down at notes — it\'s immediately obvious on camera and signals you\'re reading. Don\'t ramble past the time limit. Look directly at the camera, not at your own face on screen. Record practice sessions and watch them back before the real interview.',
        },
        {
          type: 'bullets',
          title: 'Questions to ask your interviewers',
          items: [
            'What has surprised you most about working here versus your expectations going in?',
            'What types of transactions has your group been most active in recently?',
            'How does the firm think about associate development and promotion?',
            'What does a strong first-year analyst do differently from an average one?',
            'Is there anything on my resume you\'d like me to expand on?',
          ],
        },
      ],
    },

    // ── Prep Strategy ─────────────────────────────────────────────────────────
    {
      id: 'prep-strategy',
      title: 'Prep Strategy',
      intro:
        'A structured preparation plan beats intensive last-minute cramming. Four to six weeks is the right window for most candidates.',
      blocks: [
        {
          type: 'numbered',
          title: '4-week prep plan',
          items: [
            'Week 1 — Accounting foundation: Master the three-statement walkthrough and the most common accounting scenarios (depreciation, working capital, deferred revenue). Use the Vault Guide or Breaking Into Wall Street as a reference.',
            'Week 2 — Valuation: Build a simple comps and precedent transactions analysis from scratch. Walk through the DCF end-to-end without notes. Understand WACC components cold.',
            'Week 3 — M&A and LBO: Work through accretion/dilution logic and build a basic LBO model. Practice the LBO return driver framework until you can explain it in 2 minutes.',
            'Week 4 — Behavioral and mock interviews: Lock in your 5–7 behavioral stories (one per common theme: leadership, pressure, conflict, teamwork, failure, initiative). Do at least 3 full mock interviews with someone who will give honest feedback. Follow 2–3 current deals daily.',
          ],
        },
        {
          type: 'tip',
          title: 'Use active recall, not passive reading',
          text: 'Close the guide and try to explain each concept out loud from memory. This is dramatically more effective than re-reading. Record yourself answering questions and watch the playback — you\'ll catch filler words, pacing issues, and confidence gaps that you won\'t notice in the moment.',
        },
        {
          type: 'bullets',
          title: 'Resources',
          items: [
            'Breaking Into Wall Street (BIWS) — best modelling course for IB technicals',
            'Vault Guide to Finance Interviews — solid reference for accounting and valuation concepts',
            'Wall Street Prep — alternative to BIWS with good M&A and LBO coverage',
            'WSJ, Bloomberg, FT — read daily for deal flow and market awareness',
            'Mergermarket / Refinitiv — for deal database and sector league tables',
            'Interview Pilot — practice answering these questions live under realistic interview conditions',
          ],
        },
        {
          type: 'warning',
          title: 'Don\'t neglect networking',
          text: 'At most banks, a referral from an insider meaningfully improves your chances of getting an interview. Start reaching out 8–12 weeks before applications open. A 15-minute informational call where you ask thoughtful questions and follow up with a thank-you note is far more impactful than a cold application.',
        },
      ],
    },
  ],
}
