# 🚀 LeetCode Problem Tracker

A beautiful, interactive problem tracking website designed to help you master the FAANG interview problem curriculum with structured learning paths.

## Features ✨

### 📚 Comprehensive Problem Curriculum

- **9 Structured Stages** covering 92 core problems
- **Phase 2 Expansion** with additional 150+ problems for mastery
- **92 Problems** organized by difficulty and topic
- **Clear Learning Path** from foundations to advanced concepts

### 🎯 Problem Organization

- **Stage 1**: Foundations (Arrays, Hashing, Two Pointers, Sliding Window)
- **Stage 2**: Stack, Binary Search, Linked List
- **Stage 3**: Trees (FAANG Favorite Zone)
- **Stage 4**: Backtracking
- **Stage 5**: Heap / Priority Queue
- **Stage 6**: Greedy
- **Stage 7**: Dynamic Programming (CRITICAL)
- **Stage 8**: Graphs
- **Stage 9**: Advanced / FAANG Differentiators

### 💾 Smart Progress Tracking

- **Persistent Storage**: Your progress is automatically saved to browser localStorage
- **Progress Visualization**: Beautiful progress bars for overall, stage, and category levels
- **Problem Status**: Mark problems as completed with visual feedback
- **Export/Import**: Save and restore your progress as JSON files
- **Reset Functionality**: Start over whenever you need

### 🎨 Beautiful UI

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **Color-Coded Categories**: Each category has unique visual identity
- **Dark Mode Ready**: Built with Tailwind CSS for themability
- **Real-time Updates**: All changes reflect immediately

### 📊 Progress Analytics

- **Overall Progress**: Track completion percentage across all problems
- **Stage Progress**: See how far you've progressed in each stage
- **Category Breakdown**: Understand focus areas within each stage
- **Completion Stats**: Total problems, remaining, and completion percentage

### 🔗 Navigation

- **Seamless Navigation**: Switch between Comparator and Problem Tracker
- **Sticky Header**: Easy navigation always accessible
- **Scroll Progress Indicator**: Visual feedback on page position
- **Mobile Friendly**: Touch-optimized for all devices

## Tech Stack 🛠️

- **Framework**: Next.js 15+ with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Storage**: Browser localStorage (no backend required)

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000/problems](http://localhost:3000/problems) in your browser.

### Production Build

```bash
npm run build
npm start
```

## How to Use 📖

### Tracking Problems

1. **Navigate to Problems Page**: Click "📚 Problem Tracker" in the header
2. **View by Stage**: Scroll through all 9 stages and their categories
3. **Mark as Complete**: Click any problem card to toggle completion status
4. **Track Progress**: Watch the progress bars update in real-time

### Managing Progress

#### Export Progress

- Click the **Export** button in the header
- A JSON file with your progress will download
- Share with others or back up your progress

#### Import Progress

- Click the **Import** button
- Select a previously exported JSON file
- Your progress will be restored

#### Reset All

- Click the **Reset** button (⚠️ This cannot be undone)
- All progress will be cleared and categories will collapse

## Daily Routine Recommendations 📅

### Optimal Study Path

- **2 new problems/day**: Fresh learning
- **1 old revision problem**: Reinforce patterns
- **Weekly review**: Check mistakes and weak areas

### Time Guidelines

- 🟢 **Easy**: 15–20 minutes
- 🟡 **Medium**: 30–40 minutes
- 🔴 **Hard**: 45–60 minutes

### If You Get Stuck

1. Struggle for 25–30 minutes
2. Take a hint if needed
3. Re-implement the next day from memory

## Interview Readiness Checklist ✅

You're interview ready when:

- ✅ Stage 5 (Heap/Priority Queue) feels comfortable
- ✅ Trees are natural to think through
- ✅ Sliding window is automatic
- ✅ Medium problems solved in ~25 minutes
- ✅ Can explain your approach clearly

## File Structure 📁

```
src/
├── app/
│   ├── layout.tsx           # Root layout with header
│   ├── page.tsx             # Home/Comparator page
│   ├── problems/
│   │   └── page.tsx         # Main tracker page
│   └── globals.css
├── components/
│   ├── CategorySection.tsx   # Category grouping component
│   ├── ProblemCard.tsx       # Individual problem card
│   ├── StageView.tsx         # Stage section component
│   ├── Header.tsx            # Navigation header
│   ├── DomainPicker.tsx      # Domain selector
│   ├── ComparisonCard.tsx    # Comparison display
│   └── ui/
│       ├── button.tsx        # Button component with variants
│       ├── card.tsx          # Card layout component
│       └── textarea.tsx      # Text input component
└── lib/
    ├── problems.ts           # Problem data and types
    ├── api.ts                # API utilities
    └── domains.ts            # Domain types
```

## Data Structure 🗄️

Problems are organized hierarchically:

```typescript
Stage {
  number: number
  name: string
  emoji: string
  description: string
  categories: Category[]
}

Category {
  id: string
  name: string
  icon: string
  color: string
  problems: Problem[]
}

Problem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  completed: boolean
  phase: number
}
```

## Features to Try 🎮

1. **Expand/Collapse Categories**: Click category headers to toggle visibility
2. **Smooth Progress Animation**: Watch bars fill as you complete problems
3. **Export Your Progress**: Create a backup of your tracking data
4. **Mobile Responsive**: Try on different screen sizes
5. **Keyboard Navigation**: Use Tab to navigate through problems

## Browser Support 🌐

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Tips 🚀

- Progress data is stored locally - no internet required after first load
- All data stays on your device
- Instant updates with no server lag
- Smooth 60fps animations

## Tips for Success 💡

1. **Start with Stage 1**: Master patterns before advanced topics
2. **Focus on Sliding Window**: It's a game-changer for interviews
3. **Don't Rush Trees**: Spend quality time understanding tree problems
4. **Practice DP Regularly**: Dynamic programming is CRITICAL
5. **Explain Out Loud**: Always verbalize your approach
6. **Review Mistakes**: Learn from what didn't work

## Roadmap 🗺️

- [ ] Add Phase 2 expansion (150+ problems)
- [ ] Sync with cloud storage
- [ ] Difficulty tags and filtering
- [ ] Timer for problem solving
- [ ] Solution code snippets
- [ ] Community solutions
- [ ] Mobile app version

## Contributing 🤝

Want to add more problems or improve the tracker?

- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request

## License 📄

MIT License - feel free to use and modify!

## Resources 📚

### Learning Resources

- [LeetCode](https://leetcode.com/)
- [NeetCode](https://neetcode.io/)
- [Blind 75](https://techinterviewhandbook.org/grind75)
- [AlgoExpert](https://www.algoexpert.io/)

### Interview Prep

- [Tech Interview Handbook](https://techinterviewhandbook.org/)
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Coding Interview Patterns](https://www.educative.io/)

## Support 💬

- Create an issue for bugs
- Suggest improvements
- Share your success stories!

---

**Good luck with your coding interview preparation! 🎯**

Remember: Consistency beats intensity. Solve problems every day, and you'll be interview-ready in 5-6 months!
