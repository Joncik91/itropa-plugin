---
user-invocable: false
---

# Business Analysis — Deep Dive + App Concepts

This skill provides the analytical frameworks for business analysis, opportunity scoring, and product concept generation. Used by Phase 6 (Deep Dive) and Phase 7 (App Concepts) of `/itropa:go`, or conversationally when the user asks for business analysis or product concepts.

## Trigger

Activate when performing business analysis, opportunity scoring, or app concept generation.

## Deep Dive Analysis Framework

Produce a comprehensive business analysis with personalized scoring based on the builder's constraints profile (from `constraints.json`).

### Output Structure

```json
{
  "marketOpportunity": "Detailed market size, growth trajectory ($X billion by year Y, growing at Z% CAGR)",
  "keyEnablers": ["Technology/trend 1", "Technology/trend 2", "Social/economic factor 3"],
  "challenges": [
    {"challenge": "Major barrier", "potentialSolution": "How to overcome it"}
  ],
  "timeline": "Detailed timeline: Early adopters (X years), mainstream (Y years), maturity (Z years)",
  "firstMoverAdvantage": "Specific early-entry strategies",
  "priorArtLeverage": "How to use insights from prior art for competitive edge",
  "keyPlayers": ["Potential company/startup 1", "Company 2", "Company 3"],
  "risks": ["Risk factor 1", "Risk factor 2", "Risk factor 3"],
  "opportunityScore": {
    "marketTiming": 75,
    "technicalFit": 80,
    "effortEstimate": 60,
    "monetizationClarity": 70,
    "competitionDensity": 65,
    "overallScore": 70
  },
  "soloDevAssessment": {
    "feasibility": "high|medium|low",
    "timeToMVP": "2-4 weeks",
    "techStack": ["React", "Node.js", "Specific API"],
    "biggestChallenge": "The main obstacle for a solo dev",
    "unfairAdvantage": "What edge a solo dev could have"
  },
  "monetizationModels": [
    {
      "model": "SaaS Subscription",
      "description": "Monthly recurring fee for access",
      "revenueRange": "$500-2000/mo at 50-200 users",
      "difficulty": "easy|medium|hard"
    }
  ],
  "buildRecommendation": {
    "verdict": "build|explore|skip",
    "confidence": 75,
    "reasoning": "Clear explanation based on builder profile",
    "nextStep": "Specific actionable next step"
  }
}
```

### Scoring Guide

- **marketTiming**: 100 = perfect window right now, 0 = too early or too late
- **technicalFit**: 100 = perfectly matches builder's tech stack, 0 = requires completely new skills
- **effortEstimate**: 100 = weekend project, 0 = multi-year enterprise effort
- **monetizationClarity**: 100 = obvious payment model, 0 = unclear how to charge
- **competitionDensity**: 100 = wide open blue ocean, 0 = dominated by giants
- **overallScore**: Weighted average favoring technicalFit and effortEstimate for solo dev

### Build Verdict Guide

- **"build"**: Strong fit for this builder, clear path, actionable — go for it
- **"explore"**: Promising but needs validation or has significant uncertainties
- **"skip"**: Poor fit for THIS builder profile (not necessarily a bad opportunity overall)

### Builder Profile Integration

Read the builder's constraints from `constraints.json` and format as context:

```
Builder Profile (for personalized assessment):
- Tech Stack: {techStack}
- Experience Level: {experienceLevel}
- AI API Access: {hasAIAccess}
- Available Time: {availableTime}
- Work Style: {workStyle}
- Revenue Goal: {revenueGoal} (target: {targetMRR})
- Preferred Products: {preferredFormFactors}
- Target Market: {B2B/B2C}
- Risk Tolerance: {riskTolerance}
- Avoid Categories: {avoidCategories}
```

## App Concept Generation Framework

Generate 5 diverse product concepts based on an industry, personalized to the builder profile.

### Output Structure

```json
{
  "concepts": [
    {
      "id": "concept-1",
      "name": "Creative product name",
      "tagline": "One-liner pitch (max 10 words)",
      "formFactor": "saas|tool|api|marketplace|extension|mobile",
      "targetUser": "Specific user persona",
      "problemSolved": "The ONE problem this solves",
      "coreFeature": "The ONE killer feature",
      "monetization": {
        "model": "Freemium SaaS|Usage-based|One-time|Marketplace fees",
        "pricing": "$X/mo or $X one-time",
        "revenueEstimate": "$X-Xk MRR at X users"
      },
      "techStack": ["React", "Node.js", "Specific API/DB"],
      "mvpScope": "What the SMALLEST viable version includes",
      "effortEstimate": "weekend|1-2 weeks|2-4 weeks|1-2 months|3+ months",
      "competitiveEdge": "Why this wins against alternatives",
      "risks": ["Risk 1", "Risk 2"],
      "score": 75
    }
  ]
}
```

### Scoring Criteria (0-100)

- Technical feasibility for solo dev (weight: 30%)
- Market timing and opportunity (weight: 25%)
- Monetization clarity (weight: 20%)
- Competitive positioning (weight: 15%)
- Effort vs potential return (weight: 10%)

### Concept Generation Rules

- Generate DIVERSE form factors — prioritize builder's preferred types but include variety
- Each concept must be ACTIONABLE — something a solo dev could start building TODAY
- Effort estimates must be REALISTIC for one person
- Scores reflect THIS builder's profile, not general market opportunity
- Include at least one "quick win" (weekend-2 weeks) and one "ambitious bet" (1-2 months)
- Names should be memorable and domain-available-sounding
- If a deep dive is available, use its market intelligence to inform concepts
