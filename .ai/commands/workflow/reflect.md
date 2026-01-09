---
name: "REFLECT - Review and Retrospective"
description: "Conduct retrospective analysis, document lessons learned, and update project knowledge"
phase: "review"
prerequisites: ["completed implementation tasks", "progress.md"]
creates: ["retrospective report", "updated Memory Bank", "improvement plan"]
tools:
  cursor:
    trigger: "/reflect"
    description: "REFLECT MODE - Task review and retrospective"
  claude-code:
    trigger: ["reflect", "retrospective", "review progress", "lessons learned"]
    description: "Review our accomplishments and learn from the experience"
  gemini-cli:
    trigger: "gemini reflect"
    description: "Conduct project retrospective and documentation"
---

# 🪞 REFLECT MODE - Retrospective and Knowledge Capture

## Objective
Analyze completed work, capture lessons learned, identify improvements, and update project knowledge to enhance future development cycles.

## Process

### 1. Implementation Review
- **Goal Achievement**: Assess how well objectives were met
- **Quality Assessment**: Review code quality, testing, and documentation
- **Performance Analysis**: Evaluate technical performance and efficiency
- **Timeline Review**: Compare planned vs actual delivery times

### 2. Process Evaluation
- **Workflow Effectiveness**: How well did the development process work?
- **Tool Performance**: Were the chosen tools and technologies effective?
- **Communication Quality**: How well did team coordination function?
- **Decision Quality**: Were technical decisions sound and well-executed?

### 3. Lessons Learned Capture
- **What Worked Well**: Successful practices and decisions to repeat
- **What Could Improve**: Areas for enhancement in future iterations
- **Unexpected Discoveries**: Surprising learnings and insights
- **Knowledge Gaps**: Areas where more expertise is needed

### 4. Knowledge Base Update
- **Memory Bank Updates**: Update project context with current state
- **Documentation Improvements**: Enhance documentation based on experience
- **Best Practices**: Document new patterns and approaches discovered
- **Technical Debt**: Identify and plan technical debt reduction

## Retrospective Framework

### Sprint Retrospective Template
```markdown
# Sprint Retrospective - [Date]

## Sprint Overview
**Goals**: What we aimed to accomplish
**Duration**: Start and end dates
**Team**: Who participated
**Achievements**: What we actually completed

## What Went Well? 🎉
- Specific successes and positive outcomes
- Effective tools, processes, or decisions
- Team collaboration highlights
- Technical achievements

## What Could Be Improved? 🔧
- Challenges and pain points encountered
- Process inefficiencies
- Technical difficulties
- Communication gaps

## What Did We Learn? 🧠
- New technical knowledge gained
- Process insights discovered
- Tool or framework learnings
- Industry best practice confirmations

## Action Items 📋
- [ ] Specific improvements to implement next sprint
- [ ] Technical debt to address
- [ ] Process changes to try
- [ ] Learning goals for team members

## Metrics 📊
- **Velocity**: Story points completed vs planned
- **Quality**: Bug count, test coverage, code review feedback
- **Efficiency**: Time spent on different activities
- **Satisfaction**: Team satisfaction ratings (1-5)
```

### Technical Review Template
```markdown
# Technical Review - [Feature/Module]

## Architecture Assessment
**Design Quality**: How well did the architecture serve the requirements?
**Scalability**: Will this design scale with future needs?
**Maintainability**: How easy will this code be to maintain?
**Security**: Are there security concerns or improvements needed?

## Code Quality Analysis
- **Readability**: Is the code self-documenting and clear?
- **Testing**: Is test coverage adequate and meaningful?
- **Performance**: Any performance issues or optimizations needed?
- **Standards**: Does code follow established conventions?

## Technology Choices
**Framework/Library Decisions**: Were technology choices effective?
**Tool Performance**: How well did development tools serve the project?
**Integration Challenges**: Any unexpected integration difficulties?
**Future Considerations**: What would we do differently?

## Technical Debt Assessment
- **Immediate Issues**: Critical technical debt requiring quick resolution
- **Medium-term Concerns**: Important improvements for next major release
- **Long-term Considerations**: Architectural improvements for future

## Recommendations
- **Keep Doing**: Effective practices to continue
- **Start Doing**: New practices to implement
- **Stop Doing**: Ineffective practices to eliminate
```

## Knowledge Base Updates

