# Cross-Pollination — 5 Combination Strategies

This skill provides the analytical frameworks for combining two industries into novel hybrid innovations. Used by Phase 8 of `/itropa:go`, or conversationally when the user says "cross-pollinate X and Y".

## Trigger

Activate when performing cross-pollination analysis between two industries.

## The 5 Combination Strategies

When given Industry A and Industry B, generate exactly 5 novel hybrid industries, one using each strategy:

### Strategy 1: Additive Integration
Both industries work side-by-side, complementing each other. Like Uber + Eats = UberEats.
- Focus: How do A and B enhance each other when combined?
- Look for: Shared infrastructure, overlapping users, compounding value

### Strategy 2: Substitution
Replace a core component of A with B's strength. Like TV + Internet = Streaming.
- Focus: What part of A could be replaced by B's approach to create something better?
- Look for: Outdated components, bottlenecks, inefficiencies that B's approach could fix

### Strategy 3: Complementary
One fills critical gaps of the other. Like Hardware + Software ecosystems.
- Focus: What does A need that B provides (or vice versa)?
- Look for: Missing capabilities, unserved needs, ecosystem gaps

### Strategy 4: Sequential Enablement
A creates conditions that enable B. Like Smartphone enabling Mobile Apps.
- Focus: How does A create a foundation, platform, or market that B needs?
- Look for: Infrastructure, user behavior changes, data generation, network effects

### Strategy 5: Contradiction Synthesis
Resolve apparent conflicts between A and B to create a new category. Like Expensive + Cheap = Affordable Luxury.
- Focus: What seems incompatible between A and B, and how can that tension create something novel?
- Look for: Opposing values, conflicting approaches, paradoxes that could be resolved

## Output Structure (per hybrid)

```json
{
  "id": "cross-{n}",
  "type": "future",
  "name": "Clear hybrid name",
  "mutation": "What specifically enables this combination",
  "insight": "Why this combination creates exponentially more value than either alone",
  "combinationType": "Additive Integration|Substitution|Complementary|Sequential Enablement|Contradiction Synthesis",
  "synergyScore": 85,
  "noveltyFactor": 75,
  "marketFit": "Specific target audience and use case",
  "challenges": ["Challenge 1", "Challenge 2", "Challenge 3"],
  "inspirations": [
    {"source": "Industry A Name", "mechanism": "Specific element from A", "twist": "How it transforms"},
    {"source": "Industry B Name", "mechanism": "Specific element from B", "twist": "How it transforms"}
  ],
  "children": []
}
```

## Scoring Guide

- **synergyScore** (0-100): How well do A and B amplify each other? 100 = perfect symbiosis, creates something impossible alone
- **noveltyFactor** (0-100): How unique and non-obvious is this? 100 = nobody has thought of this, 0 = obvious combination

## Quality Guidelines

- Each hybrid should be GENUINELY different — not 5 variations of the same concept
- Names should be evocative and capture the hybrid nature
- Mutations should reference real enabling technologies or trends
- Challenges should be specific and realistic (2-3 per hybrid)
- At least one hybrid should have a synergyScore above 85
- At least one should have a noveltyFactor above 85
- Market fit should identify SPECIFIC user types, not generic "everyone"
