# Interview script — Sammy Bolger

Written to sound like you talking, not you reading. Read every quoted
paragraph out loud at least once tonight so the rhythm feels natural.

Style rules: contractions, occasional "so" or "basically" or "yeah," short
punchy sentences mixed with longer ones. Say the numbers. Name the tradeoff.
Stop.

---

## STAR method — 30-second refresher

**S**ituation, **T**ask, **A**ction, **R**esult.

- Situation = one sentence of setup. What was going on.
- Task = what you specifically owned.
- Action = what you actually did. This is the biggest part.
- Result = what happened, ideally with a number.

Three landmines:
- Don't skip the Task. She can't tell what "you" did if you never say
  what you owned.
- Action should be about 60% of your answer.
- The Result doesn't have to be a win. "It shipped, and I learned X" is
  totally fine.

---

## Behavioral prompts → which story to grab

| If she asks... | Lead with... |
|---|---|
| "Tell me about yourself" | Opening script below |
| "A challenging project" | Bat capstone |
| "A time you had to learn something new" | AI4EA (Docusaurus + Bun) |
| "A time something didn't go as planned" | AI4EA (the LLM blocker) |
| "Unclear requirements" | AI4EA (open-ended intern brief) |
| "You took initiative" | Tech Brief or PR Reviewer Agent |
| "Worked with a stakeholder" | AI4EA (Ian) or DS Associate (cafe mgmt) |
| "Explained something technical" | DS Associate (finance + cafe folks) |
| "Presented to a non-technical audience" | DS Associate (findings meeting) |
| "Worked cross-functionally" | DS Associate (DS × Finance × coffee shop) |
| "Your work influenced a real decision" | DS Associate (staffing / inventory) |
| "Competing priorities" | Bat + internship + coursework overlap |
| "Your biggest weakness" | Bottom of this doc |

---

## Opening — "Tell me about yourself"

> "Yeah, so I'm a senior at Concordia College up in Moorhead, Minnesota,
> studying computer science and data science. I'm interning at Entegris
> right now on the enterprise architecture team, building an AI engine
> on top of our internal architecture knowledge base. Outside of the
> internship, my senior capstone was a machine learning project doing
> automated bat call detection from ultrasonic field recordings. That
> one was actually part of a bigger project at Concordia. And then last
> spring I was in Concordia's Data Science Lab where we partnered with
> the on-campus coffee shop and the finance club to ship a
> demand-forecasting tool that the shop actually used for staffing and
> inventory. I've also got a handful of smaller projects on the side
> across data engineering, machine learning, and LLM applications. What
> I really care about is stuff where you can pull real data, model it,
> and put the result in front of a user who's actually going to use it."

Pause. Let her ask the next question.

---

# 1. AI4EA — the flagship

Big portion of the interview. Verbal intro first, then screen-share.

## 60-second verbal intro (before you share the screen)

> "So the project I've been on all summer is called AI4EA, which stands
> for AI for Enterprise Architecture. Basically, Entegris has this
> governed knowledge base of architecture patterns and principles.
> Things like how we do integrations, how we pick data platforms, what
> our security posture looks like. Today, when a new business scenario
> comes in, an architect has to write a new pattern by hand and it has
> to follow this pretty strict seven-section template. My project is
> building an engine that takes a business scenario as input and
> drafts a candidate pattern in that same template, grounded in the
> existing knowledge base. So it's basically retrieval-augmented
> generation, but the retrieval corpus is our own governed docs and
> the output has to conform to a very specific structure. Can I share
> my screen real quick and walk you through it?"

## Screen-share walkthrough (in order)

Say each line out loud as you click.

**1. Open the Docusaurus site (localhost).**
> "So this is the knowledge base itself. It's a Docusaurus site with
> around 15 patterns, 10 principles, 6 positions, plus checklists and
> guardrails. Every pattern follows this same seven-section template.
> Name, Context, Problem, Solution, Sketch, Results, and Sidebars.
> That's the shape the AI engine has to produce."

**2. Click into one existing pattern.**
> "Here's what a well-written pattern looks like. The structure is
> pretty tight, which is intentional. Governed content means every
> pattern has to be reviewable and consistent, and that's actually
> what makes it a good RAG corpus but also what makes it a hard
> generation target."

