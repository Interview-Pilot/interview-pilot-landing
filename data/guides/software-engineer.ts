import type { InterviewGuide } from '#data/interview-guides'

export const softwareEngineerGuide: InterviewGuide = {
  slug: 'software-engineer',
  title: 'Software Engineer Interview Guide',
  description:
    'Prepare for software engineer interviews with coding patterns, data structures, algorithms, system design, debugging, testing, and behavioral questions.',
  role: 'Software Engineer',
  industry: 'Engineering',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 34,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Software engineer interviews test whether you can reason clearly, write correct code, explain tradeoffs, debug edge cases, and collaborate like someone who can build reliable systems in production.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '3-6', label: 'Typical interview rounds' },
            { value: '45-60 min', label: 'Coding round length' },
            { value: '6+', label: 'Core coding patterns' },
            { value: '4-8 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What software engineering interviewers are evaluating',
          items: [
            'Problem decomposition: can you turn an ambiguous prompt into a concrete algorithm?',
            'Data structure judgment: can you choose the right representation for the constraints?',
            'Correctness: can you handle edge cases, invariants, and failure modes?',
            'Code quality: can you write readable, maintainable code under time pressure?',
            'Complexity awareness: can you explain time and space tradeoffs without over-optimizing too early?',
            'Production thinking: can you reason about reliability, scalability, testing, and operational risk?',
            'Communication: can you think out loud, accept feedback, and adjust your approach without getting defensive?',
          ],
        },
        {
          type: 'tip',
          title: 'The strongest candidates make their reasoning inspectable',
          text:
            'Do not silently code for 20 minutes. State the approach, define assumptions, walk through an example, identify edge cases, then implement. Interviewers are evaluating how you think, not only whether you eventually reach a working solution.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Software Engineer Interview Process',
      intro:
        'Most software engineering loops include a recruiter screen, technical screen, coding interviews, system design or architecture rounds for mid-level and senior roles, and behavioral or collaboration interviews.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical software engineering interview stages',
          items: [
            'Recruiter screen: confirms level, location, compensation range, work authorization, and role fit.',
            'Technical screen: usually one coding problem, sometimes paired with debugging, CS fundamentals, or language-specific questions.',
            'Onsite coding rounds: two to four algorithmic or practical coding interviews focused on correctness, communication, and implementation.',
            'System design round: common for senior roles, focused on architecture, scale, data modeling, APIs, reliability, and tradeoffs.',
            'Behavioral or values round: evaluates ownership, collaboration, conflict resolution, project impact, and engineering maturity.',
            'Hiring committee or debrief: interviewers compare signals across problem solving, code quality, design judgment, and teamwork.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Coding Interview',
          columnB: 'System Design Interview',
          rows: [
            {
              label: 'Main question',
              a: 'Can you solve a constrained problem correctly in code?',
              b: 'Can you design a reliable system under real-world constraints?',
            },
            {
              label: 'Strong signal',
              a: 'Clear algorithm, clean implementation, tested edge cases, accurate complexity',
              b: 'Good API/data model, scalability plan, tradeoffs, bottlenecks, failure handling',
            },
            {
              label: 'Common mistake',
              a: 'Jumping into code before clarifying inputs and edge cases',
              b: 'Drawing boxes without explaining data flow, ownership, or constraints',
            },
            {
              label: 'Best preparation',
              a: 'Practice patterns until recognition is fast, then focus on implementation quality',
              b: 'Study common architectures, then practice making tradeoffs out loud',
            },
          ],
        },
        {
          type: 'warning',
          title: 'Passing is not just about LeetCode count',
          text:
            'Solving hundreds of problems can still fail if you cannot explain your reasoning, test your code, or choose the right pattern under pressure. Quality of practice matters more than raw problem count.',
        },
      ],
    },
    {
      id: 'coding-foundation',
      title: 'Coding Interview Foundation',
      group: 'Coding Interviews',
      intro:
        'Coding interviews reward a repeatable process. The goal is to avoid panic, converge quickly on a viable approach, and write code that is easy for the interviewer to follow.',
      blocks: [
        {
          type: 'numbered',
          title: 'A reliable coding interview flow',
          items: [
            'Clarify the input, output, constraints, duplicates, ordering, null values, and expected behavior for edge cases.',
            'Work through a small example manually and name the transformation your algorithm needs to perform.',
            'Start with the brute force solution if useful, then explain why it is too slow and what information can be cached, sorted, indexed, or traversed differently.',
            'Choose a pattern and data structure. State the invariant that keeps the algorithm correct.',
            'Write clean code with meaningful names, small helper functions only when useful, and no unnecessary cleverness.',
            'Test with normal cases, edge cases, and a case designed to break your own assumptions.',
            'Give final time and space complexity, including the cost of sorting, recursion stack, or auxiliary structures.',
          ],
        },
        {
          type: 'key-term',
          title: 'Core coding concepts to master',
          terms: [
            {
              term: 'Invariant',
              definition:
                'A condition that remains true throughout an algorithm. Strong candidates can explain why their loop, window, stack, or recursion is correct.',
            },
            {
              term: 'Amortized complexity',
              definition:
                'Average cost over a sequence of operations. Common in hash tables, dynamic arrays, stacks, queues, and monotonic data structures.',
            },
            {
              term: 'Search space',
              definition:
                'The set of possible answers or states. Binary search, backtracking, BFS, and DP are often ways of pruning or exploring a search space.',
            },
            {
              term: 'State',
              definition:
                'The information needed to make a decision at a point in the algorithm. Poor state definition is the most common cause of broken DP and graph solutions.',
            },
          ],
        },
        {
          type: 'dodont',
          dos: [
            'Clarify constraints before selecting the approach',
            'Speak in invariants, not only implementation details',
            'Use examples to verify the algorithm before coding',
            'Test empty, single-element, duplicate, negative, and boundary cases',
            'Refactor only when it improves clarity or correctness',
          ],
          donts: [
            'Jump into code immediately',
            'Hide uncertainty by going silent',
            'Use a memorized pattern without matching it to the prompt',
            'Ignore integer overflow, mutation, ordering, or duplicate handling',
            'Declare complexity before accounting for all operations',
          ],
        },
      ],
    },
    {
      id: 'arrays-strings-hashmaps',
      title: 'Arrays, Strings, and Hash Maps',
      group: 'Coding Interviews',
      intro:
        'Arrays, strings, and hash maps are the foundation of many technical screens. Interviewers use them to test indexing discipline, frequency counting, two pointers, sliding windows, and implementation precision.',
      blocks: [
        {
          type: 'question',
          question: 'Given an array of integers, return the indices of two numbers that add up to a target.',
          difficulty: 'easy',
          category: 'Arrays / Hash Map',
          framework: 'Complement lookup',
          answer:
            'The brute force approach checks every pair, which takes O(n^2). A better approach uses a hash map from value to index. As we scan the array, for each number x, the value we need is target - x. If that complement already exists in the map, we return the current index and the stored index. Otherwise, store x with its index and continue.\n\nThe key correctness idea is that when we process index i, the map contains exactly the values from earlier indices. That means if a valid pair ends at i, we will find it immediately. This also avoids using the same element twice because we only match against earlier elements.\n\nTime complexity is O(n) because each value is inserted and looked up once. Space complexity is O(n) for the map. Edge cases include duplicate values, negative numbers, zero, and no valid pair if the prompt allows that case.',
          followUps: [
            'What changes if the array is sorted?',
            'What if you need all pairs instead of one pair?',
            'How do you avoid returning the same element twice?',
          ],
        },
        {
          type: 'question',
          question: 'Find the length of the longest substring without repeating characters.',
          difficulty: 'medium',
          category: 'String / Sliding Window',
          framework: 'Sliding window with last-seen index',
          answer:
            'Use a sliding window where the window always contains unique characters. Maintain a left pointer and a map from character to its most recent index. Iterate right across the string. If the current character was seen inside the current window, move left to one position after its previous index. Then update the character index and record the maximum window length.\n\nThe important detail is that left should only move forward. If a character was seen before the current window, it should not shrink the window. That is why the update is left = max(left, lastSeen[char] + 1).\n\nTime complexity is O(n) because each character is processed once and the left pointer only moves forward. Space complexity is O(k), where k is the character set size. Edge cases include empty string, all unique characters, all repeated characters, and Unicode if the language treats characters differently from bytes.',
          followUps: [
            'What if the input contains Unicode characters?',
            'How would you return the substring itself?',
            'What if each character can appear at most twice?',
          ],
        },
        {
          type: 'question',
          question: 'Group a list of strings by anagram.',
          difficulty: 'medium',
          category: 'String / Hash Map',
          framework: 'Canonical key',
          answer:
            'Anagrams share the same character composition. Create a canonical key for each word and group words by that key in a hash map. The most direct key is the sorted characters of the word. For example, “eat”, “tea”, and “ate” all map to “aet”.\n\nIf strings are short, sorting each word is simple and reliable. If the alphabet is fixed to lowercase English letters and strings are long, a 26-count frequency tuple can be faster because it avoids O(k log k) sorting per word.\n\nTime complexity with sorting is O(n * k log k), where n is the number of strings and k is the average string length. With fixed alphabet counting, it can be O(n * k). Space complexity is O(n * k) for the output plus keys. Edge cases include empty strings, duplicates, uppercase/lowercase rules, and non-English characters.',
          followUps: [
            'When would you use a frequency key instead of sorting?',
            'How would you handle case-insensitive grouping?',
            'What if the character set is not fixed?',
          ],
        },
      ],
    },
    {
      id: 'linked-lists-trees-graphs',
      title: 'Linked Lists, Trees, and Graphs',
      group: 'Coding Interviews',
      intro:
        'Pointer and traversal problems test whether you can maintain state carefully. The hard part is usually not the syntax; it is defining what each pointer, queue, stack, or visited set represents.',
      blocks: [
        {
          type: 'question',
          question: 'Reverse a singly linked list.',
          difficulty: 'easy',
          category: 'Linked List',
          framework: 'Three pointers: previous, current, next',
          answer:
            'Use three pointers. previous starts as null, current starts at the head. For each node, store next = current.next, redirect current.next to previous, then move previous to current and current to next. When current becomes null, previous is the new head.\n\nThe invariant is that previous points to the already-reversed portion and current points to the first node not yet reversed. Storing next before changing current.next is essential; otherwise the rest of the list is lost.\n\nTime complexity is O(n). Space complexity is O(1). Edge cases include an empty list, a single node, and ensuring the original head becomes the tail with next set to null.',
          followUps: [
            'How would you reverse only a sublist from position m to n?',
            'How would you reverse a list recursively?',
            'How do you detect a cycle before reversing?',
          ],
        },
        {
          type: 'question',
          question: 'Validate whether a binary tree is a binary search tree.',
          difficulty: 'medium',
          category: 'Tree / DFS',
          framework: 'Range constraints',
          answer:
            'A common mistake is checking only whether each node is greater than its left child and less than its right child. That is insufficient because the full subtree must satisfy ancestor constraints.\n\nUse DFS with lower and upper bounds. For each node, verify lower < node.value < upper. The left child receives the same lower bound and the current value as the upper bound. The right child receives the current value as the lower bound and the same upper bound. If any node violates its range, return false.\n\nTime complexity is O(n) because every node is visited once. Space complexity is O(h) for recursion depth, where h is tree height. Edge cases include duplicates, integer min/max boundaries, empty tree, and skewed trees. Clarify whether duplicates are allowed and on which side if they are.',
          followUps: [
            'How would you solve this with inorder traversal?',
            'What if duplicates are allowed?',
            'What is the worst-case recursion depth?',
          ],
        },
        {
          type: 'question',
          question: 'Find the shortest path in an unweighted grid with obstacles.',
          difficulty: 'medium',
          category: 'Graph / BFS',
          framework: 'Breadth-first search by distance layer',
          answer:
            'Model each open cell as a graph node and each move up, down, left, or right as an edge with equal weight. Because every move has the same cost, BFS gives the shortest path. Start from the source cell, push it into a queue with distance 0, and mark it visited. For each popped cell, explore valid unvisited neighbors that are inside bounds and not obstacles. The first time we reach the target, the distance is minimal.\n\nThe correctness comes from BFS processing nodes in increasing distance order. Once a cell is visited, reaching it later cannot produce a shorter path in an unweighted graph.\n\nTime complexity is O(rows * cols) because each cell is visited at most once. Space complexity is O(rows * cols) for the queue and visited set. Edge cases include blocked start or end, source equals target, no path, and whether diagonal moves are allowed.',
          followUps: [
            'What changes if diagonal movement is allowed?',
            'What if moving through obstacles costs extra instead of being impossible?',
            'How would you reconstruct the actual path?',
          ],
        },
        {
          type: 'question',
          question: 'Clone a graph.',
          difficulty: 'medium',
          category: 'Graph / DFS',
          framework: 'Visited map from original node to cloned node',
          answer:
            'Use a hash map that maps each original node to its cloned node. During DFS or BFS, when visiting an original node, create its clone if it does not exist. Then recursively or iteratively clone each neighbor and append the cloned neighbor to the cloned node adjacency list.\n\nThe visited map solves two problems: it prevents infinite loops in cyclic graphs and preserves shared references so the cloned graph has the same topology as the original graph.\n\nTime complexity is O(V + E), where V is nodes and E is edges. Space complexity is O(V) for the map and traversal stack or queue, not counting the output graph. Edge cases include null input, self-loops, disconnected graphs if the prompt expects cloning only from a starting node, and duplicate neighbor entries.',
          followUps: [
            'How would you handle a disconnected graph?',
            'What changes for a directed graph?',
            'How do you avoid infinite recursion?',
          ],
        },
      ],
    },
    {
      id: 'dynamic-programming-backtracking',
      title: 'Dynamic Programming and Backtracking',
      group: 'Coding Interviews',
      intro:
        'Dynamic programming and backtracking questions test state definition. The strongest answers explain the decision at each state, the recurrence, and why overlapping subproblems or pruning apply.',
      blocks: [
        {
          type: 'question',
          question: 'Given coin denominations and an amount, return the fewest coins needed to make that amount.',
          difficulty: 'medium',
          category: 'Dynamic Programming',
          framework: 'Bottom-up DP over amount',
          answer:
            'Define dp[a] as the minimum number of coins needed to make amount a. Initialize dp[0] = 0 and all other values as infinity. For each amount from 1 to target, try every coin. If a - coin is non-negative, dp[a] = min(dp[a], dp[a - coin] + 1). At the end, if dp[target] is infinity, return -1.\n\nThe recurrence works because the last coin in an optimal solution must be one of the denominations. If that last coin has value c, the remaining amount is target - c, which should also be solved optimally.\n\nTime complexity is O(amount * number of coins). Space complexity is O(amount). Edge cases include amount 0, impossible amounts, coin value 1, duplicate denominations, and large target amounts.',
          followUps: [
            'How would you return the actual coins used?',
            'What changes if each coin can be used only once?',
            'How would you count the number of combinations instead?',
          ],
        },
        {
          type: 'question',
          question: 'Find the longest increasing subsequence in an array.',
          difficulty: 'medium',
          category: 'Dynamic Programming',
          framework: 'DP by ending position, then optimize with binary search',
          answer:
            'A clear DP solution defines dp[i] as the length of the longest increasing subsequence ending at index i. For each i, check every earlier j. If nums[j] < nums[i], then nums[i] can extend the subsequence ending at j, so dp[i] = max(dp[i], dp[j] + 1). The answer is max(dp). This takes O(n^2) time and O(n) space.\n\nThe optimized O(n log n) approach maintains an array tails, where tails[length - 1] is the smallest possible ending value of an increasing subsequence of that length. For each number, binary search the first tail greater than or equal to it and replace it. The length of tails is the LIS length.\n\nIn an interview, it is reasonable to present the O(n^2) DP first if time is limited, then discuss the optimized version. Edge cases include duplicates, decreasing arrays, empty input, and whether the subsequence must be strictly increasing.',
          followUps: [
            'How would you reconstruct the subsequence?',
            'What changes for non-decreasing subsequences?',
            'Why does replacing a tail not lose the answer?',
          ],
        },
        {
          type: 'question',
          question: 'Generate all valid combinations of n pairs of parentheses.',
          difficulty: 'medium',
          category: 'Backtracking',
          framework: 'Build valid prefixes only',
          answer:
            'Use backtracking with two counts: open used and close used. At each step, we can add an open parenthesis if open < n. We can add a close parenthesis if close < open. That second condition ensures every prefix remains valid, so we never generate invalid strings that need to be filtered later.\n\nWhen the current string length reaches 2n, add it to the result. This explores only valid prefixes and prunes impossible states early.\n\nThe number of valid outputs is the nth Catalan number, so output size dominates runtime. Space complexity includes recursion depth O(n) plus the output. Edge cases include n = 0 or n = 1, depending on prompt definition.',
          followUps: [
            'Why can we only close when close < open?',
            'How would you handle multiple bracket types?',
            'Can you generate results in lexicographic order?',
          ],
        },
      ],
    },
    {
      id: 'system-design',
      title: 'System Design Interviews',
      group: 'System Design',
      intro:
        'System design interviews evaluate engineering maturity. For mid-level roles, the goal is basic architecture and data flow. For senior roles, the bar is tradeoffs, bottlenecks, reliability, observability, and operational ownership.',
      blocks: [
        {
          type: 'numbered',
          title: 'A practical system design flow',
          items: [
            'Clarify functional requirements: what users can do, what is in scope, what is explicitly out of scope.',
            'Clarify non-functional requirements: scale, latency, availability, consistency, durability, privacy, cost, and regional constraints.',
            'Estimate capacity: users, requests per second, storage, bandwidth, hot keys, and read/write ratio.',
            'Define APIs and core data models before drawing too many boxes.',
            'Design the high-level architecture: clients, load balancer, services, databases, queues, caches, object storage, and background workers.',
            'Identify bottlenecks and failure modes: overloaded database, cache stampede, queue backlog, duplicate events, regional outage, or slow downstream dependency.',
            'Discuss tradeoffs: SQL vs NoSQL, synchronous vs asynchronous, consistency vs availability, cache freshness vs performance, simplicity vs scale.',
            'Close with monitoring, rollout, security, rate limits, disaster recovery, and future improvements.',
          ],
        },
        {
          type: 'question',
          question: 'Design a URL shortener.',
          difficulty: 'medium',
          category: 'System Design',
          framework: 'Requirements -> API -> ID generation -> storage -> redirect path -> scale',
          answer:
            'Requirements: users submit a long URL and receive a short URL. When someone visits the short URL, they should be redirected quickly. Optional features include custom aliases, expiration, analytics, spam detection, and user accounts.\n\nCore APIs: createShortUrl(longUrl, optionalAlias, expiration) and redirect(shortCode). Data model: shortCode, longUrl, userId, createdAt, expiresAt, status, and analytics metadata if needed.\n\nFor ID generation, options include auto-increment IDs encoded in base62, random base62 codes with collision checks, or distributed ID generation. Auto-increment is simple but reveals volume unless obfuscated. Random IDs are easy to distribute but need collision handling. At moderate scale, random base62 with database uniqueness is acceptable.\n\nRead path matters most. Redirect should be fast: load shortCode from cache, fall back to database, validate expiration/status, then return HTTP 301 or 302. Use 302 if analytics or destination changes matter; use 301 for permanent redirects with stronger browser caching.\n\nScale: cache hot short codes in Redis or edge cache, shard by shortCode if needed, store analytics asynchronously through a queue, rate limit creation, and run spam/malware checks. Monitor redirect latency, cache hit rate, error rate, abuse reports, and database saturation.',
          followUps: [
            'How would you generate unique short codes?',
            'Would you use 301 or 302 redirects?',
            'How would you support analytics without slowing redirects?',
          ],
        },
        {
          type: 'question',
          question: 'Design a news feed.',
          difficulty: 'hard',
          category: 'System Design',
          framework: 'Users -> posts -> fanout -> ranking -> reads -> consistency',
          answer:
            'Clarify the feed type: social following feed, recommendation feed, or mixed feed. Assume a following feed where users create posts and followers see them ordered by relevance or recency.\n\nCore objects: users, follow edges, posts, media, feed items, likes/comments, and ranking features. APIs include createPost, getFeed, followUser, unfollowUser, and interactWithPost.\n\nThere are two common feed generation models. Fanout-on-write pushes new posts into follower feed stores when a post is created. This makes reads fast but writes expensive for users with many followers. Fanout-on-read computes the feed when requested by fetching posts from followed users. This makes writes cheap but reads slower. A hybrid approach is common: fanout-on-write for normal users and fanout-on-read or special handling for celebrity accounts.\n\nArchitecture: post service writes posts, graph service stores follow relationships, feed service maintains feed timelines, ranking service scores candidate posts, cache stores hot feeds, and media goes to object storage/CDN. Use queues for asynchronous fanout and ranking updates.\n\nTradeoffs: feed freshness versus ranking quality, consistency of follow changes, handling celebrity users, cache invalidation, spam, privacy blocks, and backfill after queue failures. Monitor feed load latency, freshness, fanout lag, engagement, cache hit rate, ranking errors, and abuse reports.',
          followUps: [
            'How would you handle users with millions of followers?',
            'How would you rank feed items?',
            'What happens if the fanout queue is delayed?',
          ],
        },
        {
          type: 'question',
          question: 'Design a real-time chat system.',
          difficulty: 'hard',
          category: 'System Design',
          framework: 'Connections -> message flow -> persistence -> delivery -> reliability',
          answer:
            'Requirements: one-to-one and group messages, online delivery, offline delivery, message history, read receipts, typing indicators, and push notifications. Clarify whether end-to-end encryption, attachments, and multi-device sync are required.\n\nClients maintain WebSocket connections to a gateway service. When a user sends a message, the gateway authenticates it, assigns or receives an idempotency key, writes the message to durable storage, publishes an event, and delivers it to online recipients through their active connections. Offline users receive push notifications and can fetch history later.\n\nData model: conversation, participant, message, delivery state, read state, and device/session. Storage needs efficient reads by conversation and time. A relational database can work at moderate scale; distributed stores are used at larger scale. Attachments should go to object storage, not the message database.\n\nReliability concerns: duplicate sends, out-of-order delivery, reconnects, missed messages, fanout for large groups, and presence accuracy. Use idempotency keys, monotonically increasing sequence numbers per conversation, acknowledgements, retry logic, and sync-from-last-seen APIs.\n\nMonitor message send latency, delivery success rate, WebSocket connection count, reconnect rate, queue lag, push notification failures, and storage write errors.',
          followUps: [
            'How would you guarantee message ordering?',
            'How would you support multiple devices per user?',
            'What would you store for read receipts?',
          ],
        },
      ],
    },
    {
      id: 'debugging-testing-production',
      title: 'Debugging, Testing, and Production Judgment',
      group: 'Engineering Judgment',
      intro:
        'Many software engineering interviews now include practical debugging, testing, or production scenarios. These questions separate candidates who can code from candidates who can operate software responsibly.',
      blocks: [
        {
          type: 'question',
          question: 'A service latency suddenly doubled. How would you investigate?',
          difficulty: 'medium',
          category: 'Debugging / Production',
          framework: 'Validate -> scope -> recent changes -> dependency breakdown -> mitigate',
          answer:
            'First validate the signal. Check whether the latency increase appears in multiple monitoring systems and whether it affects p50, p95, p99, or only a specific endpoint. Confirm whether it is user-visible.\n\nThen scope the issue by endpoint, region, availability zone, customer segment, version, host, dependency, and request type. A global increase suggests a shared dependency or deployment. A narrow increase points to a specific route, query, customer, or infrastructure zone.\n\nNext inspect recent changes: deployments, configuration changes, database migrations, traffic spikes, feature flags, cache changes, or downstream service incidents. Break down latency by service spans using traces. Check database query time, cache hit rate, queue lag, CPU, memory, garbage collection, thread pools, connection pools, and external APIs.\n\nMitigation comes before perfect root cause if users are affected. Roll back, disable a feature flag, scale capacity, bypass a slow dependency, or increase cache TTL if safe. After recovery, write the root cause, detection gap, and prevention plan.',
          followUps: [
            'What if only p99 latency increased?',
            'How would you decide whether to roll back?',
            'What dashboards would you want?',
          ],
        },
        {
          type: 'question',
          question: 'How would you test a function that calculates discounts?',
          difficulty: 'easy',
          category: 'Testing',
          framework: 'Unit cases -> boundaries -> invalid inputs -> invariants',
          answer:
            'I would start by clarifying the rules: discount types, stacking behavior, expiration, minimum spend, user eligibility, currency rounding, and whether taxes or shipping are included.\n\nUnit tests should cover normal cases, boundary cases, invalid inputs, and interactions between rules. Examples: no discount, percentage discount, fixed discount, discount greater than subtotal, minimum spend exactly met, minimum spend just below threshold, expired discount, ineligible user, multiple discounts if allowed, and rounding for cents.\n\nI would also test invariants: final price should never be negative, discount should not exceed eligible subtotal, expired promotions should not apply, and repeated calculation should be deterministic. If this touches payments, add integration tests with the pricing service and snapshot tests for invoice outputs.\n\nFor production safety, log discount decisions with reason codes so support and engineering can diagnose pricing complaints without guessing.',
          followUps: [
            'How would you test currency rounding?',
            'What should happen if a promotion service is down?',
            'Which tests belong in unit tests versus integration tests?',
          ],
        },
        {
          type: 'question',
          question: 'How do you review code effectively?',
          difficulty: 'easy',
          category: 'Engineering Collaboration',
          framework: 'Correctness -> maintainability -> risk -> clarity',
          answer:
            'I review code in layers. First, does it solve the intended problem and preserve correctness? Second, is it maintainable: clear names, reasonable boundaries, no unnecessary complexity, and consistent style? Third, what is the risk: migrations, concurrency, security, performance, backward compatibility, and observability? Fourth, are tests sufficient for the changed behavior?\n\nGood code review is not about showing superiority. It should improve the code while preserving team velocity. I separate blocking issues from suggestions. A correctness bug, security issue, or migration risk is blocking. A naming preference or minor refactor can be non-blocking.\n\nI also look for missing context: unclear product behavior, untested edge cases, silent failure paths, weak error handling, and lack of metrics around risky changes.',
          followUps: [
            'How do you handle disagreement in code review?',
            'What makes a comment blocking?',
            'How do you avoid slowing the team down?',
          ],
        },
      ],
    },
    {
      id: 'behavioral',
      title: 'Behavioral and Collaboration Questions',
      group: 'Engineering Judgment',
      intro:
        'Behavioral rounds for engineers focus on ownership, collaboration, technical judgment, handling ambiguity, and learning from mistakes. Strong answers include real technical stakes.',
      blocks: [
        {
          type: 'tip',
          title: 'Use engineering-specific stories',
          text:
            'A strong engineering behavioral story should include the technical decision, the tradeoff, the people involved, the outcome, and what changed afterward. Avoid generic teamwork answers that could come from any role.',
        },
        {
          type: 'question',
          question: 'Tell me about a difficult technical decision you made.',
          difficulty: 'medium',
          category: 'Behavioral',
          framework: 'Context -> options -> tradeoffs -> decision -> outcome',
          answer:
            'Choose a decision with real tradeoffs: build versus buy, SQL versus NoSQL, monolith versus service, fast patch versus deeper refactor, or strong consistency versus availability. Start with context and constraints, then explain the options you considered.\n\nA strong answer names the tradeoff clearly. For example: “Option A let us ship in one week but increased operational burden. Option B took three weeks but removed a scaling bottleneck.” Then explain what evidence drove the decision: traffic, customer deadline, incident history, team capacity, or long-term roadmap.\n\nClose with the result and what you learned. If the decision was imperfect, say what you would do differently. Interviewers value mature judgment more than pretending every decision was obvious.',
          followUps: [
            'Who disagreed with you?',
            'What would have changed your decision?',
            'How did you measure whether the decision worked?',
          ],
        },
        {
          type: 'question',
          question: 'Tell me about a time you caused or helped resolve a production incident.',
          difficulty: 'hard',
          category: 'Behavioral / Production',
          framework: 'Incident -> impact -> response -> root cause -> prevention',
          answer:
            'Use a real incident if possible. Start with the user impact: what broke, who was affected, and how severe it was. Then explain your role in the response: detection, triage, rollback, mitigation, communication, or root-cause analysis.\n\nThe best answers show calm prioritization. During an incident, restoring service matters more than proving a theory. Mention how you used logs, metrics, traces, feature flags, rollbacks, or dependency checks.\n\nAfter mitigation, explain the root cause and prevention. Good prevention might include better tests, safer rollout, monitoring, alert tuning, runbooks, circuit breakers, backpressure, or migration safeguards. Avoid blaming people. Strong teams improve systems so the same mistake is harder to repeat.',
          followUps: [
            'How did you communicate during the incident?',
            'What alert would have caught it earlier?',
            'What did the team change afterward?',
          ],
        },
        {
          type: 'question',
          question: 'How do you handle disagreement with a product manager or designer?',
          difficulty: 'medium',
          category: 'Collaboration',
          framework: 'Shared goal -> constraints -> options -> tradeoffs -> decision',
          answer:
            'I start by aligning on the user goal and business goal. Many disagreements are not truly about engineering versus product; they are about different assumptions. I would explain the technical constraint clearly: complexity, reliability risk, timeline, maintainability, security, or performance.\n\nThen I would propose options instead of just saying no. For example: ship a smaller MVP, use a manual workflow temporarily, hide the feature behind a flag, sequence the technical work, or choose a simpler design that still solves the core user problem.\n\nIf the tradeoff is serious, I document the options, risks, and recommendation so the decision is transparent. The goal is not for engineering to win. The goal is for the team to make a clear decision with eyes open.',
          followUps: [
            'What if product insists on the risky option?',
            'How do you communicate technical debt to non-engineers?',
            'When would you escalate?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Software Engineer Prep Strategy',
      intro:
        'Strong prep should balance coding patterns, mock interviews, system design, behavioral stories, and language fluency. The goal is to become fast and reliable, not just familiar with solutions.',
      blocks: [
        {
          type: 'numbered',
          title: '6-week software engineer interview prep plan',
          items: [
            'Week 1: refresh arrays, strings, hash maps, two pointers, sliding windows, stacks, queues, and basic complexity analysis.',
            'Week 2: practice trees, graphs, BFS, DFS, recursion, heaps, intervals, and binary search. Focus on explaining invariants.',
            'Week 3: practice dynamic programming and backtracking. Write down state definitions before coding.',
            'Week 4: run timed mixed coding sets. Review misses by category: wrong pattern, bug, edge case, unclear communication, or slow implementation.',
            'Week 5: prepare system design if target roles require it. Practice requirements, APIs, data model, scaling, failures, and tradeoffs.',
            'Week 6: do mock interviews, polish behavioral stories, rehearse project deep dives, and prepare company-specific questions.',
          ],
        },
        {
          type: 'bullets',
          title: 'Company-specific emphasis',
          items: [
            'Big Tech: coding correctness, system design, behavioral signals, and consistent performance across multiple rounds.',
            'Startups: practical execution, debugging, ownership, product sense, and ability to ship with ambiguity.',
            'Infrastructure companies: distributed systems, reliability, networking, storage, concurrency, and operational judgment.',
            'AI companies: data pipelines, model-serving systems, evaluation, latency, reliability, and product integration.',
            'Fintech or healthcare: correctness, security, privacy, auditability, compliance, and careful rollout discipline.',
          ],
        },
        {
          type: 'warning',
          title: 'Do not only practice problems you already like',
          text:
            'If you avoid graphs, DP, recursion, or system design, that weakness will show up under pressure. Track misses by topic and deliberately practice the categories that make you slow or uncertain.',
        },
        {
          type: 'key-takeaway',
          text:
            'Great software engineering interview answers combine algorithmic clarity, clean implementation, production judgment, and collaborative communication. The best signal is not memorization. It is the ability to reason from first principles and build a correct solution under constraints.',
        },
      ],
    },
  ],
}
