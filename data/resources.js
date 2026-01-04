// Resource Library - Educational articles and tips
const ResourceLibrary = {
    categories: [
        { id: 'budgeting', name: 'Budgeting', icon: '💵', color: '#8b5cf6' },
        { id: 'saving', name: 'Saving', icon: '🏦', color: '#06b6d4' },
        { id: 'earning', name: 'Earning', icon: '💼', color: '#10b981' },
        { id: 'credit', name: 'Credit & Debt', icon: '💳', color: '#ec4899' },
        { id: 'investing', name: 'Investing', icon: '📈', color: '#f59e0b' }
    ],

    articles: [
        // BUDGETING
        {
            id: 'budget_basics',
            category: 'budgeting',
            title: 'What is a Budget?',
            summary: 'Learn the basics of creating and following a budget',
            readTime: 3,
            content: `A budget is like a roadmap for your money. It helps you plan where your money should go instead of wondering where it went!

**Why Budget?**
• Know exactly where your money is going
• Save for things you really want
• Avoid running out of money
• Reduce money stress

**Simple Budgeting Steps:**
1. **Track your income** - How much money do you get (allowance, gifts, part-time job)?
2. **List your expenses** - What do you spend money on?
3. **Categorize** - Group expenses into needs (required) and wants (optional)
4. **Set limits** - Decide how much to spend in each category
5. **Review regularly** - Check weekly to stay on track

**Example Budget:**
If you get $50/month:
• Savings: $20 (40%)
• Needs: $10 (20%)
• Wants: $20 (40%)

Remember: A budget isn't about restricting fun - it's about making sure you can afford the things you value most!`
        },
        {
            id: 'needs_vs_wants',
            category: 'budgeting',
            title: 'Needs vs. Wants',
            summary: 'Understanding the difference between needs and wants',
            readTime: 2,
            content: `Learning to tell the difference between needs and wants is one of the most important money skills!

**What are NEEDS?**
Things you must have to live:
• Food and water
• Shelter (a place to live)
• Clothing (basic, not designer brands)
• Healthcare
• Education

**What are WANTS?**
Things that would be nice to have but aren't essential:
• Latest phone or gaming console
• Designer clothes
• Eating out frequently
• Expensive hobbies
• Premium streaming services

**The Tricky Part:**
Some things can be both! For example:
• You NEED a phone for safety ➜ You WANT the newest iPhone
• You NEED clothes ➜ You WANT expensive brands
• You NEED food ➜ You WANT to eat out every day

**Smart Strategy:**
Ask yourself: "Would my life be okay without this?" If yes, it's probably a want. This doesn't mean you can't buy wants - just budget for them and prioritize your needs first!`
        },

        // SAVING
        {
            id: 'saving_basics',
            category: 'saving',
            title: 'Why Save Money?',
            summary: 'Understanding the importance of saving',
            readTime: 3,
            content: `Saving money is like planting seeds that grow into future opportunities!

**Reasons to Save:**

**1. Emergencies**
Life is unpredictable. Your phone might break, or you might need to help family. Having savings means you're prepared!

**2. Big Goals**
Want a car, college education, or dream vacation? Saving helps you reach big goals without going into debt.

**3. Peace of Mind**
Money worries create stress. Having savings helps you sleep better at night!

**4. Opportunities**
When opportunities appear (like a great deal or chance to start a business), saved money lets you take advantage.

**How Much to Save?**
Try the 20% rule: Save 20% of any money you receive. 

If you get $100:
• Save $20
• Spend $80

**Types of Savings:**
• **Emergency Fund** - For unexpected expenses (aim for 3-6 months of expenses)
• **Goal Fund** - For specific things you're saving toward
• **Future Fund** - For long-term dreams

Start small! Even $5/week adds up to $260/year. The habit matters more than the amount when you're starting out.`
        },
        {
            id: 'compound_interest',
            category: 'saving',
            title: 'The Magic of Compound Interest',
            summary: 'How your savings can grow exponentially over time',
            readTime: 4,
            content: `Compound interest is the closest thing to magic in the financial world!

**What is it?**
Compound interest means earning interest on your interest. Your money grows faster and faster over time!

**Simple Example:**
You save $100 at 5% annual interest:
• Year 1: $100 → $105 (earned $5)
• Year 2: $105 → $110.25 (earned $5.25!)
• Year 3: $110.25 → $115.76 (earned $5.51!)

Notice how each year you earn MORE interest? That's compounding!

**The Rule of 72:**
Want to know how long until your money doubles?
Divide 72 by your interest rate.

At 6% interest: 72 ÷ 6 = 12 years to double!
At 8% interest: 72 ÷ 8 = 9 years to double!

**Start Early:**
The earlier you start saving, the more powerful compound interest becomes!

$100/month starting at age 15:
• By age 65 at 7% return = $528,000!

$100/month starting at age 25:
• By age 65 at 7% return = $242,000!

10 years made a $286,000 difference! Time is your superpower when it comes to compound interest.

**Action Step:**
Open a high-yield savings account or investment account and let compound interest work its magic!`
        },

        // EARNING
        {
            id: 'earn_as_student',
            category: 'earning',
            title: 'Ways to Earn as a Student',
            summary: 'Creative ideas for earning money while in school',
            readTime: 4,
            content: `You don't have to wait until you're an adult to start earning money!

**Age 10-13:**
• Pet sitting for neighbors
• Lawn mowing/yard work
• Babysitting (with parent supervision)
• Selling crafts or baked goods
• Helping with chores for allowance
• Tutoring younger students

**Age 14-16:**
• Retail or food service jobs
• Lifeguard (after certification)
• Camp counselor in summer
• Freelance services (graphic design, coding)
• Online tutoring
• Social media management for local businesses

**Age 17-18:**
• All of the above, plus:
• Internships in your field of interest
• Freelance work (writing, design, programming)
• Delivery services (food, packages)
• Creating online content (YouTube, TikTok monetization)
• Starting a small business

**Skills to Develop:**
These skills help you earn more:
• Technology skills (coding, design)
• Communication skills
• Problem-solving
• Reliability and responsibility
• Creative thinking

**Important Tips:**
✓ Check local labor laws for your age
✓ Get a work permit if required
✓ Save at least 20% of what you earn
✓ Track your earnings for taxes (if applicable)
✓ Build good work habits early

Remember: The money is great, but the skills and experience you gain are even more valuable for your future!`
        },
        {
            id: 'understanding_taxes',
            category: 'earning',
            title: 'Understanding Taxes',
            summary: 'What taxes are and why we pay them',
            readTime: 3,
            content: `Taxes might seem confusing, but they're actually pretty straightforward once you understand the basics!

**What are Taxes?**
Taxes are payments to the government used to fund public services we all use.

**Where Do Taxes Go?**
• Schools and education
• Roads and bridges
• Police and fire departments
• Parks and libraries
• Healthcare programs
• Military and national defense

**Types of Taxes:**

**Income Tax**
A percentage of the money you earn. The more you earn, the higher the percentage (this is called "progressive taxation").

**Sales Tax**
Added to purchases you make. Varies by state (typically 5-10%).

**Property Tax**
Paid by homeowners based on home value.

**Gross Pay vs. Net Pay:**
• **Gross Pay** = Total amount you earn
• **Deductions** = Taxes and other withholdings
• **Net Pay** = What you actually take home (gross - deductions)

Example:
You earn $1,000 (gross)
- $150 in taxes
= $850 (net/"take-home" pay)

**Why This Matters:**
When you get your first job, don't be surprised when your paycheck is less than expected! Taxes are automatically withheld.

**Good News:**
If you earn under a certain amount (currently around $12,000/year), you may owe little to no federal income tax!`
        },

        // CREDIT & DEBT
        {
            id: 'credit_score_basics',
            category: 'credit',
            title: 'What is a Credit Score?',
            summary: 'Understanding credit scores and why they matter',
            readTime: 4,
            content: `Your credit score is like a financial report card for adults!

**What is it?**
A three-digit number (300-850) that shows how responsibly you handle borrowed money.

**Why It Matters:**
• Getting approved for loans (car, house)
• Interest rates on loans (higher score = lower interest)
• Renting an apartment
• Sometimes even job applications
• Cell phone contracts

**Credit Score Ranges:**
• 300-579: Poor
• 580-669: Fair
• 670-739: Good
• 740-799: Very Good
• 800-850: Excellent

**What Affects Your Score:**

**1. Payment History (35%)**
Do you pay bills on time? This is the BIGGEST factor!

**2. Credit Utilization (30%)**
How much of your available credit are you using? Keep it under 30%!

**3. Credit History Length (15%)**
How long have you had credit accounts? Longer is better.

**4. Credit Mix (10%)**
Different types of credit (credit cards, loans, etc.)

**5. New Credit (10%)**
Recent credit applications and new accounts.

**Building Credit Early:**
• Get added as an authorized user on a parent's card
• Get a secured credit card at 18
• Always pay on time
• Keep balances low
• Don't open too many accounts at once

**Remember:**
Building good credit takes time but is crucial for your financial future. Start learning these habits now!`
        },
        {
            id: 'debt_dangers',
            category: 'credit',
            title: 'Understanding Debt',
            summary: 'The difference between good and bad debt',
            readTime: 4,
            content: `Not all debt is created equal! Understanding the difference is crucial.

**What is Debt?**
Money you borrow and must pay back, usually with interest.

**Good Debt:**
Debt that can increase your wealth or income:

• **Student Loans** - Education increases earning potential
• **Mortgage** - Home ownership builds wealth
• **Business Loans** - Can generate income
• **Small Car Loan** - Needed for work

**Bad Debt:**
Debt for depreciating items or things you can't afford:

• **Credit Card Debt** (with high interest)
• **Payday Loans** - Extremely high interest!
• **Expensive Car Loans** - Cars lose value quickly
• **Debt for Lifestyle** - Vacations, clothes, gadgets

**The Danger of Minimum Payments:**

Example: $1,000 credit card at 18% interest
• Minimum payments only: Takes 5+ years, costs $1,700 total
• Pay it off in 1 year: Costs $1,100 total

You'd pay $700 EXTRA just to use $1,000!

**Credit Card Interest:**
Most cards charge 15-25% interest annually. That's EXPENSIVE!

**Avoiding Debt Traps:**
✓ Only borrow what you can afford to repay
✓ Understand the interest rate
✓ Have a repayment plan
✓ Avoid payday loans and buy-now-pay-later schemes
✓ Build an emergency fund to avoid debt

**Golden Rule:**
If you can't afford to buy it with cash, you probably can't afford it with credit either!`
        },

        // INVESTING
        {
            id: 'investing_basics',
            category: 'investing',
            title: 'Introduction to Investing',
            summary: 'What investing is and why it matters',
            readTime: 4,
            content: `Investing is how you make your money work for you while you sleep!

**Saving vs. Investing:**

**Saving:**
• Low/no risk
• Easy to access
• Small returns (1-3% typically)
• For short-term goals

**Investing:**
• Some risk
• Money tied up for years
• Higher potential returns (7-10% average)
• For long-term goals

**Types of Investments:**

**Stocks**
Ownership shares in a company. If the company does well, so does your investment!

**Bonds**
Loans to companies or government. They pay you interest over time. Lower risk than stocks.

**Mutual Funds/ETFs**
Baskets of many stocks/bonds. Instant diversification!

**Real Estate**
Property that can generate rental income and appreciate in value.

**Why Invest Young?**

Time + Compound Returns = Wealth

Starting at age 15, investing $100/month at 8% return:
• By age 65 = $528,000!

Starting at age 25 (10 years later):
• By age 65 = $242,000!

Those 10 extra years nearly DOUBLED your money!

**Getting Started:**
1. Learn the basics (you're doing this now!)
2. Build an emergency fund first
3. Start with index funds (track the entire market)
4. Invest regularly (monthly is great)
5. Don't panic when markets drop
6. Think long-term (10+ years)

**Remember:**
"Time in the market beats timing the market." Start early, invest regularly, and stay patient!`
        },
        {
            id: 'diversification',
            category: 'investing',
            title: 'Dont Put All Eggs in One Basket',
            summary: 'Understanding diversification and risk management',
            readTime: 3,
            content: `Diversification is the #1 rule of smart investing!

**What is Diversification?**
Spreading your money across different investments to reduce risk.

**The Egg Basket Analogy:**
Imagine you have 12 eggs (your money):

**Bad Idea:**
All 12 eggs in one basket. If you drop it, all eggs break!

**Good Idea:**
4 eggs in three different baskets. If you drop one, you still have 8 eggs!

**How to Diversify:**

**1. Different Companies**
Don't put all money in one company's stock!

**2. Different Industries**
Technology, healthcare, energy, consumer goods, etc.

**3. Different Asset Types**
Stocks + Bonds + Real Estate

**4. Different Countries**
US companies + International companies

**Example Portfolio for Beginners:**
• 60% US Stock Index Fund
• 20% International Stock Index Fund
• 20% Bond Index Fund

**Why This Works:**
• Tech crash? Healthcare might rise
• US economy down? International might be up
• Stocks falling? Bonds often rise

**The Math:**
Diversification reduces risk without reducing long-term returns!

**How to Start:**
• Index funds = instant diversification
• Target-date funds = automatic diversification
• ETFs = easy diverse portfolios

**Remember:**
"Don't put all your eggs in one basket" applies to money too! Spread it out, sleep better at night.`
        },

        // MORE ARTICLES
        {
            id: '5030 20_rule',
            category: 'budgeting',
            title: 'The 50/30/20 Rule',
            summary: 'A simple budgeting framework for managing money',
            readTime: 3,
            content: `One of the easiest and most popular budgeting methods!

**The Rule:**
Split your after-tax income into three categories:

**50% - NEEDS**
Essential expenses you can't avoid:
• Rent/Housing
• Food/Groceries
• Utilities (electricity, water)
• Transportation
• Insurance
• Minimum loan payments

**30% - WANTS**
Things that make life enjoyable but aren't essential:
• Dining out
• Entertainment (movies, concerts)
• Hobbies
• Subscriptions (streaming, gaming)
• Vacations
• Shopping for fun

**20% - SAVINGS & DEBT**
Building your future:
• Emergency fund
• Retirement savings
• Extra debt payments
• Investments
• Saving for goals

**Example with $2,000/month:**
• Needs: $1,000
• Wants: $600
• Savings: $400

**Adapting the Rule:**
Can't fit needs in 50%? Try 60/20/20 temporarily.
Already frugal? Try 40/30/30 to save more!

**Why It Works:**
• Simple to remember
• Flexible for different incomes
• Balances present and future
• Leaves room for fun

Start tracking today and see where your money really goes!`
        }
    ],

    // Get articles by category
    getArticlesByCategory(category) {
        return this.articles.filter(a => a.category === category);
    },

    // Get article by ID
    getArticle(id) {
        return this.articles.find(a => a.id === id);
    },

    // Search articles
    searchArticles(query) {
        const lowerQuery = query.toLowerCase();
        return this.articles.filter(a =>
            a.title.toLowerCase().includes(lowerQuery) ||
            a.summary.toLowerCase().includes(lowerQuery) ||
            a.content.toLowerCase().includes(lowerQuery)
        );
    }
};