**3. Navigate to /generate.**
> "This is the page I built. The idea is a stakeholder types in a
> business scenario, hits submit, and gets back a candidate pattern
> in the same seven-section format. Behind the scenes there's a Bun
> backend running on port 3001 doing three things. It loads the
> knowledge base as context, calls the LLM with the scenario plus
> that context plus a system prompt that enforces the template, and
> then streams the response back to this page."

**4. Open the code and show the four backend files.**
> "The backend's basically four TypeScript files. `context_loader.ts`
> walks the Docusaurus content directory and assembles the RAG
> context. `llm_client.ts` wraps the actual LLM call. `server.ts` is
> the Bun HTTP handler. And `generate.tsx` is the React page you
> just saw."

**5. Name the blocker honestly.**
> "One thing I want to flag. The LLM piece is currently blocked
> because we're waiting on a GitHub Models account entitlement that
> Ian, my stakeholder, is working through. So in the meantime I've
> been polishing the context assembly and the UI, and doing dry runs
> with a mocked LLM response so the front-end flow is proven. The
> day that entitlement lands, we flip a config value and this thing
> is end-to-end."

**6. Stop sharing.**
> "Happy to answer any questions on the design or the code."

## STAR framings if she says "tell me about a time"

**"A time you had to work with unclear requirements"**

> "**Situation:** So when I started my internship this summer, the
> brief I got from Ian, my stakeholder, was basically 'build an AI
> engine that generates new architecture patterns from our knowledge
> base.' That was pretty much it. No spec, no design doc, no chosen
> tech stack.
>
> **Task:** I had to turn that into a real project I could ship
> before the end of summer, and it had to be something a human
> architect would actually accept.
>
> **Action:** So the first week I basically spent reading every
> existing pattern in the knowledge base, meeting with two
> architects to figure out the seven-section template and why each
> section exists, and sketching out what the generation UI would
> even need to look like. Then I made three concrete calls. I went
> with Docusaurus because that's what the knowledge base already
> lives in. I picked Bun for the backend because it's lightweight
> and keeps the whole app in one repo. And I proposed a RAG approach
> where the context is the knowledge base itself, not an external
> vector store, since the KB is small enough to just load in and it
> keeps the deploy simple.
>
> **Result:** Within three weeks I had an end-to-end prototype where
> the UI, the backend, the context assembly, and the template
> enforcement were all working against a mocked LLM. The generation
> piece is on hold pending that entitlement, but the pattern I
> built is what we flip on the day it lands."

**"A time something didn't go as planned"**

> "**Situation:** The AI engine I'm building has to call an LLM, and
> the plan Entegris had was to use GitHub Models as the interim
> provider while our LiteLLM gateway comes online. That was the
> plan everyone agreed on before I even started.
>
> **Task:** I needed to get end-to-end generation working before
> handoff.
>
> **Action:** When I actually went to wire it up, the GitHub Models
> API needed an account entitlement our org didn't have, and I
> couldn't unblock it myself. So I did two things. First I raised
> it early with Ian instead of just sitting on it, and he started
> the entitlement process. And second, I refactored my
> `llm_client.ts` so it takes a mock provider you can just flip in
> via config, and I built out the whole pipeline against that mock.
> So the day the entitlement lands, it's basically a one-line
> change.
>
> **Result:** The rest of the project stayed on schedule. The
> pipeline, the context loader, the UI, all of it fully tested
> against the mock. The entitlement is still in progress but
> nothing else is waiting on it."

**"A time you had to learn something new quickly"**

> "**Situation:** When I joined the enterprise architecture team,
> the knowledge base was already in Docusaurus 3.10, using Bun,
> React 19, and TypeScript 5.9. I'd used React before but I had
> literally zero experience with Bun or with Docusaurus's
> content-loading lifecycle.
>
> **Task:** I had to be productive in that stack within a couple
> weeks or the project was dead in the water.
>
> **Action:** So I gave myself a pretty strict rule. Build the
> smallest working thing first, then read the docs for the parts
> that broke. I stood up a bare Bun server, then added a route,
> then wired it to Docusaurus content, then added the React page.
> Each step was maybe a hundred lines of code. And when something
> failed, I'd read exactly the section of the docs I needed and
> move on.
>
> **Result:** Within two weeks I was writing production-quality
> handlers in the stack. That whole 'build the smallest thing
> first' approach is basically how I learn any new tool now."

