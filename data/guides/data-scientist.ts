import type { InterviewGuide } from '#data/interview-guides'

export const dataScientistGuide: InterviewGuide = {
  slug: 'data-scientist',
  title: 'Data Scientist Interview Guide',
  description:
    'Prepare for data scientist interviews with statistics, machine learning, experimentation, SQL, Python, product metrics, model evaluation, and behavioral questions.',
  role: 'Data Scientist',
  industry: 'Data',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 36,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Data scientist interviews test whether you can use data, statistics, and machine learning to make decisions under uncertainty. The strongest candidates combine technical rigor with product judgment and clear communication.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '4-6', label: 'Typical interview rounds' },
            { value: '45-60 min', label: 'Technical round length' },
            { value: '6+', label: 'Core DS skill areas' },
            { value: '5-8 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What data scientist interviewers are evaluating',
          items: [
            'Statistical reasoning: can you separate signal from noise and explain uncertainty correctly?',
            'Experimentation judgment: can you design, analyze, and critique A/B tests without overclaiming?',
            'Machine learning fluency: can you choose models, features, objectives, and evaluation metrics for the problem?',
            'Product sense: can you connect modeling work to user behavior, business impact, and decision-making?',
            'SQL and Python execution: can you manipulate real data accurately and efficiently?',
            'Model evaluation: can you diagnose bias, leakage, overfitting, calibration, drift, and deployment risk?',
            'Communication: can you explain technical findings to product, engineering, and leadership clearly?',
          ],
        },
        {
          type: 'tip',
          title: 'Data science interviews reward calibrated thinking',
          text:
            'Great data scientists do not sound certain when the evidence is weak. They state assumptions, quantify uncertainty, name limitations, and recommend the next best decision based on the available evidence.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Data Scientist Interview Process',
      intro:
        'Most data scientist loops include statistics, experimentation, SQL or Python, product analytics, machine learning, modeling case studies, and behavioral interviews. Research and applied ML roles may emphasize different parts of the loop.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical data scientist interview stages',
          items: [
            'Recruiter screen: confirms role type, level, domain, compensation range, and toolset.',
            'Hiring manager screen: covers past projects, business impact, modeling experience, and communication style.',
            'SQL or Python round: tests data manipulation, joins, aggregations, pandas operations, and practical coding.',
            'Statistics and experimentation round: tests probability, inference, hypothesis testing, A/B testing, and metric interpretation.',
            'Machine learning round: tests feature engineering, model choice, training, evaluation, deployment, and model failure modes.',
            'Product or business case round: asks you to investigate a metric, design an experiment, or recommend a data science solution.',
            'Behavioral round: evaluates ownership, ambiguity, stakeholder management, collaboration with engineering/product, and ethical judgment.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Product Data Scientist',
          columnB: 'Machine Learning Data Scientist',
          rows: [
            {
              label: 'Main focus',
              a: 'Metrics, experimentation, user behavior, decision support, product strategy',
              b: 'Predictive modeling, feature engineering, evaluation, deployment, model monitoring',
            },
            {
              label: 'Common interviews',
              a: 'SQL, A/B tests, product sense, metric diagnosis, causal reasoning',
              b: 'ML fundamentals, modeling case, Python, system constraints, model evaluation',
            },
            {
              label: 'Strong signal',
              a: 'Turns ambiguous business questions into rigorous analysis and clear recommendations',
              b: 'Builds models that solve the right problem and work under real-world constraints',
            },
            {
              label: 'Common mistake',
              a: 'Reporting metrics without explaining decision impact',
              b: 'Choosing complex models before defining objective, data quality, and baseline',
            },
          ],
        },
        {
          type: 'warning',
          title: 'Know which data science role you are interviewing for',
          text:
            'A product analytics data scientist and an ML platform data scientist can have very different interview loops. Tailor preparation to the job description: experimentation and metrics for product DS, modeling depth and production constraints for applied ML DS.',
        },
      ],
    },
    {
      id: 'statistics-probability',
      title: 'Statistics and Probability Questions',
      group: 'Technical Foundations',
      intro:
        'Statistics questions test whether you understand uncertainty, sampling, inference, distributions, and the assumptions behind conclusions. You do not need to recite formulas blindly; you need to reason correctly.',
      blocks: [
        {
          type: 'key-term',
          title: 'Statistics concepts data scientists must know',
          terms: [
            {
              term: 'P-value',
              definition:
                'The probability of observing a result at least as extreme as the current one if the null hypothesis were true. It is not the probability that the null hypothesis is true.',
            },
            {
              term: 'Confidence interval',
              definition:
                'A range produced by a method that would contain the true parameter in a stated percentage of repeated samples. It communicates estimate uncertainty better than a single point estimate.',
            },
            {
              term: 'Statistical power',
              definition:
                'The probability of detecting an effect if the effect truly exists. Low-powered tests can produce inconclusive results even when a real effect is present.',
            },
            {
              term: 'Selection bias',
              definition:
                'Bias created when the observed sample is not representative of the population or treatment assignment is not independent of outcome.',
            },
          ],
        },
        {
          type: 'question',
          question: 'Explain the difference between correlation and causation.',
          difficulty: 'easy',
          category: 'Statistics',
          framework: 'Association versus causal effect',
          answer:
            'Correlation means two variables move together statistically. Causation means changing one variable produces a change in the other, all else equal. Correlation alone does not prove causation because the relationship may be driven by confounding, reverse causality, selection bias, or coincidence.\n\nExample: users who receive more push notifications may have higher retention. That does not prove notifications cause retention. More engaged users may naturally receive more notifications or trigger more notification-worthy events. To estimate causality, we need a randomized experiment, natural experiment, instrumental variable, regression discontinuity, difference-in-differences, or a careful causal design with assumptions.\n\nA strong data scientist answer also explains the decision risk. If we treat correlation as causation, we might increase notifications and hurt users. The right next step is to design an experiment or causal analysis that isolates the effect of notifications.',
          followUps: [
            'What are common sources of confounding?',
            'How would you test whether notifications cause retention?',
            'When is correlation still useful?',
          ],
        },
        {
          type: 'question',
          question: 'What is the difference between Type I and Type II error?',
          difficulty: 'easy',
          category: 'Statistics',
          framework: 'False positive versus false negative',
          answer:
            'A Type I error is a false positive: rejecting the null hypothesis when it is actually true. In an A/B test, that means shipping a feature because it appears to help when it does not. A Type II error is a false negative: failing to reject the null when a real effect exists. That means missing a feature that actually helps.\n\nThe significance level alpha controls the Type I error rate. Power, which is 1 - beta, relates to Type II error. Increasing sample size generally improves power. There is a tradeoff: stricter significance thresholds reduce false positives but can increase false negatives if sample size is not adjusted.\n\nIn product decisions, the acceptable error depends on cost. For a risky checkout change, false positives may be expensive. For a low-risk UI improvement, a slightly higher false positive risk may be acceptable if iteration speed matters.',
          followUps: [
            'Which error is worse for a medical diagnosis model?',
            'How does sample size affect Type II error?',
            'What happens if you run many tests at once?',
          ],
        },
        {
          type: 'question',
          question: 'A coin is flipped 10 times and lands heads 8 times. Is the coin biased?',
          difficulty: 'medium',
          category: 'Probability / Inference',
          framework: 'Hypothesis -> probability -> uncertainty',
          answer:
            'The null hypothesis is that the coin is fair, with probability of heads equal to 0.5. Getting 8 or more heads in 10 flips is possible under a fair coin, so we should not immediately conclude bias.\n\nFor a two-sided test, we would consider outcomes at least as extreme as 8 heads or 2 heads. The probability of 8, 9, or 10 heads is (45 + 10 + 1) / 1024 = 56 / 1024, about 5.5%. Doubling for the lower tail gives about 10.9%. That is not below a 5% significance threshold.\n\nThe conclusion is that 10 flips is a small sample. The result is suggestive but not strong enough evidence to confidently say the coin is biased. We should collect more data if the decision matters.',
          followUps: [
            'How many flips would you want?',
            'What if it landed heads 80 times out of 100?',
            'Would you use a one-sided or two-sided test?',
          ],
        },
      ],
    },
    {
      id: 'experimentation-causal-inference',
      title: 'Experimentation and Causal Inference',
      group: 'Technical Foundations',
      intro:
        'Experimentation questions evaluate whether you can design clean tests, interpret results, avoid false conclusions, and connect experimental evidence to product decisions.',
      blocks: [
        {
          type: 'question',
          question: 'How would you design an A/B test for a new ranking algorithm?',
          difficulty: 'medium',
          category: 'Experimentation',
          framework: 'Hypothesis -> unit -> metrics -> guardrails -> duration -> decision',
          answer:
            'First define the hypothesis. For example, the new ranking algorithm improves user satisfaction by showing more relevant items without hurting diversity, latency, or long-term retention.\n\nRandomization unit matters. If users see ranked content repeatedly, randomize at the user level so each user gets a consistent experience. If there are network effects or marketplace spillovers, simple user-level randomization may not be enough and we may need cluster randomization or careful holdouts.\n\nPrimary metric should reflect the goal: meaningful engagement, conversion, successful sessions, downstream retention, or revenue depending on the product. Secondary metrics might include click-through rate, dwell time, saves, purchases, or hides. Guardrails should include latency, complaint rate, diversity, creator/seller fairness, unsubscribe or churn, and any quality metric that could be gamed.\n\nRun the test long enough to cover weekly seasonality and reach required sample size. Before shipping, check novelty effects, segment differences, guardrail health, and whether the metric lift is practically meaningful, not only statistically significant.',
          followUps: [
            'What if CTR improves but retention drops?',
            'How would you handle interference between users?',
            'What segments would you inspect before launch?',
          ],
        },
        {
          type: 'question',
          question: 'An A/B test is positive overall but negative for new users. What do you recommend?',
          difficulty: 'hard',
          category: 'Experimentation',
          framework: 'Validate -> segment reliability -> business impact -> rollout strategy',
          answer:
            'First validate that the segment result is real. Check sample size, confidence intervals, pre-specified segments, multiple testing risk, and whether new users were properly classified. A noisy subgroup should not override a strong overall result without evidence.\n\nIf the new-user decline is reliable, understand the mechanism. The feature may benefit experienced users who understand the product but confuse new users. New users often need simpler onboarding, more explanation, or a different default.\n\nRecommendation depends on magnitude and strategic importance. If new users are critical to growth, I would not ship globally. I might launch only to existing users, create a new-user-specific variant, or run a follow-up experiment with onboarding changes. If the negative effect is small and short-lived while long-term retention improves, I would investigate further before blocking.\n\nThe answer should show that you can balance aggregate metrics with heterogeneous treatment effects and business context.',
          followUps: [
            'How do you avoid false discoveries in segment analysis?',
            'What if the new-user segment is small?',
            'How would you design the follow-up test?',
          ],
        },
        {
          type: 'question',
          question: 'When would you use difference-in-differences instead of an A/B test?',
          difficulty: 'hard',
          category: 'Causal Inference',
          framework: 'Non-randomized treatment with comparable control trend',
          answer:
            'Difference-in-differences is useful when randomization is not feasible, such as a policy change, regional rollout, pricing change, or operational change that affects one group but not another. It compares the change over time in the treated group to the change over time in a control group.\n\nThe key assumption is parallel trends: without treatment, the treated and control groups would have moved similarly. We should inspect pre-treatment trends to see whether this assumption is plausible. If the treated group was already trending differently, the estimate may be biased.\n\nExample: a feature launches in Canada but not the U.S. We compare Canadian retention before and after launch to U.S. retention before and after the same period. The difference in changes estimates the treatment effect if the control group captures seasonality and external factors.\n\nI would communicate the result more cautiously than a randomized experiment because causal validity depends on assumptions that cannot be fully proven.',
          followUps: [
            'How do you test the parallel trends assumption?',
            'What could violate difference-in-differences?',
            'How would you choose a control group?',
          ],
        },
      ],
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Interview Questions',
      group: 'Machine Learning',
      intro:
        'Machine learning interviews test whether you can frame a prediction problem, choose reasonable baselines, engineer features, evaluate models, and understand why a model may fail in production.',
      blocks: [
        {
          type: 'question',
          question: 'How would you build a churn prediction model?',
          difficulty: 'medium',
          category: 'Machine Learning',
          framework: 'Define label -> build features -> baseline -> evaluate -> deploy carefully',
          answer:
            'First define churn. For a subscription product, churn may mean cancellation, payment failure, or no renewal within a time window. The prediction time should be before the churn event, such as predicting whether an active user will churn in the next 30 days.\n\nCreate a training dataset at a consistent snapshot date. Features could include usage frequency, recency, feature adoption, support tickets, billing issues, plan type, tenure, engagement trend, seat utilization, and prior downgrades. Be careful to avoid leakage: do not include features that occur after the prediction timestamp or directly encode the churn outcome.\n\nStart with a simple baseline like logistic regression or gradient boosted trees depending on interpretability and performance needs. Evaluate with AUC, precision/recall, calibration, lift at top deciles, and business impact of interventions. Accuracy alone is often misleading if churn is rare.\n\nDeployment requires actionability. A churn score is useful only if the company can intervene. Monitor model drift, fairness across segments, intervention effectiveness, and whether the model identifies users who can actually be saved.',
          followUps: [
            'What is label leakage in this problem?',
            'Would you optimize precision or recall?',
            'How would you prove the model creates business value?',
          ],
        },
        {
          type: 'question',
          question: 'Explain overfitting and how to prevent it.',
          difficulty: 'easy',
          category: 'Machine Learning',
          framework: 'Training fit versus generalization',
          answer:
            'Overfitting happens when a model learns noise or idiosyncrasies in the training data instead of patterns that generalize. It performs well on training data but poorly on unseen data.\n\nWays to reduce overfitting include using train/validation/test splits, cross-validation, regularization, simpler models, pruning trees, early stopping, dropout for neural networks, more data, feature selection, and proper hyperparameter tuning. Data leakage can look like excellent performance but fail in production, so leakage checks are also essential.\n\nThe right prevention depends on the model and problem. For a high-dimensional sparse model, regularization may help. For gradient boosted trees, depth, learning rate, number of estimators, and early stopping matter. For time series or user behavior data, validation must respect time order to avoid training on the future.',
          followUps: [
            'How do you detect overfitting?',
            'What is the difference between validation and test sets?',
            'Can a model underfit and overfit at the same time?',
          ],
        },
        {
          type: 'question',
          question: 'How would you choose between logistic regression and a random forest?',
          difficulty: 'medium',
          category: 'Machine Learning',
          framework: 'Interpretability, nonlinearity, data size, performance, deployment',
          answer:
            'Logistic regression is a strong baseline for binary classification. It is fast, interpretable, easier to calibrate, and works well when relationships are roughly linear after feature engineering. It is often a good choice when stakeholders need clear explanations or when data is limited.\n\nRandom forests can capture nonlinear relationships and feature interactions without as much manual specification. They may perform better on complex tabular data but are less interpretable, can be larger to serve, and may not extrapolate well outside the training distribution.\n\nI would compare them using the same train/validation split, proper metrics, calibration, inference cost, and business constraints. If logistic regression performs nearly as well and interpretability matters, choose it. If random forest provides a meaningful lift and can be explained and deployed responsibly, use it or compare with gradient boosted trees.\n\nThe best answer is not that one model is always better. It depends on objective, data, constraints, and actionability.',
          followUps: [
            'How would you explain random forest predictions?',
            'When does interpretability matter more than accuracy?',
            'Why might gradient boosting outperform random forests?',
          ],
        },
        {
          type: 'question',
          question: 'A model performs well offline but poorly after launch. What could be wrong?',
          difficulty: 'hard',
          category: 'Model Evaluation / Production',
          framework: 'Data mismatch -> leakage -> metric mismatch -> drift -> implementation -> feedback loops',
          answer:
            'Several failure modes are possible. The offline dataset may not match production traffic. There may be training-serving skew where features are computed differently online than offline. The validation split may have leaked future information or failed to respect time. The offline metric may not match the product objective.\n\nProduction data may drift: user behavior, seasonality, acquisition channels, inventory, pricing, or external events can change. The model may also create feedback loops. For example, a recommendation model changes what users see, which changes future training data.\n\nImplementation issues are common: missing features, default values, latency timeouts, feature freshness problems, incorrect thresholding, or model version mismatch. Segment performance may also be poor even if the aggregate offline metric looked good.\n\nI would compare offline and online feature distributions, prediction distributions, calibration, segment metrics, logs, and business outcomes. Then decide whether to roll back, adjust thresholds, fix feature pipelines, retrain, or redesign the objective.',
          followUps: [
            'What is training-serving skew?',
            'How would you monitor model drift?',
            'How do feedback loops affect recommender systems?',
          ],
        },
      ],
    },
    {
      id: 'model-evaluation',
      title: 'Model Evaluation and Metrics',
      group: 'Machine Learning',
      intro:
        'Model evaluation questions test whether you can choose metrics that match the business problem. A model can have impressive accuracy and still be useless if the metric is wrong.',
      blocks: [
        {
          type: 'comparison-table',
          columnA: 'Classification',
          columnB: 'Ranking / Recommendation',
          rows: [
            {
              label: 'Common metrics',
              a: 'Precision, recall, F1, AUC, log loss, calibration',
              b: 'NDCG, MAP, MRR, hit rate, coverage, diversity, online engagement',
            },
            {
              label: 'Main risk',
              a: 'Class imbalance can make accuracy misleading',
              b: 'Offline relevance metrics may not match user satisfaction',
            },
            {
              label: 'Business tie-in',
              a: 'Threshold should reflect cost of false positives and false negatives',
              b: 'Ranking should balance relevance, freshness, diversity, fairness, and latency',
            },
          ],
        },
        {
          type: 'question',
          question: 'When would you optimize precision versus recall?',
          difficulty: 'medium',
          category: 'Model Evaluation',
          framework: 'Cost of false positives versus false negatives',
          answer:
            'Optimize precision when false positives are expensive. For example, if a fraud model blocks legitimate customers, false positives create customer harm and revenue loss. High precision means that when the model flags something, it is usually correct.\n\nOptimize recall when false negatives are expensive. For example, in medical screening or severe fraud detection, missing a true positive can be more costly than investigating extra false positives. High recall means the model catches most actual positives.\n\nMost real systems require a tradeoff. The threshold should be chosen based on business costs, operational capacity, user harm, and downstream workflow. I would usually evaluate precision-recall curves, not just a single threshold, especially for imbalanced classes.',
          followUps: [
            'Why can accuracy be misleading for rare events?',
            'How would you choose a threshold?',
            'What metric would you use for fraud detection?',
          ],
        },
        {
          type: 'question',
          question: 'What is model calibration and why does it matter?',
          difficulty: 'medium',
          category: 'Model Evaluation',
          framework: 'Probability quality, not just ranking quality',
          answer:
            'Calibration means predicted probabilities match observed frequencies. If a calibrated model assigns 0.8 probability to 1,000 examples, about 800 should actually be positive.\n\nCalibration matters when probabilities drive decisions: risk scoring, pricing, medical triage, fraud review queues, churn interventions, or expected value calculations. A model can rank examples well with high AUC but still produce poorly calibrated probabilities.\n\nWe can inspect calibration curves or reliability diagrams and metrics like Brier score. Calibration methods include Platt scaling, isotonic regression, and temperature scaling. However, calibration should be checked on validation data that reflects production distribution.\n\nIn an interview, emphasize that not every application needs perfectly calibrated probabilities. If the model only ranks content, ranking metrics may matter more. If the number is interpreted as risk, calibration becomes critical.',
          followUps: [
            'Can a model have high AUC and poor calibration?',
            'How would you improve calibration?',
            'When does calibration matter for business decisions?',
          ],
        },
      ],
    },
    {
      id: 'sql-python',
      title: 'SQL and Python Questions',
      group: 'Execution Skills',
      intro:
        'Data scientist interviews often include SQL and Python because strong modeling work still depends on accurate data extraction, transformation, validation, and exploratory analysis.',
      blocks: [
        {
          type: 'question',
          question: 'Write SQL to calculate monthly retention by signup cohort.',
          difficulty: 'medium',
          category: 'SQL / Cohorts',
          framework: 'Cohort month -> activity month -> month offset -> aggregate',
          answer:
            'Create a cohort CTE with each user and their signup month. Create an activity CTE with distinct user_id and activity month for qualifying active events. Join activity to cohort by user_id, then calculate month_number as the difference between activity month and signup month. Group by cohort month and month_number, counting distinct active users.\n\nThe denominator is the number of users in the original cohort. The numerator for month N is users from that cohort active in month N. Use a left join if you need to preserve months with zero retained users.\n\nImportant details: define active event, exclude test users, handle users who signed up near month boundaries, use consistent timezone, and avoid counting multiple activity events per user-month. The result should be a cohort table where each row is a signup month and each column or row offset is retention month.',
          followUps: [
            'How would you calculate rolling retention instead?',
            'How would you visualize cohort retention?',
            'What if activity data arrives late?',
          ],
        },
        {
          type: 'question',
          question: 'In Python, how would you investigate missing values in a dataset?',
          difficulty: 'easy',
          category: 'Python / EDA',
          framework: 'Quantify -> segment -> diagnose -> decide treatment',
          answer:
            'I would first quantify missingness by column: count, percentage, and data type. In pandas, df.isna().sum() and df.isna().mean() give a quick profile. Then I would inspect whether missingness is concentrated by time, segment, source, device, geography, or target label.\n\nThe key question is why values are missing. Missing completely at random is different from missing because a user skipped a field, tracking failed, a device does not support an event, or a value is not applicable.\n\nTreatment depends on cause and model needs. Options include keeping missing as its own category, imputing with median or mode, using model-based imputation, excluding rows, or fixing upstream data collection. For modeling, I would fit imputation only on training data and apply it to validation/test to avoid leakage.\n\nI would also evaluate whether missingness itself is predictive. For example, missing income in a credit dataset or missing profile fields in a consumer product can carry signal, but using it may raise fairness or compliance concerns.',
          followUps: [
            'When would missingness be informative?',
            'How do you avoid leakage during imputation?',
            'What would you do if the target label has missing values?',
          ],
        },
        {
          type: 'question',
          question: 'How would you detect outliers, and when should you remove them?',
          difficulty: 'medium',
          category: 'Python / Statistics',
          framework: 'Detect -> diagnose -> decide by business meaning',
          answer:
            'Outlier detection methods include summary statistics, histograms, box plots, z-scores, IQR rules, percentile thresholds, and model-based approaches. But detection is only the first step. The important question is whether the outlier is an error, a rare but valid case, or the most important part of the distribution.\n\nI would inspect outliers by source, timestamp, segment, and raw records. A negative age is likely a data error. A very large enterprise purchase may be valid and should not be removed from revenue analysis without reason. For modeling, outliers may require transformation, winsorization, robust models, or segment-specific treatment.\n\nRemove outliers only when there is a defensible reason: impossible value, duplicate event, instrumentation bug, test account, or records outside analysis scope. If valid outliers affect the conclusion, report sensitivity with and without them.',
          followUps: [
            'What is winsorization?',
            'How can outliers affect linear regression?',
            'When are outliers the signal?',
          ],
        },
      ],
    },
    {
      id: 'product-analytics',
      title: 'Product Analytics and Business Case Questions',
      group: 'Product and Business Judgment',
      intro:
        'Many data scientist roles are embedded with product teams. These interviews test whether you can translate product ambiguity into metrics, analysis plans, experiments, and decisions.',
      blocks: [
        {
          type: 'question',
          question: 'A recommendation feature increased clicks but decreased purchases. What do you do?',
          difficulty: 'medium',
          category: 'Product Analytics',
          framework: 'Metric quality -> funnel diagnosis -> segment -> mechanism -> action',
          answer:
            'Clicks may be a weak proxy for value. First verify the result and define the funnel: impressions, clicks, add-to-cart, checkout, purchase, refunds, and repeat behavior. If clicks increased but purchases decreased, the recommendation may be attracting curiosity without purchase intent or distracting users from better paths.\n\nSegment by user type, traffic source, product category, device, and recommendation surface. New users might click more because the module is prominent but find irrelevant items. Returning users might be disrupted from their normal purchase flow.\n\nInspect recommendation quality: relevance, price mismatch, availability, delivery time, diversity, and whether recommended items are out of stock or low margin. Also check latency and page layout changes.\n\nRecommendation: do not ship based on clicks alone. Either roll back, limit exposure to segments where purchases are healthy, or redesign the objective to optimize downstream purchase quality instead of click-through rate.',
          followUps: [
            'What primary metric would you choose?',
            'How would you measure recommendation quality?',
            'What if revenue increased but purchases decreased?',
          ],
        },
        {
          type: 'question',
          question: 'How would you measure marketplace health?',
          difficulty: 'hard',
          category: 'Product Analytics',
          framework: 'Liquidity -> quality -> balance -> retention -> unit economics',
          answer:
            'Marketplace health depends on both sides. The core concept is liquidity: can demand find suitable supply quickly, and can supply find enough demand to stay engaged?\n\nMetrics depend on marketplace type. For rideshare: match rate, time to match, ETA, cancellation rate, driver utilization, rider repeat rate, price surge frequency, and geographic coverage. For freelance marketplaces: percentage of jobs receiving qualified bids, time to first bid, hire rate, project completion, dispute rate, repeat hiring, and provider utilization.\n\nSegment by geography, category, time of day, user cohort, supply tier, and demand intent. Marketplace averages hide local imbalance. A marketplace can look healthy overall while failing in a specific city or category.\n\nGuardrails include trust and safety, fraud, quality complaints, refunds, churn on either side, and unit economics. Recommendations should identify whether the constrained side is supply or demand because growth levers differ completely.',
          followUps: [
            'How would you solve a cold-start problem?',
            'How do you know which side is constrained?',
            'What metric would you show leadership weekly?',
          ],
        },
        {
          type: 'question',
          question: 'How would you define a North Star metric for a language learning app?',
          difficulty: 'medium',
          category: 'Product Metrics',
          framework: 'User value -> repeated behavior -> learning outcome -> guardrails',
          answer:
            'A North Star metric should capture durable user value, not just activity. For a language learning app, daily sessions alone may be too shallow because users can open the app without learning. A better candidate might be weekly active learners who complete a meaningful lesson with sufficient accuracy, or weekly learning minutes that meet quality criteria.\n\nI would consider the core value: helping users make progress in a language. Input metrics could include lesson starts, lesson completions, streaks, accuracy, review completion, speaking practice, and level progression. Outcome metrics could include retention, subscription conversion, placement improvement, or external proficiency assessments if available.\n\nGuardrails: burnout, low-quality rapid completions, cheating, notification opt-outs, churn, and user frustration. If the metric only rewards more time spent, it may encourage grind rather than learning.\n\nI would define the North Star with product and learning science stakeholders, then validate whether it predicts retention and user-reported progress.',
          followUps: [
            'Why not use DAU as the North Star?',
            'How would you prevent gaming the metric?',
            'How would this differ for casual versus serious learners?',
          ],
        },
      ],
    },
    {
      id: 'modeling-case-studies',
      title: 'Modeling Case Studies',
      group: 'Machine Learning',
      intro:
        'Modeling case interviews test the full data science workflow: problem framing, labels, features, baseline, evaluation, deployment, monitoring, and business value.',
      blocks: [
        {
          type: 'question',
          question: 'Design a fraud detection model for online payments.',
          difficulty: 'hard',
          category: 'Modeling Case',
          framework: 'Objective -> labels -> features -> metrics -> intervention -> monitoring',
          answer:
            'First define fraud and the action. Are we blocking transactions, sending them to manual review, requiring step-up authentication, or scoring risk? The model objective should match the intervention because false positives can hurt legitimate customers.\n\nLabels may come from chargebacks, confirmed fraud investigations, user reports, or rule-based flags. Labels are delayed and imperfect, so account for label latency and noise. Features might include transaction amount, merchant, device, IP/geography mismatch, account age, velocity, payment method history, failed attempts, shipping distance, and prior disputes.\n\nStart with rules and a simple baseline, then compare models such as logistic regression, gradient boosted trees, or anomaly detection depending on label quality. Evaluation should emphasize precision-recall, recall at a fixed review capacity, false positive rate for legitimate users, dollar-weighted fraud caught, and calibration.\n\nDeployment requires monitoring drift, adversarial adaptation, fairness, latency, manual review capacity, feedback loops, and rollback. A fraud model is not just a prediction problem; it is an operational system.',
          followUps: [
            'How would you handle delayed labels?',
            'What is the cost of false positives?',
            'How would fraudsters adapt?',
          ],
        },
        {
          type: 'question',
          question: 'Build a model to predict estimated delivery time.',
          difficulty: 'hard',
          category: 'Modeling Case',
          framework: 'Target definition -> feature availability -> metric -> calibration -> user impact',
          answer:
            'Define the target as actual delivery duration from order confirmation to arrival, or break it into components: preparation time, courier assignment, pickup time, travel time, and handoff. Component modeling can be more interpretable and operationally useful.\n\nFeatures available at prediction time may include restaurant, cuisine, time of day, day of week, weather, distance, courier supply, current backlog, historical prep times, traffic, order size, and geographic zone. Avoid using features not known at prediction time, such as actual pickup time if predicting at order placement.\n\nMetrics should reflect user experience. MAE is easy to interpret, but underestimation may be worse than overestimation. Calibration matters: if we promise a delivery window, the order should arrive within that window at the expected rate.\n\nDeployment concerns include latency, real-time feature freshness, cold-start restaurants, holidays, weather shocks, and feedback loops from quoted ETAs influencing user decisions. Monitor error by restaurant, zone, time, and customer segment.',
          followUps: [
            'Would you model total time or components?',
            'How would you handle new restaurants?',
            'What is worse: overestimating or underestimating ETA?',
          ],
        },
        {
          type: 'worked-example',
          title: 'Modeling case structure',
          scenario:
            'The interviewer asks you to design a model that predicts whether a free trial user will convert to paid.',
          steps: [
            {
              label: 'Frame objective',
              content:
                'Define the prediction moment and label: probability that a trial user converts within 14 or 30 days after trial start.',
            },
            {
              label: 'Identify features',
              content:
                'Use only data available before prediction: activation events, usage frequency, feature adoption, team invites, source channel, device, firmographic data, and support interactions.',
            },
            {
              label: 'Choose baseline',
              content:
                'Start with simple heuristics or logistic regression, then compare to tree-based models if nonlinear interactions matter.',
            },
            {
              label: 'Evaluate actionability',
              content:
                'Optimize for lift in top deciles, calibration, and conversion uplift from interventions, not only offline AUC.',
            },
          ],
          result:
            'The answer shows end-to-end data science judgment: objective, data, modeling, evaluation, and business use.',
        },
      ],
    },
    {
      id: 'behavioral-communication',
      title: 'Behavioral and Communication Questions',
      intro:
        'Behavioral data science interviews focus on ambiguity, influence, technical communication, project impact, ethical judgment, and cases where the data did not support the preferred narrative.',
      blocks: [
        {
          type: 'question',
          question: 'Tell me about a data science project that had business impact.',
          difficulty: 'medium',
          category: 'Behavioral',
          framework: 'Problem -> method -> decision -> impact -> lesson',
          answer:
            'Choose a project where your work changed a decision, product, process, or metric. Start with the business problem and why it mattered. Then explain your method at the right level: data sources, analysis or model, validation, and tradeoffs.\n\nThe strongest answer connects technical work to business action. For example, a churn model helped customer success prioritize outreach, an experiment changed a launch decision, or a pricing analysis improved revenue without hurting conversion.\n\nQuantify impact if possible: revenue lift, churn reduction, time saved, cost reduction, better targeting, or improved decision speed. Also explain limitations and what you would improve next.\n\nAvoid making the answer a tool walkthrough. The interviewer cares less about which library you used and more about whether your work was correct, trusted, adopted, and useful.',
          followUps: [
            'How did you measure impact?',
            'What was the hardest technical challenge?',
            'How did you get stakeholder buy-in?',
          ],
        },
        {
          type: 'question',
          question: 'How do you explain a complex model to non-technical stakeholders?',
          difficulty: 'medium',
          category: 'Communication',
          framework: 'Decision -> intuition -> evidence -> limitations -> action',
          answer:
            'I start with the decision the stakeholder needs to make, not the model architecture. Then I explain the model intuition in plain language: what it predicts, what signals it uses, how accurate it is, and where it should not be trusted.\n\nI use examples, feature importance or reason codes when appropriate, calibration plots, and simple tradeoff charts like precision versus recall. I avoid pretending the model is magic. Stakeholders need to understand limitations: data quality, uncertainty, bias, drift, and edge cases.\n\nFinally, I connect the model to action. For example, “This model identifies the top 10% of accounts most likely to churn, but the value comes from testing whether outreach to that group improves retention.” This keeps the conversation focused on decisions and outcomes.',
          followUps: [
            'What if stakeholders only care about accuracy?',
            'How do you communicate uncertainty?',
            'When would you avoid using a complex model?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time your analysis contradicted what stakeholders wanted to hear.',
          difficulty: 'hard',
          category: 'Behavioral',
          framework: 'Expectation -> evidence -> communication -> decision -> outcome',
          answer:
            'Pick a real example where evidence challenged a preferred plan. Explain what stakeholders expected, what data you analyzed, and why the conclusion differed. Be specific about validation because credibility matters in these situations.\n\nThen describe how you communicated the finding. Strong answers show diplomacy: acknowledge the stakeholder goal, present evidence clearly, explain uncertainty, and offer alternatives. The goal is not to win an argument; it is to help the team make a better decision.\n\nClose with the outcome. Maybe the team delayed launch, changed targeting, ran a smaller test, or chose a different metric. If stakeholders ignored the recommendation, explain what happened and what you learned about influence and communication.',
          followUps: [
            'How did you preserve the relationship?',
            'What if leadership disagreed?',
            'How did you make the analysis more trustworthy?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Data Scientist Prep Strategy',
      intro:
        'Data scientist prep should combine statistics, experimentation, SQL, Python, machine learning, product cases, and project storytelling. The right emphasis depends on whether the role is product analytics, applied ML, research, or platform-oriented.',
      blocks: [
        {
          type: 'numbered',
          title: '6-week data scientist interview prep plan',
          items: [
            'Week 1: statistics and probability. Review distributions, sampling, confidence intervals, hypothesis testing, p-values, power, bias, variance, and causal pitfalls.',
            'Week 2: experimentation. Practice A/B test design, metric selection, guardrails, sample size intuition, segment analysis, multiple testing, and experiment readouts.',
            'Week 3: SQL and Python. Practice cohorts, funnels, window functions, pandas grouping, missing values, joins, feature creation, and exploratory analysis.',
            'Week 4: machine learning fundamentals. Review classification, regression, regularization, trees, boosting, calibration, evaluation metrics, leakage, and drift.',
            'Week 5: modeling and product cases. Practice churn, fraud, recommendation, pricing, ranking, forecasting, and marketplace problems end to end.',
            'Week 6: mock interviews and storytelling. Prepare 4-6 project stories, explain impact clearly, rehearse tradeoffs, and tailor examples to each target company.',
          ],
        },
        {
          type: 'bullets',
          title: 'Role-specific prep by data science track',
          items: [
            'Product data scientist: emphasize SQL, experimentation, causal inference, product metrics, funnels, retention, and stakeholder recommendations.',
            'Applied ML data scientist: emphasize feature engineering, model selection, offline/online evaluation, deployment constraints, monitoring, and business objective alignment.',
            'Marketing data scientist: emphasize attribution, incrementality, LTV, CAC, uplift modeling, experimentation, and channel optimization.',
            'Risk or fraud data scientist: emphasize imbalanced classification, precision/recall tradeoffs, delayed labels, adversarial behavior, explainability, and monitoring.',
            'Research-oriented data scientist: emphasize statistics depth, modeling assumptions, experimental design, paper-level reasoning, and technical communication.',
          ],
        },
        {
          type: 'warning',
          title: 'Do not lead with model complexity',
          text:
            'Interviewers often prefer a simple model framed correctly over a complex model solving the wrong problem. Always define the decision, label, baseline, evaluation metric, and failure modes before proposing advanced techniques.',
        },
        {
          type: 'key-takeaway',
          text:
            'Great data scientist interview answers balance statistical rigor, modeling judgment, product understanding, and communication. The goal is not to prove you know every algorithm. The goal is to show that you can use data science to make better decisions under uncertainty.',
        },
      ],
    },
  ],
}
