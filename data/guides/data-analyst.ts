import type { InterviewGuide } from '#data/interview-guides'

export const dataAnalystGuide: InterviewGuide = {
  slug: 'data-analyst',
  title: 'Data Analyst Interview Guide',
  description:
    'Prepare for data analyst interviews with SQL, dashboards, metrics, Excel, analytics case studies, experimentation, data quality, and stakeholder communication questions.',
  role: 'Data Analyst',
  industry: 'Data',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 32,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Data analyst interviews test whether you can turn messy business questions into trustworthy analysis. The strongest candidates combine SQL fluency, metric judgment, data quality discipline, clear communication, and practical business reasoning.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '3-5', label: 'Typical interview rounds' },
            { value: '45-60 min', label: 'SQL / case round length' },
            { value: '5+', label: 'Core analyst skill areas' },
            { value: '3-6 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What data analyst interviewers are evaluating',
          items: [
            'SQL fluency: can you join, filter, aggregate, window, and debug queries accurately?',
            'Metric judgment: can you define meaningful metrics instead of blindly reporting numbers?',
            'Business reasoning: can you connect data findings to customer behavior, revenue, risk, or operations?',
            'Data quality discipline: can you identify missing data, duplicates, outliers, tracking gaps, and biased samples?',
            'Dashboard judgment: can you design reporting that helps teams make decisions rather than admire charts?',
            'Communication: can you explain assumptions, confidence, limitations, and recommendations clearly to non-technical stakeholders?',
          ],
        },
        {
          type: 'tip',
          title: 'Great analysts do not just answer the query',
          text:
            'A strong data analyst answer explains what question is being asked, whether the data can actually answer it, what assumptions are required, and what decision the analysis should support. Accuracy matters, but judgment matters just as much.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Data Analyst Interview Process',
      intro:
        'Most data analyst loops include a recruiter screen, SQL assessment, analytics case study, dashboard or visualization discussion, stakeholder communication round, and behavioral interview.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical data analyst interview stages',
          items: [
            'Recruiter screen: confirms role fit, tools, domain experience, compensation range, and motivation.',
            'Hiring manager screen: covers previous analysis work, stakeholder experience, business impact, and communication style.',
            'SQL round: tests joins, aggregations, filtering, window functions, date logic, null handling, and query debugging.',
            'Analytics case round: asks you to investigate a metric movement, evaluate a product change, or recommend a business action.',
            'Dashboard or visualization round: tests whether you can select the right metrics, chart types, filters, and reporting cadence.',
            'Behavioral round: evaluates ownership, ambiguity, stakeholder management, prioritization, and how you handle flawed data.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'SQL Round',
          columnB: 'Analytics Case Round',
          rows: [
            {
              label: 'Main question',
              a: 'Can you retrieve and transform the right data accurately?',
              b: 'Can you reason from data to a decision?',
            },
            {
              label: 'Strong signal',
              a: 'Correct joins, clean filters, accurate aggregation level, window functions when needed',
              b: 'Clear hypothesis tree, segmentation, metric definition, limitations, and recommendation',
            },
            {
              label: 'Common mistake',
              a: 'Joining at the wrong grain and accidentally duplicating rows',
              b: 'Jumping to a conclusion before validating data quality and segmenting the movement',
            },
            {
              label: 'Best preparation',
              a: 'Practice realistic schemas, dates, cohorts, retention, funnel queries, and debugging',
              b: 'Practice metric diagnosis, experiment readouts, dashboard critique, and stakeholder summaries',
            },
          ],
        },
        {
          type: 'warning',
          title: 'The grain of the data is usually the trap',
          text:
            'Many analyst interview mistakes come from joining tables at incompatible levels: user-level, order-level, item-level, session-level, or event-level. Before writing SQL, identify the unit of analysis and what each row represents.',
        },
      ],
    },
    {
      id: 'sql-foundation',
      title: 'SQL Interview Foundation',
      group: 'SQL Questions',
      intro:
        'SQL interviews for data analysts are less about obscure syntax and more about correct thinking: grain, joins, filters, aggregation level, dates, nulls, and validating whether the result makes sense.',
      blocks: [
        {
          type: 'numbered',
          title: 'A reliable SQL interview flow',
          items: [
            'Clarify the business question and final output columns before writing the query.',
            'Identify the grain: one row per user, order, item, session, event, account, or day.',
            'Inspect which tables are needed and how they join. State whether joins are one-to-one, one-to-many, or many-to-many.',
            'Choose filters carefully, especially date filters, status filters, test users, canceled orders, refunds, and internal accounts.',
            'Aggregate only after the grain is correct. If needed, use CTEs to pre-aggregate before joining.',
            'Use window functions for ranking, rolling metrics, deduplication, and previous/next event logic.',
            'Sanity-check the result: row count, distinct counts, totals, nulls, duplicates, and whether the metric direction makes business sense.',
          ],
        },
        {
          type: 'key-term',
          title: 'SQL concepts analysts must know',
          terms: [
            {
              term: 'Grain',
              definition:
                'The level represented by each row in a table or query result. Getting the grain wrong can duplicate revenue, users, orders, or events.',
            },
            {
              term: 'Left join',
              definition:
                'Keeps all records from the left table even when the right table has no match. Useful when you need to preserve users, orders, or dates with missing related activity.',
            },
            {
              term: 'Window function',
              definition:
                'Calculates a value across related rows without collapsing them. Common for ranking, running totals, lag/lead, deduplication, and cohort analysis.',
            },
            {
              term: 'Cohort',
              definition:
                'A group of users or entities sharing a start event or attribute, such as signup month, first purchase date, acquisition channel, or plan type.',
            },
          ],
        },
        {
          type: 'dodont',
          dos: [
            'Define the row grain before joining tables',
            'Use CTEs to make multi-step logic readable',
            'Check whether filters belong in WHERE or JOIN conditions',
            'Use distinct carefully and explain why it is needed',
            'Validate output with row counts and sample records',
          ],
          donts: [
            'Use SELECT DISTINCT to hide duplicate bugs',
            'Join item-level revenue directly to user-level data without pre-aggregation',
            'Filter away nulls from a left join accidentally',
            'Ignore timezone and date boundary assumptions',
            'Return a metric without explaining what decision it supports',
          ],
        },
      ],
    },
    {
      id: 'sql-questions',
      title: 'SQL Interview Questions',
      group: 'SQL Questions',
      intro:
        'The best way to prepare for analyst SQL is to practice realistic business questions. Focus on users, orders, events, subscriptions, retention, revenue, and funnel movement.',
      blocks: [
        {
          type: 'question',
          question: 'Write a query to find the top 5 customers by total revenue in the last 30 days.',
          difficulty: 'easy',
          category: 'SQL / Aggregation',
          framework: 'Filter -> join -> group -> order -> limit',
          answer:
            'Assume we have customers(customer_id, name) and orders(order_id, customer_id, order_date, status, revenue). I would first clarify whether revenue should include canceled or refunded orders. Usually, we should include completed orders only.\n\nThe query filters orders to the last 30 days, filters to completed status, groups by customer, sums revenue, orders descending, and limits to 5. A clean version would use a CTE for eligible orders if the logic becomes more complex.\n\nImportant details: use the correct date column, avoid joining to item-level tables unless pre-aggregated, and decide how to handle ties. If the database supports it, use a ranking window function when ties should be included rather than a simple LIMIT 5.\n\nA strong answer also validates the result by checking total eligible revenue, row count, and whether any top customer has suspiciously duplicated order rows.',
          followUps: [
            'How would you include ties for 5th place?',
            'What if revenue is stored at order item level?',
            'How would you exclude refunded orders?',
          ],
        },
        {
          type: 'question',
          question: 'Calculate 7-day retention for users who signed up in January.',
          difficulty: 'medium',
          category: 'SQL / Cohort Analysis',
          framework: 'Define cohort -> define return event -> left join -> aggregate',
          answer:
            'First define retention precisely. I would define January cohort users as users whose signup date is between January 1 and February 1. A user is 7-day retained if they have at least one qualifying activity event on the 7th day after signup, or within days 1-7 if the company defines retention as returning within 7 days. Clarify this before querying.\n\nFor exact day-7 retention, create a cohort CTE with user_id and signup_date. Then left join events on user_id where event_date equals signup_date + interval 7 days and event_name is a meaningful active event. Count distinct cohort users as denominator and distinct users with a matching event as numerator.\n\nThe key is to preserve users with no activity by using a left join. If you use an inner join, you remove non-retained users and inflate retention. Also avoid multiple events duplicating retained users by counting distinct user_id.\n\nFinal metric: retained_users / cohort_users. Segment by acquisition channel, platform, geography, or signup week if the interviewer asks for diagnosis.',
          followUps: [
            'What is the difference between day-7 retention and rolling 7-day retention?',
            'How would you handle users who signed up less than 7 days ago?',
            'What events should count as active?',
          ],
        },
        {
          type: 'question',
          question: 'Find each user\'s second purchase date.',
          difficulty: 'medium',
          category: 'SQL / Window Functions',
          framework: 'Rank purchases per user',
          answer:
            'Use a window function to rank completed purchases for each user by purchase timestamp. Filter to completed purchases first, then apply row_number() over partition by user_id order by purchase_at. The second purchase is where row_number = 2.\n\nThe filtering order matters. If canceled or refunded purchases should not count, remove them before ranking. If multiple purchases have the same timestamp, add a deterministic tie-breaker such as order_id.\n\nThe output can include user_id and second_purchase_at. If the interviewer asks for users who made at least two purchases, return only rows with rank 2. If they ask for all users and null for users without a second purchase, left join the result back to the users table.\n\nTime complexity is handled by the database, but in practical terms this benefits from indexes on user_id and purchase timestamp for large tables.',
          followUps: [
            'How would you include users with no second purchase?',
            'What if two purchases happened at the same timestamp?',
            'How would you calculate days between first and second purchase?',
          ],
        },
        {
          type: 'question',
          question: 'A funnel has signup, email verification, onboarding completion, and first purchase. How would you calculate conversion at each step?',
          difficulty: 'medium',
          category: 'SQL / Funnel Analysis',
          framework: 'One row per user with step timestamps',
          answer:
            'I would create one row per user with the earliest timestamp for each funnel step. This avoids double-counting users who trigger the same event multiple times. Use conditional aggregation over the events table: min(case when event_name = signup then event_at end), min(case when event_name = email_verified then event_at end), and so on.\n\nThen enforce sequence if required. For example, email verification should happen after signup, onboarding after verification, and first purchase after onboarding. If the business wants loose conversion regardless of order, state that assumption explicitly.\n\nConversion metrics: signup to verification, verification to onboarding, onboarding to purchase, and overall signup to purchase. Use distinct users at each step as numerator and the previous step as denominator. Segment by platform, acquisition channel, device, geography, and cohort date to identify where drop-off is concentrated.\n\nImportant edge cases: duplicated events, users skipping steps, timezone boundaries, bot/test accounts, and late-arriving event data.',
          followUps: [
            'How would you enforce event order?',
            'How would you diagnose a sudden drop in onboarding completion?',
            'How would you visualize this funnel?',
          ],
        },
      ],
    },
    {
      id: 'metrics-business-cases',
      title: 'Metrics and Business Case Questions',
      group: 'Analytics Case Studies',
      intro:
        'Analytics case interviews test whether you can define the right metric, diagnose movement, segment intelligently, and recommend an action with appropriate confidence.',
      blocks: [
        {
          type: 'question',
          question: 'Daily active users dropped 12% yesterday. How would you investigate?',
          difficulty: 'medium',
          category: 'Analytics Case',
          framework: 'Validate -> segment -> funnel -> external factors -> recommendation',
          answer:
            'First validate whether the drop is real. Check instrumentation changes, data pipeline delays, timezone issues, bot filtering, app release changes, and whether the drop appears across multiple dashboards or raw tables.\n\nThen segment the drop: platform, app version, geography, acquisition channel, user tenure, paid versus free users, device type, and traffic source. A global drop suggests a tracking, infrastructure, or broad product issue. A narrow drop points to a platform, release, market, or channel.\n\nNext inspect the user journey. Did app opens drop, login success drop, homepage loads fail, notifications decline, or core actions decline after users arrived? If app opens are stable but core activity is down, the problem is inside the product. If app opens are down, look at notifications, acquisition, seasonality, outages, or external events.\n\nFinally, recommend action based on root cause. If iOS DAU dropped after a release and crash rate increased, rollback or hotfix. If only paid acquisition users dropped, check campaign spend and attribution. If data is delayed, communicate the limitation before creating false urgency.',
          followUps: [
            'What chart would you look at first?',
            'How would you distinguish seasonality from a product issue?',
            'What if DAU dropped but revenue increased?',
          ],
        },
        {
          type: 'question',
          question: 'How would you define success for a new recommendation feature?',
          difficulty: 'medium',
          category: 'Metrics',
          framework: 'Goal -> primary metric -> input metrics -> guardrails -> segments',
          answer:
            'Start with the goal. A recommendation feature might aim to increase discovery, engagement, conversion, retention, or order value. The primary metric should reflect the intended user value, not just clicks. For example, for ecommerce recommendations, a strong metric could be purchases or add-to-cart actions from recommended items per active user.\n\nInput metrics include recommendation impressions, click-through rate, add-to-cart rate, conversion rate, revenue per session, coverage, and diversity. Guardrails include returns, refunds, low-quality clicks, page latency, user complaints, and cannibalization of organic discovery.\n\nSegment by new versus returning users, category, device, traffic source, and recommendation surface. A model may improve average performance while hurting new users or long-tail product discovery.\n\nI would evaluate the feature with an A/B test if possible, then monitor longer-term retention and repeat purchase behavior. A short-term click lift is not enough if users are being nudged toward irrelevant or low-satisfaction items.',
          followUps: [
            'What if CTR increases but purchases do not?',
            'How would you measure recommendation quality?',
            'How would you detect cannibalization?',
          ],
        },
        {
          type: 'question',
          question: 'Revenue increased 20%, but conversion rate decreased. What could explain this?',
          difficulty: 'medium',
          category: 'Business Analysis',
          framework: 'Decompose revenue into traffic, conversion, AOV, mix, price, retention',
          answer:
            'Revenue is usually traffic times conversion rate times average order value, with additional effects from product mix, pricing, repeat purchase, and refunds. If revenue increased while conversion decreased, several explanations are possible.\n\nTraffic volume may have increased enough to offset lower conversion. Average order value may have risen due to pricing changes, bundles, enterprise customers, larger carts, or product mix shifting toward expensive items. The company may have reduced low-intent traffic, causing fewer conversions by rate but more valuable purchases. There could also be tracking changes affecting either revenue or conversion.\n\nI would segment by channel, product, geography, new versus returning users, customer tier, and device. Then decompose revenue into sessions, conversion, AOV, refund rate, and repeat purchases. I would also check whether conversion is measured at session, user, or visitor level because denominator changes can create misleading trends.\n\nThe recommendation depends on quality. If revenue growth comes from healthier high-value customers, lower conversion may be acceptable. If it comes from a one-time price increase while new customer conversion is weakening, that may be a future growth risk.',
          followUps: [
            'How would you build a revenue decomposition dashboard?',
            'What if paid traffic changed significantly?',
            'When is lower conversion acceptable?',
          ],
        },
      ],
    },
    {
      id: 'dashboards-visualization',
      title: 'Dashboards and Data Visualization',
      group: 'Analytics Case Studies',
      intro:
        'Dashboard questions test whether you know how to communicate data. A good dashboard is not a collection of charts; it is a decision tool for a specific audience.',
      blocks: [
        {
          type: 'question',
          question: 'Design a dashboard for an executive team tracking subscription business health.',
          difficulty: 'medium',
          category: 'Dashboard Design',
          framework: 'Audience -> decisions -> metrics -> cuts -> alerts',
          answer:
            'First define the audience and decisions. Executives need a high-level view of growth, retention, monetization, and risk. They do not need every operational detail on the first screen.\n\nTop-level metrics: monthly recurring revenue, net revenue retention, gross revenue retention, new MRR, expansion MRR, contraction MRR, churned MRR, active customers, trial-to-paid conversion, ARPU, CAC payback if available, and forecast versus target.\n\nUseful cuts: customer segment, acquisition channel, plan, geography, company size, cohort month, and sales-assisted versus self-serve. Visuals should include trend lines, cohort retention, MRR bridge, churn reasons, and target variance.\n\nDesign principles: show definitions, freshness timestamp, filters, owner, and alert thresholds. Avoid vanity metrics and avoid mixing user counts with revenue metrics without clear labels. The dashboard should answer: are we growing, why, where is risk, and what should leadership investigate next?',
          followUps: [
            'What would you put above the fold?',
            'How would this differ for a product manager?',
            'How would you prevent dashboard misuse?',
          ],
        },
        {
          type: 'question',
          question: 'A stakeholder asks for a chart that you think is misleading. What do you do?',
          difficulty: 'medium',
          category: 'Stakeholder Communication',
          framework: 'Clarify decision -> explain risk -> propose better view',
          answer:
            'I would first clarify what decision they are trying to make. Sometimes a stakeholder asks for a specific chart because they already have a narrative in mind, but the real need is a business answer.\n\nThen I would explain the risk clearly and non-defensively. For example, a cumulative revenue chart may always go up and hide a recent slowdown. A pie chart with too many categories may obscure differences. A chart without confidence intervals may overstate precision. A conversion rate without traffic mix may mislead.\n\nI would propose an alternative that answers the same question more accurately: trend line, cohort chart, funnel, distribution, segmented bar chart, or metric decomposition. If they still need the original chart, I might include it with caveats, but I would not present misleading analysis as my recommendation.\n\nThe goal is to preserve trust. Analysts should be helpful, but they also own analytical integrity.',
          followUps: [
            'How would you handle pressure from a senior stakeholder?',
            'What chart types are commonly misused?',
            'How do you communicate uncertainty visually?',
          ],
        },
        {
          type: 'bullets',
          title: 'Dashboard design principles',
          items: [
            'Start with the decision and audience, not the chart type.',
            'Define every metric directly in or near the dashboard.',
            'Show trend, target, and segment whenever possible.',
            'Include freshness, data source, owner, and known caveats.',
            'Avoid overloading one dashboard with executive, product, finance, and operations needs at once.',
            'Use alerts only for metrics that require action, not every metric that moves.',
          ],
        },
      ],
    },
    {
      id: 'excel-spreadsheets',
      title: 'Excel and Spreadsheet Questions',
      group: 'Tools and Execution',
      intro:
        'Many data analyst roles still rely heavily on spreadsheets. Interviewers may test formulas, pivots, cleanup, reconciliation, and whether you can build a model that others can audit.',
      blocks: [
        {
          type: 'question',
          question: 'How would you clean a messy spreadsheet before analysis?',
          difficulty: 'easy',
          category: 'Excel / Data Cleaning',
          framework: 'Profile -> standardize -> validate -> document',
          answer:
            'First profile the data: row count, column names, missing values, duplicates, data types, impossible values, date formats, and outliers. I would preserve a raw copy before making transformations.\n\nThen standardize fields: trim whitespace, normalize casing, parse dates, convert currencies or units, split combined fields if needed, and map inconsistent categories to a controlled list. For duplicates, define the business key before removing anything.\n\nNext validate totals against a trusted source. For example, total revenue should reconcile to finance exports, order counts should match source systems, and date ranges should be complete. I would create checks for null rates, distinct counts, and category values.\n\nFinally, document transformations. A spreadsheet used for decision-making should make assumptions visible, separate raw data from cleaned data, and avoid hidden manual edits that cannot be audited.',
          followUps: [
            'How do you handle duplicate rows?',
            'What spreadsheet formulas do you use most often?',
            'How would you make the workbook auditable?',
          ],
        },
        {
          type: 'question',
          question: 'When would you use a pivot table versus a formula-based analysis?',
          difficulty: 'easy',
          category: 'Excel / Analysis',
          framework: 'Exploration versus controlled calculation',
          answer:
            'Pivot tables are excellent for quick exploration, grouping, slicing, and summarizing data across dimensions. They are useful when the question is about totals, counts, averages, or trends by category and when stakeholders want interactive filtering.\n\nFormula-based analysis is better when logic is custom, multi-step, auditable, or needs precise control. Examples include cohort calculations, waterfall models, weighted scoring, exception flags, reconciliation checks, or inputs feeding a forecast.\n\nIn practice, I often use both: pivot tables to explore patterns quickly, then formulas or a cleaner model to produce the final answer. For recurring reporting, I prefer a reproducible query or BI pipeline over a fragile manual spreadsheet.',
          followUps: [
            'What are the risks of pivot tables?',
            'How would you explain VLOOKUP versus INDEX/MATCH or XLOOKUP?',
            'When should analysis move out of Excel into SQL or BI?',
          ],
        },
        {
          type: 'key-term',
          title: 'Spreadsheet skills to be ready for',
          terms: [
            {
              term: 'XLOOKUP / INDEX MATCH',
              definition:
                'Used to join values from one table into another. Analysts should understand lookup keys, missing matches, duplicate keys, and exact versus approximate matching.',
            },
            {
              term: 'Pivot table',
              definition:
                'A fast way to aggregate and slice data by dimensions. Strong analysts know how to validate the source range, aggregation type, and filters.',
            },
            {
              term: 'Reconciliation',
              definition:
                'The process of confirming that analysis totals match a trusted source, such as finance, product analytics, CRM, or billing systems.',
            },
          ],
        },
      ],
    },
    {
      id: 'experimentation',
      title: 'Experimentation and A/B Testing',
      group: 'Analytics Case Studies',
      intro:
        'Data analysts are often asked to design, read, or critique experiments. The important skill is knowing what conclusion the data supports and what it does not support.',
      blocks: [
        {
          type: 'question',
          question: 'How would you evaluate an A/B test for a redesigned checkout page?',
          difficulty: 'medium',
          category: 'Experimentation',
          framework: 'Hypothesis -> randomization -> metrics -> guardrails -> decision',
          answer:
            'Hypothesis: the redesigned checkout page reduces friction and increases completed purchases without creating negative downstream effects.\n\nFirst confirm experiment setup: randomization unit, sample size, duration, exposure logging, eligibility, and whether users stay in the same variant across sessions. Randomizing by session instead of user could contaminate results if users return.\n\nPrimary metric: checkout conversion rate from checkout start to completed purchase. Secondary metrics: payment failure rate, time to checkout, average order value, add-on attachment, and return visits. Guardrails: refunds, chargebacks, support tickets, latency, error rate, and customer complaints.\n\nAnalysis should include statistical significance and practical significance. A tiny lift may not justify engineering complexity. Segment analysis can reveal whether mobile improved while desktop declined, but avoid overreacting to noisy subgroups.\n\nRecommendation: ship if the primary metric improves meaningfully, guardrails are healthy, instrumentation is trustworthy, and the effect persists across the full test period.',
          followUps: [
            'What if conversion improves but refund rate increases?',
            'How do you avoid peeking at test results too early?',
            'What if the test is positive only for new users?',
          ],
        },
        {
          type: 'question',
          question: 'An experiment shows no statistically significant result. What do you recommend?',
          difficulty: 'medium',
          category: 'Experimentation',
          framework: 'Check power -> inspect direction -> evaluate cost -> decide',
          answer:
            'A non-significant result does not automatically mean the feature has no effect. First check whether the test was powered to detect a meaningful effect. If sample size was too small or the metric is noisy, the result may be inconclusive.\n\nThen inspect the effect size and confidence interval. If the interval includes both meaningful upside and meaningful downside, the test is uncertain. If the interval is tightly centered near zero, the feature likely has little impact on that metric.\n\nNext consider cost and strategy. If the feature is expensive to maintain and shows no measurable benefit, do not ship or roll it back. If it is strategically important, low-risk, or improves qualitative user experience, consider iterating or measuring a better metric.\n\nI would summarize the result as: what we tested, what we observed, how confident we are, what limitations exist, and what decision I recommend.',
          followUps: [
            'What is the difference between no effect and inconclusive?',
            'How would you explain this to a non-technical stakeholder?',
            'When would you run the test again?',
          ],
        },
      ],
    },
    {
      id: 'data-quality',
      title: 'Data Quality and Analytical Judgment',
      group: 'Tools and Execution',
      intro:
        'A data analyst is trusted only if the data is trusted. Interviews often test whether you can catch bad data before it becomes a bad decision.',
      blocks: [
        {
          type: 'question',
          question: 'You find that two dashboards report different revenue numbers. What do you do?',
          difficulty: 'medium',
          category: 'Data Quality',
          framework: 'Definitions -> sources -> filters -> grain -> timing -> reconciliation',
          answer:
            'First compare definitions. One dashboard may show gross revenue while another shows net revenue after refunds, discounts, taxes, or chargebacks. Revenue recognition timing may also differ: order date, payment date, shipment date, or invoice date.\n\nThen compare data sources, filters, and grain. One dashboard may exclude test accounts, canceled orders, internal users, enterprise invoices, or certain geographies. Another may join order items incorrectly and duplicate revenue. Also check timezone and data freshness.\n\nI would reconcile from a trusted source by building a bridge: start with revenue from dashboard A, then add or subtract differences step by step until it matches dashboard B. Each difference should have a named reason.\n\nThe final output should not just be “dashboard A is wrong.” It should be a corrected definition, owner, source of truth, and plan to prevent future confusion.',
          followUps: [
            'How would you decide the source of truth?',
            'What if finance and product use different definitions?',
            'How would you communicate the discrepancy?',
          ],
        },
        {
          type: 'question',
          question: 'How do you handle missing data in an analysis?',
          difficulty: 'easy',
          category: 'Data Quality',
          framework: 'Measure missingness -> diagnose cause -> choose treatment -> disclose',
          answer:
            'First quantify missingness: which fields, how many rows, what percentage, and whether missingness varies by segment, time, source, or platform. Missing data is not always random.\n\nThen diagnose why it is missing. It could be optional user input, tracking failure, late-arriving data, integration issues, privacy restrictions, or a legitimate not-applicable value. Treatment depends on cause.\n\nOptions include excluding rows, imputing values, creating an unknown category, backfilling from another source, or changing the analysis scope. I would avoid blindly filling missing values with zero because zero and unknown mean different things.\n\nFinally, disclose the impact. State how missing data affects confidence and whether the recommendation changes under reasonable assumptions.',
          followUps: [
            'When is it okay to exclude missing rows?',
            'What is the risk of imputing values?',
            'How would you detect tracking failure?',
          ],
        },
        {
          type: 'worked-example',
          title: 'Data quality checklist before sharing analysis',
          scenario:
            'You are about to present an analysis showing that a new onboarding flow improved activation.',
          steps: [
            {
              label: 'Validate population',
              content:
                'Confirm that the user cohort includes the intended signup dates, platforms, countries, and eligibility rules.',
            },
            {
              label: 'Validate metric',
              content:
                'Confirm activation definition, event tracking, duplicate events, bot/test users, and whether late-arriving events are included.',
            },
            {
              label: 'Validate comparison',
              content:
                'Check that control and treatment groups are comparable, or that pre/post comparisons account for seasonality and acquisition mix.',
            },
            {
              label: 'Validate conclusion',
              content:
                'Test whether the conclusion holds across important segments and whether guardrail metrics moved negatively.',
            },
          ],
          result:
            'The analysis becomes more credible because it explains not just the result, but why the result can be trusted.',
        },
      ],
    },
    {
      id: 'behavioral-stakeholder',
      title: 'Behavioral and Stakeholder Questions',
      intro:
        'Data analyst behavioral questions usually focus on ambiguity, stakeholder pressure, communication, prioritization, and moments when the data did not support what someone wanted to hear.',
      blocks: [
        {
          type: 'question',
          question: 'Tell me about a time your analysis changed a business decision.',
          difficulty: 'medium',
          category: 'Behavioral',
          framework: 'Decision -> analysis -> insight -> recommendation -> impact',
          answer:
            'Choose a story where the analysis clearly affected a decision. Start with the business decision at stake: launch, pricing, marketing spend, product change, operations, or prioritization.\n\nThen explain the analysis in plain language. What data did you use, what metric mattered, what segments did you inspect, and what was surprising? Avoid spending the whole answer on tools. The interviewer wants to know how your work changed thinking.\n\nNext state the recommendation and impact. For example, your analysis showed that a campaign looked profitable overall but lost money in one channel, so the team shifted budget and improved ROI. Or a product feature increased clicks but reduced retention, so the team rolled it back.\n\nA strong answer includes caveats and stakeholder communication. Explain how you handled uncertainty and how you made the recommendation understandable.',
          followUps: [
            'How did you measure impact?',
            'Who disagreed with the recommendation?',
            'What would you do differently now?',
          ],
        },
        {
          type: 'question',
          question: 'A stakeholder wants a quick answer, but the data is messy. What do you do?',
          difficulty: 'medium',
          category: 'Stakeholder Communication',
          framework: 'Clarify urgency -> provide directional read -> state limitations -> plan follow-up',
          answer:
            'First clarify the decision and deadline. If the decision is low-risk, a directional answer may be acceptable. If it affects revenue, customers, compliance, or strategy, the quality bar should be higher.\n\nThen explain what can be answered now and what cannot. I might provide a preliminary read with clear caveats: “Based on currently available data, the trend appears negative, but tracking is incomplete for Android users, so I would not make a final launch decision yet.”\n\nI would separate the immediate answer from the follow-up plan. Immediate: best available estimate and confidence level. Follow-up: data cleaning steps, validation checks, source-of-truth reconciliation, and when a stronger answer will be ready.\n\nThis approach keeps the stakeholder moving while protecting analytical integrity. The worst answer is a confident number that is fast but wrong.',
          followUps: [
            'How do you push back on unrealistic deadlines?',
            'When is directional analysis acceptable?',
            'How do you communicate confidence level?',
          ],
        },
        {
          type: 'question',
          question: 'How do you prioritize multiple analytics requests?',
          difficulty: 'easy',
          category: 'Behavioral',
          framework: 'Impact -> urgency -> effort -> dependency -> stakeholder alignment',
          answer:
            'I prioritize based on business impact, urgency, effort, dependencies, and whether the analysis supports an irreversible or high-stakes decision. A request tied to a launch decision tomorrow usually beats a nice-to-have dashboard improvement.\n\nI also clarify the decision each request supports. If a request has no clear decision or owner, it may need refinement before analysis starts. For recurring requests, I look for automation opportunities so the team is not trapped in manual reporting.\n\nWhen priorities conflict, I communicate tradeoffs: “I can complete the churn analysis today or the dashboard refresh today, but not both. Since the churn analysis affects this week\'s retention plan, I recommend doing that first.”\n\nStrong analysts do not just accept every request in order. They help the organization spend analytical time where it changes decisions.',
          followUps: [
            'How do you say no to a stakeholder?',
            'What work would you automate?',
            'How do you handle executive requests?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Data Analyst Prep Strategy',
      intro:
        'Data analyst prep should combine SQL drills, business case practice, dashboard critique, spreadsheet fluency, and communication practice. The goal is to become accurate, clear, and decision-oriented.',
      blocks: [
        {
          type: 'numbered',
          title: '4-week data analyst interview prep plan',
          items: [
            'Week 1: SQL fundamentals. Practice joins, group by, having, dates, nulls, case statements, and aggregation at the correct grain.',
            'Week 2: intermediate SQL. Practice window functions, cohorts, retention, funnels, deduplication, ranking, and query debugging.',
            'Week 3: analytics cases. Practice metric drops, experiment readouts, revenue decomposition, dashboard design, and business recommendations.',
            'Week 4: communication and mock interviews. Practice explaining analysis to non-technical stakeholders, defending assumptions, and discussing past projects.',
          ],
        },
        {
          type: 'bullets',
          title: 'Role-specific prep by company type',
          items: [
            'Product analytics roles: focus on funnels, retention, experimentation, event data, segmentation, and product recommendations.',
            'Marketing analytics roles: focus on attribution, CAC, LTV, channel performance, incrementality, and campaign reporting.',
            'Finance or revenue analytics roles: focus on revenue definitions, cohort revenue, forecasting, pricing, churn, and reconciliation.',
            'Operations analytics roles: focus on SLAs, capacity, defect rates, queue times, process bottlenecks, and root-cause analysis.',
            'Marketplace analytics roles: focus on supply-demand balance, liquidity, matching, pricing, geography, and two-sided marketplace metrics.',
          ],
        },
        {
          type: 'warning',
          title: 'Do not sound like a reporting tool',
          text:
            'Data analyst interviews reward people who can make decisions clearer. Do not only say what chart you would build or what query you would run. Explain what the result would mean and what action it should inform.',
        },
        {
          type: 'key-takeaway',
          text:
            'Great data analyst interview answers combine SQL accuracy, metric judgment, data quality discipline, and clear business communication. The best analysts do not just produce numbers. They help teams make better decisions with the right level of confidence.',
        },
      ],
    },
  ],
}