## AI4EA technical follow-ups

**Q: "How does the context assembly work?"**
> "`context_loader.ts` walks the Docusaurus content folder, reads the
> markdown files, and concatenates them with clear section headers
> into one context string. It's pretty simple. Since the KB is
> small, I don't need chunking or embeddings. That'd be
> over-engineering."

**Q: "Why not use a vector database?"**
> "The whole knowledge base fits comfortably in a single LLM
> context window today. A vector DB would just add a moving part
> with no measurable benefit at this scale. If the KB grew ten-x
> I'd add chunking and retrieval, but I'd hold off on a full vector
> DB until the corpus was way larger."

**Q: "How do you enforce the seven-section template?"**
> "Two ways working together. The system prompt spells out the
> sections and their purposes in order. And I include two or three
> full example patterns as few-shots so the model can see the
> shape. If the output ever drifts I'd add a validator that parses
> the response and rejects anything missing a section."

---

# 2. Bat Echolocation Detection — Senior capstone

Second act after AI4EA. Verbal only, no screen-share.

**Repo:** github.com/SammyBolger/bat-echolocation-detection

**Bigger context** (say this if she asks how the project got started):
This was your piece of Concordia's larger Bat Project run out of the science
departments by Prof. Darin Ulness. It's a citizen-science acoustic
monitoring initiative that's planning to deploy over 100 AudioMoth
detectors across the community.

## 60-second verbal intro

> "So my senior capstone was a semester-long independent study in data
> science and machine learning. I was contributing to Concordia's Bat
> Project, which is a bigger acoustic monitoring effort run out of the
> science departments. Eventually it's going to deploy over a hundred
> AudioMoth detectors across the community. Bats emit ultrasonic
> calls above the range of human hearing, so the recorders capture
> audio at 384 kilohertz all night, and traditionally someone would
> just sit and review that audio the next day. My piece was the first
> machine learning classifier in that pipeline. I trained a
> MobileNetV2 CNN on about 33,000 hand-labeled call snippets and got
> around 96.4 percent accuracy. And on top of that I packaged the
> whole toolset as a launcher app that the biology team is still
> using in the field today."

## Full STAR answer for "tell me about your capstone" or "your most challenging project"

