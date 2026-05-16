import type { InterviewGuide } from '#data/interview-guides'

export const consultingGuide: InterviewGuide = {
  slug: 'consulting',
  title: 'Consulting Interview Guide',
  description:
    'Prepare for consulting interviews with case frameworks, profitability, market sizing, market entry, growth strategy, operations, charts, mental math, and fit questions.',
  role: 'Consultant',
  industry: 'Consulting',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 35,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Consulting interviews test whether you can structure ambiguous business problems, prioritize the highest-impact analysis, use numbers cleanly, interpret evidence, and communicate a practical recommendation under pressure.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '3-6', label: 'Typical interview rounds' },
            { value: '25-40 min', label: 'Typical case length' },
            { value: '5+', label: 'Core case types' },
            { value: '4-8 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What consulting interviewers are evaluating',
          items: [
            'Structuring: can you break an ambiguous business problem into a clear, MECE issue tree?',
            'Business judgment: can you focus on what matters instead of boiling the ocean?',
            'Quantitative ability: can you calculate accurately, sanity-check numbers, and explain implications?',
            'Synthesis: can you turn analysis into a crisp recommendation with risks and next steps?',
            'Client readiness: can you communicate clearly, professionally, and confidently under pressure?',
            'Coachability: can you respond to hints, correct course, and integrate new information quickly?',
            'Leadership and fit: can you show ownership, teamwork, resilience, and impact in past experiences?',
          ],
        },
        {
          type: 'tip',
          title: 'The case is not a math contest',
          text:
            'Strong candidates use math to support judgment. The goal is not to show every possible calculation. The goal is to identify the decisive analysis, compute it cleanly, and explain what it means for the client decision.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Consulting Interview Process',
      intro:
        'Consulting recruiting usually combines behavioral fit, case interviews, market sizing, chart interpretation, and sometimes written cases or group cases depending on firm and region.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical consulting interview stages',
          items: [
            'Resume and application screen: evaluates academic record, work experience, leadership, impact, and structured achievement.',
            'Recruiter or first-round screen: covers motivation, communication, office preference, and basic fit.',
            'First-round interviews: usually one behavioral section and one case interview per interviewer.',
            'Final-round interviews: often led by partners or senior managers, with more ambiguous cases and heavier emphasis on judgment and fit.',
            'Written or presentation case: some firms ask candidates to analyze a packet and present a recommendation.',
            'Offer decision: interviewers compare problem solving, communication, business judgment, leadership, and coachability.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Case Interview',
          columnB: 'Fit / Behavioral Interview',
          rows: [
            {
              label: 'Main question',
              a: 'Can you solve an ambiguous business problem like a consultant?',
              b: 'Can you work with clients and teams under pressure?',
            },
            {
              label: 'Strong signal',
              a: 'Clear structure, prioritized analysis, clean math, insight, and concise recommendation',
              b: 'Specific stories with leadership, conflict, impact, resilience, and self-awareness',
            },
            {
              label: 'Common mistake',
              a: 'Using memorized frameworks without adapting to the client problem',
              b: 'Giving generic teamwork stories without stakes or measurable outcome',
            },
            {
              label: 'Best preparation',
              a: 'Live case practice, drills, business intuition, chart reading, and synthesis',
              b: 'Prepare 6-8 stories using a clear structure and firm-specific values',
            },
          ],
        },
        {
          type: 'warning',
          title: 'Avoid sounding framework-driven',
          text:
            'Frameworks are training wheels. Interviewers can tell when a candidate forces profit, market, competition, and customers into every case. Build a structure specific to the prompt, client objective, and constraints.',
        },
      ],
    },
    {
      id: 'case-foundation',
      title: 'Case Interview Foundation',
      group: 'Case Interviews',
      intro:
        'A strong case interview follows a consistent rhythm: clarify the objective, build a tailored structure, analyze the most important branch, synthesize frequently, and end with a recommendation.',
      blocks: [
        {
          type: 'numbered',
          title: 'A reliable case interview flow',
          items: [
            'Clarify the objective: client, business model, goal, metric, geography, timeframe, and constraints.',
            'Restate the problem in your own words so the interviewer knows you understand the question.',
            'Build a tailored issue tree that is mutually exclusive, collectively exhaustive, and decision-oriented.',
            'Prioritize the highest-impact branch first instead of walking mechanically through every bucket.',
            'Ask for data only when it supports a hypothesis or helps eliminate a branch.',
            'Do math cleanly: set up the equation, calculate step by step, state units, and sanity-check the result.',
            'Synthesize after each major exhibit or calculation: what did we learn and what does it imply?',
            'End with a clear recommendation, 2-3 supporting reasons, risks, and next steps.',
          ],
        },
        {
          type: 'key-term',
          title: 'Consulting case concepts to know',
          terms: [
            {
              term: 'MECE',
              definition:
                'Mutually exclusive and collectively exhaustive. A MECE structure avoids overlap while covering the full problem space.',
            },
            {
              term: 'Issue tree',
              definition:
                'A logical breakdown of the problem into branches and sub-branches that guide analysis toward a decision.',
            },
            {
              term: 'Hypothesis-driven approach',
              definition:
                'Starting with a plausible answer or key driver, then testing it with focused analysis rather than exploring everything equally.',
            },
            {
              term: 'Synthesis',
              definition:
                'A concise statement of what the analysis means and how it affects the client decision. It is not a recap of everything you did.',
            },
          ],
        },
        {
          type: 'dodont',
          dos: [
            'Ask clarifying questions before building the structure',
            'Label branches in client language, not generic textbook language',
            'State your hypothesis and update it as new data arrives',
            'Use units on every calculation',
            'Pause to synthesize after exhibits and math',
          ],
          donts: [
            'Force a memorized framework onto every case',
            'Ask for data without saying why you need it',
            'Do silent math for long periods',
            'Give a recommendation without risks or next steps',
            'Ignore interviewer hints because you are attached to your structure',
          ],
        },
      ],
    },
    {
      id: 'profitability-cases',
      title: 'Profitability Cases',
      group: 'Case Interviews',
      intro:
        'Profitability cases are common because they test structure, business intuition, and quantitative discipline. The key is to identify whether the issue is revenue, cost, mix, price, volume, or operational efficiency.',
      blocks: [
        {
          type: 'formula',
          label: 'Core profitability equation',
          formula: 'Profit = Revenue - Cost\nRevenue = Price x Volume\nCost = Fixed Cost + Variable Cost',
          note:
            'Use this as a starting point, not a complete framework. Real cases often require mix, channels, capacity, customer segments, and competitive dynamics.',
        },
        {
          type: 'question',
          question: 'A restaurant chain\'s profits have declined 20% over the past year. How would you investigate?',
          difficulty: 'medium',
          category: 'Profitability',
          framework: 'Clarify -> split profit -> segment -> diagnose driver -> recommend',
          answer:
            'First clarify the objective: restore profit, understand root cause, or decide whether to close locations. Ask about geography, timeframe, whether decline is same-store or total chain, and whether revenue or margin changed.\n\nStructure the problem into revenue and cost. Revenue can be broken into price, traffic, average order size, product mix, and channel mix such as dine-in, takeout, and delivery. Costs can be broken into food cost, labor, rent, utilities, delivery platform fees, marketing, and overhead.\n\nI would segment by store, region, daypart, customer type, and channel. If profits declined mainly in delivery-heavy stores, platform fees and packaging costs may be the issue. If traffic fell across all stores, demand, competition, pricing, or customer experience may be driving it. If revenue is flat but margin fell, input costs or labor efficiency may be the driver.\n\nRecommendation depends on root cause. If food costs rose, renegotiate suppliers, adjust menu mix, or selectively raise prices. If traffic fell due to competitors, improve local marketing or menu differentiation. If delivery is unprofitable, change delivery pricing or channel strategy. I would include risks such as customer pushback from price increases and operational complexity.',
          followUps: [
            'What data would you ask for first?',
            'How would you separate price versus volume impact?',
            'What if revenue increased but profit declined?',
          ],
        },
        {
          type: 'question',
          question: 'An airline route is unprofitable. Should the airline cut it?',
          difficulty: 'hard',
          category: 'Profitability / Operations',
          framework: 'Route economics -> network value -> alternatives -> recommendation',
          answer:
            'I would not decide based only on route-level profit. Airlines have network effects: an unprofitable route may feed profitable connecting flights, preserve airport slots, support loyalty customers, or serve strategic markets.\n\nStart with route economics: passenger volume, ticket price, load factor, revenue mix, cargo revenue, variable costs, aircraft utilization, fuel, crew, landing fees, maintenance, and allocated fixed costs. Separate avoidable costs from allocated overhead because cutting the route may not remove all costs.\n\nThen evaluate strategic value: connecting traffic, competitive presence, corporate contracts, loyalty impact, airport slot constraints, and alternatives for aircraft deployment. If the aircraft can be redeployed to a more profitable route, opportunity cost matters.\n\nRecommendation: cut the route only if it is unprofitable on an avoidable-cost basis, has limited network or strategic value, and aircraft capacity can be redeployed more profitably. Otherwise, consider improving schedule, aircraft size, pricing, partnerships, or marketing before exiting.',
          followUps: [
            'What costs are avoidable if the route is cut?',
            'How would load factor affect your recommendation?',
            'What if the route feeds international flights?',
          ],
        },
        {
          type: 'question',
          question: 'A manufacturer\'s margins are declining despite stable sales. What could be happening?',
          difficulty: 'medium',
          category: 'Profitability',
          framework: 'Price, mix, variable cost, fixed cost, productivity',
          answer:
            'If sales are stable but margins are declining, revenue volume may not be the problem. I would investigate price realization, product mix, input costs, labor productivity, overhead, discounting, warranty costs, and capacity utilization.\n\nRevenue-side margin pressure could come from more discounts, shift toward lower-margin products, channel mix changes, or customers negotiating lower prices. Cost-side pressure could come from raw material inflation, labor cost increases, energy cost increases, supplier issues, freight costs, scrap, rework, or underutilized plants.\n\nI would segment margin by product line, customer, geography, plant, and channel. A mix shift can hide inside stable total sales. For example, total revenue may be flat while high-margin products decline and low-margin products grow.\n\nRecommendations could include pricing actions, supplier renegotiation, product mix management, SKU rationalization, automation, process improvement, or capacity consolidation. The right answer depends on which driver explains most of the margin decline.',
          followUps: [
            'How would you quantify product mix impact?',
            'What if raw material costs rose 15%?',
            'How would you avoid hurting customer relationships with price increases?',
          ],
        },
      ],
    },
    {
      id: 'market-sizing',
      title: 'Market Sizing Questions',
      group: 'Case Interviews',
      intro:
        'Market sizing questions test structured estimation, clean assumptions, mental math, and sanity checks. Interviewers care less about the exact number and more about whether your approach is logical.',
      blocks: [
        {
          type: 'numbered',
          title: 'A practical market sizing flow',
          items: [
            'Clarify what is being sized: units, revenue, annual demand, installed base, or addressable market.',
            'Choose a top-down or bottom-up approach. Top-down starts with population; bottom-up starts with usage occasions or supply points.',
            'Segment the market when behavior differs meaningfully across groups.',
            'Make round, defensible assumptions and state them clearly.',
            'Calculate step by step with units attached.',
            'Sanity-check the final number against common sense, known benchmarks, or alternative approaches.',
          ],
        },
        {
          type: 'question',
          question: 'Estimate the annual market size for coffee sold in New York City.',
          difficulty: 'medium',
          category: 'Market Sizing',
          framework: 'Population -> coffee drinkers -> frequency -> cups -> price',
          answer:
            'I would size annual revenue from purchased coffee, not home-brewed coffee, unless the interviewer says otherwise. NYC has roughly 8 million residents. Add commuters and tourists, but to keep the math simple, assume the resident base plus visitors averages to about 9 million people present on a typical day.\n\nAssume 60% drink coffee: 5.4 million people. Segment frequency: 30% heavy buyers purchase 1 cup per day, 40% moderate buyers purchase 3 cups per week, and 30% light buyers purchase 1 cup per week. That gives weekly purchased cups: heavy 1.62M x 7 = 11.3M, moderate 2.16M x 3 = 6.5M, light 1.62M x 1 = 1.6M. Total about 19.4M cups per week.\n\nAnnual cups: roughly 19.4M x 52 = 1.0B cups. If average price is $4, annual market size is about $4B.\n\nSanity check: NYC has dense office, tourist, and cafe demand, so a multi-billion-dollar annual coffee market is plausible. I would mention that the estimate is sensitive to average price and whether we include convenience stores, restaurants, and home coffee.',
          followUps: [
            'How would the estimate change if we only count specialty coffee shops?',
            'What assumptions matter most?',
            'How would you validate the estimate?',
          ],
        },
        {
          type: 'question',
          question: 'Estimate the number of electric vehicle charging stations needed in California.',
          difficulty: 'hard',
          category: 'Market Sizing / Operations',
          framework: 'EV fleet -> charging demand -> home charging -> public sessions -> charger utilization',
          answer:
            'Clarify whether we are estimating public charging ports or station locations. I would estimate public charging ports needed for daily demand.\n\nStart with EV fleet. Suppose California has about 2 million EVs in the near term. Assume 70% of charging happens at home or work, leaving 30% for public charging. If an average EV needs 40 kWh per week and 30% is public, that is 12 kWh public charging per EV per week. Across 2M EVs, public demand is 24M kWh per week.\n\nAssume an average public charger session delivers 40 kWh, so that is 600,000 public sessions per week, or about 86,000 sessions per day. If one charging port can support 6 sessions per day on average after accounting for utilization, downtime, and uneven demand, California would need around 14,000 public charging ports.\n\nThen adjust upward for geographic coverage, peak demand, highway corridors, low-income neighborhoods, reliability, and future growth. The answer should be framed as a directional estimate, not a precise infrastructure plan.',
          followUps: [
            'What changes for fast chargers versus level 2 chargers?',
            'How would geography affect the estimate?',
            'What utilization assumption matters most?',
          ],
        },
      ],
    },
    {
      id: 'market-entry-growth',
      title: 'Market Entry and Growth Strategy Cases',
      group: 'Case Interviews',
      intro:
        'Market entry and growth cases test whether you can evaluate attractiveness, competitive position, economics, execution feasibility, and strategic fit.',
      blocks: [
        {
          type: 'question',
          question: 'A U.S. meal kit company is considering entering Germany. How would you evaluate the opportunity?',
          difficulty: 'medium',
          category: 'Market Entry',
          framework: 'Market attractiveness -> competitive landscape -> economics -> capabilities -> entry plan',
          answer:
            'I would evaluate five areas: market attractiveness, competition, unit economics, operational feasibility, and strategic fit.\n\nMarket attractiveness includes population, target households, online grocery adoption, meal kit awareness, disposable income, cooking habits, and growth rate. Competition includes local meal kit players, grocery delivery, restaurants, and supermarkets. We need to know whether the market is underserved or already saturated.\n\nEconomics include customer acquisition cost, average order value, gross margin, packaging and delivery costs, retention, and payback period. Meal kits often struggle if CAC is high and repeat rates are weak.\n\nOperational feasibility matters heavily: supplier network, fulfillment centers, cold chain logistics, delivery density, food regulations, localization, recipes, and customer service language. Strategic fit includes whether Germany can become a beachhead for Europe and whether the company has capabilities that transfer.\n\nRecommendation would depend on evidence. I might recommend a pilot in one dense city like Berlin or Munich before national rollout, with clear success metrics around CAC, retention, gross margin, delivery reliability, and repeat orders.',
          followUps: [
            'What data would you need before launch?',
            'How would you design the pilot?',
            'What would make you recommend against entry?',
          ],
        },
        {
          type: 'question',
          question: 'A streaming service wants to grow subscribers. What levers would you analyze?',
          difficulty: 'medium',
          category: 'Growth Strategy',
          framework: 'Acquire -> activate -> retain -> monetize -> expand',
          answer:
            'I would break subscriber growth into acquisition, activation, retention, monetization, and expansion. Acquisition includes brand, content slate, partnerships, pricing, paid marketing, bundles, and geographic expansion. Activation includes trial experience, onboarding, first content watched, and profile setup. Retention includes content engagement, recommendation quality, release cadence, price-value perception, and churn drivers.\n\nMonetization includes plan mix, ad tier, pricing, password sharing policy, and upsell. Expansion includes new geographies, demographics, devices, sports, live events, gaming, or partnerships.\n\nI would quantify each lever: subscriber impact, cost, time to execute, confidence, and risks. For example, lowering price may increase subscribers but hurt ARPU. Investing in premium content may reduce churn but require large upfront spend. Partnerships may drive acquisition but reduce margin.\n\nThe strongest recommendation should identify the highest-ROI lever for the company context. If churn is the main issue, acquisition spend may be wasteful. If awareness is low in a new market, partnerships or localized content may matter more.',
          followUps: [
            'What metrics would diagnose churn?',
            'How would you evaluate a price decrease?',
            'What if subscriber growth increases but revenue declines?',
          ],
        },
        {
          type: 'question',
          question: 'A retailer wants to launch a loyalty program. Should they do it?',
          difficulty: 'medium',
          category: 'Growth / Customer Strategy',
          framework: 'Objective -> customer behavior -> economics -> design -> risks',
          answer:
            'First clarify the objective: increase repeat purchases, raise basket size, collect customer data, defend against competitors, or shift customers to owned channels. A loyalty program should be judged against that goal.\n\nAnalyze current customer behavior: purchase frequency, retention, average order value, margin, customer segments, and whether customers already behave loyally. If customers are naturally frequent and price-sensitive, rewards may subsidize behavior that would have happened anyway.\n\nEconomics include reward cost, incremental revenue, margin impact, breakage, technology cost, fraud, and operational complexity. Design choices include points, tiers, personalized offers, free shipping, exclusive access, or partner rewards.\n\nRecommendation: launch if the program creates incremental behavior, improves data capture, and has positive unit economics. Start with a pilot and compare members to a matched control group or randomized rollout to measure incrementality.',
          followUps: [
            'How would you measure incrementality?',
            'What customer segments would you target first?',
            'What risks can make loyalty programs unprofitable?',
          ],
        },
      ],
    },
    {
      id: 'operations-cases',
      title: 'Operations and Process Improvement Cases',
      group: 'Case Interviews',
      intro:
        'Operations cases test whether you can identify bottlenecks, capacity constraints, cost drivers, and process changes. They are common in retail, airlines, healthcare, logistics, and manufacturing cases.',
      blocks: [
        {
          type: 'question',
          question: 'A hospital emergency department has long wait times. How would you reduce them?',
          difficulty: 'hard',
          category: 'Operations',
          framework: 'Demand -> capacity -> process flow -> bottlenecks -> interventions',
          answer:
            'I would start by mapping patient flow: arrival, triage, registration, waiting, provider evaluation, tests, treatment, discharge or admission. Then identify where queues form and whether the issue is demand spikes, staffing, room availability, diagnostics, inpatient bed constraints, or discharge delays.\n\nDemand analysis: arrivals by hour, day, severity, ambulance versus walk-in, and seasonal patterns. Capacity analysis: doctors, nurses, rooms, lab/radiology turnaround, specialist availability, and inpatient beds. Process analysis: triage time, time to provider, test ordering, results wait, decision time, and discharge processing.\n\nInterventions depend on bottleneck. If low-acuity patients clog the system, create fast track care. If lab turnaround is slow, improve diagnostic workflow. If admitted patients wait for inpatient beds, the ED may be blocked by hospital-wide discharge delays. If staffing mismatches demand peaks, adjust schedules.\n\nSuccess metrics: door-to-provider time, total length of stay, left-without-being-seen rate, patient outcomes, readmissions, staff utilization, and patient satisfaction. Guardrails are clinical quality and safety.',
          followUps: [
            'What data would you request first?',
            'How would you distinguish demand and capacity problems?',
            'What if wait times improve but patient outcomes worsen?',
          ],
        },
        {
          type: 'question',
          question: 'A delivery company wants to reduce late deliveries. How would you approach it?',
          difficulty: 'medium',
          category: 'Operations / Logistics',
          framework: 'Define lateness -> segment -> root cause -> intervention -> monitor',
          answer:
            'First define late: relative to promised window, customer expectation, internal SLA, or regulatory requirement. Then segment late deliveries by geography, route, driver, warehouse, carrier, product type, time of day, day of week, weather, and order size.\n\nRoot causes could include warehouse pick/pack delays, inventory inaccuracies, routing inefficiency, traffic, driver capacity, unrealistic delivery promises, address errors, failed handoffs, or last-mile carrier performance.\n\nI would map the delivery funnel from order placement to fulfillment, dispatch, transit, and doorstep delivery. Identify the largest source of delay and whether it is controllable. If promises are too aggressive, fix ETA logic. If warehouse processing is slow, improve staffing or batching. If routes are inefficient, optimize routing and driver allocation.\n\nMetrics: on-time delivery rate, lateness minutes, cost per delivery, failed delivery rate, customer complaints, refund/credit cost, driver utilization, and SLA performance by segment.',
          followUps: [
            'How would weather affect your analysis?',
            'What if reducing lateness increases cost?',
            'How would you pilot the solution?',
          ],
        },
      ],
    },
    {
      id: 'charts-math',
      title: 'Charts, Data Interpretation, and Mental Math',
      group: 'Case Skills',
      intro:
        'Consulting cases often include exhibits. Strong candidates read the title, axes, units, segments, and trend before jumping into interpretation.',
      blocks: [
        {
          type: 'numbered',
          title: 'How to read a case exhibit',
          items: [
            'Read the title and understand what business question the exhibit supports.',
            'Check axes, units, timeframe, base size, and whether numbers are absolute or percentage values.',
            'Identify the biggest pattern first: trend, outlier, gap, mix shift, or inflection point.',
            'Quantify the pattern with simple math instead of vague language.',
            'Interpret what it means for the case objective.',
            'Ask for the next data point only after stating a hypothesis.',
          ],
        },
        {
          type: 'question',
          question: 'A chart shows revenue growing 10% while profit is down 15%. What would you infer?',
          difficulty: 'medium',
          category: 'Chart Interpretation',
          framework: 'Revenue up, margin down -> price, mix, cost, investment',
          answer:
            'The immediate inference is that margin has declined. Revenue growth is not translating into profit, so either costs grew faster than revenue, product/customer mix shifted toward lower-margin segments, discounting increased, or the company invested heavily in growth.\n\nI would quantify margin before and after if the chart provides absolute numbers. Then segment by product, channel, geography, customer type, and cost category. If revenue grew through promotions, gross margin may be lower. If growth came from a new geography, logistics or launch costs may be high. If revenue came from low-margin products, mix is the issue.\n\nThe case implication depends on sustainability. If profit decline is due to temporary growth investment with strong customer lifetime value, it may be acceptable. If it is due to structural cost inflation or poor pricing power, the company needs pricing, cost reduction, or mix improvement.',
          followUps: [
            'What data would you ask for next?',
            'How would you separate mix from cost impact?',
            'Could this be a good outcome?',
          ],
        },
        {
          type: 'question',
          question: 'How do you handle mental math under pressure?',
          difficulty: 'easy',
          category: 'Mental Math',
          framework: 'Round -> structure -> calculate -> sanity-check',
          answer:
            'I structure the equation before calculating. Then I use round numbers where appropriate, keep units visible, and calculate in steps. For example, instead of multiplying 37 x 4.8M directly, I might round to 40 x 5M for an estimate, then refine if precision matters.\n\nI also sanity-check magnitude. If I estimate a coffee market and get $400 per person per day, something is wrong. Consulting math is not about being a calculator; it is about producing a reliable directional answer quickly.\n\nIf I make a mistake, I correct it calmly. Interviewers care more about composure and structured correction than perfection.',
          followUps: [
            'When is rounding acceptable?',
            'How precise should case math be?',
            'What if you realize your calculation is wrong?',
          ],
        },
      ],
    },
    {
      id: 'recommendations',
      title: 'Recommendations and Synthesis',
      group: 'Case Skills',
      intro:
        'The final recommendation is where many candidates lose points. A strong recommendation is direct, evidence-backed, practical, and honest about risks.',
      blocks: [
        {
          type: 'question',
          question: 'How should you deliver a final case recommendation?',
          difficulty: 'easy',
          category: 'Synthesis',
          framework: 'Answer first -> reasons -> risks -> next steps',
          answer:
            'Lead with the answer. Do not recap the entire case chronologically. A strong final recommendation sounds like: “I recommend the client enter the German market through a Berlin pilot because the market is growing, unit economics appear attractive, and the company has transferable logistics capabilities.”\n\nThen give 2-3 supporting reasons with numbers if available. After that, state risks: competitive response, customer acquisition cost, operational complexity, regulation, or implementation timeline. Finally, give next steps: validate assumptions, run a pilot, negotiate suppliers, collect customer data, or refine pricing.\n\nThe recommendation should be decisive but not reckless. If the evidence is incomplete, say what decision can be made now and what must be validated before full rollout.',
          followUps: [
            'What if the data is mixed?',
            'How many reasons should you include?',
            'Should you mention risks if the interviewer does not ask?',
          ],
        },
        {
          type: 'worked-example',
          title: 'Strong final recommendation structure',
          scenario:
            'The client is considering launching a loyalty program after analysis shows high churn among occasional shoppers.',
          steps: [
            {
              label: 'Recommendation',
              content:
                'I recommend launching a targeted loyalty pilot for occasional shoppers rather than a broad program for all customers.',
            },
            {
              label: 'Support',
              content:
                'This segment has the largest retention gap, the economics are more attractive than rewarding already-loyal customers, and the pilot limits upfront cost.',
            },
            {
              label: 'Risks',
              content:
                'The main risks are subsidizing behavior that would have happened anyway, operational complexity, and customer confusion if rewards are too complicated.',
            },
            {
              label: 'Next steps',
              content:
                'Run a randomized pilot, measure incremental repeat purchases and margin, then scale only if payback is positive.',
            },
          ],
          result:
            'This structure is concise, decision-oriented, and client-ready.',
        },
      ],
    },
    {
      id: 'fit-behavioral',
      title: 'Fit and Behavioral Questions',
      intro:
        'Consulting fit interviews test whether you can work with demanding clients, lead teams, handle ambiguity, and communicate impact. McKinsey PEI and other firm fit interviews require specific, high-stakes stories.',
      blocks: [
        {
          type: 'tip',
          title: 'Prepare stories like case examples',
          text:
            'A fit answer should have structure, stakes, action, and result. The best stories show what you personally did, what tradeoff or conflict existed, and what changed because of your actions.',
        },
        {
          type: 'question',
          question: 'Why consulting?',
          difficulty: 'easy',
          category: 'Fit',
          framework: 'Problem solving -> impact -> learning curve -> client exposure',
          answer:
            'A strong answer should be specific and credible. Good themes include solving ambiguous business problems, working across industries, learning quickly, having measurable client impact, and collaborating with high-performing teams.\n\nAvoid saying only that you want prestige, travel, exit opportunities, or broad exposure. Those may be true, but they do not show client readiness. Instead, connect consulting to your past experiences: “I enjoyed breaking down ambiguous problems in my strategy internship, working with cross-functional stakeholders, and turning analysis into recommendations leadership could act on.”\n\nThen explain why now and why the firm. Tie your background to the role and mention firm-specific reasons such as industry strength, office culture, mentorship model, or client work.',
          followUps: [
            'Why this firm?',
            'Why not investment banking or product management?',
            'What do consultants actually do?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time you led a team through a difficult challenge.',
          difficulty: 'medium',
          category: 'Behavioral',
          framework: 'Context -> challenge -> action -> result -> reflection',
          answer:
            'Choose a story with real stakes: tight deadline, conflict, unclear direction, underperformance, or changing requirements. Start with the context and why the challenge mattered.\n\nThen focus on your actions. Did you align the team around a goal, divide work, resolve conflict, motivate someone, reset scope, communicate with stakeholders, or make a difficult tradeoff? Use “I” for your specific role while still giving credit to the team.\n\nClose with measurable result and reflection. Consulting interviewers look for leadership, drive, empathy, and learning. A strong ending explains what you would repeat or do differently next time.',
          followUps: [
            'What was the hardest moment?',
            'How did you handle conflict?',
            'What did you learn about leadership?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time you failed.',
          difficulty: 'hard',
          category: 'Behavioral',
          framework: 'Failure -> ownership -> correction -> lesson',
          answer:
            'Pick a real failure, not a disguised strength. The best examples show accountability and growth. Briefly explain what happened, why it mattered, and what you personally could have done better.\n\nThen explain how you responded. Did you communicate early, fix the issue, ask for help, change the plan, or repair trust? Avoid blaming teammates, unclear instructions, or external factors.\n\nEnd with a concrete lesson and evidence that you changed. For example, you now align expectations earlier, create risk checkpoints, validate assumptions, or communicate tradeoffs sooner. Consulting firms want people who can learn quickly under pressure.',
          followUps: [
            'What would you do differently?',
            'How did others react?',
            'How has this changed your working style?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Consulting Interview Prep Strategy',
      intro:
        'Consulting prep should combine live cases, solo drills, mental math, chart interpretation, business reading, and fit story preparation. Passive reading is not enough.',
      blocks: [
        {
          type: 'numbered',
          title: '6-week consulting interview prep plan',
          items: [
            'Week 1: learn case mechanics. Practice opening, clarifying questions, issue trees, basic profitability, and final recommendations.',
            'Week 2: build core case types. Practice profitability, market sizing, market entry, growth, pricing, and operations cases.',
            'Week 3: improve quantitative speed. Drill mental math, break-even, weighted averages, percentages, margins, and exhibit interpretation.',
            'Week 4: practice live cases. Complete 6-10 cases with partners and focus on one weakness at a time: structure, math, creativity, or synthesis.',
            'Week 5: sharpen business judgment. Read business news, annual reports, industry primers, and practice explaining why companies make money.',
            'Week 6: final-round polish. Run realistic mock interviews, prepare fit stories, refine firm-specific answers, and practice concise recommendations.',
          ],
        },
        {
          type: 'bullets',
          title: 'Firm-specific prep',
          items: [
            'McKinsey: prepare for interviewer-led cases, Personal Experience Interview stories, and clear top-down communication.',
            'Bain: prepare for candidate-led cases, private equity-style commercial diligence, customer strategy, and practical recommendations.',
            'BCG: prepare for creative structuring, market strategy, digital/product cases, and hypothesis-driven discussion.',
            'Boutique firms: prepare for industry-specific cases and deeper knowledge of the firm\'s practice areas.',
            'Implementation consulting: prepare for operations, change management, stakeholder alignment, and execution risk.',
          ],
        },
        {
          type: 'warning',
          title: 'Do not over-case without fixing weaknesses',
          text:
            'Doing 50 cases with the same mistakes is not effective prep. Track each case by weakness: opening, structure, math, chart reading, creativity, synthesis, or recommendation. Then drill the weak area deliberately.',
        },
        {
          type: 'key-takeaway',
          text:
            'Great consulting interview answers are structured, hypothesis-driven, quantitative, and client-ready. The goal is not to memorize frameworks. The goal is to show that you can solve unfamiliar business problems with clear thinking and practical judgment.',
        },
      ],
    },
  ],
}
