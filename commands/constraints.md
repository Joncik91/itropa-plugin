# /itropa:constraints — Builder Profile Setup

Interactively configure the builder's profile for personalized analysis.

## What to do

1. **Read the current profile** from `constraints.json`. If it doesn't exist, use defaults.

2. **Show the current profile** to the user in a readable format:
   ```
   Current Builder Profile:
   ─────────────────────────
   Tech Stack:       React, TypeScript, Node.js
   Experience:       intermediate
   AI API Access:    Yes
   Available Time:   2-4 weeks
   Work Style:       side-project
   Revenue Goal:     side-income
   Target MRR:       (not set)
   Form Factors:     saas, tool, api
   Target Market:    B2B & B2C
   Risk Tolerance:   medium
   Avoid Categories: (none)
   ```

3. **Ask the user what they want to update.** They can:
   - Update individual fields (e.g., "change tech stack to Python, FastAPI, React")
   - Set everything at once by describing themselves
   - Keep current settings

4. **For each field, valid values are:**
   - `techStack`: Array of strings (any technologies)
   - `experienceLevel`: "beginner" | "intermediate" | "advanced"
   - `hasAIAccess`: true | false
   - `availableTime`: "weekend" | "1-2 weeks" | "2-4 weeks" | "1-2 months" | "unlimited"
   - `workStyle`: "side-project" | "full-time" | "exploring"
   - `revenueGoal`: "learning" | "side-income" | "replace-salary" | "build-business"
   - `targetMRR`: String like "$1-5k" (optional)
   - `preferredFormFactors`: Array from: "saas", "tool", "api", "marketplace", "extension", "mobile"
   - `avoidCategories`: Array of strings (any categories to avoid)
   - `preferB2B`: true | false
   - `preferB2C`: true | false
   - `riskTolerance`: "low" | "medium" | "high"

5. **Save the updated profile** to `constraints.json` with `lastUpdated` set to current ISO timestamp.

6. **Confirm the changes** by showing the updated profile.

## Important

- The builder profile affects ALL business analysis: deep dives, app concepts, and scoring are personalized to this profile.
- If the user describes themselves naturally (e.g., "I'm a senior Python dev, working full-time, want to build a SaaS business"), interpret and map to the correct fields.
- Always validate values before saving — use the enum options listed above.