> "**Situation:** So senior year I did a semester-long independent
> study at Concordia in data science and ML, contributing to this
> larger initiative called the Concordia Bat Project. The bigger
> project's goal is a fully automated citizen-science acoustic
> monitoring network. Once it's fully deployed, over a hundred
> AudioMoth detectors are going to be recording at the same time,
> and a single rainy or noisy night can generate on the order of
> 3.2 terabytes of raw audio. No one is going to review that by
> hand. So a triage step that keeps the recordings with real bat
> calls and drops the rest is basically critical. That triage was
> my piece.
>
> **Task:** Build the first machine learning classifier in the
> pipeline. Two deliverables. One, a trained model that could tell
> bat echolocation calls apart from background noise reliably
> enough to be trusted for research. Two, get it into a form the
> biology team can actually run on a field laptop without needing a
> data scientist in the room.
>
> **Action:** For the data I was working with two sources. The
> professors on the project had already collected a big field
> dataset using AudioMoth recorders deployed around campus and
> partner sites. So that gave me around 33,000 labeled 0.5-second
> snippets after manual curation, roughly 13,000 confirmed bat
> calls and 20,000 confirmed noise. On top of that I ran my own
> AudioMoth in my backyard for a couple weeks, basically to
> sanity-check the pipeline on recordings it hadn't seen before
> from a totally different environment.
>
> The first design decision was how to actually represent audio to
> the model. Raw waveforms into a 1D CNN would've needed a way
> bigger dataset. So instead I converted every 0.5-second snippet
> into a spectrogram image and used MobileNetV2 pretrained on
> ImageNet as a frozen feature extractor. Only the classification
> head was actually trained. That transfer learning move was
> probably the single biggest reason the accuracy ended up where
> it did with a dataset that size.
>
> Preprocessing was: STFT with a 1024-sample window, restrict to
> the 18 to 80 kilohertz band because that's where bat calls
> actually live, decibel scale, then a fixed global normalization
> so every spectrogram sits on the same intensity scale. Not
> per-image autoscaling. That part actually matters because it
> forces the model to learn bat structure instead of just latching
> onto the brightest thing in the frame. Final output is a 224 by
> 224 grayscale image.
>
> I trained with Adam, binary cross-entropy loss, batch size 32.
> Used Keras' `ImageDataGenerator` for pretty conservative
> augmentation, just horizontal flips. No vertical flips because
> that would invert the frequency axis and destroy the physical
> meaning of the spectrogram. And I trained on CPU on purpose so
> it would reproduce on a field laptop.
>
> Then the second piece. I packaged the whole toolset, the model
> plus the sorter and the utilities the biology team wrote around
> it, into a launcher app called BatFieldLauncher. It's a single
> PySide6 interface with three buttons that opens the sorter, the
> compressor, and the spectrogram inspector as subprocesses. I
> also wrote the Mac install guide. That's the tool the biology
> team is still using today.
>
> **Result:** 96.4 percent overall accuracy on the held-out test
> set. Bat recall of 94.6 and no-bat recall of 97.5, so the model's
> slightly more conservative on the bat side, which is the safer
> direction for a screening tool. My model became the baseline the
> professors used to bootstrap a bigger Round 2 dataset. And
> honestly the part I care about most is that the launcher I built
> is currently in use by Concordia's biology field team. A model a
> domain expert can actually run is worth more than a slightly
> better model sitting in a notebook."

## Follow-up Q&A

**Q: "Where did the data come from?"**
> "Two sources. The professors on the project had been running
> AudioMoth ultrasonic recorders in the field for a while before I
> joined, so I started with about 33,000 hand-labeled snippets
> they'd already accumulated. And then I ran my own AudioMoth in
> my backyard for a couple weeks so I had a fresh batch of
> recordings the model had never seen from a completely different
> environment to sanity-check against."

**Q: "Why spectrograms instead of raw audio?"**
> "Transfer learning, basically. Spectrograms let me use
> MobileNetV2 pretrained on ImageNet. Training a 1D convolutional
> net on raw waveforms with 33,000 samples would've needed either
> a way bigger dataset or self-supervised pretraining, and neither
> of those were on the table for a one-semester project. So
> turning audio into images was just the shortest path to a strong
> baseline."

**Q: "Why global normalization instead of per-image?"**
> "This one actually matters. If you normalize each spectrogram
> independently, the model just learns to detect the brightest
> thing in the frame, which for a noisy recording could be
> anything. But if you clip every spectrogram to the same fixed
> decibel range across the whole dataset, weak bat calls stay
> quiet in the image and loud non-bat events stay loud. So the
> model's forced to learn what a bat call actually looks like
> structurally, instead of just gravitating to the loudest
> region."

**Q: "Why MobileNetV2?"**
> "Two reasons. It's small enough to run comfortably on a CPU-only
> field laptop, which was kind of a hard requirement because the
> biology team isn't going to be running GPUs in the field. And
> its early convolutional filters, edges, gradients, textures, all
> transfer well to non-natural-image domains like spectrograms. I
> could've tried EfficientNet if I had more compute, but MobileNet
> was the right size for what I needed."

**Q: "How did you handle class imbalance?"**
> "It's about two to one, noise to bat, which isn't super extreme.
> I tracked per-class recall separately from overall accuracy so I
> could see if the model was quietly ignoring the minority class.
> Bat recall ended up at 94.6, so the imbalance wasn't really
> hurting the class I cared about. If it had been worse I would've
> added class-weighted loss."

**Q: "How did you validate on real-world data?"**
> "Two ways. One, the held-out test set from the labeled dataset,
> which gave me the 96.4 percent number. Two, my own backyard
> recordings which the model had never seen and were from a
> totally different environment. That was the honest check. And
> the professors also later ran the model on around 1,200
> full-length field recordings and reported zero misclassifications
> of true bat calls, which was a good sign that the approach
> generalized to real deployment."

