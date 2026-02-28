# Prior Art Analysis — 5 Frameworks

This skill provides the analytical frameworks for deep strategic analysis of a need's prior art. Use when `/itropa:prior-art` is invoked.

## Trigger

Activate when performing strategic prior art analysis on a need's existing solutions.

## The 5 Frameworks

### Framework 1: Competitive Landscape

Map current solution providers and their competitive dynamics.

**Output structure:**
```json
{
  "analysisType": "competitive-landscape",
  "needName": "Need Name",
  "marketStructure": {
    "leaders": [{"name": "Leader", "strength": "Core advantage", "weakness": "Limitation", "marketShare": "Estimated %"}],
    "challengers": [{"name": "Challenger", "differentiator": "What makes them different", "growthRate": "Trend"}],
    "nichePlayers": [{"name": "Niche player", "specialization": "Specific focus"}]
  },
  "competitiveDynamics": {
    "entryBarriers": ["Barrier 1", "Barrier 2"],
    "switchingCosts": "high|medium|low",
    "differentiationFactors": ["Factor 1", "Factor 2"],
    "consolidationTrends": "Trend description"
  },
  "strategicInsight": "Key insight about competitive landscape",
  "opportunityGaps": ["Gap 1", "Gap 2"],
  "disruptionRisks": ["Risk 1", "Risk 2"]
}
```

### Framework 2: Gap Analysis

Identify unmet needs and underserved segments.

**Output structure:**
```json
{
  "analysisType": "gap-analysis",
  "needName": "Need Name",
  "identifiedGaps": [
    {
      "gapType": "Unmet need|Underserved segment|Missing feature",
      "description": "What's missing",
      "severity": "high|medium|low",
      "affectedUsers": "Who is impacted",
      "opportunitySize": "Market potential"
    }
  ],
  "rootCauses": ["Why gap exists 1", "Why gap exists 2"],
  "emergingDemands": ["Demand trend 1", "Demand trend 2"],
  "strategicInsight": "Key insight about gaps",
  "innovationOpportunities": ["Opportunity 1", "Opportunity 2"],
  "timingFactors": ["Factor 1", "Factor 2"]
}
```

### Framework 3: Evolution Pattern

Trace how solutions have evolved and predict future trajectories.

**Output structure:**
```json
{
  "analysisType": "evolution-pattern",
  "needName": "Need Name",
  "evolutionTimeline": {
    "historicalPhases": [
      {"era": "Period", "dominantSolution": "What was used", "keyCharacteristics": "How it worked", "limitations": "Why it evolved"}
    ],
    "currentState": "Description of current solutions",
    "emergingTrends": ["Trend 1", "Trend 2"]
  },
  "evolutionDrivers": ["Driver 1", "Driver 2"],
  "nextPhasePrediction": "What's likely to emerge next",
  "strategicInsight": "Key insight about evolution",
  "disruptionIndicators": ["Indicator 1", "Indicator 2"],
  "continuityFactors": ["What will persist"]
}
```

### Framework 4: Innovation Potential

Assess opportunity for novel approaches and breakthroughs.

**Output structure:**
```json
{
  "analysisType": "innovation-potential",
  "needName": "Need Name",
  "innovationOpportunities": [
    {
      "opportunityType": "Breakthrough|Incremental|Architectural",
      "description": "Innovation possibility",
      "noveltyScore": 85,
      "feasibilityScore": 70,
      "impactPotential": "high|medium|low",
      "requiredCapabilities": ["Capability 1", "Capability 2"]
    }
  ],
  "whiteSpaceAreas": ["Unexplored area 1", "Unexplored area 2"],
  "crossPollinationPotential": ["Idea from adjacent domain 1"],
  "strategicInsight": "Key insight about innovation potential",
  "investmentPriorities": ["Priority 1", "Priority 2"],
  "riskFactors": ["Risk 1", "Risk 2"]
}
```

### Framework 5: Strategic Positioning

Identify optimal positioning strategies for new entrants.

**Output structure:**
```json
{
  "analysisType": "strategic-positioning",
  "needName": "Need Name",
  "positioningOptions": [
    {
      "strategy": "Low-cost|Differentiation|Niche focus",
      "rationale": "Why this works",
      "targetSegment": "Who to serve",
      "valueProposition": "Unique value",
      "competitiveAdvantage": "Source of advantage",
      "risks": ["Risk 1", "Risk 2"]
    }
  ],
  "blueOceanOpportunities": ["Low-competition opportunity 1"],
  "firstMoverAdvantages": ["Advantage 1"],
  "strategicInsight": "Key insight about positioning",
  "successFactors": ["Factor 1", "Factor 2"],
  "avoidableTraps": ["Trap 1", "Trap 2"]
}
```

## Quality Guidelines

- Use the need's prior art data (from `need.json`) as input context for all frameworks
- Be specific with market estimates and player names — use real companies where possible
- Gap analysis should identify ACTIONABLE gaps, not theoretical ones
- Evolution patterns should connect to the industry tree's future predictions
- Strategic positioning should be relevant to the builder's profile
