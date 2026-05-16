import type { InterviewGuide } from '#data/interview-guides'

export const dataEngineerGuide: InterviewGuide = {
  slug: 'data-engineer',
  title: 'Data Engineer Interview Guide',
  description:
    'Prepare for data engineer interviews with SQL, data modeling, ETL pipelines, batch and streaming systems, Spark, orchestration, warehouses, data quality, and system design questions.',
  role: 'Data Engineer',
  industry: 'Data',
  lastUpdated: '2026-05-16',
  readingTimeMinutes: 35,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      intro:
        'Data engineer interviews test whether you can build reliable data systems: ingest raw data, model it clearly, transform it efficiently, enforce quality, orchestrate pipelines, and make data available to analysts, scientists, products, and business teams.',
      blocks: [
        {
          type: 'stats',
          stats: [
            { value: '4-6', label: 'Typical interview rounds' },
            { value: '45-75 min', label: 'Technical round length' },
            { value: '6+', label: 'Core DE skill areas' },
            { value: '5-8 wks', label: 'Recommended prep window' },
          ],
        },
        {
          type: 'bullets',
          title: 'What data engineer interviewers are evaluating',
          items: [
            'SQL depth: can you write accurate, performant queries across joins, windows, deduplication, and incremental logic?',
            'Data modeling: can you design tables, schemas, grains, partitions, and slowly changing dimensions for real use cases?',
            'Pipeline design: can you build batch and streaming workflows that are reliable, observable, and recoverable?',
            'Distributed systems judgment: can you reason about Spark, partitioning, shuffles, state, latency, and throughput?',
            'Data quality: can you prevent bad data from silently reaching dashboards, models, and production features?',
            'Platform thinking: can you balance cost, performance, freshness, governance, lineage, and developer experience?',
            'Production ownership: can you debug incidents, backfill safely, manage schema changes, and communicate impact?',
          ],
        },
        {
          type: 'tip',
          title: 'Data engineering is reliability engineering for data',
          text:
            'Strong data engineers do not only move data from A to B. They make data trustworthy, understandable, discoverable, scalable, and recoverable when something breaks.',
        },
      ],
    },
    {
      id: 'interview-process',
      title: 'Data Engineer Interview Process',
      intro:
        'Data engineering loops usually include SQL, Python or coding, data modeling, pipeline design, system design, Spark or distributed processing, debugging, and behavioral interviews.',
      blocks: [
        {
          type: 'numbered',
          title: 'Typical data engineer interview stages',
          items: [
            'Recruiter screen: confirms role fit, stack, compensation, location, and domain experience.',
            'Hiring manager screen: covers pipeline ownership, data modeling experience, production incidents, and collaboration with analytics or product teams.',
            'SQL round: tests joins, windows, deduplication, incremental transformations, cohort-style queries, and performance awareness.',
            'Coding round: often Python-focused, testing data structures, file processing, APIs, parsing, or pipeline-style transformations.',
            'Data modeling round: asks you to design warehouse tables, event schemas, fact/dimension models, or lakehouse layouts.',
            'System design round: asks you to design ingestion, ETL/ELT, streaming, orchestration, monitoring, lineage, and quality systems.',
            'Behavioral round: evaluates ownership, incident response, stakeholder communication, ambiguity, and cross-functional delivery.',
          ],
        },
        {
          type: 'comparison-table',
          columnA: 'Analytics Data Engineer',
          columnB: 'Platform / Streaming Data Engineer',
          rows: [
            {
              label: 'Primary focus',
              a: 'Warehouse modeling, dbt/SQL transformations, reporting data quality, business metrics',
              b: 'Ingestion infrastructure, streaming, distributed processing, reliability, platform scale',
            },
            {
              label: 'Common interviews',
              a: 'SQL, dimensional modeling, stakeholder requirements, pipeline orchestration',
              b: 'System design, Spark/Flink/Kafka, state, partitioning, scaling, operational incidents',
            },
            {
              label: 'Strong signal',
              a: 'Builds trusted models that analysts and business teams can use confidently',
              b: 'Designs resilient systems that handle high volume, low latency, and failures',
            },
            {
              label: 'Common mistake',
              a: 'Modeling tables without clear grain, ownership, or metric definitions',
              b: 'Designing streaming architecture without exactly-once, replay, state, or monitoring considerations',
            },
          ],
        },
        {
          type: 'warning',
          title: 'Know which data engineering role you are targeting',
          text:
            'A warehouse-focused analytics engineer interview is different from a streaming platform data engineer interview. Tailor preparation to the stack and responsibilities in the job description.',
        },
      ],
    },
    {
      id: 'sql-data-transformations',
      title: 'SQL and Data Transformation Questions',
      group: 'Technical Foundations',
      intro:
        'Data engineer SQL questions are usually about correctness and production-readiness: grain, deduplication, incremental logic, window functions, partitions, and performance.',
      blocks: [
        {
          type: 'question',
          question: 'How would you deduplicate an events table and keep the latest event per event_id?',
          difficulty: 'medium',
          category: 'SQL / Deduplication',
          framework: 'Window function with deterministic ordering',
          answer:
            'Use a window function to assign a row number within each event_id partition. Order by the most reliable freshness column descending, such as ingestion_timestamp or updated_at. If ties are possible, add a deterministic tie-breaker like source_sequence_number or raw_file_name.\n\nThe query pattern is: select all rows, calculate row_number() over(partition by event_id order by ingestion_timestamp desc, source_sequence_number desc), then filter where row_number = 1.\n\nThe important interview detail is determinism. If two records have the same timestamp and no tie-breaker, the result may be unstable between runs. Also clarify whether the latest event means latest ingestion time, latest event time, or latest source update time.\n\nFor production, I would monitor duplicate rate, late-arriving events, null event_id count, and whether deduplication changes downstream metrics unexpectedly.',
          followUps: [
            'What if event_id is missing?',
            'How would you handle late-arriving corrections?',
            'How would this change for incremental processing?',
          ],
        },
        {
          type: 'question',
          question: 'Write SQL to build a daily active users table from raw events.',
          difficulty: 'medium',
          category: 'SQL / Transformation',
          framework: 'Filter active events -> normalize date -> group by date and user',
          answer:
            'First define active user. Usually, not every event should count. Page views, bot events, background refreshes, and internal users may need exclusion. Choose meaningful events such as session_start, purchase, message_sent, or feature_used depending on the product.\n\nCreate a transformation that filters to eligible events, converts event timestamps to the business timezone, groups by activity_date and user_id, and outputs one row per active user per day. If the final table is an aggregate, count distinct users by day. If the table is a serving model, store date, user_id, platform, country, and first_active_timestamp.\n\nImportant production details include timezone, late-arriving events, bot/test filtering, deleted users, duplicate events, and partitioning by activity_date. For incremental builds, process recent partitions again to capture late events, not only the current day.\n\nA strong answer also includes validation: compare DAU against source event counts, monitor day-over-day changes, and check segment-level consistency.',
          followUps: [
            'Which events should count as active?',
            'How would you handle late events?',
            'Should DAU be a table or a metric query?',
          ],
        },
        {
          type: 'question',
          question: 'A query that used to run in 5 minutes now takes 2 hours. How do you debug it?',
          difficulty: 'medium',
          category: 'SQL Performance',
          framework: 'Scope -> query plan -> data growth -> joins -> partitions -> recent changes',
          answer:
            'First check whether the issue is query-specific, warehouse-wide, or infrastructure-related. If many queries slowed down, it may be cluster capacity, warehouse load, or service degradation. If one query slowed down, inspect the query and data.\n\nLook at recent changes: table size growth, schema changes, new joins, changed filters, missing partition pruning, stale statistics, data skew, exploding joins, or added distinct/order by operations. Review the query plan if available.\n\nCommon causes include joining at the wrong grain, missing date filters, many-to-many joins, scanning all partitions, inefficient window functions, large shuffles, or using functions on partition columns that prevent pruning.\n\nFixes may include filtering earlier, pre-aggregating, adding partition filters, clustering/sorting, materializing intermediate models, updating statistics, reducing selected columns, or correcting join logic. I would also add monitoring for runtime, bytes scanned, row counts, and cost.',
          followUps: [
            'What is partition pruning?',
            'How can a join explode row counts?',
            'How would you prevent this regression?',
          ],
        },
      ],
    },
    {
      id: 'data-modeling',
      title: 'Data Modeling and Warehousing Questions',
      group: 'Data Modeling',
      intro:
        'Data modeling interviews test whether you can design schemas that are clear, scalable, cost-aware, and useful for analytics, machine learning, and operational reporting.',
      blocks: [
        {
          type: 'key-term',
          title: 'Data modeling concepts to know',
          terms: [
            {
              term: 'Fact table',
              definition:
                'A table containing measurable business events or transactions, such as orders, payments, sessions, or shipments.',
            },
            {
              term: 'Dimension table',
              definition:
                'A table containing descriptive context for facts, such as customers, products, stores, campaigns, or dates.',
            },
            {
              term: 'Grain',
              definition:
                'The level represented by each row. Declaring grain is essential before building facts, dimensions, metrics, or joins.',
            },
            {
              term: 'Slowly changing dimension',
              definition:
                'A dimension design that tracks how attributes change over time, such as customer segment, address, or account owner.',
            },
          ],
        },
        {
          type: 'question',
          question: 'Design a data warehouse model for an ecommerce company.',
          difficulty: 'hard',
          category: 'Data Modeling',
          framework: 'Business processes -> facts -> dimensions -> grain -> metrics',
          answer:
            'Start with core business processes: browsing, cart, orders, payments, shipments, returns, refunds, inventory, and marketing attribution. Each process may become a fact table or event model depending on usage.\n\nImportant fact tables include fact_orders at one row per order, fact_order_items at one row per product per order, fact_payments, fact_refunds, fact_shipments, and fact_inventory_snapshot. Dimensions include dim_customer, dim_product, dim_date, dim_store or warehouse, dim_channel, and dim_campaign.\n\nDeclare grain explicitly. Revenue by product category should usually come from order item grain, not order grain. Customer lifecycle metrics may use customer or subscription grain. Inventory analysis may need daily snapshot grain.\n\nModel considerations: slowly changing customer or product attributes, refunds and cancellations, discounts at order versus item level, currency, taxes, shipping, guest checkout, and late-arriving data. I would define source-of-truth metrics and build semantic models or marts for finance, marketing, product, and operations.\n\nValidation includes reconciling revenue to finance, order counts to transactional systems, refund totals to payments, and inventory to warehouse systems.',
          followUps: [
            'What is the grain of fact_order_items?',
            'How would you model refunds?',
            'How would you handle product category changes over time?',
          ],
        },
        {
          type: 'question',
          question: 'How would you model slowly changing dimensions?',
          difficulty: 'medium',
          category: 'Data Modeling',
          framework: 'Type 1 versus Type 2 based on history needs',
          answer:
            'The right approach depends on whether historical accuracy matters. Type 1 overwrites old values, which is simple and useful when only the latest value matters. Type 2 preserves history by creating a new dimension row for each attribute change, usually with effective_start_date, effective_end_date, current_flag, and a surrogate key.\n\nExample: if a customer changes region from West to East, Type 1 would update the customer row to East. Historical revenue reports would now show old revenue under East, which may be wrong. Type 2 would preserve the old West row and create a new East row, allowing facts to join to the correct version at event time.\n\nType 2 adds complexity: surrogate keys, date range joins, late-arriving facts, current versus historical reporting, and larger dimension tables. Use it when reporting must reflect attributes as they were at the time of the event.\n\nA strong answer explains the business need before choosing the SCD type.',
          followUps: [
            'When is Type 1 acceptable?',
            'How do facts join to a Type 2 dimension?',
            'What happens with late-arriving facts?',
          ],
        },
        {
          type: 'question',
          question: 'Star schema versus wide denormalized table: when would you use each?',
          difficulty: 'medium',
          category: 'Data Modeling',
          framework: 'Governance and flexibility versus query simplicity and performance',
          answer:
            'A star schema separates facts and dimensions. It is useful when you need reusable dimensions, consistent metrics, governance, clear grain, and flexible analysis. It reduces duplication and makes changes to dimensions easier to manage.\n\nA wide denormalized table can be useful for specific high-usage analytics, machine learning features, or dashboards where query simplicity and performance matter. It can reduce join complexity for consumers but may duplicate data and create governance risk if many wide tables define metrics differently.\n\nIn practice, I would often maintain clean canonical facts and dimensions, then publish curated marts or wide tables for specific use cases. The warehouse foundation should remain trustworthy, while downstream models optimize for user needs.\n\nThe decision depends on scale, consumers, BI tool behavior, cost, latency, and how often business definitions change.',
          followUps: [
            'Which is better for BI dashboards?',
            'How do you avoid metric inconsistency?',
            'What is a semantic layer?',
          ],
        },
      ],
    },
    {
      id: 'pipeline-design',
      title: 'Pipeline Design and Orchestration',
      group: 'Pipelines and Systems',
      intro:
        'Pipeline interviews test whether you can design workflows that are idempotent, observable, recoverable, and appropriate for freshness and cost requirements.',
      blocks: [
        {
          type: 'numbered',
          title: 'A reliable pipeline design flow',
          items: [
            'Clarify source systems, data volume, freshness needs, downstream consumers, and failure tolerance.',
            'Choose ingestion pattern: batch extract, CDC, event stream, API pull, file drop, or managed connector.',
            'Define landing zone, raw storage, schema handling, and replay strategy.',
            'Transform data through clear layers: raw, cleaned/staged, modeled, and serving marts.',
            'Make pipelines idempotent so reruns do not duplicate or corrupt data.',
            'Add data quality checks, lineage, logging, alerts, metrics, and owner information.',
            'Plan for backfills, schema evolution, late data, retries, partial failures, and cost controls.',
          ],
        },
        {
          type: 'question',
          question: 'Design a daily ETL pipeline that ingests orders from a production database into a warehouse.',
          difficulty: 'medium',
          category: 'Pipeline Design',
          framework: 'Extract -> land raw -> transform -> validate -> publish -> monitor',
          answer:
            'Clarify requirements first: data freshness, order volume, acceptable lag, source database load constraints, downstream consumers, and whether historical corrections occur.\n\nA simple design: extract orders incrementally using updated_at or CDC, land raw data in object storage or a raw warehouse table, transform into staged tables, then publish modeled facts such as fact_orders and fact_order_items. Orchestrate with Airflow, Dagster, dbt Cloud, or a managed workflow tool.\n\nThe pipeline should be idempotent. If it reruns for a date or batch, it should replace or merge data deterministically rather than append duplicates. Use watermarks carefully, and reprocess a lookback window to capture late updates.\n\nValidation checks: row counts, null primary keys, duplicate order IDs, revenue totals, status distribution, freshness, and reconciliation to source. Monitoring should alert on failures, unusual volume changes, high duplicate rates, or delayed data. Document ownership and downstream dependencies.',
          followUps: [
            'Why is updated_at not always enough?',
            'How would you avoid loading duplicate orders?',
            'How would you backfill two years of history?',
          ],
        },
        {
          type: 'question',
          question: 'What does it mean for a pipeline to be idempotent?',
          difficulty: 'easy',
          category: 'Pipeline Reliability',
          framework: 'Same input and rerun produce same output',
          answer:
            'An idempotent pipeline can be run multiple times with the same input and produce the same correct output without duplicates or unintended side effects. This matters because pipelines fail, get retried, and require backfills.\n\nExample: a non-idempotent pipeline appends yesterday\'s orders every time it runs. If it is retried after a failure, revenue doubles. An idempotent version would delete and replace the target partition, merge by primary key, or write to a temporary table then atomically swap.\n\nIdempotency requires clear keys, partition strategy, deterministic transformations, and careful handling of side effects. It is one of the most important production data engineering concepts because recoverability depends on it.',
          followUps: [
            'How do you make an append-only pipeline idempotent?',
            'What is an atomic swap?',
            'How does idempotency help with backfills?',
          ],
        },
        {
          type: 'question',
          question: 'How would you handle schema changes from an upstream source?',
          difficulty: 'medium',
          category: 'Schema Evolution',
          framework: 'Detect -> classify -> protect -> communicate -> migrate',
          answer:
            'First detect schema changes automatically through schema registry, metadata checks, contract tests, or ingestion validation. Then classify the change: additive column, removed column, renamed column, type change, nullability change, or semantic change.\n\nAdditive nullable columns are usually safe. Removed columns, renamed fields, and type changes can break downstream transformations and dashboards. Semantic changes are especially dangerous because the schema may look valid while meaning changes.\n\nProtect the pipeline with raw data preservation, compatibility checks, alerts, and contracts for critical sources. For breaking changes, coordinate with source owners, update transformations, backfill if needed, and communicate downstream impact.\n\nA mature answer includes data contracts, versioning, lineage, tests, and clear ownership so schema changes do not silently corrupt analytics.',
          followUps: [
            'What is a data contract?',
            'How do you handle a column type change?',
            'What if the source team gives no warning?',
          ],
        },
      ],
    },
    {
      id: 'batch-streaming',
      title: 'Batch and Streaming Systems',
      group: 'Pipelines and Systems',
      intro:
        'Batch and streaming questions test whether you understand latency, throughput, ordering, state, windowing, replay, and the operational tradeoffs between simpler and more real-time architectures.',
      blocks: [
        {
          type: 'comparison-table',
          columnA: 'Batch Processing',
          columnB: 'Streaming Processing',
          rows: [
            {
              label: 'Best for',
              a: 'Periodic reporting, historical backfills, large transformations, cost-efficient analytics',
              b: 'Real-time features, alerts, fraud detection, live dashboards, low-latency decisions',
            },
            {
              label: 'Main tradeoff',
              a: 'Higher latency but simpler operations and easier replay',
              b: 'Lower latency but more complexity around state, ordering, and failure handling',
            },
            {
              label: 'Common tools',
              a: 'Airflow, dbt, Spark batch, Snowflake, BigQuery, Databricks',
              b: 'Kafka, Flink, Spark Structured Streaming, Kinesis, Pub/Sub',
            },
            {
              label: 'Failure concern',
              a: 'Late data, partial loads, long runtimes, backfill cost',
              b: 'Duplicates, out-of-order events, checkpointing, state growth, exactly-once semantics',
            },
          ],
        },
        {
          type: 'question',
          question: 'When would you choose streaming instead of batch?',
          difficulty: 'medium',
          category: 'Streaming / Architecture',
          framework: 'Decision latency versus complexity',
          answer:
            'Choose streaming when low latency creates meaningful value. Examples include fraud detection, operational alerts, real-time personalization, inventory updates, live experimentation metrics, and user-facing product features that need fresh events.\n\nBatch is often better for daily reporting, historical analytics, finance reconciliation, and transformations where latency of hours is acceptable. Batch is simpler to operate, easier to replay, and often cheaper.\n\nThe decision should consider freshness requirements, event volume, ordering needs, stateful processing, fault tolerance, team expertise, cost, and downstream consumers. Streaming is not automatically better. It adds complexity around duplicates, late events, checkpoints, schema evolution, and monitoring.\n\nA strong answer says: use the simplest architecture that meets the business requirement. If the business only needs daily metrics, do not build a streaming system for prestige.',
          followUps: [
            'What are late events?',
            'How do you handle duplicates in streaming?',
            'What does exactly-once mean?',
          ],
        },
        {
          type: 'question',
          question: 'Design a real-time fraud event pipeline.',
          difficulty: 'hard',
          category: 'Streaming System Design',
          framework: 'Events -> stream -> enrichment -> rules/model -> action -> storage -> monitoring',
          answer:
            'Start with requirements: event volume, latency target, fraud decision type, tolerance for false positives, and whether decisions block transactions or trigger review.\n\nA possible design: payment events are published to Kafka or Kinesis. A stream processor consumes events, validates schema, deduplicates by event_id, enriches with user, device, merchant, and historical velocity features, then applies rules or a model. High-risk events trigger a decision service, manual review queue, or step-up authentication. Raw events and decisions are written to durable storage for audit and model training.\n\nKey engineering concerns: duplicate events, out-of-order events, feature freshness, state store size, exactly-once or effectively-once processing, backpressure, dead-letter queues, replay, latency monitoring, and model/rule versioning.\n\nData quality and governance matter because fraud decisions affect customers. Log reason codes, monitor false positive rates, and support rollback if a rule or model behaves badly.',
          followUps: [
            'How would you compute velocity features?',
            'How would you replay events safely?',
            'What is the dead-letter queue for?',
          ],
        },
      ],
    },
    {
      id: 'spark-distributed',
      title: 'Spark and Distributed Processing Questions',
      group: 'Distributed Processing',
      intro:
        'Spark and distributed processing questions test whether you understand partitioning, shuffles, skew, caching, joins, file formats, and why jobs fail or become expensive.',
      blocks: [
        {
          type: 'question',
          question: 'What is a shuffle in Spark and why is it expensive?',
          difficulty: 'medium',
          category: 'Spark',
          framework: 'Data redistribution across partitions',
          answer:
            'A shuffle happens when Spark needs to redistribute data across partitions, usually for operations like groupBy, join, distinct, orderBy, and repartition. It is expensive because data must move across the network, be serialized/deserialized, written to disk, and coordinated across executors.\n\nShuffles often dominate job runtime and can cause failures when data is skewed or intermediate data is too large. A single hot key can send too much data to one partition, creating stragglers or out-of-memory errors.\n\nWays to reduce shuffle cost include filtering early, selecting only needed columns, pre-aggregating, using broadcast joins for small tables, partitioning by join keys, salting skewed keys, avoiding unnecessary distinct/orderBy, and tuning partition counts.\n\nA strong answer connects the concept to practical debugging: inspect the Spark UI, stages, shuffle read/write, skew, spill, task duration, and executor memory.',
          followUps: [
            'What causes data skew?',
            'When would you use a broadcast join?',
            'How do you debug a slow Spark job?',
          ],
        },
        {
          type: 'question',
          question: 'How would you optimize a Spark job that fails with out-of-memory errors?',
          difficulty: 'hard',
          category: 'Spark Performance',
          framework: 'Identify stage -> reduce data -> fix skew -> tune partitions -> avoid bad operations',
          answer:
            'First identify where the failure occurs using Spark UI or logs: which stage, operation, partition, and executor. OOM can come from skew, large joins, collect operations, oversized partitions, inefficient UDFs, or caching too much data.\n\nThen reduce data early: filter rows, select only necessary columns, push predicates, and avoid reading unnecessary partitions. Check joins: if one table is small, use broadcast join. If a key is skewed, use salting or split heavy keys. If partitions are too large, increase partition count; if too many tiny partitions, coalesce appropriately.\n\nAvoid collect() on large data, avoid Python UDFs when native functions work, and cache only when reused and when memory allows. For file output, avoid too many small files and choose columnar formats like Parquet with compression.\n\nIf tuning resources is needed, adjust executor memory, cores, shuffle partitions, and memory overhead, but do not rely only on bigger clusters. Fixing data shape and query plan is usually more durable.',
          followUps: [
            'How do you detect skew?',
            'Why can too many partitions be bad?',
            'When should you cache a DataFrame?',
          ],
        },
        {
          type: 'question',
          question: 'Parquet versus CSV: why do data engineers prefer Parquet for analytics?',
          difficulty: 'easy',
          category: 'File Formats',
          framework: 'Columnar storage, schema, compression, predicate pushdown',
          answer:
            'Parquet is a columnar file format, which is efficient for analytics because queries often read only a subset of columns. It supports compression, encodes data types, stores schema, and enables predicate pushdown and column pruning in many engines.\n\nCSV is row-oriented plain text. It is human-readable and portable, but it lacks strong types, can be larger, slower to scan, more error-prone with delimiters/escaping, and cannot skip irrelevant columns efficiently.\n\nFor data lakes and warehouses, Parquet usually reduces storage cost and improves query performance. CSV can still be useful for simple exports, small files, or interoperability, but it is not ideal as the main analytics storage format.',
          followUps: [
            'What is predicate pushdown?',
            'When might CSV still be acceptable?',
            'How do small files affect query performance?',
          ],
        },
      ],
    },
    {
      id: 'data-quality-observability',
      title: 'Data Quality and Observability',
      group: 'Reliability',
      intro:
        'Data quality questions test whether you can catch bad data before it breaks dashboards, models, product features, finance reports, or customer-facing systems.',
      blocks: [
        {
          type: 'question',
          question: 'What data quality checks would you add to a critical revenue pipeline?',
          difficulty: 'medium',
          category: 'Data Quality',
          framework: 'Freshness -> completeness -> uniqueness -> validity -> reconciliation',
          answer:
            'For a revenue pipeline, I would add checks for freshness, row count, null primary keys, duplicate transaction IDs, valid statuses, valid currencies, non-negative amounts where applicable, accepted date ranges, and referential integrity between orders, payments, refunds, and customers.\n\nI would also add reconciliation checks: total revenue compared with source payment systems, finance reports, or previous pipeline version. Monitor day-over-day and week-over-week changes with thresholds, but account for seasonality and known events.\n\nBusiness rules matter: canceled orders should not count as revenue, refunds should reduce net revenue, test transactions should be excluded, and currency conversion should use the correct rate.\n\nAlerts should be actionable, routed to an owner, and include context: failed check, affected table, severity, downstream dependencies, and suggested runbook. Too many noisy alerts will be ignored.',
          followUps: [
            'How do you choose alert thresholds?',
            'What if a check fails during month-end close?',
            'How would you prevent duplicate revenue?',
          ],
        },
        {
          type: 'question',
          question: 'A dashboard number changed unexpectedly after a pipeline deployment. What do you do?',
          difficulty: 'medium',
          category: 'Incident Response',
          framework: 'Assess impact -> compare versions -> inspect lineage -> mitigate -> root cause',
          answer:
            'First assess impact: which dashboard, metric, users, date range, and decisions are affected. Determine whether the number is wrong or whether the deployment corrected a previous issue.\n\nCompare the new output to the previous version by table, partition, row count, distinct count, metric totals, and key segments. Use lineage to identify upstream changes. Inspect code changes, schema changes, filters, joins, deduplication, and date logic.\n\nIf the metric is wrong and business users are affected, mitigate quickly: roll back the transformation, restore previous table version, disable the dashboard, or add a warning. Then perform root-cause analysis and backfill corrected data if needed.\n\nCommunication matters. Notify stakeholders with what changed, what is affected, confidence level, expected fix time, and whether past decisions need review.',
          followUps: [
            'How do you know whether the old or new number is correct?',
            'What rollback options would you want?',
            'How would lineage help?',
          ],
        },
        {
          type: 'worked-example',
          title: 'Production data incident checklist',
          scenario:
            'The executive revenue dashboard is missing yesterday\'s data two hours before a leadership meeting.',
          steps: [
            {
              label: 'Triage',
              content:
                'Check pipeline status, source freshness, warehouse table partitions, failed tasks, and whether the issue affects only revenue or all dashboards.',
            },
            {
              label: 'Mitigate',
              content:
                'If source data exists, rerun the affected partition. If not, annotate the dashboard and provide the latest available number with caveat.',
            },
            {
              label: 'Communicate',
              content:
                'Tell stakeholders what is missing, what decisions are affected, expected resolution time, and whether numbers may change.',
            },
            {
              label: 'Prevent',
              content:
                'Add freshness alerts, upstream source checks, SLA monitoring, and a runbook for revenue pipeline failures.',
            },
          ],
          result:
            'The response protects trust by combining technical recovery with clear stakeholder communication.',
        },
      ],
    },
    {
      id: 'system-design',
      title: 'Data Engineering System Design',
      group: 'Pipelines and Systems',
      intro:
        'Data engineering system design interviews evaluate architecture judgment: sources, ingestion, storage, transformation, serving, quality, lineage, governance, and cost.',
      blocks: [
        {
          type: 'question',
          question: 'Design a data platform for product analytics events.',
          difficulty: 'hard',
          category: 'Data System Design',
          framework: 'Instrumentation -> ingestion -> storage -> processing -> modeling -> serving -> governance',
          answer:
            'Start with requirements: event volume, latency, consumers, retention, schema evolution, privacy, and reliability. Product analytics events may power dashboards, experiments, personalization, and machine learning features.\n\nClients emit events through an SDK with event_name, user_id, session_id, timestamp, properties, app version, platform, and anonymous ID. Events go to an ingestion API or event collector, then into a durable stream like Kafka/Kinesis/Pub/Sub. Raw events are written to object storage for replay and to a warehouse or lakehouse for analytics.\n\nProcessing includes schema validation, deduplication, bot/internal filtering, sessionization, identity resolution, and transformation into modeled tables such as fact_events, fact_sessions, dim_users, and product-specific marts. Batch and streaming paths may coexist depending on freshness needs.\n\nQuality and governance: event contracts, schema registry, PII handling, consent enforcement, lineage, ownership, freshness checks, volume anomaly alerts, and documentation. Serving layers include BI dashboards, experimentation analysis, reverse ETL, and feature stores.\n\nTradeoffs include real-time versus batch cost, strict versus flexible schema, raw event retention, identity complexity, and how much logic belongs in ingestion versus transformation.',
          followUps: [
            'How would you handle schema evolution?',
            'How would you deduplicate events?',
            'What tables would analysts query?',
          ],
        },
        {
          type: 'question',
          question: 'Design a feature store for machine learning teams.',
          difficulty: 'hard',
          category: 'ML Data Infrastructure',
          framework: 'Offline/online consistency -> feature definitions -> freshness -> serving -> monitoring',
          answer:
            'A feature store should provide reusable, reliable features for training and serving. Requirements include feature definitions, point-in-time correctness, offline training data, online low-latency serving, freshness, access control, and monitoring.\n\nOffline features can be stored in a warehouse or lakehouse, partitioned by date and entity. Online features can be served from a low-latency key-value store. A feature registry stores metadata: feature name, owner, entity key, transformation logic, freshness SLA, source tables, and description.\n\nPoint-in-time correctness is critical. Training data must use feature values available at prediction time, not future values. For online/offline consistency, the same transformation logic should be reused when possible, or thoroughly tested if separate pipelines exist.\n\nMonitoring should cover feature freshness, null rates, distribution drift, online serving latency, training-serving skew, and downstream model impact. Governance includes PII controls, lineage, deprecation, and ownership.',
          followUps: [
            'What is point-in-time correctness?',
            'How do you avoid training-serving skew?',
            'What features need online serving?',
          ],
        },
      ],
    },
    {
      id: 'behavioral',
      title: 'Behavioral and Collaboration Questions',
      intro:
        'Behavioral data engineering interviews focus on production ownership, incident response, cross-functional communication, prioritization, and building systems other teams can trust.',
      blocks: [
        {
          type: 'question',
          question: 'Tell me about a data pipeline incident you handled.',
          difficulty: 'medium',
          category: 'Behavioral / Incident Response',
          framework: 'Impact -> triage -> mitigation -> root cause -> prevention',
          answer:
            'Choose an incident with real impact: missing data, wrong metrics, delayed pipeline, duplicate records, broken dashboard, model feature issue, or downstream product impact. Start with who was affected and why it mattered.\n\nThen explain your triage process: logs, orchestration status, source freshness, recent deployments, schema changes, row counts, partitions, lineage, and downstream dependencies. Describe how you mitigated the issue: rerun, rollback, patch, backfill, or stakeholder warning.\n\nThe strongest answer includes prevention. Did you add data quality checks, alerts, retries, schema contracts, idempotent writes, runbooks, lineage, or better deployment controls? Avoid blaming upstream teams. Show ownership of the system and communication.\n\nClose with what you learned about reliability and how your process changed afterward.',
          followUps: [
            'How did you communicate impact?',
            'What would have caught the issue earlier?',
            'How did you prevent recurrence?',
          ],
        },
        {
          type: 'question',
          question: 'How do you work with analysts who say the data is wrong?',
          difficulty: 'medium',
          category: 'Stakeholder Communication',
          framework: 'Clarify -> reproduce -> trace lineage -> resolve -> document',
          answer:
            'First clarify exactly what looks wrong: metric, table, date range, dashboard, filter, expected value, and business reason. “The data is wrong” needs to become a reproducible issue.\n\nThen compare the analyst query or dashboard to source tables and model definitions. Check grain, filters, joins, timezones, freshness, metric definitions, and recent changes. Use lineage to trace upstream dependencies.\n\nIf the data is wrong, fix it and communicate impact. If the data is correct but the definition differs from expectation, align on metric definition and documentation. If uncertainty remains, explain what is known, what is being checked, and when you will follow up.\n\nThe relationship matters. Analysts are data platform customers, and trust is built through fast, clear, and evidence-based responses.',
          followUps: [
            'What if the analyst is using the table incorrectly?',
            'How do you prevent repeated confusion?',
            'What documentation helps most?',
          ],
        },
        {
          type: 'question',
          question: 'How do you prioritize data engineering work?',
          difficulty: 'medium',
          category: 'Prioritization',
          framework: 'Impact -> reliability -> urgency -> dependencies -> leverage',
          answer:
            'I prioritize based on business impact, reliability risk, urgency, downstream dependencies, and leverage. A broken revenue pipeline or compliance issue usually outranks a nice-to-have dashboard model. A platform improvement may outrank a one-off request if it unblocks many teams.\n\nI also distinguish between urgent incidents, strategic platform work, stakeholder requests, technical debt, and operational toil. If the team only handles tickets, reliability and platform quality decay. If the team only builds platform abstractions, business teams may be blocked.\n\nA strong prioritization process includes ownership, SLAs, severity levels, roadmap alignment, and transparent tradeoffs. I would communicate what is being done, what is deferred, why, and what risk that creates.',
          followUps: [
            'How do you justify technical debt work?',
            'What if leadership wants a dashboard urgently?',
            'How do you balance incidents and roadmap?',
          ],
        },
      ],
    },
    {
      id: 'prep-strategy',
      title: 'Data Engineer Prep Strategy',
      intro:
        'Data engineer prep should combine SQL, data modeling, Python, pipeline design, distributed systems, cloud warehouse concepts, and production incident storytelling.',
      blocks: [
        {
          type: 'numbered',
          title: '6-week data engineer interview prep plan',
          items: [
            'Week 1: SQL depth. Practice joins, windows, deduplication, incremental models, cohorts, partitions, and performance debugging.',
            'Week 2: data modeling. Practice facts, dimensions, grains, SCDs, event models, warehouse marts, and metric definitions.',
            'Week 3: pipelines. Practice ETL/ELT design, idempotency, orchestration, backfills, late data, schema changes, and data quality checks.',
            'Week 4: distributed processing. Review Spark, shuffles, partitioning, skew, file formats, streaming concepts, and cost/performance tradeoffs.',
            'Week 5: system design. Practice product analytics platforms, CDC ingestion, feature stores, streaming fraud pipelines, and warehouse architecture.',
            'Week 6: mock interviews and stories. Prepare pipeline incident, data quality, stakeholder, prioritization, and platform improvement examples.',
          ],
        },
        {
          type: 'bullets',
          title: 'Role-specific prep by data engineering track',
          items: [
            'Analytics engineering: focus on dbt, SQL models, semantic layers, metric definitions, BI reliability, and stakeholder workflows.',
            'Platform data engineering: focus on ingestion systems, orchestration, lineage, governance, access controls, and developer experience.',
            'Streaming data engineering: focus on Kafka, Flink/Spark streaming, state, windows, duplicates, ordering, replay, and latency.',
            'ML data engineering: focus on feature pipelines, feature stores, point-in-time correctness, training data, and monitoring.',
            'Cloud warehouse engineering: focus on Snowflake, BigQuery, Databricks, partitioning, clustering, cost controls, and workload management.',
          ],
        },
        {
          type: 'warning',
          title: 'Do not talk only about tools',
          text:
            'Interviewers care less that you know Airflow, dbt, Spark, or Kafka by name and more that you understand reliability, data correctness, tradeoffs, and failure modes.',
        },
        {
          type: 'key-takeaway',
          text:
            'Great data engineer interview answers combine SQL correctness, data modeling clarity, pipeline reliability, distributed systems judgment, and production ownership. The best candidates show they can build data systems other teams can trust.',
        },
      ],
    },
  ],
}