**Q: "How did you package it for the biology team?"**
> "I built a launcher app called BatFieldLauncher using PySide6.
> It's basically a single graphical interface with three buttons
> that opens the model's sorter, an audio compressor for producing
> bat-only files, and a spectrogram inspector for visualization.
> All three run as independent subprocesses under one launcher so
> the biology team doesn't have to touch a terminal. I also wrote
> a Mac install guide so it could be deployed on any field laptop.
> That launcher is still what they use today."

**Q: "What would you do differently?"**
> "One real limitation. My train and test split shuffles at the
> spectrogram-chunk level, not at the recording-session level.
> Since a lot of 0.5-second chunks come from the same overnight
> recording, it's plausible that chunks from the same session
> ended up in both train and test, which can inflate the accuracy
> number. If I redid it I'd use `GroupShuffleSplit` keyed on
> recording session, and I'd honestly expect the true held-out
> number to be a couple points lower. Doesn't invalidate the
> approach but it's the honest caveat."

**Q: "How does this scale?"**
> "So the bigger project is planning for over a hundred AudioMoths
> in the field at once. On a rainy night that's around 3.2
> terabytes of raw audio, which no one can review by hand. The
> classifier turns that into a small, information-rich fraction,
> just the recordings that actually contain bat calls. That's
> really the whole point. Manual review and cloud storage are the
> bottlenecks, and an accurate triage step is what makes the whole
> monitoring network feasible."

## Numbers to have on the tip of your tongue

- 96.4% overall accuracy on the held-out test set
- 94.6% bat recall, 97.5% no-bat recall
- ~33,000 hand-labeled 0.5-second snippets (~13k bat + 20k noise)
- 384 kHz raw audio, 18-80 kHz band, 224x224 grayscale spectrograms
- MobileNetV2, ImageNet pretrained, frozen feature extractor
- ~1,200 field recordings validated post-deployment, zero missed bat files
- Scale motivation: 100+ AudioMoths, ~3.2 TB per rainy night
- Deliverables: the Alpha model + BatFieldLauncher (still in use today)

---

# 3. Data Science Associate — Concordia Data Science Lab

**On resume as:** Data Science Associate, Jan 2025 – May 2025, Concordia
College Data Science Lab (Moorhead, MN).

Use this project when she asks about stakeholder communication,
cross-functional teamwork, or work that influenced a real business
decision. This is your "I work well with non-technical people" story.

## 45-second verbal pitch

> "So last spring semester I was part of Concordia's Data Science
> Lab. It's a student-run program where we partner with real
> organizations on campus or in the community to deliver data-backed
> recommendations. My cohort partnered with our on-campus coffee
> shop and Concordia's finance club. The finance side wanted to
> model the shop's revenue and staffing costs. Our side was
> responsible for the data and modeling work. Over the semester I
> trained a k-means clustering model on about 12,000 transactions
> to surface customer buying patterns, and I built a demand
> forecasting model with a Streamlit dashboard that the shop's
> management used to plan staffing shifts and inventory. At the end
> we presented the findings to the coffee shop team, the finance
> students, and campus admin."

## Full STAR answer if she asks about it directly

> "**Situation:** So spring semester of my junior year I joined the
> Data Science Lab at Concordia. It's basically a program where
> student teams partner with a real organization on a semester-long
> analytics project. The DS side of my cohort got paired with the
> Business and Finance Club, and together we took on the on-campus
> coffee shop as our client. The shop had years of point-of-sale
> data just sitting in a spreadsheet and had never used it for
> anything.
>
> **Task:** The shop's manager wanted two things. She wanted to
> understand what her customers actually buy and when, and she
> wanted a way to plan staffing and inventory that wasn't purely
> gut feel. The finance students owned the P&L analysis. My side
> was the modeling and the tooling.
>
> **Action:** I started by cleaning about 12,000 transactions
> covering more than a year of sales. Then I trained a k-means
> clustering model on the basket data to surface customer buying
> patterns. That gave us three or four pretty clear segments,
> things like morning coffee-only regulars versus
> afternoon-pastry-plus-espresso visitors. On top of that I built
> a demand forecasting model that predicted daily transactions and
> item volume, and I wrapped everything in a Streamlit dashboard so
> the manager could look at forecasts and segment breakdowns
> without having to touch code.
>
> I met with the coffee shop manager every couple weeks to make
> sure I was actually building something she'd use, and I worked
> closely with the finance students to make sure the demand
> forecast lined up with the assumptions in their P&L model.
>
> **Result:** By end of semester the manager was using the
> dashboard to plan staffing shifts and time inventory orders, and
> the finance team folded the forecast into a set of
> recommendations to campus admin. We presented the whole thing to
> the shop team, the finance advisor, and a couple people from
> campus operations. The Data Science Associate line on my resume
> is basically the credential you get by completing that
> partnership project."

