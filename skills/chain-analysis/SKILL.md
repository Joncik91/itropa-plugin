# Chain Analysis — 5 Frameworks

This skill provides the analytical frameworks for analyzing the inspiration chains behind innovations. Use when `/itropa:chains` is invoked.

## Trigger

Activate when performing inspiration chain analysis on an industry expression.

## Context Building

Before analysis, build the chain context from the target expression:
- Read the expression's `inspirations` array (direct ancestors)
- Read sibling expressions in the same era (related context)
- Read any children (descendants)

Format as:
```
TARGET INNOVATION: "Industry Name"
Enabler: mutation text
Core Insight: insight text

DIRECT INSPIRATIONS:
- Source1: mechanism (twist: how adapted)
- Source2: mechanism (twist: how adapted)

AVAILABLE CONTEXT (N related expressions for deeper analysis)
```

## The 5 Frameworks

### Framework 1: Lineage Tracing

Map the complete genealogy of ideas that led to this innovation.

**Output structure:**
```json
{
  "analysisType": "lineage-tracing",
  "targetInnovation": "Industry Name",
  "genealogy": {
    "directAncestors": [
      {"source": "Immediate inspiration", "contribution": "What it provided", "era": "When it emerged"}
    ],
    "indirectInfluences": [
      {"source": "Earlier influence", "connection": "How it connects", "degree": "1st|2nd|3rd generation"}
    ],
    "foundationalConcepts": ["Core concept 1", "Core concept 2"]
  },
  "lineageDepth": 3,
  "branchingFactor": 2,
  "strategicInsight": "Key insight about lineage",
  "heritageStrength": 75,
  "noveltyRatio": 25
}
```

### Framework 2: Influence Mapping

Identify which prior innovations had the strongest influence and how.

**Output structure:**
```json
{
  "analysisType": "influence-mapping",
  "targetInnovation": "Industry Name",
  "influenceNetwork": {
    "primaryInfluences": [
      {
        "source": "Key inspiration",
        "influenceType": "Conceptual|Technical|Structural|Market",
        "strength": 85,
        "mechanism": "What was borrowed",
        "transformation": "How it was adapted"
      }
    ],
    "secondaryInfluences": [
      {"source": "Supporting inspiration", "influenceType": "Type", "strength": 40, "role": "Supporting role"}
    ],
    "crossDomainBorrowing": ["Idea from domain X"]
  },
  "totalInfluenceScore": 80,
  "originalityScore": 70,
  "strategicInsight": "Key insight about influence",
  "dominantInfluenceType": "Conceptual|Technical|Structural|Market",
  "innovationMechanism": "How influences were combined"
}
```

### Framework 3: Divergence Patterns

Identify where this innovation deviates from its inspirations and why.

**Output structure:**
```json
{
  "analysisType": "divergence-patterns",
  "targetInnovation": "Industry Name",
  "keyDivergences": [
    {
      "aspect": "What changed",
      "fromPattern": "Original approach",
      "toPattern": "New approach",
      "divergenceType": "Substitution|Addition|Removal|Transformation",
      "rationale": "Why the change",
      "impact": "Effect of divergence"
    }
  ],
  "divergenceScore": 65,
  "continuityScore": 35,
  "strategicInsight": "Key insight about divergence",
  "breakingPoints": ["Where it breaks tradition 1"],
  "retainedCore": ["What stayed the same 1"]
}
```

### Framework 4: Innovation Velocity

Measure the pace of change and evolution in this innovation chain.

**Output structure:**
```json
{
  "analysisType": "innovation-velocity",
  "targetInnovation": "Industry Name",
  "velocityMetrics": {
    "generationGap": "Time between major innovation cycles",
    "accelerationTrend": "Speeding up|Slowing down|Steady",
    "breakthroughFrequency": "How often major shifts occur",
    "incrementalPace": "Rate of small improvements"
  },
  "velocityDrivers": ["What accelerates change 1"],
  "frictionFactors": ["What slows change 1"],
  "velocityScore": 75,
  "momentumIndicator": "high|medium|low",
  "strategicInsight": "Key insight about velocity",
  "futureTrajectory": "Predicted pace of evolution",
  "disruptionRisk": "high|medium|low"
}
```

### Framework 5: Coherence Assessment

Evaluate how well the innovation integrates its various inspirations.

**Output structure:**
```json
{
  "analysisType": "coherence-assessment",
  "targetInnovation": "Industry Name",
  "coherenceMetrics": {
    "integrationQuality": "How well components fit together",
    "internalConsistency": "Degree of logical consistency",
    "purposeAlignment": "How well it serves stated goal",
    "contradictionResolution": "How conflicting elements are resolved"
  },
  "coherenceStrengths": ["Strong point 1"],
  "coherenceWeaknesses": ["Weak point 1"],
  "coherenceScore": 80,
  "synthesisQuality": "high|medium|low",
  "strategicInsight": "Key insight about coherence",
  "stabilityImplications": "How coherence affects long-term viability",
  "improvementOpportunities": ["How to increase coherence 1"]
}
```

## Quality Guidelines

- Lineage tracing should go AT LEAST 2-3 generations back, even if speculative
- Influence mapping should distinguish between conceptual, technical, structural, and market influences
- Divergence patterns should identify what's truly NOVEL vs. what's borrowed
- Velocity analysis should reference real-world technology acceleration patterns
- Coherence assessment should be honest about weaknesses — innovations rarely score 100
