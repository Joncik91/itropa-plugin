# Mechanism Analysis — 5 Frameworks

This skill provides the analytical frameworks for extracting transferable mechanisms from future industries. Use these frameworks when the `/itropa:mechanisms` command is invoked.

## Trigger

Activate when performing mechanism extraction analysis on an industry expression.

## The 5 Frameworks

For each industry, run ALL 5 frameworks to produce a comprehensive mechanism analysis.

### Framework 1: Functional Decomposition

Analyze the industry by breaking it down into 3-5 core functions/principles. Focus on WHAT it does and WHY each function is essential.

**Output structure:**
```json
{
  "analysisType": "functional",
  "coreMechanism": "Primary mechanism in 1 sentence",
  "abstractPattern": "Highest-level pattern abstracted from this mechanism",
  "keyPrinciples": [
    {"principle": "Core principle", "function": "What it does", "criticality": "Why it's essential"}
  ],
  "historicalApplications": [
    {"domain": "Field", "example": "Concrete example", "era": "Period", "successFactors": "Why it worked", "limitations": "Why it couldn't expand", "evolutionPath": "How it developed"}
  ],
  "untappedDomains": [
    {"domain": "Unexplored field", "opportunity": "How to apply", "novelty": "What's new", "transferBarriers": "What makes it hard", "requiredAdaptations": "What must change", "impactPotential": "high|medium|low"}
  ],
  "combinationPotential": ["Compatible mechanism 1", "Compatible mechanism 2"],
  "transferPotential": 75,
  "abstractionLevel": "high|medium|low",
  "maturityScore": 80,
  "complexityRating": "high|medium|low",
  "universality": "broad|moderate|narrow",
  "disruptionPotential": "high|medium|low"
}
```

### Framework 2: Structural Analysis

Identify 3-5 key components, relationships, and flows. Focus on HOW elements interact.

**Output structure:**
```json
{
  "analysisType": "structural",
  "coreMechanism": "Primary mechanism in 1 sentence",
  "abstractPattern": "Structural pattern at highest abstraction",
  "structuralElements": [
    {"element": "Component", "role": "Its function", "interactions": "How it connects to others"}
  ],
  "historicalApplications": [
    {"domain": "Field", "example": "Example", "era": "Period", "successFactors": "Why structure worked", "limitations": "Structural weaknesses", "evolutionPath": "How structure evolved"}
  ],
  "untappedDomains": [
    {"domain": "Field", "opportunity": "How structure applies", "novelty": "Unique structural insight", "transferBarriers": "Structural incompatibilities", "requiredAdaptations": "How to adapt structure", "impactPotential": "high|medium|low"}
  ],
  "combinationPotential": ["Complementary structure 1"],
  "transferPotential": 70,
  "abstractionLevel": "medium",
  "maturityScore": 75,
  "complexityRating": "medium",
  "universality": "moderate",
  "disruptionPotential": "medium"
}
```

### Framework 3: Causal Chain Mapping

Map cause-effect sequence from input to output. Identify critical intervention points.

**Output structure:**
```json
{
  "analysisType": "causal",
  "coreMechanism": "Primary mechanism in 1 sentence",
  "abstractPattern": "Causal pattern at highest abstraction",
  "causalChain": {
    "trigger": "What initiates the process",
    "sequence": ["Step 1: cause → effect", "Step 2: cause → effect"],
    "outcome": "Final result",
    "interventionPoints": ["Where to intervene 1", "Where to intervene 2"]
  },
  "historicalApplications": [
    {"domain": "Field", "example": "Example", "era": "Period", "successFactors": "Why chain worked", "limitations": "Where chain broke", "evolutionPath": "How chain was refined"}
  ],
  "untappedDomains": [
    {"domain": "Field", "opportunity": "How causal chain applies", "novelty": "New causal insight", "transferBarriers": "What breaks chain", "requiredAdaptations": "How to maintain causality", "impactPotential": "high|medium|low"}
  ],
  "combinationPotential": ["Sequential mechanism 1"],
  "transferPotential": 65,
  "abstractionLevel": "medium",
  "maturityScore": 70,
  "complexityRating": "high",
  "universality": "moderate",
  "disruptionPotential": "medium"
}
```

### Framework 4: Constraint-Opportunity

Identify what limitations/constraints actually ENABLE new opportunities (the judo principle — using limitations as leverage).

**Output structure:**
```json
{
  "analysisType": "constraint-opportunity",
  "coreMechanism": "Primary mechanism in 1 sentence",
  "abstractPattern": "Constraint-opportunity pattern at highest abstraction",
  "constraintOpportunities": [
    {"constraint": "Limitation", "opportunity": "What it enables", "application": "How to exploit this"}
  ],
  "historicalApplications": [
    {"domain": "Field", "example": "Example", "era": "Period", "successFactors": "Which constraints enabled success", "limitations": "Constraints not overcome", "evolutionPath": "How constraints were leveraged"}
  ],
  "untappedDomains": [
    {"domain": "Field", "opportunity": "How constraints create opportunity", "novelty": "Unexpected leverage", "transferBarriers": "Missing constraints", "requiredAdaptations": "How to create/use constraints", "impactPotential": "high|medium|low"}
  ],
  "combinationPotential": ["Constraint-based mechanism 1"],
  "transferPotential": 60,
  "abstractionLevel": "high",
  "maturityScore": 65,
  "complexityRating": "high",
  "universality": "narrow",
  "disruptionPotential": "high"
}
```

### Framework 5: Scale-Context Transfer

Explain how the mechanism behaves at micro/meso/macro scales and across different contexts.

**Output structure:**
```json
{
  "analysisType": "scale-context",
  "coreMechanism": "Primary mechanism in 1 sentence",
  "abstractPattern": "Scale-invariant pattern at highest abstraction",
  "scaleContextInsights": {
    "microScale": "How mechanism works at individual/small scale",
    "mesoScale": "How mechanism works at organizational/medium scale",
    "macroScale": "How mechanism works at industry/large scale",
    "contextVariations": ["Variation 1", "Variation 2", "Variation 3"]
  },
  "historicalApplications": [
    {"domain": "Field", "example": "Example", "era": "Period", "successFactors": "Which scale/context worked", "limitations": "Scale/context boundaries", "evolutionPath": "How it scaled"}
  ],
  "untappedDomains": [
    {"domain": "Field", "opportunity": "How to apply at different scale/context", "novelty": "New scale insight", "transferBarriers": "Scale incompatibilities", "requiredAdaptations": "How to adapt to new scale", "impactPotential": "high|medium|low"}
  ],
  "combinationPotential": ["Scale-complementary mechanism 1"],
  "transferPotential": 80,
  "abstractionLevel": "high",
  "maturityScore": 85,
  "complexityRating": "low",
  "universality": "broad",
  "disruptionPotential": "high"
}
```

## Analysis Quality Guidelines

- **historicalApplications**: Provide 2-3 REAL historical examples per framework. These should be concrete, verifiable examples.
- **untappedDomains**: Provide 2-3 genuinely unexplored fields. Be creative but realistic.
- **Scoring**: Use the full 0-100 range meaningfully. Not everything is 75.
- **abstractPattern**: This should be the MOST transferable version of the mechanism — something that could apply to completely different domains.
- **coreMechanism**: Should be specific to THIS industry, not generic.