## Follow-up Q&A

**Q: "What did you learn from that project?"**
> "Honestly the single biggest thing was that the model isn't the
> deliverable. The dashboard is. I probably spent half the semester
> on the Streamlit interface and how the results were framed, and
> the manager kept using it after we were done specifically because
> she could open it herself and see what she needed. If I'd
> shipped a Jupyter notebook with the same model, it would've been
> used once for the final presentation and then never again."

**Q: "How did you validate the k-means clustering?"**
> "K-means doesn't really have a clean accuracy metric, so I did
> two things. I ran the elbow method and silhouette score to pick
> a number of clusters that made statistical sense, and then I
> actually sat down with the coffee shop manager and walked her
> through the clusters to see if they matched the customer types
> she recognized from behind the counter. If the model had spit
> out clusters that didn't map to anything she recognized, I
> would've gone back and reconsidered the features. Getting human
> validation from the domain expert mattered just as much as the
> silhouette score."

**Q: "How did you handle presenting technical work to non-technical
stakeholders?"**
> "Two rules. Never lead with the model, lead with the decision
> the person in the room actually needs to make. And show a
> picture instead of a metric whenever the picture works. So when
> I showed segment behavior I used bar charts of what each segment
> buys, not the silhouette score. When I showed the forecast I
> used a line chart with a confidence band, not RMSE. If someone
> asked how it worked I could go deeper, but I never opened with
> the technical layer."

**Q: "What would you do differently?"**
> "I'd add a proper holdout evaluation on the forecast earlier in
> the project. I was too eager to get something in front of the
> manager, and I ended up doing my error analysis in the last two
> weeks. If I'd built the eval loop in from the start it would've
> been way faster to iterate on model choices."

## Numbers to have ready
- 12,000+ transactions cleaned and modeled
- 3-4 customer segments surfaced from k-means
- Streamlit dashboard shipped, used post-semester for staffing / inventory
- Semester-long, Jan through May 2025
- Cross-functional team: DS Lab students + Finance Club + coffee shop mgmt

---

# 4. Portfolio breadth (shorter form)

Only mention these if she says "what else have you done" or "walk me
through your other projects." Otherwise keep the focus on AI4EA + bat
+ DS Associate.

## PR Reviewer Agent
> "It's a GitHub App I built that auto-reviews pull requests. A
> LangGraph agent pulls the diff, does RAG retrieval over the repo,
> and Claude writes a structured review that gets posted back as a
> PR comment. The interesting piece is I built an LLM-as-judge
> eval harness with 66 pytest cases in CI, so I can actually
> measure whether a prompt change improves review quality. It's
> deployed on Fly.io."

## Tech Brief
> "A daily ELT pipeline that pulls tech news from HackerNews,
> Reddit, GitHub trending, RSS, and ArXiv into DuckDB with a dbt
> medallion layout. A LangGraph agent using Claude Haiku scores
> and summarizes stories, and it emails me the brief every morning
> via Resend on a GitHub Actions cron."

## MovieLens NL-to-SQL
> "A Streamlit app I built recently where you ask MovieLens a
> question in English and it returns SQL and the results. It uses
> semantic retrieval over hand-written NL/SQL examples for the
> few-shot context, then Claude Haiku writes the SQL. There's a
> SELECT-only safety check on the executor. It's basically the
> same pattern I'd want to apply to an enterprise database where
> non-technical users need to query."