### activeContext.md Update
```markdown
# Active Context Update

## Current Phase
**REFLECT** → [Next Phase]

## Recent Achievements
- [List major accomplishments from implementation]
- [Key milestones reached]
- [Problems solved]

## Lessons Learned
- [Technical insights gained]
- [Process improvements identified]
- [Team collaboration learnings]

## Current Challenges
- [Ongoing technical challenges]
- [Process improvement needs]
- [Resource or skill gaps]

## Next Focus Areas
- [Priority items for next iteration]
- [Technical debt to address]
- [Process improvements to implement]

**Last Updated**: [Date]
**Phase Transition**: REFLECT → [ARCHIVE/VAN/PLAN]
```

### tasks.md Retrospective Update
```markdown
## Sprint Retrospective Summary

### 📊 Sprint Metrics
- **Planned Story Points**: 20
- **Completed Story Points**: 18 (90%)
- **Bugs Found**: 3 (2 critical, 1 minor)
- **Test Coverage**: 87% (target: 80%)

### 🎯 Goal Achievement
- [x] Primary Goal: User authentication system ✅
- [x] Secondary Goal: Database setup ✅
- [ ] Stretch Goal: Email integration ⏸️ (moved to next sprint)

### 🔄 Process Improvements for Next Sprint
- **Start**: Daily standups at 9 AM
- **Continue**: Code review within 24 hours
- **Stop**: Last-minute requirement changes
```

## Reflection Techniques

### 5 Whys Analysis
For significant issues encountered:
```
Problem: Authentication bugs in production

Why? → JWT tokens were expiring too quickly
Why? → Token expiration was set to 15 minutes
Why? → We copied configuration from another project
Why? → We didn't review the security requirements
Why? → Security review wasn't part of our process

Root Cause: Missing security review process
Action: Add security review checkpoint to workflow
```

### Plus/Delta Analysis
```markdown
## Plus (Keep Doing)
+ Automated testing caught 5 bugs before production
+ Code review process improved code quality significantly
+ Daily standups kept team aligned on priorities

## Delta (Change/Improve)
Δ Need better estimate accuracy (actual time was 30% more than estimated)
Δ Documentation should be updated during development, not after
Δ Need automated deployment pipeline to reduce manual deployment time
```

### Mad/Sad/Glad Retrospective
```markdown
## Mad 😠
- Spent 2 days debugging an issue that proper logging would have prevented
- Last-minute requirement changes disrupted planned work

## Sad 😢
- Didn't have time to implement the bonus feature we were excited about
- Code review backlog caused delays near sprint end

## Glad 😊
- New testing framework significantly improved our confidence
- Team collaboration was excellent throughout the sprint
- Delivered core functionality ahead of schedule
```

## Success Metrics

### Retrospective Quality Indicators
- [ ] **Honest Assessment**: Team feels safe to share real feedback
- [ ] **Actionable Insights**: Specific improvements identified
- [ ] **Knowledge Captured**: Lessons documented for future reference
- [ ] **Process Evolution**: Workflow improvements planned and implemented
- [ ] **Technical Growth**: Team technical skills and knowledge expanded

### Knowledge Base Quality
- [ ] **Current State**: Memory Bank reflects actual project status
- [ ] **Decision Record**: Key decisions and rationale documented
- [ ] **Best Practices**: Successful patterns captured for reuse
- [ ] **Learning Documentation**: New knowledge accessible to team
- [ ] **Improvement Plan**: Clear actions for next iteration

## Anti-Patterns to Avoid

### Retrospective Anti-Patterns
- **Blame Game**: Focus on systems and processes, not individual blame
- **Same Issues, No Action**: Don't repeatedly identify issues without addressing them
- **Positivity Theater**: Balance appreciation with honest improvement discussion
- **Analysis Paralysis**: Don't over-analyze; focus on actionable insights

### Knowledge Capture Issues
- **Information Dumping**: Organize insights meaningfully
- **Detail Overload**: Capture key learnings, not everything
- **Stale Documentation**: Keep information current and relevant
- **Inaccessible Knowledge**: Make learnings findable and usable

## Next Steps

### Immediate Actions
1. **Update Memory Bank**: Refresh all context files with current state
2. **Share Learnings**: Communicate insights to broader team/organization
3. **Plan Improvements**: Schedule specific improvement actions
4. **Prepare for Next Phase**: Transition to `/archive` or new `/van` cycle

### Long-term Knowledge Management
1. **Pattern Library**: Build reusable solution patterns
2. **Mentoring Material**: Create learning resources for new team members
3. **Process Refinement**: Continuously evolve development practices
4. **Industry Sharing**: Consider sharing insights with broader developer community

---

## Tool-Specific Usage

### Cursor
```
/reflect
```

### Claude Code
```
"Let's conduct a retrospective on our recent work and capture the lessons learned"
```

### Gemini CLI
```
gemini reflect
```

---

> **REFLECT MODE activated. Conducting retrospective analysis and capturing knowledge...**