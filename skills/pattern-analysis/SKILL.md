---
user-invocable: false
---

# Pattern Analysis — 5 Frameworks

This skill provides the analytical frameworks for analyzing patterns that appear across multiple needs and industries. Used conversationally when the user asks to find patterns across research.

## Trigger

Activate when performing cross-need pattern analysis.

## Context Building

Before analysis, gather all mechanism data across needs to find instances of the pattern:
- Read all `mechanisms.json` files across all needs
- Extract instances where the pattern appears (matching by coreMechanism, abstractPattern, or keyPrinciples)
- Build a context of pattern instances: `- "ExpressionName" (NeedName): coreMechanism`

## The 5 Frameworks

### Framework 1: Frequency & Distribution

Map where this pattern appears and identify concentration zones.

**Output structure:**
```json
{
  "analysisType": "frequency-distribution",
  "patternName": "Pattern Name",
  "abstractDescription": "High-level pattern description",
  "occurrenceCount": 5,
  "distributionMap": {
    "needs": [{"needName": "Need", "count": 3, "dominance": 75}],
    "industries": [{"industryName": "Industry", "context": "How pattern manifests"}],
    "hotZones": ["Needs with high concentration"],
    "coldZones": ["Underutilized needs"],
    "densityScore": 65
  },
  "strengthScore": 75,
  "universalityScore": 80,
  "maturityLevel": 70,
  "adoptionRate": 65,
  "needCoverage": "broad|moderate|narrow",
  "stabilityRating": "stable|evolving|emerging",
  "combinationAffinity": "high|medium|low",
  "transferReadiness": "high|medium|low",
  "keyInsight": "Main insight about distribution",
  "strategicImplications": ["Implication 1"],
  "risks": ["Risk 1"]
}
```

### Framework 2: Need-Mapping

Examine HOW this pattern serves different human needs.

**Output structure:**
```json
{
  "analysisType": "need-mapping",
  "patternName": "Pattern Name",
  "abstractDescription": "High-level description",
  "occurrenceCount": 5,
  "needAdaptations": [
    {
      "needName": "Need",
      "adaptation": "How pattern serves this need",
      "effectiveness": "high|medium|low",
      "uniqueCharacteristics": "What makes it unique here",
      "examples": ["Example 1"]
    }
  ],
  "strengthScore": 70,
  "universalityScore": 85,
  "keyInsight": "Key insight about versatility",
  "strategicImplications": ["Implication 1"]
}
```

### Framework 3: Evolution Trajectory

Trace how this pattern has evolved and predict its next stage.

**Output structure:**
```json
{
  "analysisType": "evolution-trajectory",
  "patternName": "Pattern Name",
  "abstractDescription": "High-level description",
  "occurrenceCount": 5,
  "evolutionStages": {
    "earlyAdopters": [{"industry": "Pioneer", "innovation": "What they innovated", "era": "Period"}],
    "mainstreamPhase": {"description": "How it became mainstream", "timeframe": "When", "catalysts": ["Catalyst"]},
    "maturityIndicators": ["Indicator 1"],
    "nextEvolution": "Predicted next stage",
    "evolutionSpeed": "slow|moderate|rapid"
  },
  "keyInsight": "Key insight about evolution",
  "strategicImplications": ["Implication 1"]
}
```

### Framework 4: Combination Synergies

Identify which other patterns work well (or poorly) with this one.

**Output structure:**
```json
{
  "analysisType": "combination-synergies",
  "patternName": "Pattern Name",
  "abstractDescription": "High-level description",
  "occurrenceCount": 5,
  "synergyPatterns": {
    "strongPairings": [{"pattern": "Compatible pattern", "synergyType": "Type", "benefit": "What combining achieves", "examples": ["Example"]}],
    "antiPatterns": [{"pattern": "Conflicting pattern", "conflict": "Why they conflict", "mitigation": "How to resolve"}],
    "optimalStacks": [{"stackName": "Stack", "patterns": ["P1", "P2"], "useCase": "Best use case"}],
    "coOccurrenceRate": 70
  },
  "keyInsight": "Key insight about combinations",
  "strategicImplications": ["Implication 1"]
}
```

### Framework 5: Transfer Potential

Evaluate how easily this pattern can be transferred to new domains.

**Output structure:**
```json
{
  "analysisType": "transfer-potential",
  "patternName": "Pattern Name",
  "abstractDescription": "High-level description",
  "occurrenceCount": 5,
  "transferMetrics": {
    "abstractionLevel": "high|medium|low",
    "dependencyComplexity": "high|medium|low",
    "contextSensitivity": "high|medium|low",
    "transferBarriers": ["Barrier 1"],
    "successFactors": ["Factor 1"]
  },
  "promisingDomains": [
    {"domain": "Target domain", "transferFit": 85, "adaptationsNeeded": ["Adaptation"], "expectedImpact": "high|medium|low", "pioneersNeeded": "What expertise"}
  ],
  "keyInsight": "Key insight about transferability",
  "strategicImplications": ["Implication 1"]
}
```

## Quality Guidelines

- Pattern analysis requires data from MULTIPLE needs — if only one need exists, note this limitation
- Frequency counts should be based on actual occurrences in the research data
- Evolution trajectories should cite real historical examples
- Transfer targets should be specific and actionable
- Combination synergies should reference other patterns found in the data