## NBA Salary Predictor
> "A quick classical ML project I did to keep my sklearn and
> XGBoost reflexes sharp. It predicts a player's next-year NBA
> salary from their prior-year advanced stats scraped from
> Basketball-Reference. Ridge is the linear baseline, then Random
> Forest and XGBoost. About 0.49 test R-squared, 6.6 million
> dollar MAE. The interesting story is why that R-squared isn't
> higher. Salary depends on the collective bargaining agreement in
> ways stats can't really see."

## Chess Analytics
> "A small ELT pipeline over my own chess.com game history.
> Ingest, transform, analyze, three scripts. Interactive Plotly
> dashboard on GitHub Pages, refreshed by a daily GitHub Action."

## Older breadth (only if she pushes)
> "Before those I also did a Tableau dashboard comparing LeBron
> to some other all-time greats, an NBA shot-outcome classifier
> on the 2016-17 shot log, and a couple R-Markdown modeling
> projects from a data mining class."

---

# 5. Common behavioral traps and prepared answers

## "What's your biggest weakness?"

Say a real one and how you're working on it. Skip the fake-humble
"I care too much" answer.

> "Honestly, I have a tendency to keep polishing a working thing
> instead of starting the next one. On the AI4EA project I caught
> myself rewriting the context loader twice when the original
> version was already fine. So I've started giving myself explicit
> stop conditions before I start a piece of work. If I hit the
> stop condition I move on, and I only come back if I've got real
> evidence something's broken."

## "Why data science?"

> "Because it kind of sits right at the intersection of writing
> code that runs and answering questions that matter to people. A
> dashboard nobody reads or a model nobody uses is basically the
> same as no work at all, and the discipline of asking 'who's
> actually going to use this and how' before writing anything is
> what makes DS different from just building software."

## "Why Entegris?"

> "Two reasons. First, I've spent the whole summer inside the org
> on the enterprise architecture team, so I already know how the
> technical teams work and what the AI4EA project is trying to do
> for the business. I'd rather keep building on that than start
> from scratch somewhere else. And second, the semiconductor and
> materials domain has some of the most interesting data problems
> in industry, high-dimensional process data with tight quality
> constraints, and I'd really like to work on that kind of
> problem."

## "Where do you see yourself in five years?"

> "Five years out I want to be the person on a team who can take
> an ambiguous business problem, translate it into a data or ML
> problem, actually build the solution, and explain the tradeoffs
> to a non-technical stakeholder. I don't have a specific title
> in mind. I care more about that particular skill set."

## "Do you have any questions for me?"

Always have three. Here are three good defaults.

> "What does the first ninety days look like for a data scientist
> on this team? What are you trying to measure them on by the end
> of the quarter?"

> "What's the working style on the team? Is it a lot of pair
> analysis, or is it more independent work with reviews?"

> "What's a project the team shipped recently that you're proud
> of, and what made it work?"

---

# 6. Closing

## Thank-you email (send within 24 hours)

Short. Two paragraphs.

> "Hi [name],
>
> Thanks for taking the time this morning. I really enjoyed
> talking through the AI4EA project and hearing about how the data
> science team operates day to day.
>
> Everything I mentioned is on my GitHub at github.com/SammyBolger.
> The three most recent projects, a chess.com analytics pipeline,
> an NBA salary predictor, and a MovieLens natural-language-to-SQL
> app, all have interactive dashboards on GitHub Pages, and my
> senior capstone bat detection project is in the same place with
> the full write-up.
>
> Looking forward to next steps.
>
> Sammy"

---

# Reminders for tomorrow

- Water and coffee before, not during
- If she asks a technical question you don't actually know the answer
  to, say "I haven't worked with that specifically, but here's how I'd
  think about it." Don't bluff
- When you finish an answer, stop. Silence isn't a signal to keep
  going. She'll ask a follow-up if she wants more
- Say the numbers out loud when they come up. "Ninety-six point four
  percent." "Point four nine R-squared." "Sixty-six eval cases"
- If your mind blanks, buy time with "That's a good question, let me
  think for a second." Way better than a rambly answer
- The word "basically" is fine once or twice, don't overuse it
- Smile with your voice on video calls. Sounds cheesy, works
