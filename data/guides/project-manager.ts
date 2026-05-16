import type { InterviewGuide } from '#data/interview-guides'

export const projectManagerGuide: InterviewGuide = {
  slug: 'project-manager',
  title: 'Project Manager Interview Guide',
  description:
    'Prepare for project manager interviews with scope, schedule, risk, stakeholder management, Agile, waterfall, status reporting, delivery recovery, and behavioral questions.',
  role: 'Project Manager',
  industry: 'Project Management',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 34,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Project manager interviews test whether you can plan work clearly, align stakeholders, manage risk, keep delivery on track, communicate status honestly, and recover projects when reality changes.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '3-5', label: 'Typical interview rounds' },
            { value: '45-60 min', label: 'Scenario round length' },
            { value: '6+', label: 'Core PM skill areas' },
            { value: '3-6 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What project manager interviewers are evaluating',
          items: [
            'Planning discipline: can you define scope, milestones, dependencies, resources, and success criteria?',
            'Execution control: can you track progress, remove blockers, manage dependencies, and keep teams accountable?',
            'Risk management: can you identify risks early, quantify impact, and create mitigation and contingency plans?',
            'Stakeholder management: can you align executives, business owners, technical teams, vendors, and users?',
            'Communication: can you deliver clear status, escalate appropriately, and avoid surprises?',
            'Adaptability: can you manage change requests, shifting priorities, and delivery tradeoffs without losing control?',
            'Leadership: can you influence teams without always having formal authority?',
          ],
        },
        {
          type: 'tip',
          title: 'Strong project managers create clarity',
          text:
            'The best project managers do not pretend projects are predictable. They make uncertainty visible, create decision points, protect the critical path, and communicate tradeoffs before they become crises.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Project Manager Interview Process',
      intro:
        'Project manager interview loops usually include behavioral questions, delivery scenario questions, stakeholder management cases, planning exercises, Agile or waterfall questions, and sometimes tool or domain-specific discussions.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical project manager interview stages',
          items: [
            'Recruiter screen: confirms project management background, domain, tools, certifications, compensation range, and role fit.',
            'Hiring manager screen: covers project scope, delivery experience, stakeholder management, and leadership style.',
            'Scenario round: asks how you would handle delays, scope changes, conflicts, risks, or executive pressure.',
            'Execution round: tests planning, schedules, dependencies, status reporting, resource management, and delivery governance.',
            'Methodology round: may cover Agile, Scrum, waterfall, hybrid delivery, Jira, MS Project, Smartsheet, or program governance.',
            'Behavioral round: evaluates ownership, conflict resolution, ambiguity, communication, accountability, and resilience.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Project Manager',
          columnB: 'Program Manager',
          rows: [
            {
              label: 'Primary focus',
              a: 'Delivering a defined project within scope, timeline, budget, and quality expectations',
              b: 'Coordinating multiple related projects toward a broader strategic outcome',
            },
            {
              label: 'Common work',
              a: 'Project plan, risks, dependencies, status, issue resolution, stakeholder updates',
              b: 'Roadmaps, cross-project dependencies, governance, benefits realization, executive alignment',
            },
            {
              label: 'Interview signal',
              a: 'Can drive execution and manage delivery tradeoffs',
              b: 'Can manage complexity across teams, portfolios, and long-term objectives',
            },
            {
              label: 'Overlap',
              a: 'Communication, risk, dependencies, stakeholder alignment, escalation',
              b: 'Communication, risk, dependencies, stakeholder alignment, escalation',
            },
          ],
        },
        {
          type: 'warning',
          title: 'Do not describe project management as meeting scheduling',
          text:
            'Interviewers want evidence that you drive outcomes. Talk about scope control, risk, decisions, dependencies, delivery metrics, conflict resolution, and business impact.',
        },
      ],
    },
    {
      id: 'planning-scope',
      title: 'Scope, Planning, and Delivery Questions',
      group: 'Core Project Management',
      intro:
        'Planning questions test whether you can define the work clearly enough for teams to execute and stakeholders to understand tradeoffs.',
      blocks: [
        {
          type: 'key-term',
          title: 'Project management concepts to know',
          terms: [
            {
              term: 'Scope',
              definition:
                'The agreed work, deliverables, requirements, boundaries, and exclusions of a project.',
            },
            {
              term: 'Critical path',
              definition:
                'The sequence of dependent tasks that determines the shortest possible project duration. Delays on the critical path delay the project unless mitigated.',
            },
            {
              term: 'RAID log',
              definition:
                'A tracking document for risks, assumptions, issues, and dependencies.',
            },
            {
              term: 'Change control',
              definition:
                'A process for evaluating and approving changes to scope, timeline, budget, or requirements.',
            },
          ],
        },
        {
          type: 'question',
          question: 'How do you start a new project?',
          difficulty: 'easy',
          category: 'Planning',
          framework: 'Objective -> stakeholders -> scope -> plan -> governance',
          answer:
            'I start by clarifying the business objective and success criteria. What outcome are we trying to achieve, why does it matter, how will success be measured, and what is the deadline or constraint?\n\nThen I identify stakeholders, decision-makers, project sponsor, delivery team, users, dependencies, and anyone affected by the change. I clarify roles and responsibilities early so ownership is not ambiguous.\n\nNext I define scope: deliverables, requirements, exclusions, assumptions, constraints, milestones, budget, resources, and risks. I break the work into phases or workstreams, identify dependencies, and create an initial project plan.\n\nFinally, I establish governance: status cadence, escalation path, decision process, risk log, issue log, change control, and communication plan. A strong project start creates alignment before execution pressure begins.',
          followUps: [
            'What goes into a project charter?',
            'How do you identify stakeholders?',
            'How detailed should the project plan be at the start?',
          ],
        },
        {
          type: 'question',
          question: 'How do you create a project plan for a complex cross-functional initiative?',
          difficulty: 'medium',
          category: 'Planning',
          framework: 'Work breakdown -> dependencies -> owners -> timeline -> risks',
          answer:
            'I would first define the outcome and major deliverables. Then I would break the initiative into workstreams such as product, engineering, operations, legal, finance, training, data, and go-to-market depending on the project.\n\nFor each workstream, define tasks, owners, dependencies, estimates, milestones, and acceptance criteria. Then identify the critical path. Some tasks can run in parallel, but others depend on prior decisions, approvals, technical work, vendor delivery, or user testing.\n\nI would build a project plan that includes milestones, dependency map, resource assumptions, decision points, risks, and communication cadence. The plan should be detailed enough to manage execution but flexible enough to adjust as new information arrives.\n\nI would validate the plan with team leads before committing dates. Project managers should not invent timelines in isolation. The best plan is co-owned by the people doing the work.',
          followUps: [
            'How do you estimate timelines?',
            'What if teams disagree on dependencies?',
            'How do you manage the critical path?',
          ],
        },
        {
          type: 'question',
          question: 'How do you manage scope creep?',
          difficulty: 'medium',
          category: 'Scope Management',
          framework: 'Baseline scope -> assess change -> tradeoffs -> decision -> communicate',
          answer:
            'First, establish a clear baseline scope and success criteria at the beginning. Scope creep is harder to manage when the original scope was vague.\n\nWhen a new request appears, I clarify the request, reason, urgency, business value, and whether it is required for launch or can be deferred. Then I assess impact on timeline, budget, resources, risk, quality, testing, and dependencies.\n\nI do not simply say no. I present options: add the request and move the date, add the request and remove something else, defer the request to a later phase, or reject it if it does not support the goal. The decision should be made by the right owner and documented.\n\nThe key is transparency. Stakeholders can request changes, but they should see the tradeoff. Hidden scope creep is what damages delivery.',
          followUps: [
            'What if the request comes from an executive?',
            'How do you document scope changes?',
            'When would you accept scope creep?',
          ],
        },
      ],
    },
    {
      id: 'schedule-resources',
      title: 'Schedule, Resource, and Dependency Questions',
      group: 'Core Project Management',
      intro:
        'Schedule and resource questions test whether you can protect the critical path, manage constraints, and keep delivery realistic.',
      blocks: [
        {
          type: 'question',
          question: 'A project is running two weeks behind schedule. What do you do?',
          difficulty: 'medium',
          category: 'Delivery Recovery',
          framework: 'Assess -> root cause -> options -> decision -> communicate',
          answer:
            'First assess the real status. Which milestones are late, what is on the critical path, what work is complete, what remains, and whether the delay affects the final launch date. Sometimes a task is late but has float; sometimes a small delay blocks everything.\n\nThen identify root cause: underestimated work, dependency delay, resource constraint, unclear requirements, technical issue, vendor delay, approval bottleneck, or scope change. The fix depends on the cause.\n\nNext develop recovery options. Options may include resequencing work, adding resources, reducing scope, extending timeline, parallelizing tasks, escalating a blocked decision, or accepting higher risk. Each option should include tradeoffs.\n\nCommunicate early with stakeholders. A strong status update includes impact, cause, recovery plan, decisions needed, and confidence level. I would avoid hiding the delay until it becomes unrecoverable.',
          followUps: [
            'How do you know if the launch date is at risk?',
            'When would you add more people?',
            'How do you communicate the delay to executives?',
          ],
        },
        {
          type: 'question',
          question: 'How do you handle resource constraints across multiple projects?',
          difficulty: 'medium',
          category: 'Resource Management',
          framework: 'Capacity -> priority -> tradeoffs -> alignment',
          answer:
            'First quantify capacity and demand. Which teams or people are constrained, what percentage of their time is committed, what skills are scarce, and which project milestones depend on them?\n\nThen prioritize based on business value, urgency, risk, compliance, revenue impact, customer impact, and strategic importance. If there is not enough capacity, the answer cannot be to pretend everything will still happen.\n\nI would present tradeoffs to leadership: delay lower-priority work, reduce scope, move resources, hire contractors, extend timeline, or accept risk. The decision should be made transparently, not through informal overcommitment.\n\nDuring execution, I would monitor utilization, blockers, and burnout risk. Resource planning is not only about dates; it is also about sustainable delivery.',
          followUps: [
            'How do you handle shared engineering resources?',
            'What if every stakeholder says their project is top priority?',
            'How do you prevent team burnout?',
          ],
        },
        {
          type: 'question',
          question: 'How do you manage dependencies between teams?',
          difficulty: 'medium',
          category: 'Dependencies',
          framework: 'Identify -> owner -> date -> risk -> escalation',
          answer:
            'I identify dependencies during planning and maintain them actively during execution. Each dependency should have an owner, deliverable, due date, acceptance criteria, and impact if missed.\n\nI would use a dependency tracker or RAID log and review critical dependencies in status meetings. For high-risk dependencies, I would create early checkpoints rather than waiting until the due date.\n\nIf a dependency slips, I assess impact on the critical path and work with teams on mitigation: resequence tasks, use a temporary workaround, reduce scope, escalate a decision, or adjust timeline.\n\nThe important behavior is not just tracking dependencies. It is making ownership and impact clear enough that teams can act before the project is blocked.',
          followUps: [
            'What is a dependency tracker?',
            'How do you handle external vendor dependencies?',
            'What if a dependent team misses its commitment?',
          ],
        },
      ],
    },
    {
      id: 'risk-issue-change',
      title: 'Risk, Issue, and Change Management',
      group: 'Project Control',
      intro:
        'Risk and issue questions test whether you can anticipate problems, distinguish risks from active issues, and manage change without losing stakeholder trust.',
      blocks: [
        {
          type: 'comparison-table',
          columnA: 'Risk',
          columnB: 'Issue',
          rows: [
            {
              label: 'Definition',
              a: 'A potential future event that could affect the project',
              b: 'A current problem already affecting the project',
            },
            {
              label: 'Example',
              a: 'Vendor may miss API delivery date',
              b: 'Vendor missed API delivery date and integration is blocked',
            },
            {
              label: 'Management approach',
              a: 'Mitigation plan, contingency plan, owner, probability, impact',
              b: 'Resolution plan, owner, due date, escalation, impact tracking',
            },
          ],
        },
        {
          type: 'question',
          question: 'How do you manage project risks?',
          difficulty: 'medium',
          category: 'Risk Management',
          framework: 'Identify -> assess -> mitigate -> monitor -> escalate',
          answer:
            'I start risk management early during planning and continue it throughout execution. Risks can come from scope, schedule, budget, technology, vendors, resources, approvals, compliance, adoption, or external factors.\n\nFor each risk, I document description, probability, impact, owner, mitigation plan, contingency plan, trigger, and status. Probability and impact help prioritize attention. High-probability, high-impact risks need active mitigation and often executive visibility.\n\nMitigation reduces the chance or impact of the risk. Contingency defines what we will do if it happens. For example, if vendor delivery may slip, mitigation could be weekly checkpoints and early technical validation; contingency could be a temporary manual process or phased launch.\n\nI review risks regularly and escalate when decisions or resources are needed. Risk management should be practical, not a static spreadsheet nobody uses.',
          followUps: [
            'What is the difference between mitigation and contingency?',
            'How do you prioritize risks?',
            'When should a risk be escalated?',
          ],
        },
        {
          type: 'question',
          question: 'A major requirement changes one month before launch. What do you do?',
          difficulty: 'hard',
          category: 'Change Management',
          framework: 'Clarify -> impact -> options -> decision -> rebaseline',
          answer:
            'First clarify why the requirement changed. Is it regulatory, customer-critical, executive preference, technical discovery, or a misunderstanding of original scope? Mandatory changes are handled differently from optional improvements.\n\nThen assess impact across scope, timeline, budget, quality, testing, training, documentation, dependencies, and launch readiness. Work with delivery leads to estimate effort and risk.\n\nPresent options: include the change and delay launch, include a smaller version, defer to post-launch, remove another item to keep the date, or reject if it does not support the objective. Make the decision with the right sponsor or governance group.\n\nIf approved, rebaseline the plan and update scope, timeline, risks, testing, communication, and stakeholder expectations. The key is to prevent informal changes from quietly breaking the project.',
          followUps: [
            'How would you handle a regulatory change?',
            'What if leadership refuses to move the date?',
            'How do you update the team after rebaselining?',
          ],
        },
        {
          type: 'question',
          question: 'How do you escalate a serious project issue?',
          difficulty: 'medium',
          category: 'Escalation',
          framework: 'Facts -> impact -> options -> recommendation -> decision needed',
          answer:
            'A good escalation is clear, factual, and decision-oriented. I would explain the issue, impact, root cause if known, options, recommendation, and what decision or support is needed.\n\nFor example: “The security review is blocking launch. Without approval by Friday, launch moves by two weeks. Options are to delay launch, reduce scope to exclude the affected feature, or assign an additional reviewer. I recommend assigning the reviewer because the remaining risk is contained.”\n\nEscalation is not blame. It is a way to get the right attention before a project is damaged. I would escalate early enough for leaders to help, not after all options are gone.\n\nAfter escalation, I would document decisions, update the project plan, and communicate changes to impacted stakeholders.',
          followUps: [
            'When is escalation appropriate?',
            'How do you avoid over-escalating?',
            'What information should be in an executive escalation?',
          ],
        },
      ],
    },
    {
      id: 'agile-waterfall',
      title: 'Agile, Scrum, and Waterfall Questions',
      group: 'Delivery Methodologies',
      intro:
        'Methodology questions test whether you understand delivery models and can choose the right approach for the context rather than reciting ceremonies.',
      blocks: [
        {
          type: 'question',
          question: 'Agile versus waterfall: when would you use each?',
          difficulty: 'easy',
          category: 'Methodology',
          framework: 'Uncertainty and change versus predictability and control',
          answer:
            'Agile is useful when requirements are uncertain, feedback is valuable, and incremental delivery is possible. It works well for software products, user-facing workflows, and projects where teams need to learn and adapt.\n\nWaterfall or a more phase-gated approach can be useful when requirements are stable, regulatory documentation is heavy, dependencies are sequential, or the cost of change is high. Construction, hardware, compliance-heavy implementations, and some enterprise migrations may need more upfront planning.\n\nMany real projects use hybrid delivery: agile teams build iteratively inside broader milestones, governance, budget cycles, or compliance gates. The right answer depends on risk, team maturity, stakeholder expectations, and project type.\n\nA strong PM does not argue that one methodology is always better. They choose the delivery model that fits the work.',
          followUps: [
            'What is hybrid project management?',
            'What projects are poor fits for Agile?',
            'How do you manage deadlines in Agile?',
          ],
        },
        {
          type: 'question',
          question: 'What are the key Scrum ceremonies and why do they matter?',
          difficulty: 'easy',
          category: 'Agile / Scrum',
          framework: 'Planning, synchronization, review, improvement',
          answer:
            'Sprint planning defines what the team will work on and why. Daily standups help the team synchronize, identify blockers, and adjust execution. Sprint review demonstrates completed work and gathers feedback. Sprint retrospective identifies process improvements for the next sprint. Backlog refinement keeps upcoming work clear and ready.\n\nThe ceremonies matter only if they improve delivery. A daily standup is not a status meeting for the project manager; it is a team coordination tool. A retrospective is not useful unless actions are actually followed up.\n\nIn interviews, I would emphasize outcomes: transparency, prioritization, feedback, risk visibility, and continuous improvement.',
          followUps: [
            'What makes a standup ineffective?',
            'Who owns the backlog?',
            'How do you handle unfinished sprint work?',
          ],
        },
        {
          type: 'question',
          question: 'How do you manage a fixed deadline in an Agile project?',
          difficulty: 'medium',
          category: 'Agile Delivery',
          framework: 'Fixed date means flexible scope',
          answer:
            'If the date is fixed, then scope, quality bar, resources, or risk must be managed carefully. I would first clarify what outcome must be achieved by the deadline and what features are truly required.\n\nThen I would prioritize the backlog into must-have, should-have, could-have, and later. Define the minimum viable scope for the deadline and make tradeoffs explicit. Use sprint planning and burn-up or burn-down tracking to monitor progress against the release goal.\n\nI would also identify risks early: dependencies, testing, approvals, technical unknowns, and team capacity. If the team is trending behind, I would escalate options early: reduce scope, add capacity, extend date, or accept risk.\n\nAgile does not mean dates do not matter. It means the team adapts scope and plan based on evidence while maintaining transparency.',
          followUps: [
            'How do you prevent quality from being sacrificed?',
            'What metrics would you use?',
            'How do you communicate scope tradeoffs?',
          ],
        },
      ],
    },
    {
      id: 'stakeholder-communication',
      title: 'Stakeholder Management and Communication',
      group: 'Communication',
      intro:
        'Stakeholder questions test whether you can build alignment, communicate different levels of detail to different audiences, and manage conflict without losing trust.',
      blocks: [
        {
          type: 'question',
          question: 'How do you create a project communication plan?',
          difficulty: 'easy',
          category: 'Communication Planning',
          framework: 'Audience -> message -> cadence -> channel -> owner',
          answer:
            'I start by identifying stakeholder groups: sponsor, steering committee, delivery team, business owners, impacted users, vendors, support teams, and executives. Each group needs different information at different cadence.\n\nFor each audience, define what they need to know, why they need it, how often, through what channel, and who owns the communication. Executives usually need status, risks, decisions, and impact. Delivery teams need dependencies, blockers, next steps, and changes. End users need rollout timing, training, and support.\n\nThe communication plan should include status reports, steering meetings, working sessions, escalation paths, decision logs, and launch communications. It should also define how urgent issues are handled.\n\nGood communication prevents surprises. It does not mean sending more messages; it means sending the right information to the right people at the right time.',
          followUps: [
            'What goes into an executive status update?',
            'How often should you communicate status?',
            'How do you avoid over-communicating?',
          ],
        },
        {
          type: 'question',
          question: 'Two stakeholders strongly disagree on project priorities. How do you handle it?',
          difficulty: 'medium',
          category: 'Stakeholder Management',
          framework: 'Clarify goals -> identify tradeoffs -> use criteria -> decide',
          answer:
            'First understand each stakeholder\'s underlying goal. The disagreement may reflect different success metrics, customer needs, risk tolerance, or organizational incentives.\n\nThen make the tradeoff explicit. What does each priority affect: revenue, compliance, customer experience, cost, timeline, technical risk, or strategic goal? If possible, use agreed prioritization criteria rather than personal preference.\n\nI would look for options: phased delivery, sequencing, partial scope, pilot, or decision by governance group. If a decision is required, escalate with a clear recommendation and options, not just the conflict.\n\nAfter the decision, document rationale and communicate it clearly so the team can move forward. The project manager\'s role is to create alignment around the decision, even if not everyone gets their first choice.',
          followUps: [
            'What if both stakeholders are executives?',
            'How do you stay neutral?',
            'How do you prevent the conflict from slowing delivery?',
          ],
        },
        {
          type: 'question',
          question: 'How do you report project status effectively?',
          difficulty: 'medium',
          category: 'Status Reporting',
          framework: 'RAG status -> progress -> risks/issues -> decisions -> next steps',
          answer:
            'An effective status report should be concise and decision-oriented. I usually include overall RAG status, progress since last update, upcoming milestones, key risks, active issues, dependencies, decisions needed, and changes to scope, timeline, or budget.\n\nThe status should be honest. Green status while major risks are hidden is worse than an accurate yellow status with a recovery plan. I would explain not just status color, but reason and action.\n\nDifferent audiences need different detail. Executives need summary, impact, and decisions. Delivery teams need task-level blockers and dependencies. Business users need timeline and readiness information.\n\nI would also maintain trend. A project that is yellow for three weeks without improvement may need escalation even if no single issue looks catastrophic.',
          followUps: [
            'What does red/yellow/green mean?',
            'How do you report bad news?',
            'What metrics belong in a status report?',
          ],
        },
      ],
    },
    {
      id: 'delivery-recovery',
      title: 'Delivery Recovery and Crisis Scenarios',
      group: 'Project Control',
      intro:
        'Recovery scenarios test whether you can stay calm, diagnose the real problem, present options, and protect the business outcome when the plan breaks.',
      blocks: [
        {
          type: 'question',
          question: 'A critical vendor misses a major deliverable. What do you do?',
          difficulty: 'medium',
          category: 'Vendor Management',
          framework: 'Impact -> contract -> recovery options -> escalation -> prevention',
          answer:
            'First assess impact. What deliverable was missed, what project milestones depend on it, how long is the delay, and whether there is a workaround. Determine if it affects the critical path.\n\nThen review the vendor agreement, SLA, responsibilities, escalation process, and any contractual remedies. But the immediate priority is recovery, not blame.\n\nI would meet with the vendor to understand root cause and require a revised delivery plan with dates, owners, and risk mitigation. Internally, I would identify options: resequence work, use a temporary workaround, reduce scope, add internal support, escalate to vendor leadership, or adjust timeline.\n\nCommunicate impact and options to stakeholders. After the issue is resolved, update vendor governance, checkpoints, acceptance criteria, and risk monitoring so the project is not surprised again.',
          followUps: [
            'How do you hold vendors accountable?',
            'What if the vendor is the only available provider?',
            'How do you prevent vendor delays?',
          ],
        },
        {
          type: 'question',
          question: 'A launch fails on release day. How do you respond?',
          difficulty: 'hard',
          category: 'Crisis Management',
          framework: 'Stabilize -> communicate -> triage -> decide -> learn',
          answer:
            'First stabilize the situation. Confirm the failure, severity, user impact, affected systems, and whether rollback is possible. Assemble the right response team and define one incident lead.\n\nThen communicate quickly. Stakeholders need to know what happened, impact, current action, and next update time. Avoid speculation. If customers or users are affected, coordinate support and external communication as needed.\n\nTriage root cause while protecting users. Options include rollback, hotfix, feature flag disablement, partial launch, manual workaround, or delay. The decision depends on severity, risk, and recovery confidence.\n\nAfter recovery, run a postmortem. Identify technical, process, testing, communication, and decision gaps. Improvements may include better go/no-go criteria, rollback plans, smoke tests, launch checklist, monitoring, or staged rollout.',
          followUps: [
            'Who should be in the incident room?',
            'How do you decide rollback versus hotfix?',
            'What should a postmortem include?',
          ],
        },
        {
          type: 'worked-example',
          title: 'Recovery plan structure',
          scenario:
            'A project is three weeks from launch, testing is behind, and two high-severity defects remain unresolved.',
          steps: [
            {
              label: 'Assess',
              content:
                'Confirm defect severity, affected users, testing completion, launch commitments, and whether defects block the minimum viable launch.',
            },
            {
              label: 'Options',
              content:
                'Present options: delay launch, reduce scope, add test capacity, launch to limited users, or proceed with known risk and mitigation.',
            },
            {
              label: 'Decision',
              content:
                'Get sponsor approval on the tradeoff, document risk acceptance, and update scope, schedule, and communications.',
            },
            {
              label: 'Control',
              content:
                'Increase defect triage cadence, define go/no-go criteria, update stakeholders daily, and protect time for regression testing.',
            },
          ],
          result:
            'A recovery plan is credible when it names tradeoffs, owners, dates, and decisions instead of just saying the team will work harder.',
        },
      ],
    },
    {
      id: 'tools-metrics',
      title: 'Project Tools, Metrics, and Governance',
      group: 'Execution Practices',
      intro:
        'Tools and metrics questions test whether you can use project systems to create visibility and control, not just administrative overhead.',
      blocks: [
        {
          type: 'question',
          question: 'What project metrics do you track?',
          difficulty: 'easy',
          category: 'Project Metrics',
          framework: 'Schedule, scope, budget, quality, risk, value',
          answer:
            'The metrics depend on project type, but common ones include milestone status, schedule variance, budget variance, scope changes, open risks and issues, dependency status, defect count, test completion, resource utilization, burn-up or burn-down, velocity, and readiness metrics.\n\nFor Agile projects, I may track sprint goal completion, velocity trend, cycle time, backlog health, blockers, and release burn-up. For waterfall or implementation projects, I may track milestone completion, critical path, phase gates, budget, and change requests.\n\nMetrics should support decisions. A metric that does not lead to action is usually noise. I would combine quantitative metrics with qualitative judgment because delivery risk is not always visible in a dashboard.\n\nI also track business value when possible: adoption, cost reduction, customer impact, compliance readiness, or operational improvement. Delivery metrics alone do not prove the project succeeded.',
          followUps: [
            'What is schedule variance?',
            'How do you track project health?',
            'How do you avoid vanity metrics?',
          ],
        },
        {
          type: 'question',
          question: 'How do you use Jira, MS Project, or project tools effectively?',
          difficulty: 'easy',
          category: 'Tools',
          framework: 'Visibility, ownership, dependencies, decisions',
          answer:
            'Tools should create shared visibility and accountability. In Jira, that means clear backlog items, owners, priorities, statuses, acceptance criteria, sprint or release tracking, and dependencies. In MS Project or Smartsheet, it may mean work breakdown structure, dates, dependencies, critical path, milestones, and resource allocation.\n\nThe tool should match the delivery model. Software teams may prefer Jira. Enterprise implementations may need a Gantt view and dependency tracking. Executive reporting may need a separate summary dashboard.\n\nThe mistake is treating the tool as the project. A perfectly updated plan does not replace conversations, decisions, risk management, and stakeholder alignment. The tool supports execution; it does not manage the project by itself.',
          followUps: [
            'What information should every task have?',
            'How do you keep tools updated without creating admin burden?',
            'What tool would you choose for a cross-functional launch?',
          ],
        },
      ],
    },
    {
      id: 'behavioral',
      title: 'Behavioral Questions',
      intro:
        'Project manager behavioral questions focus on leadership without authority, conflict, accountability, ambiguity, communication, and delivering under pressure.',
      blocks: [
        {
          type: 'tip',
          title: 'Use project stories with clear stakes',
          text:
            'A strong project management behavioral story should include the objective, constraints, stakeholders, conflict or risk, action you took, measurable result, and what you learned.',
        },
        {
          type: 'question',
          question: 'Tell me about a project you delivered successfully.',
          difficulty: 'easy',
          category: 'Behavioral',
          framework: 'Goal -> complexity -> your role -> actions -> result',
          answer:
            'Choose a project with meaningful complexity: multiple teams, tight timeline, high business impact, technical dependencies, vendor involvement, regulatory risk, or significant change management.\n\nStart with the goal and why it mattered. Then explain the constraints and your role. Focus on what you personally did: built the plan, aligned stakeholders, managed risks, resolved blockers, controlled scope, communicated status, or recovered from issues.\n\nClose with measurable results: launched on time, reduced cost, improved process time, met compliance deadline, increased adoption, or delivered customer impact. Include what made the project successful and what you learned.\n\nAvoid giving a generic story where everything went smoothly. Interviewers want to see how you managed real complexity.',
          followUps: [
            'What was the hardest part?',
            'How did you measure success?',
            'What would you do differently?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time you had to influence without authority.',
          difficulty: 'medium',
          category: 'Behavioral',
          framework: 'Stakeholders -> resistance -> alignment -> action -> outcome',
          answer:
            'Project managers often need to influence people who do not report to them. Pick a story where you needed commitment from engineering, operations, legal, finance, vendors, or senior stakeholders.\n\nExplain the resistance. Were people overloaded, skeptical, misaligned, or protecting different priorities? Then explain how you built alignment: clarified the business goal, showed impact, listened to concerns, negotiated tradeoffs, secured sponsor support, or made ownership visible.\n\nThe strongest answer shows influence through clarity and trust, not pressure. Close with the outcome and how the relationship was preserved.\n\nA good project manager can drive accountability without relying on authority.',
          followUps: [
            'Who was hardest to influence?',
            'How did you handle pushback?',
            'What did you learn about influence?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a project that failed or did not go as planned.',
          difficulty: 'hard',
          category: 'Behavioral',
          framework: 'Failure -> ownership -> recovery -> lesson',
          answer:
            'Pick a real example and avoid blaming others. Explain the project goal, what went wrong, and your role in the situation. It could be missed timeline, unclear requirements, stakeholder misalignment, vendor delay, underestimated complexity, or poor adoption.\n\nThen explain what you did once the issue became clear: escalated, reset scope, rebaselined timeline, added controls, improved communication, changed process, or helped recover delivery.\n\nThe most important part is the lesson. What would you now do earlier? Examples include stronger risk planning, clearer decision rights, better dependency tracking, earlier stakeholder alignment, or more realistic estimates.\n\nInterviewers value self-awareness and maturity. A strong answer shows accountability and improved judgment.',
          followUps: [
            'What warning signs did you miss?',
            'How did you communicate bad news?',
            'What process changed afterward?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Project Manager Prep Strategy',
      intro:
        'Project manager prep should combine delivery scenarios, methodology review, stakeholder stories, risk and issue practice, status reporting examples, and project walkthroughs.',
      blocks: [
        {
          type: 'numbered',
          title: '4-week project manager interview prep plan',
          items: [
            'Week 1: project fundamentals. Review scope, schedule, budget, critical path, RAID logs, change control, governance, and project charters.',
            'Week 2: delivery scenarios. Practice delays, scope creep, vendor issues, resource constraints, failed launches, conflicting stakeholders, and executive escalations.',
            'Week 3: methodology and tools. Review Agile, Scrum, waterfall, hybrid delivery, Jira, MS Project, status reporting, and project metrics.',
            'Week 4: behavioral stories. Prepare 6-8 stories covering successful delivery, failure, conflict, influence, ambiguity, risk management, and stakeholder communication.',
          ],
        },
        {
          type: 'bullets',
          title: 'Role-specific prep by project type',
          items: [
            'Technical project manager: focus on engineering dependencies, system constraints, release management, incident response, and cross-functional technical delivery.',
            'Implementation project manager: focus on client onboarding, vendors, training, data migration, change management, and go-live readiness.',
            'Operations project manager: focus on process improvement, SLAs, staffing, workflow redesign, cost reduction, and adoption.',
            'Construction or infrastructure project manager: focus on schedule, budget, procurement, safety, permitting, contractors, and risk controls.',
            'Enterprise project manager: focus on governance, executive communication, compliance, multi-team dependencies, and change control.',
          ],
        },
        {
          type: 'warning',
          title: 'Do not give only process answers',
          text:
            'Project manager interviews reward judgment. Explain how you decide, trade off, escalate, communicate, and recover. A textbook process answer is weaker than a practical answer with delivery consequences.',
        },
        {
          type: 'key-takeaway',
          text:
            'Great project manager interview answers show structured planning, honest communication, risk discipline, stakeholder influence, and delivery ownership. The strongest candidates prove they can turn uncertainty into a controlled execution plan.',
        },
      ],
    },
  ],
}
