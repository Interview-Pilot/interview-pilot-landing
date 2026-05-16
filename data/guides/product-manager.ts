import type { InterviewGuide } from '#data/interview-guides'

export const productManagerGuide: InterviewGuide = {
  slug: 'product-manager',
  title: 'Product Manager Interview Guide',
  description:
    'Prepare for product manager interviews with product sense, execution, metrics, strategy, analytical, technical, and behavioral questions.',
  role: 'Product Manager',
  industry: 'Product',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 31,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Product manager interviews test whether you can identify real customer problems, make structured tradeoffs, define success metrics, communicate with cross-functional teams, and drive product decisions with judgment rather than templates.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '4–7', label: 'Typical interview rounds' },
            { value: '5', label: 'Core PM question types' },
            { value: '30–60 min', label: 'Typical case round length' },
            { value: '4–6 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What PM interviewers are evaluating',
          items: [
            'Customer judgment — can you identify the highest-value user problem instead of jumping to features?',
            'Product sense — can you design simple, useful experiences around real constraints?',
            'Execution — can you define success metrics, prioritize, and diagnose product performance?',
            'Strategy — can you reason about markets, competitors, business models, and defensibility?',
            'Analytical rigor — can you structure ambiguous data problems and make decisions with incomplete information?',
            'Leadership — can you influence engineering, design, data, sales, and executives without formal authority?',
          ],
        },
        {
          type: 'tip',
          title: 'The strongest PM answers are opinionated',
          text: 'Good PM candidates are structured. Great PM candidates are structured and decisive. In every case, make a reasonable assumption, say why, and move forward. Interviewers are usually more interested in your judgment than in a perfect answer.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Product Manager Interview Process',
      intro:
        'Most PM loops include a recruiter screen, hiring manager screen, product sense round, execution or metrics round, behavioral round, and sometimes strategy, analytical, technical, or leadership rounds depending on the company.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical PM interview stages',
          items: [
            'Recruiter screen — validates role fit, compensation range, location, experience level, and motivation.',
            'Hiring manager screen — covers your product experience, scope, decision-making style, and whether your background fits the team.',
            'Product sense round — asks you to design or improve a product for a user segment under constraints.',
            'Execution / metrics round — asks you to define success, choose metrics, prioritize, or diagnose a metric change.',
            'Strategy / analytical round — asks about markets, competition, growth, pricing, business models, or experiment design.',
            'Behavioral / leadership round — tests cross-functional influence, conflict resolution, failure, ambiguity, and ownership.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Product Sense',
          columnB: 'Execution',
          rows: [
            {
              label: 'Main question',
              a: 'What should we build, for whom, and why?',
              b: 'How do we ship, measure, prioritize, and debug it?',
            },
            {
              label: 'Strong answer',
              a: 'Segments users, identifies pain points, prioritizes one problem, proposes focused solutions',
              b: 'Defines metrics, tradeoffs, launch plan, risks, and diagnostic steps',
            },
            {
              label: 'Common mistake',
              a: 'Listing features without naming the user problem',
              b: 'Choosing vanity metrics or jumping to fixes before diagnosis',
            },
            {
              label: 'Best signal',
              a: 'Deep customer empathy paired with product judgment',
              b: 'Clear operating discipline and analytical rigor',
            },
          ],
        },
        {
          type: 'warning',
          title: 'Do not memorize frameworks as scripts',
          text: 'Frameworks are useful scaffolding, but PM interviews punish robotic answers. Use structure to organize thinking, then adapt it to the actual prompt, company, user, and business model.',
        },
      ],
    },
    {
      id: 'product-sense',
      title: 'Product Sense Questions',
      group: 'Core PM Questions',
      intro:
        'Product sense questions evaluate whether you can discover the right user problem and design a coherent product experience. The best answers are user-specific, constraint-aware, and easy to reason about.',
      blocks: [
        {
          type: 'question',
          question: 'How would you improve Spotify?',
          difficulty: 'medium',
          category: 'Product Sense',
          framework: 'Clarify goal → Segment users → Pick pain point → Propose solutions → Define metrics',
          answer:
            'I would first clarify the goal. Improving Spotify could mean increasing retention, listening time, paid conversion, creator satisfaction, or social sharing. I will assume the goal is to improve retention for casual listeners who open Spotify a few times per week but do not have strong listening habits.\n\nSegment users: casual listeners, power users, podcast listeners, playlist curators, artists, and advertisers. I would prioritize casual listeners because they likely have lower retention and more room for habit formation.\n\nPain point: casual listeners often do not know what to play. Search requires intent, and recommendations can feel repetitive. The product problem is reducing decision fatigue when a user wants music but has no specific song in mind.\n\nSolution 1: a lightweight mood-based launcher on the home screen: “Focus,” “Commute,” “Workout,” “Relax,” and “Discover.” Each starts a personalized station immediately. Solution 2: a “Why this?” control that lets users quickly tune recommendations by saying “less like this,” “more vocals,” or “newer music.” Solution 3: a weekly “Rediscover” playlist that mixes forgotten favorites with new adjacent songs.\n\nI would start with the mood-based launcher because it directly reduces time-to-play and is easy to test. Success metrics: D1/D7 retention for casual listeners, sessions per weekly active user, time to first play, skips in first 5 minutes, and long-term playlist saves. Guardrails: avoid hurting premium conversion, artist diversity, or recommendation quality for power users.',
          followUps: [
            'How would you adapt this for podcast users?',
            'What would you do if engagement went up but retention stayed flat?',
            'How would you test this without hurting the existing home experience?',
          ],
        },
        {
          type: 'question',
          question: 'Design a product for college students looking for internships.',
          difficulty: 'medium',
          category: 'Product Sense',
          framework: 'User segment → Journey → Pain point → MVP → Metrics',
          answer:
            'I would focus on sophomore and junior students applying for internships in competitive fields like tech, finance, consulting, and marketing. The user journey has five stages: discovering roles, understanding requirements, preparing materials, applying, and interviewing.\n\nThe biggest pain point is not simply finding internships. It is knowing what to do next and whether they are competitive for a specific role. Students often apply blindly, miss deadlines, and do not know how to prioritize prep.\n\nMVP: an internship command center. A student enters target roles, graduation year, school, major, and experience. The product creates a deadline tracker, recommends target companies, identifies resume gaps, and generates a weekly prep plan. It should also include application status tracking and interview prep recommendations based on role type.\n\nCore features: deadline calendar, role-fit score, resume checklist, application tracker, interview prep module, and reminders. I would avoid building a social network or generic job board initially because those are crowded and do not solve the planning problem.\n\nSuccess metrics: weekly active users, applications tracked per user, completed prep tasks, interview conversion rate, and retained users across the recruiting season. Guardrails: accuracy of role recommendations, user trust, and avoiding overconfidence from the fit score.',
          followUps: [
            'What would you build first if you only had 6 weeks?',
            'How would this differ for MBA students?',
            'How would you monetize this product?',
          ],
        },
        {
          type: 'question',
          question: 'What is your favorite product and how would you improve it?',
          difficulty: 'easy',
          category: 'Product Sense',
          framework: 'Why it works → User/job-to-be-done → Weakness → Improvement → Metric',
          answer:
            'Pick a product you genuinely use and can analyze beyond surface-level praise. A strong answer should explain the job-to-be-done, why the product succeeds, where it falls short, and one focused improvement.\n\nExample using Google Maps: I like Google Maps because it solves a high-frequency, high-stakes job: getting from point A to point B with confidence. Its strengths are reliable routing, strong local data, real-time traffic, and broad coverage. The weakness I would focus on is decision overload when choosing restaurants or places. Users often see too many options and conflicting signals.\n\nImprovement: create a “decide for me” flow for small groups. Users select constraints like distance, cuisine, price, rating threshold, and open-now, then Google Maps recommends 3 options with a clear reason: “best for quick dinner,” “best value,” or “best ambience.” For groups, participants could vote from a short list inside a shared link.\n\nSuccess metrics: place detail views to directions conversion, time from search to selected destination, saves, group link shares, and repeat usage. Guardrails: avoid reducing discovery for users who want to browse, and ensure recommendations are explainable rather than feeling arbitrary.',
          followUps: [
            'What user segment would you prioritize?',
            'How would you know if this made the product better?',
            'What would be the main risk of this feature?',
          ],
        },
        {
          type: 'question',
          question: 'Design an alarm clock for blind users.',
          difficulty: 'hard',
          category: 'Product Sense',
          framework: 'Accessibility-first: context → constraints → needs → experience → safety',
          answer:
            'I would start by clarifying whether this is a physical device, mobile app, or smart speaker experience. I will assume a mobile app with optional voice assistant integration.\n\nUser needs: set alarms quickly without visual dependence, confirm the alarm is correct, wake reliably, distinguish alarms, and avoid accidental dismissal. Constraints include screen reader compatibility, tactile/voice interactions, low cognitive load when tired, and privacy in shared spaces.\n\nMVP experience: voice-first alarm creation with confirmation: “Set alarm for 7:30 AM tomorrow, label gym.” The app repeats the time and vibration pattern. Users can assign distinct sounds or vibration patterns to labels. Snooze and stop should require deliberate gestures or voice confirmation to prevent accidental dismissal.\n\nImportant features: full VoiceOver/TalkBack support, large accessible touch targets, haptic patterns, spoken confirmations, smart speaker support, recurring alarms, and fallback vibration if audio is muted. Safety guardrail: optional escalation alarm if the user does not dismiss after a set time.\n\nSuccess metrics: successful alarm creation rate, alarm accuracy, missed-alarm rate, time to set an alarm, accessibility task completion rate, and user trust score. I would test with blind and low-vision users directly because sighted PM assumptions are likely to miss critical usability details.',
          followUps: [
            'How would you test this product?',
            'What mistakes might a sighted product team make?',
            'How would the experience differ for a physical alarm clock?',
          ],
        },
      ],
    },
    {
      id: 'execution-metrics',
      title: 'Execution and Metrics Questions',
      group: 'Core PM Questions',
      intro:
        'Execution questions test whether you can turn product ideas into measurable outcomes. Interviewers look for metric discipline, prioritization, diagnosis, and launch judgment.',
      blocks: [
        {
          type: 'key-term',
          title: 'Metrics vocabulary PMs should know',
          terms: [
            {
              term: 'North Star Metric',
              definition:
                'A single metric that captures the core value users receive from the product. It should connect user value to business value, such as completed rides for Uber or weekly active teams for a collaboration tool.',
            },
            {
              term: 'Input Metric',
              definition:
                'A controllable leading indicator that drives the output metric. For example, activation completion rate can drive retention.',
            },
            {
              term: 'Guardrail Metric',
              definition:
                'A metric that should not get worse while optimizing the primary metric, such as latency, unsubscribe rate, refund rate, or support tickets.',
            },
            {
              term: 'Activation',
              definition:
                'The moment a new user experiences the product value proposition for the first time. Strong PMs define activation specifically for the product, not generically.',
            },
          ],
        },
        {
          type: 'question',
          question: 'What metrics would you use for Instagram Stories?',
          difficulty: 'medium',
          category: 'Execution',
          framework: 'Goal → User journey → North star → Input metrics → Guardrails',
          answer:
            'I would first clarify the product goal. For Stories, likely goals are increasing lightweight sharing, increasing creator engagement, and deepening daily social connection. I would define the North Star as meaningful story interactions per daily active user, not just views, because Stories should create social feedback loops.\n\nInput metrics across the journey: creation rate, stories posted per creator, viewer reach per story, completion rate, replies/reactions per view, close-friend story usage, and repeat creation within 7 days. For viewers: story tray open rate, stories viewed per session, skip rate, exits, and replies.\n\nSegment metrics by creators versus viewers, new versus power users, public versus close-friends stories, and geography. Averages can hide problems because a small number of power creators may dominate posting.\n\nGuardrails: feed engagement, creator fatigue, story quality, negative feedback, muted accounts, app session health, and notification opt-outs. If replies increase but mutes also increase, the product may be creating noisy engagement rather than healthy social connection.',
          followUps: [
            'What would you do if story views increased but replies dropped?',
            'How would you measure story quality?',
            'What metrics would you show the CEO weekly?',
          ],
        },
        {
          type: 'question',
          question: 'Daily active users dropped 10%. How would you investigate?',
          difficulty: 'medium',
          category: 'Execution',
          framework: 'Validate → Segment → Funnel → External factors → Root cause → Action',
          answer:
            'First, validate the data. Check instrumentation changes, logging delays, bot filtering, timezone issues, app version releases, and whether the drop appears in multiple analytics systems.\n\nSecond, segment the drop. Break DAU by platform, geography, acquisition channel, user tenure, app version, device type, and user cohort. A global drop suggests a broad product or measurement issue; a narrow drop points to a specific release, platform, or market.\n\nThird, inspect the user journey. Look at app opens, login success, home load success, crash rate, latency, notification delivery, core action completion, and retention by cohort. If app opens are stable but core actions fall, the issue is inside the product. If app opens fall, it may be notifications, acquisition, seasonality, or external demand.\n\nFourth, check external factors: holidays, competitor launches, outages, paid marketing changes, SEO ranking changes, app store issues, or policy changes.\n\nFinally, identify root cause and action. If iOS DAU dropped after a release and crash rate spiked, rollback or hotfix. If new-user DAU dropped due to acquisition, coordinate with growth. If engagement dropped among existing users, inspect recent product changes or content supply.',
          followUps: [
            'What dashboard would you want first?',
            'How do you distinguish seasonality from product regression?',
            'When would you roll back a launch?',
          ],
        },
        {
          type: 'question',
          question: 'How would you prioritize a backlog of 20 feature requests?',
          difficulty: 'easy',
          category: 'Execution',
          framework: 'Goal alignment → Impact → Confidence → Effort → Risk',
          answer:
            'I would start with the product goal. Prioritization without a goal becomes opinion sorting. If the goal is activation, revenue, retention, or enterprise expansion, the ranking will differ.\n\nThen I would evaluate each request on impact, confidence, effort, strategic fit, and risk. A lightweight RICE model works: Reach × Impact × Confidence / Effort. But I would not use it mechanically. Some items matter because they unblock a strategic customer, reduce legal risk, improve platform reliability, or support a company-level bet.\n\nI would group requests into categories: customer pain, revenue opportunity, technical debt, platform reliability, and strategic bets. Then I would identify dependencies and sequencing. Sometimes a low-impact infrastructure item must come first because it enables multiple high-impact features.\n\nThe output should be a ranked roadmap with tradeoffs explicit: what we are doing, what we are not doing, why, and what evidence would change the decision. I would also reserve some capacity for urgent bugs and discovery work.',
          followUps: [
            'How do you handle a CEO-requested feature you disagree with?',
            'When would you prioritize technical debt over user-facing features?',
            'What if sales says a feature will close a large customer?',
          ],
        },
        {
          type: 'question',
          question: 'How would you measure the success of a new onboarding flow?',
          difficulty: 'medium',
          category: 'Execution',
          framework: 'Activation definition → Funnel metrics → Retention → Guardrails',
          answer:
            'First define activation. For a project management tool, activation might be creating a project, inviting a teammate, and completing the first task. For a music app, it might be playing three songs and saving one. The activation event must represent real product value.\n\nPrimary metric: activation rate within a defined time window, such as percentage of new users who reach activation within 24 hours. Input metrics: signup completion, onboarding step completion, time to value, profile setup, permission grant rate, and first core action completion.\n\nLonger-term metrics: D1, D7, and D30 retention; conversion to paid; weekly active usage; and support contacts from new users. A better onboarding flow should not only increase completion but also create healthier retained users.\n\nGuardrails: onboarding time, drop-off at each step, user confusion, opt-out rates, low-quality setup data, and whether we are over-personalizing before trust is established. I would A/B test the new flow and monitor cohort retention rather than declaring success from signup completion alone.',
          followUps: [
            'What if completion increases but retention decreases?',
            'How many steps should onboarding have?',
            'Would you personalize onboarding for different user segments?',
          ],
        },
      ],
    },
    {
      id: 'analytics-experiments',
      title: 'Analytics and Experimentation Questions',
      group: 'Core PM Questions',
      intro:
        'Analytical PM questions test whether you can reason from messy data, design experiments, estimate impact, and avoid false conclusions.',
      blocks: [
        {
          type: 'question',
          question: 'Design an A/B test for a new checkout page.',
          difficulty: 'medium',
          category: 'Experimentation',
          framework: 'Hypothesis → Population → Metrics → Randomization → Duration → Decision rule',
          answer:
            'Hypothesis: the new checkout page reduces friction and increases completed purchases without increasing refunds or support issues.\n\nPopulation: eligible users entering checkout. Randomize at the user level, not session level, so repeat visits see a consistent experience. Exclude internal users, bots, and edge cases where checkout is unavailable.\n\nPrimary metric: checkout conversion rate from checkout start to successful purchase. Secondary metrics: payment failure rate, time to checkout completion, average order value, add-on attachment rate, and return visits. Guardrails: refund rate, chargebacks, support tickets, page latency, and payment errors.\n\nDuration and power: run long enough to cover weekly seasonality and reach the required sample size. Avoid stopping early just because the first few days look positive.\n\nDecision rule: ship if conversion improves statistically and practically, guardrails remain healthy, and the result is consistent across key segments. If the overall result is flat but mobile improves significantly while desktop declines, consider segment-specific rollout rather than a binary ship/no-ship decision.',
          followUps: [
            'What if conversion improves but average order value drops?',
            'How would you handle novelty effects?',
            'What if the experiment result is positive only for new users?',
          ],
        },
        {
          type: 'question',
          question: 'Estimate the market size for food delivery in New York City.',
          difficulty: 'medium',
          category: 'Estimation',
          framework: 'Population → Eligible users → Frequency → Average order value → Annualize',
          answer:
            'I would use a top-down estimate. NYC has roughly 8 million residents. Assume 75% are adults or older teens who can order independently: 6 million potential users. Suppose 60% use food delivery at least occasionally: 3.6 million users.\n\nFrequency: split users into light, medium, and heavy segments. Light users: 50% order once per month. Medium users: 35% order once per week. Heavy users: 15% order three times per week. Average monthly orders = (1.8M × 1) + (1.26M × 4) + (0.54M × 12) = 1.8M + 5.0M + 6.5M = about 13.3M orders per month.\n\nAverage order value: assume $30 including fees and tip. Monthly gross order value = 13.3M × $30 = about $400M. Annual gross order value = roughly $4.8B.\n\nI would sanity-check against restaurant density, commuter population, tourism, office lunch demand, and platform take rates. If estimating platform revenue instead of gross order value, multiply by a take rate, perhaps 15–25%, implying around $700M–$1.2B annual platform revenue opportunity.',
          followUps: [
            'How would the estimate change for suburbs?',
            'What assumptions matter most?',
            'How would you estimate DoorDash revenue from this market?',
          ],
        },
        {
          type: 'question',
          question: 'A feature launch increased clicks but decreased retention. What do you do?',
          difficulty: 'hard',
          category: 'Analytics',
          framework: 'Clarify metric quality → Segment → Diagnose behavior → Decide rollback/iterate',
          answer:
            'This is a classic metric tradeoff. First, I would confirm whether the click increase reflects real user value or just curiosity, confusion, or a more prominent placement. Clicks are often a weak proxy.\n\nThen segment retention decline by user type, platform, geography, acquisition channel, and feature engagement. If users who clicked the feature retained worse, the feature may be attracting low-intent behavior or interrupting the core journey. If non-clickers also retained worse, the placement or launch may have degraded the broader experience.\n\nNext, inspect qualitative evidence: session recordings, support tickets, feedback, and funnel paths. Did users click but fail to complete the intended action? Did the feature slow the app, distract from the core action, or create disappointment?\n\nDecision: if retention is materially down and the feature is not strategically critical, roll back or reduce exposure while investigating. If the feature is important, limit it to the segment where retention is healthy and iterate. I would not celebrate clicks unless downstream value improves.',
          followUps: [
            'What if revenue increased while retention decreased?',
            'How long would you wait before rolling back?',
            'What metric would you optimize instead of clicks?',
          ],
        },
      ],
    },
    {
      id: 'strategy',
      title: 'Strategy Questions',
      group: 'Core PM Questions',
      intro:
        'Strategy questions test whether you understand markets, business models, competition, distribution, and long-term product positioning.',
      blocks: [
        {
          type: 'question',
          question: 'Should Netflix enter live sports?',
          difficulty: 'hard',
          category: 'Strategy',
          framework: 'Goal → Market → Strategic fit → Risks → Recommendation',
          answer:
            'I would evaluate this through Netflix\'s goals: subscriber growth, retention, pricing power, advertising revenue, and engagement. Live sports can be attractive because it drives appointment viewing, reduces churn, and creates ad inventory. However, rights are expensive, region-specific, and often low-margin.\n\nStrategic fit: Netflix historically wins with global, on-demand content that can be amortized across many users and watched over time. Live sports are different: rights expire, value is concentrated in real-time viewing, and content is often geographically fragmented. That makes the economics less aligned with Netflix\'s classic model.\n\nWhere it could make sense: selective sports-adjacent events, documentaries, exhibition events, or niche rights with global appeal and manageable cost. These can support the brand and ad tier without forcing Netflix into a bidding war with ESPN, Amazon, Apple, or local broadcasters.\n\nRecommendation: do not aggressively pursue major league rights at first. Test limited live events and sports-adjacent programming where Netflix can differentiate through storytelling, global distribution, and ad-tier monetization. Scale only if retention and ad revenue justify the rights cost.',
          followUps: [
            'What metrics would determine whether the test worked?',
            'Which sports would you start with?',
            'How would this affect Netflix\'s brand?',
          ],
        },
        {
          type: 'question',
          question: 'How would you grow a marketplace product?',
          difficulty: 'medium',
          category: 'Strategy',
          framework: 'Pick side → Liquidity → Quality → Trust → Incentives',
          answer:
            'The first decision is which side of the marketplace is constrained: supply or demand. Growth tactics differ completely. If demand is abundant but supply is scarce, recruit suppliers and improve supplier economics. If supply is abundant but demand is weak, improve acquisition, conversion, and buyer trust.\n\nCore marketplace metric: liquidity. For rideshare, that might be time to match. For freelance marketplaces, it might be percentage of jobs receiving qualified bids within 24 hours. Without liquidity, both sides churn.\n\nGrowth levers: focus on a narrow geography or category first, subsidize the constrained side, improve trust and safety, reduce transaction friction, build reputation systems, and create repeat usage. Avoid expanding too broadly before liquidity is strong in the initial wedge.\n\nI would measure match rate, time to match, repeat transaction rate, supply utilization, buyer conversion, cancellation rate, and NPS by both sides. A healthy marketplace balances growth with quality; adding low-quality supply can make metrics look bigger while damaging trust.',
          followUps: [
            'How do you solve the cold-start problem?',
            'Which side would you subsidize?',
            'What happens if supply grows faster than demand?',
          ],
        },
        {
          type: 'question',
          question: 'Should a productivity app launch a free plan?',
          difficulty: 'medium',
          category: 'Strategy',
          framework: 'Objective → User segments → Conversion path → Cost → Cannibalization',
          answer:
            'A free plan can be valuable if the product benefits from bottom-up adoption, collaboration, virality, or user habit formation. For a productivity app, free users can invite teammates, create documents or projects, and eventually convert teams to paid plans.\n\nThe key is designing the free plan around activation without giving away the full paid value. Free should let users experience the core workflow, but paid should unlock scale, collaboration, admin controls, integrations, storage, or advanced automation.\n\nRisks: support costs, infrastructure costs, low-intent signups, cannibalization of paid users, and confusing packaging. If existing small teams downgrade to free, revenue can suffer.\n\nRecommendation: launch a free plan if acquisition costs are high and product-led growth is important, but set clear limits tied to team size, storage, history, or premium workflows. Measure activation, invite rate, free-to-paid conversion, expansion revenue, support cost per free user, and paid cannibalization.',
          followUps: [
            'What would you include in free vs paid?',
            'How long would you run the test?',
            'What if free users never convert?',
          ],
        },
      ],
    },
    {
      id: 'technical-collaboration',
      title: 'Technical and Cross-Functional Questions',
      intro:
        'PMs do not need to code in most interviews, but they must understand technical constraints, collaborate with engineering, and make sensible product tradeoffs.',
      blocks: [
        {
          type: 'question',
          question: 'How technical should a product manager be?',
          difficulty: 'easy',
          category: 'Technical',
          framework: 'Technical fluency, not necessarily implementation ownership',
          answer:
            'A PM does not always need to write production code, but they need enough technical fluency to understand constraints, ask good questions, evaluate tradeoffs, and communicate clearly with engineering.\n\nImportant areas: APIs, data flows, latency, reliability, privacy, experimentation, analytics instrumentation, platform dependencies, and basic system architecture. For AI or infrastructure products, the technical bar is higher. For consumer growth PMs, experimentation and analytics may matter more.\n\nThe PM\'s job is not to override engineers. It is to understand the implications of technical choices: what is expensive, risky, reversible, scalable, or likely to create long-term debt. Strong PMs can explain why a shortcut is acceptable for an MVP or why a platform investment is worth delaying a visible feature.',
          followUps: [
            'Tell me about a technical tradeoff you made.',
            'How do you handle disagreement with engineering?',
            'How would you explain an API to a non-technical stakeholder?',
          ],
        },
        {
          type: 'question',
          question: 'Engineering says a feature will take 3 months, but leadership wants it in 1 month. What do you do?',
          difficulty: 'medium',
          category: 'Leadership',
          framework: 'Clarify goal → De-scope → Sequence → Communicate tradeoffs',
          answer:
            'First, clarify the actual leadership goal. Is the deadline tied to a customer commitment, launch event, revenue target, compliance issue, or competitive threat? Sometimes leadership needs an outcome, not the full feature.\n\nSecond, work with engineering and design to break the feature into must-have, should-have, and later components. Identify whether there is an MVP that delivers the core user value in one month without creating unacceptable technical debt.\n\nThird, communicate tradeoffs clearly: option A ships in one month with limited scope; option B ships in two months with stronger quality; option C ships in three months with full functionality. Include risks, user impact, and what is explicitly not included.\n\nI would not pressure engineering to commit to an impossible timeline. The PM\'s role is to create clarity and options, not hide risk. If the one-month version is not viable, say that directly and propose the closest responsible alternative.',
          followUps: [
            'What if leadership insists anyway?',
            'How do you decide what to cut from scope?',
            'How do you avoid damaging trust with engineering?',
          ],
        },
        {
          type: 'question',
          question: 'How would you work with design on a controversial product change?',
          difficulty: 'medium',
          category: 'Cross-functional',
          framework: 'Shared problem → Evidence → Alternatives → Test → Decision',
          answer:
            'I would start by aligning on the user problem and success criteria, not on a specific solution. Many PM/design conflicts happen because one side debates taste while the other debates metrics.\n\nThen I would bring evidence: user research, funnel data, support tickets, session recordings, competitive examples, and constraints. If the disagreement remains, generate multiple options together: conservative change, bold redesign, and incremental test.\n\nFor a controversial change, I would push for a prototype test or limited experiment before full rollout. The decision should include both qualitative and quantitative evidence. Design quality matters even when metrics are not immediately measurable, because trust, clarity, and brand perception compound over time.\n\nThe PM should not treat design as decoration. Design is product strategy expressed through user experience.',
          followUps: [
            'What if the experiment says one thing and user research says another?',
            'How do you handle executive design feedback?',
            'When would you reject a design recommendation?',
          ],
        },
      ],
    },
    {
      id: 'behavioral-leadership',
      title: 'Behavioral and Leadership Questions',
      intro:
        'Behavioral PM questions test ownership, influence, communication, conflict resolution, and judgment under ambiguity. Use specific stories with real stakes.',
      blocks: [
        {
          type: 'tip',
          title: 'PM behavioral stories need decisions',
          text: 'Do not only describe teamwork. Show the decision you made, the tradeoff, who disagreed, what evidence you used, and what happened afterward. PM interviewers are looking for judgment under ambiguity.',
        },
        {
          type: 'dodont',
          dos: [
            'Use examples where you influenced without authority',
            'Name the tradeoff clearly: speed vs quality, growth vs trust, scope vs deadline',
            'Explain what data and customer evidence informed your decision',
            'Describe what you learned and how your behavior changed afterward',
            'Show respect for engineering, design, data, and business partners',
          ],
          donts: [
            'Claim all credit for cross-functional work',
            'Frame disagreement as other people being difficult',
            'Use vague stories with no measurable outcome',
            'Pretend every decision was obvious in hindsight',
            'Over-index on process without showing product judgment',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time you had to influence without authority.',
          difficulty: 'medium',
          category: 'Behavioral',
          framework: 'Context → Stakeholders → Resistance → Evidence → Alignment → Result',
          answer:
            'Choose a story where you needed engineers, designers, sales, or executives to support a direction they did not initially agree with.\n\nA strong answer: briefly set context, explain what each stakeholder cared about, identify the resistance, and show how you built alignment. Maybe engineering was worried about complexity, sales wanted a customer-specific feature, and design worried about UX debt. Your role was to reframe the discussion around the user problem, evidence, and product goal.\n\nThe best answers include artifacts: customer interviews, data analysis, prototype test, experiment result, or business impact. Then explain the outcome: shipped MVP, changed roadmap, avoided scope creep, improved metric, or learned that your original idea was wrong.\n\nDo not make the story about convincing people through persistence alone. Make it about earning trust through clarity, evidence, and empathy.',
          followUps: [
            'Who was hardest to convince and why?',
            'What would you do differently?',
            'How do you build trust before disagreement happens?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a product decision you got wrong.',
          difficulty: 'hard',
          category: 'Behavioral',
          framework: 'Decision → Assumption → Outcome → Diagnosis → Change',
          answer:
            'Pick a real miss. Interviewers trust candidates who can discuss failure clearly without defensiveness.\n\nStructure: what decision you made, what assumption drove it, what evidence you had, what happened, how you diagnosed the miss, and what changed in your product process afterward.\n\nA strong example might be shipping a feature because qualitative feedback was loud, but later discovering the segment was too small; prioritizing acquisition while hurting activation; or overbuilding a workflow before validating the core use case.\n\nThe key is showing learning. For example: “I learned to separate customer urgency from market size,” or “I now require both qualitative evidence and behavioral data before prioritizing a major roadmap item.” Avoid blaming engineering, design, leadership, or users.',
          followUps: [
            'How did you communicate the mistake?',
            'What process changed afterward?',
            'How do you know you would catch this earlier next time?',
          ],
        },
        {
          type: 'question',
          question: 'How do you handle conflict with engineering?',
          difficulty: 'medium',
          category: 'Leadership',
          framework: 'Understand concern → Align on goal → Explore options → Decide transparently',
          answer:
            'I start by assuming the engineering concern is rational. It may be about complexity, reliability, tech debt, timeline risk, maintainability, or unclear requirements. I would ask questions until I understand the underlying risk.\n\nThen I align on the product goal. If we agree on the goal, the discussion becomes about options: reduce scope, sequence the work, use a manual workaround, build a prototype, pay down technical debt first, or change the launch timeline.\n\nIf disagreement remains, I make tradeoffs explicit and involve the right decision-maker if needed. The worst outcome is hidden disagreement where engineering commits publicly but does not believe in the plan privately.\n\nStrong PM-engineering relationships are built before conflict: clear requirements, respect for technical input, early involvement, and willingness to change your mind when engineers surface better information.',
          followUps: [
            'What if engineering says no to a critical customer request?',
            'How do you prevent scope creep?',
            'When should a PM escalate?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Product Manager Prep Strategy',
      intro:
        'PM interview prep should combine structured case practice, product critique, metrics drills, and behavioral story preparation. Passive reading is not enough.',
      blocks: [
        {
          type: 'numbered',
          title: '4-week PM interview prep plan',
          items: [
            'Week 1 — Product sense foundation: practice user segmentation, pain point prioritization, product critique, and design prompts. Build a repeatable but flexible answer structure.',
            'Week 2 — Execution and metrics: practice defining North Star metrics, launch metrics, guardrails, funnel diagnostics, and metric drop investigations.',
            'Week 3 — Strategy, analytics, and technical fluency: practice market sizing, A/B tests, pricing, marketplace strategy, API/system tradeoffs, and cross-functional scenarios.',
            'Week 4 — Mock interviews and behavioral polish: run full mock loops, record answers, refine 6–8 leadership stories, and tailor examples to each target company.',
          ],
        },
        {
          type: 'bullets',
          title: 'Company-specific prep',
          items: [
            'Meta — product sense, execution, metrics, tradeoffs, and fast structured thinking.',
            'Google — product design, strategy, analytical rigor, technical fluency, and leadership principles.',
            'Amazon — customer obsession, ownership, tradeoffs, metrics, and behavioral stories aligned to Leadership Principles.',
            'Microsoft — collaboration, strategy, technical depth, enterprise customers, and cross-functional influence.',
            'Startups — ambiguity, speed, founder-like ownership, prioritization, and ability to operate without perfect data.',
          ],
        },
        {
          type: 'warning',
          title: 'Avoid feature-list answers',
          text: 'The most common PM interview mistake is listing features too early. Always identify the user, problem, goal, and success metric before proposing solutions.',
        },
        {
          type: 'key-takeaway',
          text: 'Great PM interview answers balance customer empathy, business judgment, execution discipline, and cross-functional leadership. The goal is not to sound like a framework. The goal is to show how you make product decisions when the answer is ambiguous.',
        },
      ],
    },
  ],
}
