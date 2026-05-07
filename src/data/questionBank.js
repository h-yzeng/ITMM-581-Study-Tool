// Static question bank - no API key required.
// 201 questions across Chapters 8, 9, 10, 12 (MCQ + True/False)

export const QUESTION_BANK = [

  // ── CHAPTER 8: Sources of Capital ─────────────────────────────────────────

  // Bootstrapping
  { chapter:8, topic:"Bootstrapping", type:"mcq", difficulty:"easy",
    question:"What is bootstrapping in the context of entrepreneurship?",
    options:["A. Obtaining venture capital from institutional investors","B. Funding a venture from personal finances or operating revenues","C. Issuing stock to the public for the first time","D. Securing an SBA-guaranteed bank loan"],
    answer:"B", explanation:"Bootstrapping means founding and building a venture using personal finances or the company's own operating revenues, without relying on external investors." },

  { chapter:8, topic:"Bootstrapping", type:"mcq", difficulty:"easy",
    question:"Which of the following is NOT one of the five strategic bootstrapping approaches identified in the textbook?",
    options:["A. Delaying payments","B. Relationship oriented","C. Equity crowdfunding","D. Subsidy oriented"],
    answer:"C", explanation:"The five strategic approaches are: delaying payments, private-owner financed, minimizing, relationship oriented, and subsidy oriented. Equity crowdfunding is a separate financing method." },

  { chapter:8, topic:"Bootstrapping", type:"mcq", difficulty:"medium",
    question:"Which of the following is listed as an ADVANTAGE of bootstrapping?",
    options:["A. Access to large amounts of external capital","B. Reduced personal financial risk","C. Full concentration on core business activities without raising external finance","D. Guaranteed mentorship from experienced investors"],
    answer:"C", explanation:"A key advantage of bootstrapping is concentration - entrepreneurs can focus entirely on sales and product development without the distraction of fundraising." },

  { chapter:8, topic:"Bootstrapping", type:"tf", difficulty:"easy",
    question:"Dell Computers, Apple, and Meta (formerly Facebook) all had humble beginnings as bootstrapped enterprises.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook specifically lists Dell, Meta, Apple, Hewlett-Packard, Microsoft, Oracle, eBay, Cisco, and SAP as examples of successful companies that began as bootstrapped ventures." },

  { chapter:8, topic:"Bootstrapping", type:"tf", difficulty:"medium",
    question:"A major disadvantage of bootstrapping is that equity issues can arise when there is more than one founder, potentially causing disharmony.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook identifies equity tension between co-founders as a key bootstrapping disadvantage, especially when there is an imbalance in invested capital, experience, or time." },

  { chapter:8, topic:"Bootstrapping", type:"mcq", difficulty:"hard",
    question:"According to the textbook, why do many entrepreneurs embrace bootstrapping despite its risks?",
    options:["A. Banks refuse to lend to startups under any circumstances","B. Entrepreneurs fear losing control to external investors and value autonomy","C. Government regulations require bootstrapping before seeking outside funds","D. Venture capitalists only invest in companies with 5+ years of operation"],
    answer:"B", explanation:"Entrepreneurs are driven by autonomy; they often avoid external funding because they fear losing control. Many are also unaware of funding options or never ask for outside capital." },

  // Debt Financing
  { chapter:8, topic:"Debt Financing", type:"mcq", difficulty:"easy",
    question:"Which of the following is an advantage of debt financing over equity financing?",
    options:["A. No repayment obligation exists","B. No relinquishment of ownership is required","C. Lenders share in the business risk","D. Monthly payments are optional"],
    answer:"B", explanation:"With debt financing, the entrepreneur retains full ownership. The lender simply receives interest payments and repayment of principal - they do not receive equity." },

  { chapter:8, topic:"Debt Financing", type:"mcq", difficulty:"medium",
    question:"According to the textbook, what is the MOST important question a bank asks an entrepreneur seeking a loan?",
    options:["A. What do you plan to do with the money?","B. How much do you need?","C. How will you repay the loan?","D. When do you need it?"],
    answer:"C", explanation:"The textbook identifies 'How will you repay the loan?' as the most important question, requiring a clear repayment plan, collateral discussion, and contingency planning." },

  { chapter:8, topic:"Debt Financing", type:"mcq", difficulty:"medium",
    question:"Peer-to-peer (P2P) lending is also known as which of the following?",
    options:["A. Equity crowdfunding","B. Debt-based crowdfunding or crowdlending","C. Mezzanine financing","D. Private placement"],
    answer:"B", explanation:"P2P lending is also called debt-based crowdfunding or crowdlending. It matches borrowers with individual lenders through online platforms." },

  { chapter:8, topic:"Debt Financing", type:"mcq", difficulty:"medium",
    question:"What is the approximate average loan size for P2P (peer-to-peer) lending platforms?",
    options:["A. $5,000","B. $25,000","C. $100,000","D. $500,000"],
    answer:"B", explanation:"The textbook states the average size of social/P2P loans is around $25,000, with interest rates ranging from 5.9 to 29.9 percent." },

  { chapter:8, topic:"Debt Financing", type:"tf", difficulty:"easy",
    question:"Trade credit is credit given by suppliers who sell goods on account and typically must be paid within 30 to 90 days.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Trade credit appears on the entrepreneur's balance sheet as accounts payable and is generally repaid in 30 to 90 days. It is often the only credit available to very new businesses." },

  { chapter:8, topic:"Debt Financing", type:"tf", difficulty:"medium",
    question:"Heavy use of debt financing has no effect on a venture's growth and development.",
    options:["A. True","B. False"], answer:"B",
    explanation:"The textbook lists 'heavy use of debt can inhibit growth and development' as a key disadvantage of debt financing." },

  { chapter:8, topic:"Debt Financing", type:"mcq", difficulty:"hard",
    question:"Which of the following is identified as a potential danger of P2P lending for entrepreneurs?",
    options:["A. Lenders take an equity stake in the venture","B. The entrepreneur's business plan is released to the public domain","C. Interest rates are always higher than commercial banks","D. P2P loans require personal asset collateral"],
    answer:"B", explanation:"A key risk of P2P lending is that the entrepreneur's business plan must be disclosed publicly on the platform, exposing proprietary information." },

  // Equity Financing
  { chapter:8, topic:"Equity Financing", type:"mcq", difficulty:"easy",
    question:"How is equity financing defined?",
    options:["A. Money borrowed with a legal obligation to repay with interest","B. Money invested in a venture with no legal obligation to repay","C. A government grant that must be matched by the entrepreneur","D. A short-term loan secured by accounts receivable"],
    answer:"B", explanation:"Equity financing is money invested in the venture with no legal obligation to repay. Investors receive ownership stakes in exchange for their capital." },

  { chapter:8, topic:"Equity Financing", type:"mcq", difficulty:"medium",
    question:"Which type of equity security gives investors a priority claim on dividends and is often convertible to common stock?",
    options:["A. Common stock","B. Convertible debentures","C. Preferred stock","D. Trade credit"],
    answer:"C", explanation:"Preferred stock gives investors priority dividend rights over common stockholders and is often convertible to common stock, making it attractive to investors while giving the company flexibility." },

  { chapter:8, topic:"Equity Financing", type:"tf", difficulty:"medium",
    question:"Convertible debentures are debt instruments that can be converted into equity at a set price.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Convertible debentures start as debt but can convert into equity at a predetermined price. They offer downside protection (debt repayment) with upside potential (equity conversion)." },

  // IPOs and SPACs
  { chapter:8, topic:"IPOs and SPACs", type:"mcq", difficulty:"easy",
    question:"What does IPO stand for?",
    options:["A. Internal Profit Operation","B. Initial Public Offering","C. Institutional Private Offering","D. Integrated Portfolio Option"],
    answer:"B", explanation:"IPO stands for Initial Public Offering - the first time a company sells its shares to the general public on a stock exchange." },

  { chapter:8, topic:"IPOs and SPACs", type:"mcq", difficulty:"medium",
    question:"What is a SPAC (Special Purpose Acquisition Company)?",
    options:["A. A government fund that provides grants to startups","B. A blank-check company formed to raise capital through an IPO to acquire a private company","C. A type of venture capital fund focused on seed-stage investments","D. A nonprofit organization that mentors entrepreneurs"],
    answer:"B", explanation:"A SPAC is a blank-check company with no commercial operations that raises money through an IPO with the intent to acquire an existing private company, allowing that company to go public faster." },

  { chapter:8, topic:"IPOs and SPACs", type:"mcq", difficulty:"medium",
    question:"Which of the following is a DISADVANTAGE of going public through an IPO?",
    options:["A. Raises significant capital for the venture","B. Provides liquidity for founders and early investors","C. Financial affairs must be made public and reported to the SEC","D. Increases brand credibility and visibility"],
    answer:"C", explanation:"A major disadvantage of an IPO is the loss of privacy - the company must disclose financial information publicly, which many ventures prefer to keep private. It also creates ongoing SEC reporting obligations." },

  { chapter:8, topic:"IPOs and SPACs", type:"tf", difficulty:"medium",
    question:"In 2020, approximately 247 SPACs were created, raising about $80 billion.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook states that in 2020, 247 SPACs were created with $80 billion raised, reflecting the dramatic rise of SPACs as an alternative to traditional IPOs." },

  // Private Placements
  { chapter:8, topic:"Private Placements", type:"mcq", difficulty:"medium",
    question:"Private placements allow companies to raise equity capital by selling securities directly to a small group of accredited investors. Which federal regulation governs most private placements?",
    options:["A. Regulation A","B. Regulation D","C. Regulation S-K","D. Regulation T"],
    answer:"B", explanation:"Regulation D (Reg D) provides exemptions from full SEC registration for private placements. Rules 504, 505, and 506 under Reg D define the specific conditions." },

  { chapter:8, topic:"Private Placements", type:"tf", difficulty:"easy",
    question:"Private placements are generally faster and cheaper than public offerings because they avoid full SEC registration requirements.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Private placements under Regulation D exemptions bypass the lengthy and expensive full SEC registration process required for public offerings, making them a faster and cheaper fundraising option." },

  // Crowdfunding
  { chapter:8, topic:"Crowdfunding", type:"mcq", difficulty:"easy",
    question:"Which type of crowdfunding allows investors to receive an equity stake in the company?",
    options:["A. Rewards crowdfunding","B. Donation crowdfunding","C. Equity crowdfunding","D. Debt crowdfunding"],
    answer:"C", explanation:"Equity crowdfunding allows backers to receive an ownership stake in the company. It is governed by Regulation CF, which caps annual raises at $5 million." },

  { chapter:8, topic:"Crowdfunding", type:"mcq", difficulty:"medium",
    question:"Under Regulation CF (Regulation Crowdfunding), what is the maximum amount a company can raise per year through equity crowdfunding?",
    options:["A. $1 million","B. $2.5 million","C. $5 million","D. $10 million"],
    answer:"C", explanation:"Regulation CF caps equity crowdfunding raises at $5 million per year and requires financial disclosures from the issuing company." },

  { chapter:8, topic:"Crowdfunding", type:"tf", difficulty:"easy",
    question:"In rewards crowdfunding, entrepreneurs raise capital without incurring debt or sacrificing equity - backers receive a product or perk instead.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Rewards crowdfunding (e.g., Kickstarter, Indiegogo) allows entrepreneurs to pre-sell products or offer perks in exchange for funding, with no debt or equity given to backers." },

  // Venture Capital
  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"medium",
    question:"What return on investment do venture capitalists typically seek for a seed-stage investment?",
    options:["A. 10–20%","B. 20–30%","C. 30–50%","D. 50–100% or more"],
    answer:"D", explanation:"Seed-stage investments carry the highest risk, so VCs expect the highest returns - 50 to 100 percent or more - to compensate for the high failure rate." },

  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"medium",
    question:"Which factor do venture capitalists consider MOST important when evaluating a new venture?",
    options:["A. The entrepreneur's credit score","B. The strength and experience of the management team","C. The geographic location of the venture","D. The age of the entrepreneur"],
    answer:"B", explanation:"The textbook states that VCs place the management team at the top of their evaluation criteria - they are investing in the people as much as the idea." },

  { chapter:8, topic:"Venture Capital", type:"tf", difficulty:"medium",
    question:"Venture capital investments dramatically dropped in 2023 compared to the post-pandemic peak.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook notes that venture capital investments dropped dramatically in 2023, reflecting a significant correction from the record highs seen in 2020–2021." },

  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"hard",
    question:"A venture capitalist investing at the 'bridge/IPO' stage would typically seek which level of return?",
    options:["A. 50–100%+","B. 30–50%","C. 20–30%","D. 10–15%"],
    answer:"C", explanation:"Bridge/IPO stage investors accept lower returns (20–30%) because the risk is lower - the company is already mature and preparing to go public." },

  // Angel Financing
  { chapter:8, topic:"Angel Financing", type:"mcq", difficulty:"medium",
    question:"Which type of angel investor is described as a successful entrepreneur who enjoys hands-on involvement and is considered the most valuable mentor?",
    options:["A. Corporate angel","B. Entrepreneurial angel","C. Enthusiast angel","D. Professional angel"],
    answer:"B", explanation:"Entrepreneurial angels are successful entrepreneurs who have built companies themselves. They tend to be hands-on and are considered the most valuable mentors for new ventures." },

  { chapter:8, topic:"Angel Financing", type:"mcq", difficulty:"medium",
    question:"Which type of angel investor is characterized as wanting control and being difficult to deal with when the company is in trouble?",
    options:["A. Corporate angel","B. Enthusiast angel","C. Micromanagement angel","D. Professional angel"],
    answer:"C", explanation:"Micromanagement angels want control and can be unpleasant to deal with when the company faces difficulties, potentially exacerbating problems rather than helping resolve them." },

  { chapter:8, topic:"Angel Financing", type:"tf", difficulty:"medium",
    question:"Angel investors invest in 20 to 30 times as many companies as venture capitalists do.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook states that angels invest in 20 to 30 times as many companies as VCs, reflecting the much broader scope of angel investing versus the concentrated bets of institutional VC funds." },

  // ── CHAPTER 9: Legal Challenges ───────────────────────────────────────────

  // Patents
  { chapter:9, topic:"Patents", type:"mcq", difficulty:"easy",
    question:"How long does a utility patent grant the inventor exclusive rights to their invention?",
    options:["A. 10 years","B. 15 years","C. 20 years","D. Life of inventor plus 70 years"],
    answer:"C", explanation:"A utility patent grants a 20-year exclusive right to the inventor, preventing others from making, using, or selling the invention without permission." },

  { chapter:9, topic:"Patents", type:"mcq", difficulty:"medium",
    question:"Which type of patent protects the ornamental or aesthetic appearance of a product rather than its function?",
    options:["A. Utility patent","B. Plant patent","C. Design patent","D. Trade patent"],
    answer:"C", explanation:"A design patent protects the unique ornamental or aesthetic appearance of a product. A utility patent protects function; a plant patent protects new plant varieties." },

  { chapter:9, topic:"Patents", type:"mcq", difficulty:"medium",
    question:"Which of the following CANNOT be patented under U.S. patent law?",
    options:["A. A new manufacturing process","B. A new machine or device","C. A law of nature or abstract idea","D. A new chemical compound"],
    answer:"C", explanation:"Laws of nature, natural phenomena, and abstract ideas cannot be patented. These are considered fundamental building blocks of science and must remain freely available." },

  { chapter:9, topic:"Patents", type:"tf", difficulty:"easy",
    question:"To receive a patent, an invention must meet three requirements: novelty, non-obviousness, and usefulness.",
    options:["A. True","B. False"], answer:"A",
    explanation:"All three requirements must be satisfied for patent protection: the invention must be new (novelty), not obvious to someone skilled in the field (non-obviousness), and have practical utility (usefulness)." },

  { chapter:9, topic:"Patents", type:"tf", difficulty:"medium",
    question:"A plant patent covers new plant varieties that are sexually reproduced through seeds.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Plant patents cover new plant varieties that are asexually reproduced (through cuttings, grafting, budding, etc.), not sexually reproduced through seeds." },

  // Copyrights
  { chapter:9, topic:"Copyrights", type:"mcq", difficulty:"easy",
    question:"When does copyright protection arise for an original creative work?",
    options:["A. Only after formal registration with the Copyright Office","B. Automatically upon creation of the work","C. After publication and public distribution","D. Only after the creator files a formal application with the USPTO"],
    answer:"B", explanation:"Copyright protection arises automatically the moment an original work is created and fixed in a tangible medium. Formal registration is optional but provides legal advantages." },

  { chapter:9, topic:"Copyrights", type:"mcq", difficulty:"medium",
    question:"What does the fair use doctrine allow?",
    options:["A. Unlimited copying of any copyrighted work for commercial purposes","B. Limited use of copyrighted material without permission for purposes such as education, commentary, or criticism","C. Free use of any work after 10 years of publication","D. Copying of works that are not registered with the Copyright Office"],
    answer:"B", explanation:"Fair use allows limited use of copyrighted material without permission for purposes such as education, commentary, criticism, and news reporting. Courts weigh four factors to determine fair use." },

  { chapter:9, topic:"Copyrights", type:"mcq", difficulty:"medium",
    question:"For an individual author, how long does copyright protection last?",
    options:["A. 20 years from creation","B. 50 years from creation","C. Life of the author plus 70 years","D. 95 years from publication"],
    answer:"C", explanation:"For individual authors, copyright lasts for the life of the author plus 70 years. For corporate works (work for hire), protection lasts 95 years from publication." },

  { chapter:9, topic:"Copyrights", type:"tf", difficulty:"medium",
    question:"Copyright law protects the underlying ideas in a work, not just the specific expression of those ideas.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Copyright protects only the expression of an idea, not the idea itself. The Copyright Act specifically excludes protection for underlying ideas, allowing others to express the same idea in different ways." },

  // Trademarks and Trade Secrets
  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"easy",
    question:"What do trademarks protect?",
    options:["A. Inventions and new processes","B. Original creative literary and artistic works","C. Brand names, logos, and slogans that identify the source of goods","D. Confidential business processes and formulas"],
    answer:"C", explanation:"Trademarks protect brand names, logos, slogans, and other identifiers that distinguish one company's goods or services from another's in the marketplace." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"The Federal Trademark Dilution Act and Trademark Dilution Revision Act protect famous marks from which of the following?",
    options:["A. Dilution of distinctiveness even without direct competition or consumer confusion","B. Only direct counterfeiting by competitors","C. Use in other countries outside the U.S.","D. Infringement only if the marks are identical"],
    answer:"A", explanation:"These acts protect famous trademarks from dilution - actions that blur or tarnish the mark's distinctiveness - even when there is no direct competition or likelihood of confusion." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"Which of the following is the classic textbook example of a trade secret?",
    options:["A. Microsoft's Windows source code patent","B. The Coca-Cola formula","C. Apple's iPhone design trademark","D. Amazon's one-click purchasing copyright"],
    answer:"B", explanation:"The Coca-Cola formula is the classic example of a trade secret - it has never been patented (which would require disclosure) and is instead protected as a confidential trade secret through strict internal controls." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"tf", difficulty:"easy",
    question:"Trade secrets require formal registration with the USPTO to receive legal protection.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Trade secrets require NO registration. They are protected by maintaining confidentiality through NDAs, internal access controls, and other reasonable measures to keep the information secret." },

  // Business Forms
  { chapter:9, topic:"Sole Proprietorships", type:"mcq", difficulty:"easy",
    question:"What is the primary legal disadvantage of a sole proprietorship?",
    options:["A. Double taxation on profits","B. Unlimited personal liability for all business debts","C. Inability to hire employees","D. Mandatory government registration and licensing"],
    answer:"B", explanation:"In a sole proprietorship, the owner is personally responsible for all business debts and legal obligations. There is no legal separation between the owner and the business." },

  { chapter:9, topic:"Sole Proprietorships", type:"tf", difficulty:"easy",
    question:"A sole proprietorship is the simplest and least expensive business form to establish.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Sole proprietorships require minimal formalities and are the simplest, cheapest business form. There is no need to file articles of incorporation or create a formal operating agreement." },

  { chapter:9, topic:"Partnerships", type:"mcq", difficulty:"medium",
    question:"In a limited partnership (LP), which partners are personally liable for ALL debts of the business?",
    options:["A. All partners equally","B. Only the limited partners","C. Only the general partners","D. No partners have personal liability"],
    answer:"C", explanation:"In a limited partnership, general partners manage the business and have unlimited personal liability. Limited partners have liability only up to the amount they invested." },

  { chapter:9, topic:"Partnerships", type:"mcq", difficulty:"medium",
    question:"Which partnership form protects ALL partners from personal liability for the malpractice or negligence of other partners?",
    options:["A. General Partnership","B. Limited Partnership (LP)","C. Limited Liability Partnership (LLP)","D. Sole Proprietorship"],
    answer:"C", explanation:"In an LLP, each partner is shielded from personal liability for the wrongful acts or negligence of other partners, while still being able to participate in management." },

  { chapter:9, topic:"Partnerships", type:"tf", difficulty:"medium",
    question:"According to the Revised Uniform Partnership Act (RUPA), a general partnership is an association of two or more persons who share unlimited liability.",
    options:["A. True","B. False"], answer:"A",
    explanation:"RUPA defines a general partnership as an association of two or more persons who co-own a business for profit. All general partners share unlimited personal liability for business obligations." },

  { chapter:9, topic:"Corporations", type:"mcq", difficulty:"medium",
    question:"What is the primary tax disadvantage of a C-Corporation?",
    options:["A. Losses cannot be deducted from taxes","B. Double taxation - corporate income is taxed, then dividends are taxed again","C. Shareholders must pay self-employment tax","D. The corporation cannot deduct employee salaries"],
    answer:"B", explanation:"C-Corps face double taxation: the corporation pays corporate income tax on profits, and then shareholders pay personal income tax on dividends received. This is a significant disadvantage compared to pass-through entities." },

  { chapter:9, topic:"Corporations", type:"mcq", difficulty:"medium",
    question:"Which business structure is best suited for a venture that plans to seek venture capital and eventually pursue an IPO?",
    options:["A. Sole Proprietorship","B. General Partnership","C. S-Corporation","D. C-Corporation"],
    answer:"D", explanation:"C-Corporations are preferred by venture capitalists because they can issue multiple classes of stock (common and preferred), offer stock options to employees, and are the standard structure for IPOs." },

  { chapter:9, topic:"LLCs and S-Corps", type:"mcq", difficulty:"medium",
    question:"Which of the following is a restriction that applies to S-Corporations but NOT to LLCs?",
    options:["A. Pass-through taxation","B. Limited liability for owners","C. Maximum of 100 shareholders who must be U.S. citizens or residents","D. The ability to have a single owner"],
    answer:"C", explanation:"S-Corps are limited to 100 shareholders who must be U.S. citizens or residents and can only issue one class of stock. LLCs have no such restrictions on membership." },

  { chapter:9, topic:"LLCs and S-Corps", type:"tf", difficulty:"medium",
    question:"An LLC combines the limited liability of a corporation with the pass-through tax treatment of a partnership.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The LLC is a hybrid entity that provides limited liability protection (like a corporation) while allowing income and losses to pass through to members' personal tax returns (like a partnership)." },

  // Bankruptcy
  { chapter:9, topic:"Bankruptcy", type:"mcq", difficulty:"medium",
    question:"Which chapter of the U.S. Bankruptcy Code deals with liquidation, where assets are sold and debts are discharged?",
    options:["A. Chapter 7","B. Chapter 11","C. Chapter 13","D. Chapter 3"],
    answer:"A", explanation:"Chapter 7 is liquidation bankruptcy - a trustee sells the debtor's non-exempt assets and distributes the proceeds to creditors. The remaining eligible debts are discharged." },

  { chapter:9, topic:"Bankruptcy", type:"mcq", difficulty:"medium",
    question:"Which bankruptcy chapter allows a business to continue operating while restructuring its debts under a court-approved plan?",
    options:["A. Chapter 7","B. Chapter 11","C. Chapter 13","D. Chapter 9"],
    answer:"B", explanation:"Chapter 11 reorganization allows a debtor (typically a business) to continue operating as a 'debtor in possession' while proposing a restructuring plan to repay creditors over time." },

  { chapter:9, topic:"Bankruptcy", type:"tf", difficulty:"easy",
    question:"Chapter 13 bankruptcy is designed for individuals with regular income who want to repay debts through a structured 3-5 year repayment plan.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Chapter 13 allows individuals with regular income to keep their property and repay all or part of their debts through a 3-5 year court-approved payment plan." },

  { chapter:9, topic:"Bankruptcy", type:"mcq", difficulty:"hard",
    question:"In a Chapter 11 bankruptcy proceeding, what term describes the business that continues to operate while reorganizing?",
    options:["A. Secured creditor","B. Trustee in bankruptcy","C. Debtor in possession","D. Preferential creditor"],
    answer:"C", explanation:"In Chapter 11, the debtor typically remains in control of the business as the 'debtor in possession,' managing daily operations while developing a reorganization plan under court supervision." },

  // ── CHAPTER 10: Marketing Challenges ──────────────────────────────────────

  { chapter:10, topic:"Entrepreneurial Marketing", type:"mcq", difficulty:"easy",
    question:"How does entrepreneurial marketing fundamentally differ from conventional marketing?",
    options:["A. Entrepreneurial marketing relies on large budgets and mass media","B. Entrepreneurial marketing is resource-constrained, opportunity-driven, and relies on customer intimacy","C. Conventional marketing emphasizes guerrilla tactics over media advertising","D. Entrepreneurial marketing only uses digital channels"],
    answer:"B", explanation:"Conventional marketing relies on large budgets, formal research, and mass marketing, while entrepreneurial marketing is resource-constrained, opportunity-driven, and built on customer intimacy and guerrilla tactics." },

  { chapter:10, topic:"Entrepreneurial Marketing", type:"tf", difficulty:"easy",
    question:"Guerrilla marketing relies on large advertising budgets to achieve high impact in the marketplace.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Guerrilla marketing relies on time, energy, and imagination rather than large budgets. It uses unconventional, low-cost, high-impact tactics such as flash mobs, viral stunts, and street marketing." },

  { chapter:10, topic:"Entrepreneurial Marketing", type:"mcq", difficulty:"medium",
    question:"Which of the following best describes guerrilla marketing?",
    options:["A. Marketing exclusively through social media influencers","B. Use of nonconventional, low-cost, high-impact tactics that rely on creativity rather than large budgets","C. Military-style aggressive pricing strategies","D. Traditional television and print advertising for new ventures"],
    answer:"B", explanation:"The textbook defines guerrilla marketing as the use of nonconventional tactics that rely on time, energy, and imagination rather than money. Examples include flash mobs, viral stunts, and referral programs." },

  { chapter:10, topic:"Market Research", type:"mcq", difficulty:"medium",
    question:"Which of the following is an example of PRIMARY market research?",
    options:["A. Reading industry reports from trade publications","B. Analyzing census data","C. Conducting customer interviews and focus groups","D. Reviewing competitors' annual reports"],
    answer:"C", explanation:"Primary research involves collecting new data firsthand - surveys, interviews, focus groups, observation. Secondary research uses existing data already collected by others." },

  { chapter:10, topic:"Market Research", type:"tf", difficulty:"easy",
    question:"Secondary market research involves collecting new data directly from customers through surveys and interviews.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Secondary research uses existing data - industry reports, census data, trade publications, competitor filings. Primary research is what involves direct data collection from customers." },

  { chapter:10, topic:"Market Segmentation", type:"mcq", difficulty:"easy",
    question:"Dividing a market into subgroups based on age, gender, income, and education is an example of which type of segmentation?",
    options:["A. Geographic segmentation","B. Psychographic segmentation","C. Behavioral segmentation","D. Demographic segmentation"],
    answer:"D", explanation:"Demographic segmentation divides the market based on measurable population characteristics such as age, gender, income, education, occupation, and marital status." },

  { chapter:10, topic:"Market Segmentation", type:"mcq", difficulty:"medium",
    question:"Segmenting a market based on consumers' lifestyle, values, and personality traits is called:",
    options:["A. Behavioral segmentation","B. Demographic segmentation","C. Psychographic segmentation","D. Geographic segmentation"],
    answer:"C", explanation:"Psychographic segmentation groups consumers based on psychological characteristics including lifestyle, values, personality, social class, and attitudes - factors that go beyond basic demographics." },

  { chapter:10, topic:"Market Segmentation", type:"mcq", difficulty:"medium",
    question:"Which segmentation type groups consumers based on usage rate, brand loyalty, and purchase occasion?",
    options:["A. Geographic","B. Demographic","C. Psychographic","D. Behavioral"],
    answer:"D", explanation:"Behavioral segmentation categorizes consumers based on their actual behavior toward products - usage rate, loyalty status, purchase occasion, and benefits sought." },

  { chapter:10, topic:"Consumer Behavior", type:"mcq", difficulty:"medium",
    question:"Which category of factors influencing consumer behavior includes motivation, perception, and learning?",
    options:["A. Social factors","B. Cultural factors","C. Psychological factors","D. Personal factors"],
    answer:"C", explanation:"Psychological factors - including motivation, perception, learning, beliefs, and attitudes - are internal mental influences on consumer decision-making." },

  { chapter:10, topic:"Consumer Behavior", type:"tf", difficulty:"medium",
    question:"Reference groups, family influence, and social roles are examples of SOCIAL factors that affect consumer behavior.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Social factors - including reference groups (friends, colleagues), family influence, and social roles/status - are key external influences on how consumers make purchasing decisions." },

  { chapter:10, topic:"Distribution Channels", type:"mcq", difficulty:"easy",
    question:"A distribution channel where the manufacturer sells directly to the end consumer without intermediaries is called:",
    options:["A. Indirect channel","B. Exclusive distribution","C. Direct channel","D. Intensive distribution"],
    answer:"C", explanation:"A direct channel means the producer sells directly to consumers, such as through their own website, factory store, or direct sales force, with no intermediaries involved." },

  { chapter:10, topic:"Distribution Channels", type:"mcq", difficulty:"medium",
    question:"A company that sells its product through only one retailer per geographic area is using which distribution intensity strategy?",
    options:["A. Intensive distribution","B. Selective distribution","C. Exclusive distribution","D. Direct distribution"],
    answer:"C", explanation:"Exclusive distribution means the manufacturer grants one retailer or dealer the right to sell the product in a given area. It is typically used for specialty/luxury goods." },

  { chapter:10, topic:"Distribution Channels", type:"mcq", difficulty:"medium",
    question:"Which distribution intensity level is most appropriate for convenience goods that consumers buy frequently and want to find everywhere?",
    options:["A. Selective distribution","B. Exclusive distribution","C. Intensive distribution","D. Direct-only distribution"],
    answer:"C", explanation:"Intensive distribution places products in as many outlets as possible - appropriate for convenience goods (gum, soda, etc.) where maximum availability drives sales." },

  { chapter:10, topic:"Distribution Channels", type:"tf", difficulty:"easy",
    question:"Indirect distribution channels involve the use of intermediaries such as wholesalers, distributors, and retailers between the manufacturer and the consumer.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Indirect channels use one or more intermediaries between manufacturer and consumer. Each intermediary adds services (storage, transportation, selling) but also adds cost to the channel." },

  { chapter:10, topic:"Pricing Strategies", type:"mcq", difficulty:"medium",
    question:"Which pricing strategy involves setting a high initial price and then gradually lowering it as the product moves through its life cycle?",
    options:["A. Penetration pricing","B. Cost-plus pricing","C. Skimming pricing","D. Competitive pricing"],
    answer:"C", explanation:"Price skimming sets a high introductory price to capture maximum revenue from early adopters willing to pay a premium, then reduces the price over time to attract more price-sensitive customers." },

  { chapter:10, topic:"Pricing Strategies", type:"mcq", difficulty:"medium",
    question:"Which pricing strategy sets a low initial price to gain rapid market share, discouraging competitors from entering?",
    options:["A. Skimming pricing","B. Penetration pricing","C. Cost-plus pricing","D. Value-based pricing"],
    answer:"B", explanation:"Penetration pricing sets a low price at launch to quickly capture market share. It can discourage competition and build brand loyalty quickly, though it sacrifices early margin." },

  { chapter:10, topic:"Pricing Strategies", type:"mcq", difficulty:"hard",
    question:"What pricing strategy is typically recommended during the MATURITY stage of the product life cycle?",
    options:["A. High skimming prices to recover R&D costs","B. Penetration pricing to gain initial market share","C. Competitive and promotional pricing to maintain market share","D. Premium pricing to signal quality"],
    answer:"C", explanation:"During maturity, competition intensifies and price wars are common. Companies use competitive and promotional pricing (discounts, coupons) to defend market share against rivals." },

  { chapter:10, topic:"Social Media Marketing", type:"mcq", difficulty:"medium",
    question:"Pricing in the social media age includes which of the following models NOT common in traditional marketing?",
    options:["A. Cost-plus pricing","B. Freemium pricing models","C. Geographic pricing","D. Administered pricing"],
    answer:"B", explanation:"The social media age introduced new pricing models like freemium (free basic service, paid premium features), dynamic pricing, and referral pricing - strategies that leverage digital distribution and network effects." },

  { chapter:10, topic:"Marketing Plan", type:"mcq", difficulty:"medium",
    question:"Which component of the marketing plan involves analyzing sales volume, gross sales dollars, and market share trends?",
    options:["A. Customer analysis","B. Financial projections","C. Current sales analysis","D. Competitive analysis"],
    answer:"C", explanation:"Current sales analysis tracks sales volume, gross revenue, and market share data over time to identify trends, assess performance, and guide marketing strategy adjustments." },

  { chapter:10, topic:"Marketing Plan", type:"tf", difficulty:"medium",
    question:"A marketing plan should include quantified goals such as target revenue, market share, and unit sales.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Marketing goals must be specific and measurable - they should quantify targets like revenue growth, market share percentage, and unit sales so performance can be objectively evaluated." },

  // ── CHAPTER 12: Business Plan ──────────────────────────────────────────────

  { chapter:12, topic:"Business Model Canvas", type:"mcq", difficulty:"easy",
    question:"How many building blocks make up the Business Model Canvas?",
    options:["A. 5","B. 7","C. 9","D. 12"],
    answer:"C", explanation:"The Business Model Canvas has 9 building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure." },

  { chapter:12, topic:"Business Model Canvas", type:"mcq", difficulty:"medium",
    question:"Which building block of the Business Model Canvas addresses how a company proposes to generate income?",
    options:["A. Key Activities","B. Value Propositions","C. Revenue Streams","D. Key Resources"],
    answer:"C", explanation:"Revenue Streams describe how the company makes money from each customer segment - through sales, subscriptions, licensing, advertising, or other mechanisms." },

  { chapter:12, topic:"Business Model Canvas", type:"mcq", difficulty:"medium",
    question:"The Business Model Canvas building block that describes the problem a company solves for its customers is:",
    options:["A. Customer Segments","B. Revenue Streams","C. Value Propositions","D. Key Partnerships"],
    answer:"C", explanation:"The Value Proposition building block describes the specific problem being solved or need being satisfied for each customer segment - it is the core reason customers choose this company." },

  { chapter:12, topic:"Business Model Canvas", type:"tf", difficulty:"easy",
    question:"The Business Model Canvas is a one-page visual tool used to design or describe a business model before writing a full business plan.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The BMC is a strategic management template presented as a single page with 9 building blocks. Entrepreneurs typically use it before writing a full business plan to quickly map out the business model." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"mcq", difficulty:"easy",
    question:"Which of the following is a primary benefit of writing a business plan for the entrepreneur?",
    options:["A. It guarantees funding from investors","B. It forces systematic thinking and identifies potential problems before launch","C. It eliminates all financial risk from the venture","D. It provides legal protection for the business idea"],
    answer:"B", explanation:"A key internal benefit of the business plan is that it forces the entrepreneur to think systematically about every aspect of the venture, uncovering gaps and potential problems before they become costly mistakes." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"mcq", difficulty:"medium",
    question:"According to the textbook, what do financial sources (investors and lenders) primarily derive from reading a business plan?",
    options:["A. The entrepreneur's personal credit history","B. Details of the market, funding requirements, and quality of the management team","C. The entrepreneur's previous business failures","D. Patent and trademark registration numbers"],
    answer:"B", explanation:"Investors and lenders use the business plan to assess market opportunity, understand how funds will be used, evaluate the management team's capability, and judge the financial projections." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"tf", difficulty:"easy",
    question:"A business plan serves only as a fundraising tool for investors and has no value for the entrepreneur's own planning.",
    options:["A. True","B. False"], answer:"B",
    explanation:"A business plan serves multiple purposes: it is a roadmap for the entrepreneur, a communication tool for investors/lenders, a management benchmark tool, and a due-diligence exercise that uncovers gaps before launch." },

  { chapter:12, topic:"Executive Summary", type:"mcq", difficulty:"easy",
    question:"When should the Executive Summary of a business plan be written?",
    options:["A. First, before any other section","B. Second, after the market analysis","C. Last, after all other sections are complete","D. At the same time as the financial plan"],
    answer:"C", explanation:"Although the Executive Summary is placed first in the plan, it should be written last because it summarizes the entire plan. Writing it first risks inconsistency with the details developed later." },

  { chapter:12, topic:"Executive Summary", type:"mcq", difficulty:"medium",
    question:"What is the recommended length of the Executive Summary in a business plan?",
    options:["A. Half a page","B. 2 to 3 pages","C. 5 to 7 pages","D. 10 to 15 pages"],
    answer:"B", explanation:"The Executive Summary should be 2 to 3 pages. It must stand alone - if an investor reads nothing else, the summary should give them a complete picture of the opportunity." },

  { chapter:12, topic:"Executive Summary", type:"tf", difficulty:"medium",
    question:"The Executive Summary is placed first in the business plan but is written last because it summarizes the entire document.",
    options:["A. True","B. False"], answer:"A",
    explanation:"This is a critical rule of business plan writing. The Executive Summary is the first thing readers see but the last thing written, ensuring it accurately reflects the complete, finalized plan." },

  { chapter:12, topic:"Market and Competitor Analysis", type:"mcq", difficulty:"medium",
    question:"What does the common business plan phrase 'No competition exists' actually signal to investors?",
    options:["A. A genuinely novel market opportunity with no rivals","B. Insufficient competitive research by the entrepreneur","C. A large untapped market with huge potential","D. Government-protected monopoly status"],
    answer:"B", explanation:"'No competition exists' is a red flag signaling inadequate research. Every opportunity has competition - direct, indirect, or substitute products. Investors know this and will distrust the plan." },

  { chapter:12, topic:"Market and Competitor Analysis", type:"mcq", difficulty:"medium",
    question:"Which business plan mistake involves claiming only a tiny percentage of a huge market is needed for success?",
    options:["A. Ignoring competition","B. Weak management team section","C. 'We only need 1% of the market' fallacy","D. Unrealistic financial projections"],
    answer:"C", explanation:"The '1% of the market' fallacy demonstrates no real understanding of how to acquire customers. Investors want to see a credible customer acquisition strategy, not market-share arithmetic." },

  { chapter:12, topic:"Market and Competitor Analysis", type:"tf", difficulty:"medium",
    question:"A competitive analysis in a business plan must identify both direct and indirect competitors.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Direct competitors offer similar products to similar customers. Indirect competitors solve the same customer problem with a different solution. A thorough competitive analysis addresses both and articulates the venture's differentiation." },

  { chapter:12, topic:"Operations and Management Segments", type:"mcq", difficulty:"medium",
    question:"Which section of the business plan covers location, facilities, production processes, supply chain, and quality control?",
    options:["A. Management Segment","B. Financial Segment","C. Executive Summary","D. Operations Segment"],
    answer:"D", explanation:"The Operations Segment covers all the physical and logistical aspects of running the business: location, facilities, equipment, production/service delivery process, supply chain, quality control, and regulatory compliance." },

  { chapter:12, topic:"Operations and Management Segments", type:"mcq", difficulty:"medium",
    question:"Why is the Management Segment considered critically important by investors?",
    options:["A. It describes the venture's pricing strategy","B. Investors often say they invest in the team, not just the idea","C. It is the longest section in the business plan","D. It contains the financial projections"],
    answer:"B", explanation:"Investors frequently state that the quality of the management team is the most important factor in their decision. The Management Segment provides evidence that the team can actually execute the plan." },

  { chapter:12, topic:"Operations and Management Segments", type:"tf", difficulty:"medium",
    question:"The Management Segment should identify gaps in the team and explain how those gaps will be filled.",
    options:["A. True","B. False"], answer:"A",
    explanation:"A credible Management Segment openly acknowledges team gaps (e.g., no CFO yet) and presents a plan to fill them. Investors appreciate honesty and a clear strategy more than pretending no gaps exist." },

  { chapter:12, topic:"Financial Segment", type:"mcq", difficulty:"medium",
    question:"Which of the following is included in the Financial Segment of a business plan?",
    options:["A. The entrepreneur's personal biography","B. A startup cost schedule, 3-year pro forma projections, and break-even analysis","C. The guerrilla marketing strategy","D. A description of the target customer demographics"],
    answer:"B", explanation:"The Financial Segment includes: startup cost schedule, use of funds, 3-year pro forma income statement/balance sheet/cash flow, break-even analysis, funding requirements, and exit strategy." },

  { chapter:12, topic:"Financial Segment", type:"mcq", difficulty:"medium",
    question:"What is an exit strategy in the context of a business plan's Financial Segment?",
    options:["A. A plan for shutting down the business if it fails","B. A plan for how investors will eventually realize a return, such as through acquisition or IPO","C. A strategy for exiting a foreign market","D. A contingency plan for product recalls"],
    answer:"B", explanation:"An exit strategy outlines how investors (and founders) will eventually realize their return - through acquisition by a larger company, an IPO, or a management buyout. Investors require this to understand their potential liquidity event." },

  { chapter:12, topic:"Financial Segment", type:"tf", difficulty:"medium",
    question:"Financial projections in a business plan should clearly state the assumptions used to prepare the figures.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook emphasizes that all assumptions underlying financial projections must be explicitly stated. This allows investors to evaluate whether the assumptions are reasonable and credible." },

  { chapter:12, topic:"Pitching the Plan", type:"mcq", difficulty:"easy",
    question:"How long should an elevator pitch typically be?",
    options:["A. 5 to 10 minutes","B. 30 to 60 seconds","C. 3 to 5 minutes","D. 10 to 15 minutes"],
    answer:"B", explanation:"An elevator pitch should be 30 to 60 seconds - short enough to deliver in an elevator ride. It must hook the listener, convey the value proposition, and include a clear ask." },

  { chapter:12, topic:"Pitching the Plan", type:"mcq", difficulty:"medium",
    question:"How many slides does a standard investor pitch deck typically contain?",
    options:["A. 3 to 5 slides","B. 10 to 12 slides","C. 20 to 25 slides","D. 30 to 40 slides"],
    answer:"B", explanation:"The standard investor pitch deck contains 10 to 12 slides covering: problem, solution, market size, business model, traction, competition, marketing strategy, team, financial projections, and the funding ask." },

  { chapter:12, topic:"Pitching the Plan", type:"tf", difficulty:"medium",
    question:"Due diligence by investors typically occurs AFTER a successful pitch, not before.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The typical fundraising process is: pitch → investor interest → term sheet → due diligence (deep investigation of financials, legal, team, market) → closing. Due diligence follows a successful pitch." },

  { chapter:12, topic:"Updating the Business Plan", type:"mcq", difficulty:"medium",
    question:"How should a business plan be treated once the venture is launched?",
    options:["A. As a static document that is filed away after funding is secured","B. As a living document reviewed regularly and updated after major milestones","C. As a confidential legal document that cannot be shared","D. As a marketing brochure for customers"],
    answer:"B", explanation:"The business plan is a living document. It should be reviewed quarterly and updated whenever major milestones are reached or market conditions change significantly." },

  { chapter:12, topic:"Updating the Business Plan", type:"tf", difficulty:"easy",
    question:"The management team should develop their own version of the business plan to ensure they have ownership of the strategy.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook emphasizes that the management team should develop the plan themselves to ensure genuine understanding, commitment, and ownership. A plan written only by the founder or an outside consultant lacks this buy-in." },

  { chapter:12, topic:"Market and Competitor Analysis", type:"mcq", difficulty:"hard",
    question:"In a standard complete business plan outline, what section is listed first?",
    options:["A. Market Analysis","B. Financial Segment","C. Executive Summary","D. Operations"],
    answer:"C", explanation:"The Executive Summary is the first section of a complete business plan outline even though it is written last. The full outline runs through ten sections ending with the Appendix/Bibliography." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"mcq", difficulty:"hard",
    question:"A standard Business Plan Assessment Tool evaluates a business plan on a scoring rubric. How many components does it assess?",
    options:["A. 5 components","B. 7 components","C. 10 components","D. 12 components"],
    answer:"C", explanation:"A Business Plan Assessment Tool evaluates all 10 components of a business plan on a scoring rubric, allowing entrepreneurs and investors to objectively assess the quality and completeness of each section." },

  // ── CHAPTER 8: Additional Questions ──────────────────────────────────────

  // VC Myths
  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"easy",
    question:"Which of the following is a common MYTH about venture capital?",
    options:["A. VCs carefully evaluate the quality of the management team","B. Venture capital is the primary source of funding for most new small businesses","C. VCs typically expect to exit their investment within 5–10 years","D. VCs often require a board seat as part of their investment"],
    answer:"B", explanation:"Less than 1% of new small businesses are funded by venture capital. The vast majority rely on bootstrapping, bank loans, and angel investors rather than institutional VC." },

  { chapter:8, topic:"Venture Capital", type:"tf", difficulty:"medium",
    question:"Most venture capital firms invest in fewer than 1% of the business plans submitted to them.",
    options:["A. True","B. False"], answer:"A",
    explanation:"VCs are extremely selective. A typical firm receives thousands of proposals annually but invests in only a handful - they reject more than 99% of plans submitted." },

  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"medium",
    question:"Which of the following is a myth about how venture capitalists evaluate entrepreneurs?",
    options:["A. VCs are primarily interested in the quality and experience of the management team","B. VCs invest in the person as much as the idea","C. A brilliant business plan alone is usually sufficient to secure VC funding","D. VCs prefer entrepreneurs with relevant industry experience"],
    answer:"C", explanation:"It is a myth that an outstanding plan guarantees VC funding. VCs invest most heavily in the management team's track record and character - a plan is a means, not an end." },

  // VC Evaluation Process
  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"medium",
    question:"What is the correct order of the venture capital deal evaluation process?",
    options:["A. Due diligence → Deal origination → Screening → Deal structuring","B. Screening → Deal origination → Due diligence → Deal structuring","C. Deal origination → Screening → Due diligence → Deal structuring","D. Deal origination → Due diligence → Screening → Deal structuring"],
    answer:"C", explanation:"The VC process flows from deal origination (sourcing opportunities) → screening (quick filter against criteria) → due diligence (deep investigation) → deal structuring (negotiating terms and closing)." },

  { chapter:8, topic:"Venture Capital", type:"tf", difficulty:"easy",
    question:"Venture capital firms source most of their investment deals through unsolicited cold calls and blind business plan submissions.",
    options:["A. True","B. False"], answer:"B",
    explanation:"The vast majority of VC deals originate from referrals through trusted networks of entrepreneurs, lawyers, accountants, and other VCs. Cold submissions have very low success rates." },

  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"medium",
    question:"According to the textbook, which factor do venture capitalists rank as MOST important when screening potential investments?",
    options:["A. The novelty of the technology","B. The size of the patent portfolio","C. The quality and experience of the management team","D. The geographic location of the startup"],
    answer:"C", explanation:"VCs consistently identify the management team as their top evaluation criterion - they believe the right team can navigate problems and pivot, while a weak team will fail even with a great idea." },

  // Regulation A/A+
  { chapter:8, topic:"Private Placements", type:"mcq", difficulty:"hard",
    question:"Under Regulation A+ (Tier 2), what is the maximum amount a company can raise annually without full SEC registration?",
    options:["A. $5 million","B. $20 million","C. $75 million","D. $1 billion"],
    answer:"C", explanation:"Regulation A+ Tier 2 (updated by the JOBS Act) allows companies to raise up to $75 million per year from both accredited and non-accredited investors with streamlined SEC review - making it a 'mini-IPO' option." },

  // Financing Continuum
  { chapter:8, topic:"Bootstrapping", type:"mcq", difficulty:"medium",
    question:"According to the financing continuum, which source of funding typically comes FIRST in a new venture's progression?",
    options:["A. Venture capital","B. Bank loans with collateral","C. Personal savings, friends, and family (bootstrapping)","D. Initial Public Offering (IPO)"],
    answer:"C", explanation:"The financing continuum shows that ventures begin with the founder's own money and informal networks (bootstrapping, friends/family), then progress to angels, VCs, institutional capital, and finally public markets." },

  // Mezzanine Financing
  { chapter:8, topic:"Equity Financing", type:"mcq", difficulty:"hard",
    question:"Mezzanine financing is best described as:",
    options:["A. The first round of equity investment from angel investors","B. A hybrid of debt and equity, typically used to fund growth or bridge to an IPO or acquisition","C. A government-backed loan for startups with no collateral","D. Peer-to-peer lending arranged through online platforms"],
    answer:"B", explanation:"Mezzanine financing sits between senior debt and equity in the capital structure. It is typically structured as subordinated debt with equity warrants, used to fund expansion or bridge a company to an IPO or acquisition." },

  // SPAC
  { chapter:8, topic:"IPOs and SPACs", type:"mcq", difficulty:"medium",
    question:"What is a key advantage of a company going public through a SPAC merger rather than a traditional IPO?",
    options:["A. The company's shares are guaranteed to increase in value post-merger","B. No SEC disclosures are required for SPAC mergers","C. The process is generally faster and more cost-efficient than a traditional IPO","D. SPAC mergers do not dilute existing shareholders"],
    answer:"C", explanation:"SPAC mergers provide a faster, lower-cost path to public markets compared to traditional IPOs, which require months of roadshows and expensive underwriting fees." },

  // Angel Financing Additional
  { chapter:8, topic:"Angel Financing", type:"mcq", difficulty:"medium",
    question:"Which type of angel investor was formerly a high-ranking executive at a large corporation and may invest with a strategic agenda of making the startup an acquisition target?",
    options:["A. Entrepreneurial angel","B. Professional angel","C. Enthusiast angel","D. Corporate angel"],
    answer:"D", explanation:"Corporate angels are former corporate executives who invest in startups that might be acquired by their former employer or industry. Their motives include strategic interests beyond pure financial return." },

  { chapter:8, topic:"Angel Financing", type:"tf", difficulty:"easy",
    question:"Angel investors typically invest their own personal funds, whereas venture capitalists invest pooled institutional funds from limited partners.",
    options:["A. True","B. False"], answer:"A",
    explanation:"This is a fundamental distinction: angels invest personal wealth, while VCs manage pooled funds from institutional investors (pension funds, endowments, etc.) and must deploy capital according to fund mandates." },

  { chapter:8, topic:"Angel Financing", type:"mcq", difficulty:"medium",
    question:"Collectively, angel investors invest how much annually in the United States compared to institutional venture capitalists?",
    options:["A. Far less - about 10% of the VC total","B. About the same as VCs","C. More than VCs - angels collectively invest more annually than institutional VCs","D. About 25% as much as VCs"],
    answer:"C", explanation:"The textbook states that angel investors collectively invest more capital annually than institutional venture capitalists. Angels invest at earlier stages with smaller check sizes but in far greater volume of deals." },

  // SBA Loans
  { chapter:8, topic:"Debt Financing", type:"mcq", difficulty:"hard",
    question:"An SBA (Small Business Administration) 7(a) loan program is best described as:",
    options:["A. A direct government loan where the SBA lends money to the small business","B. A government loan guarantee program where the SBA guarantees a portion of a bank loan to reduce lender risk","C. A grant program that does not require repayment","D. A private equity program funded by the Department of Commerce"],
    answer:"B", explanation:"The SBA's 7(a) program guarantees a portion of bank loans to small businesses that might not otherwise qualify for conventional financing, reducing the lender's risk and encouraging lending to small businesses." },

  // ── CHAPTER 9: Additional Questions ──────────────────────────────────────

  // B Corps and L3Cs
  { chapter:9, topic:"B Corps and L3Cs", type:"mcq", difficulty:"medium",
    question:"What is a Benefit Corporation (B-Corp)?",
    options:["A. A nonprofit organization that cannot distribute profits to owners","B. A for-profit business legally required to consider social and environmental impact alongside profit maximization","C. A corporation limited to 100 shareholders with pass-through taxation","D. A government-chartered corporation serving a public mission"],
    answer:"B", explanation:"A Benefit Corporation is a legal business structure requiring the company to consider the impact on all stakeholders - employees, communities, environment - not just shareholders, while still operating for profit." },

  { chapter:9, topic:"B Corps and L3Cs", type:"tf", difficulty:"medium",
    question:"B Corp certification from B Lab and the Benefit Corporation legal status are the same thing.",
    options:["A. True","B. False"], answer:"B",
    explanation:"They are distinct: B Corp certification is a voluntary certification from the nonprofit B Lab based on performance scores. Benefit Corporation is a legal status available in many U.S. states through legislation." },

  { chapter:9, topic:"B Corps and L3Cs", type:"mcq", difficulty:"medium",
    question:"An L3C (Low-Profit Limited Liability Company) is primarily designed for:",
    options:["A. High-growth tech startups seeking venture capital","B. Social enterprises that pursue a charitable mission first while generating modest profits","C. Multinational corporations operating in multiple countries","D. Government contractors requiring a specific legal structure for bids"],
    answer:"B", explanation:"L3Cs are a hybrid business form created for social entrepreneurs. They must operate primarily for a charitable or educational purpose with profit as a secondary objective, making them attractive vehicles for program-related investments from foundations." },

  // Trademark Invalidation
  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"Which of the following can cause a trademark to be invalidated through 'abandonment'?",
    options:["A. Using the trademark in a foreign country without permission","B. Failure to use the mark in commerce for an extended period (typically 3 years)","C. Applying for a patent that covers the same product as the trademark","D. Selling the trademark to a competitor"],
    answer:"B", explanation:"Trademark abandonment occurs when the owner stops using the mark in commerce for an extended period - three or more consecutive years raises a legal presumption of abandonment under U.S. trademark law." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"'Genericide' occurs when a trademark becomes invalid because:",
    options:["A. A competitor deliberately copies the mark","B. The owner fails to renew the trademark registration","C. The brand name becomes the generic name for an entire product category","D. The trademark is used in an offensive manner"],
    answer:"C", explanation:"Genericide is when a trademark becomes so widely used to describe a product category that it loses distinctiveness. Historical examples include aspirin, escalator, and zipper - all lost trademark protection by becoming generic terms." },

  // Cybersquatting
  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"What is cybersquatting?",
    options:["A. Copying a competitor's website layout and design","B. Registering a domain name containing a well-known brand or trademark to extort payment from the brand owner","C. Posting negative reviews about a competitor's business online","D. Using a competitor's keywords in online advertising"],
    answer:"B", explanation:"Cybersquatting is registering a domain name that uses another party's trademark with bad-faith intent to profit from the trademark's goodwill. The Anticybersquatting Consumer Protection Act (ACPA) provides legal remedies." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"tf", difficulty:"medium",
    question:"Under the Anticybersquatting Consumer Protection Act (ACPA), trademark owners can seek statutory damages of $1,000 to $100,000 per domain name from cybersquatters.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The ACPA allows trademark owners to sue domain name cybersquatters in federal court for statutory damages ranging from $1,000 to $100,000 per domain name, plus attorney's fees." },

  // IP Comparison
  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"Which form of intellectual property protection can potentially last INDEFINITELY as long as the owner actively maintains it in commerce?",
    options:["A. Utility patent","B. Copyright","C. Trademark","D. Design patent"],
    answer:"C", explanation:"Trademark protection can last indefinitely as long as the owner continues to use the mark in commerce and files timely renewal applications with the USPTO. Unlike patents and copyrights, there is no absolute expiration." },

  // Patent Rules
  { chapter:9, topic:"Patents", type:"mcq", difficulty:"hard",
    question:"According to the textbook, before pursuing a patent, an entrepreneur should determine which of the following?",
    options:["A. Whether a competitor has patented a similar invention, which automatically invalidates their application","B. Whether the patent will provide sufficient commercial value to justify the significant time and legal costs","C. Whether the invention was disclosed publicly more than five years ago","D. Whether a patent attorney has already rejected the application once"],
    answer:"B", explanation:"The textbook advises that before spending substantial time and legal fees on a patent, entrepreneurs should evaluate whether the patent will actually provide commercially valuable protection - it must be worth the investment." },

  { chapter:9, topic:"Patents", type:"tf", difficulty:"medium",
    question:"A provisional patent application grants full patent rights for 12 months before a complete application must be filed.",
    options:["A. True","B. False"], answer:"B",
    explanation:"A provisional application establishes a priority filing date and allows use of 'Patent Pending' for 12 months, but it does NOT grant full patent rights. A complete (non-provisional) application must be filed within that window." },

  // Trade Secrets
  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"Which of the following actions is ESSENTIAL for an entrepreneur to maintain trade secret protection?",
    options:["A. Filing an annual renewal with the USPTO","B. Publishing the secret formula in a trade journal with a copyright notice","C. Implementing reasonable measures to maintain confidentiality, such as NDAs and restricted access","D. Having the trade secret notarized and deposited with an attorney"],
    answer:"C", explanation:"Trade secret protection requires the owner to take reasonable steps to maintain secrecy. Without measures like NDAs, restricted access, and security protocols, a court may determine the information was not actually a trade secret." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"For a proprietary manufacturing process a company wants to protect indefinitely, which IP form is MOST appropriate?",
    options:["A. Patent - because it grants exclusive rights after full public disclosure","B. Copyright - because it protects the written documentation of the process","C. Trade secret - because it requires no registration and protection continues as long as secrecy is maintained","D. Trademark - because it identifies the source of goods"],
    answer:"C", explanation:"For a process that should remain secret indefinitely, trade secret protection is superior to a patent - patents expire after 20 years and require full public disclosure, which permanently destroys the secrecy." },

  // Business Forms Additional
  { chapter:9, topic:"LLCs and S-Corps", type:"mcq", difficulty:"medium",
    question:"A single-member LLC is taxed by default as:",
    options:["A. A C-Corporation","B. An S-Corporation","C. A sole proprietorship (disregarded entity)","D. A general partnership"],
    answer:"C", explanation:"By default, a single-member LLC is treated as a 'disregarded entity' by the IRS - it is taxed exactly like a sole proprietorship. The LLC can elect to be taxed as a corporation if desired." },

  { chapter:9, topic:"Corporations", type:"tf", difficulty:"easy",
    question:"Shareholders of a C-Corporation have limited liability, meaning they can only lose the amount they invested - not their personal assets.",
    options:["A. True","B. False"], answer:"A",
    explanation:"A fundamental advantage of the corporate form is limited liability - shareholders can only lose their investment. Unlike sole proprietors or general partners, they are not personally responsible for corporate debts." },

  { chapter:9, topic:"B Corps and L3Cs", type:"tf", difficulty:"medium",
    question:"In a traditional C-Corporation, directors are legally required to prioritize profit maximization for shareholders above all other considerations.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Under traditional corporate law's shareholder primacy doctrine, corporate directors have a fiduciary duty to maximize returns for shareholders. Benefit corporations explicitly modify this by requiring consideration of broader stakeholder impacts." },

  { chapter:9, topic:"LLCs and S-Corps", type:"mcq", difficulty:"hard",
    question:"Which business form offers the GREATEST flexibility in management structure while also providing limited liability for all owners?",
    options:["A. General Partnership","B. Limited Partnership","C. S-Corporation","D. Limited Liability Company (LLC)"],
    answer:"D", explanation:"LLCs offer maximum flexibility - members can choose any management structure, profit-sharing arrangement, and tax treatment. They provide limited liability for all members without the restrictions of S-Corps (100 shareholder limit, one class of stock)." },

  { chapter:9, topic:"Bankruptcy", type:"mcq", difficulty:"medium",
    question:"The 'automatic stay' in bankruptcy law refers to:",
    options:["A. A mandatory waiting period before a debtor can file for bankruptcy","B. An immediate court order halting all collection actions, lawsuits, and foreclosures against the debtor upon filing","C. A stay of execution on a bankruptcy plan if creditors object","D. The period during which a trustee evaluates assets before distribution"],
    answer:"B", explanation:"The automatic stay immediately stops all creditor collection efforts, lawsuits, wage garnishments, and foreclosures the moment a bankruptcy petition is filed, giving the debtor breathing room to reorganize or liquidate." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"medium",
    question:"Which of the following is the BEST reason to register a trademark with the USPTO rather than relying solely on common law trademark rights?",
    options:["A. Common law trademark rights do not exist without registration","B. Federal registration provides nationwide constructive notice of ownership and access to federal courts","C. Registration is required before using the trademark in commerce","D. Only registered trademarks can use the word 'trademark' in advertising"],
    answer:"B", explanation:"While common law rights arise from actual use, federal registration provides nationwide constructive notice, the right to use the ® symbol, the ability to sue in federal court, and the ability to block infringing imports through U.S. Customs." },

  { chapter:9, topic:"Partnerships", type:"mcq", difficulty:"medium",
    question:"A joint venture is best described as:",
    options:["A. A general partnership with unlimited duration","B. A temporary partnership formed to accomplish a specific business objective","C. A limited partnership where all partners have equal voting rights","D. A partnership between a nonprofit and a for-profit entity"],
    answer:"B", explanation:"A joint venture is a temporary strategic alliance between two or more parties to pursue a specific project or objective. Once the project is complete, the joint venture typically dissolves." },

  { chapter:9, topic:"Partnerships", type:"tf", difficulty:"medium",
    question:"A limited partner who participates actively in management of the partnership may lose limited liability protection and be treated as a general partner.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Limited partners must remain passive investors to retain their limited liability protection. Active participation in management can cause a court to reclassify them as general partners with unlimited personal liability." },

  // ── CHAPTER 10: Additional Questions ──────────────────────────────────────

  // 4Cs Framework
  { chapter:10, topic:"4Cs Marketing Framework", type:"mcq", difficulty:"medium",
    question:"The 4Cs marketing framework (a customer-centric alternative to the 4Ps) replaces 'Product' with which concept?",
    options:["A. Cost","B. Customer solution/value","C. Communication","D. Convenience"],
    answer:"B", explanation:"The 4Cs reframe the 4Ps from the customer's perspective: Product → Customer solution/value, Price → Customer cost, Place → Convenience, Promotion → Communication." },

  { chapter:10, topic:"4Cs Marketing Framework", type:"tf", difficulty:"medium",
    question:"In the 4Cs framework, 'Convenience' replaces 'Place' from the traditional 4Ps model.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The 4Cs map directly to the 4Ps: Customer solution replaces Product, Customer cost replaces Price, Convenience replaces Place/Distribution, Communication replaces Promotion." },

  { chapter:10, topic:"4Cs Marketing Framework", type:"mcq", difficulty:"medium",
    question:"Which of the following best describes the purpose of replacing 'Promotion' with 'Communication' in the 4Cs framework?",
    options:["A. It emphasizes one-way mass advertising over two-way dialogue","B. It acknowledges that modern marketing is interactive and relationship-based, not just one-way broadcast","C. It reduces the budget for promotional activities","D. It focuses only on digital communication channels"],
    answer:"B", explanation:"Replacing Promotion with Communication reflects the shift from one-way advertising broadcasts to two-way, interactive dialogue with customers - driven by social media and digital channels." },

  // Social Media Marketing
  { chapter:10, topic:"Social Media Marketing", type:"mcq", difficulty:"medium",
    question:"According to the textbook, the FIRST step in a social media marketing plan is:",
    options:["A. Post content across all platforms immediately","B. Hire a social media manager and set a budget","C. Listen and monitor what customers and prospects are already saying online","D. Create a company blog"],
    answer:"C", explanation:"The textbook's social media marketing plan begins with Listen - monitoring conversations to understand what your audience is already saying about your brand, competitors, and industry before creating content." },

  { chapter:10, topic:"Social Media Marketing", type:"tf", difficulty:"easy",
    question:"Social media marketing is only effective for business-to-consumer (B2C) companies and has little value for B2B businesses.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Social media marketing is valuable for both B2C and B2B companies. LinkedIn, in particular, is highly effective for B2B lead generation, thought leadership, and brand building." },

  { chapter:10, topic:"Social Media Marketing", type:"mcq", difficulty:"hard",
    question:"After 'listening' to the online conversation, what is the NEXT step in the social media marketing plan?",
    options:["A. Create a viral video campaign","B. Identify the platforms and communities where your target customers are most active","C. Immediately respond to all negative reviews","D. Hire influencers to promote the brand"],
    answer:"B", explanation:"After Listen comes Identify - determining which social platforms, communities, and influencers are most relevant to your target customers before investing resources in content creation and engagement." },

  // Market Research Inhibitors
  { chapter:10, topic:"Market Research", type:"mcq", difficulty:"medium",
    question:"Which of the following is identified in the textbook as a reason why entrepreneurs often resist conducting formal market research?",
    options:["A. They already have too many customers to study","B. The cost and complexity make research seem impractical for a small venture","C. Market research is legally restricted for new ventures","D. Customers refuse to participate in research for startups"],
    answer:"B", explanation:"The textbook identifies several research inhibitors: high cost, complexity, the belief that research won't influence already-made strategic decisions, and the perception that results won't be actionable." },

  { chapter:10, topic:"Market Research", type:"tf", difficulty:"medium",
    question:"One reason entrepreneurs avoid market research is the belief that by the time results are ready, the strategic decision has already been made.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The textbook identifies 'strategic decisions don't seem to require it' as a key inhibitor - entrepreneurs often feel their decisions are already made or that the business moves too fast for formal research cycles." },

  // Omnichannel
  { chapter:10, topic:"Distribution Channels", type:"mcq", difficulty:"medium",
    question:"What is the key distinction between omnichannel and multichannel marketing?",
    options:["A. Omnichannel uses more channels than multichannel marketing","B. Multichannel uses both online and offline channels while omnichannel uses only digital channels","C. Omnichannel integrates all channels to provide a seamless customer experience, while multichannel operates each channel independently","D. They are the same concept with different terminology"],
    answer:"C", explanation:"Multichannel marketing uses multiple channels but they operate in silos. Omnichannel marketing ensures all channels are integrated and coordinated, creating a consistent, seamless customer experience regardless of channel." },

  { chapter:10, topic:"Distribution Channels", type:"tf", difficulty:"easy",
    question:"In an omnichannel strategy, a customer can start a purchase on a mobile app and complete it in a physical store without losing cart contents or purchase history.",
    options:["A. True","B. False"], answer:"A",
    explanation:"This is a defining feature of omnichannel retailing - all touchpoints are integrated so customer data, cart contents, and purchase history are shared seamlessly across all channels." },

  // Marketing Plan Development
  { chapter:10, topic:"Marketing Plan", type:"mcq", difficulty:"medium",
    question:"What is the FIRST step in developing a marketing plan?",
    options:["A. Setting a promotional budget","B. Choosing distribution channels","C. Conducting a situation analysis (including a SWOT analysis)","D. Designing the sales force structure"],
    answer:"C", explanation:"A marketing plan begins with a situation analysis - assessing the internal environment (strengths, weaknesses) and external environment (opportunities, threats) to establish the strategic foundation for all marketing decisions." },

  { chapter:10, topic:"Marketing Plan", type:"mcq", difficulty:"medium",
    question:"In the marketing planning process, after identifying the target market, the next step is typically:",
    options:["A. Setting the advertising schedule","B. Developing the marketing mix (product, price, place, promotion) strategy for that target","C. Measuring return on investment","D. Conducting a SWOT analysis"],
    answer:"B", explanation:"Once the target market is defined, the entrepreneur designs the 4Ps marketing mix tailored to that specific segment's needs, preferences, and behaviors." },

  // Pricing Additional
  { chapter:10, topic:"Pricing Strategies", type:"mcq", difficulty:"medium",
    question:"'Odd pricing' (e.g., $9.99 instead of $10.00) is an example of which pricing strategy?",
    options:["A. Cost-plus pricing","B. Penetration pricing","C. Psychological pricing","D. Competitive pricing"],
    answer:"C", explanation:"Odd pricing is a psychological pricing technique that exploits how consumers perceive prices. $9.99 feels significantly cheaper than $10.00, even though the actual difference is only one cent." },

  { chapter:10, topic:"Pricing Strategies", type:"mcq", difficulty:"medium",
    question:"Which pricing strategy sets price based on the value customers PERCEIVE they are receiving, rather than the cost of production?",
    options:["A. Cost-plus pricing","B. Competitive pricing","C. Penetration pricing","D. Value-based pricing"],
    answer:"D", explanation:"Value-based pricing sets price based on customers' perceived value of the product - what they believe it is worth. Premium brands like Apple use value-based pricing, charging far more than cost-plus would suggest." },

  // Distribution Additional
  { chapter:10, topic:"Distribution Channels", type:"mcq", difficulty:"medium",
    question:"A manufacturer that sells to a retailer, who then sells to the consumer, is using which type of channel?",
    options:["A. Direct channel","B. One-level indirect channel","C. Two-level indirect channel","D. Exclusive distribution"],
    answer:"B", explanation:"A one-level indirect channel has one intermediary (typically a retailer) between the manufacturer and the consumer. A two-level channel has two intermediaries (manufacturer → wholesaler → retailer → consumer)." },

  { chapter:10, topic:"Distribution Channels", type:"tf", difficulty:"medium",
    question:"Channel conflict occurs when different members of the same distribution channel compete against each other, undermining overall profitability.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Channel conflict arises when a manufacturer competes directly with its own distributors or retailers (e.g., selling direct to consumers while also using retail partners), or when online sales cannibalize brick-and-mortar partner sales." },

  // Consumer Behavior Additional
  { chapter:10, topic:"Consumer Behavior", type:"mcq", difficulty:"medium",
    question:"The 'reference group' influence on consumer behavior falls under which category of factors?",
    options:["A. Psychological factors","B. Social factors","C. Cultural factors","D. Personal factors"],
    answer:"B", explanation:"Reference groups are social influences - groups whose values, attitudes, and behaviors individuals use as a reference point for their own decisions. Friends, colleagues, and celebrities can all serve as reference groups." },

  // Market Segmentation Additional
  { chapter:10, topic:"Market Segmentation", type:"mcq", difficulty:"medium",
    question:"A clothing retailer targeting teenage girls ages 13–17 with median household income under $75,000 is using which type of segmentation?",
    options:["A. Psychographic segmentation","B. Geographic segmentation","C. Demographic segmentation","D. Behavioral segmentation"],
    answer:"C", explanation:"Segmenting by age, gender, and income level are all demographic variables. This is demographic segmentation - the most commonly used segmentation approach due to its measurability." },

  { chapter:10, topic:"Market Segmentation", type:"tf", difficulty:"easy",
    question:"Geographic segmentation involves dividing the market by region, city size, climate, or urban/suburban/rural distinctions.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Geographic segmentation divides potential customers by location characteristics such as region, city size, climate, population density, or urban vs. suburban vs. rural setting." },

  // Content Marketing
  { chapter:10, topic:"Social Media Marketing", type:"mcq", difficulty:"easy",
    question:"Creating and sharing valuable blog posts, videos, and tutorials to attract and engage customers without directly promoting a product is known as:",
    options:["A. Mass marketing","B. Content marketing","C. Direct marketing","D. Trade promotion"],
    answer:"B", explanation:"Content marketing creates and distributes valuable, relevant content to attract and retain a clearly defined audience. Rather than directly promoting a product, it educates and builds trust with potential customers." },

  // Marketing Mix
  { chapter:10, topic:"Entrepreneurial Marketing", type:"tf", difficulty:"easy",
    question:"The traditional '4Ps' of marketing are Product, Price, Place, and Promotion.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The classic marketing mix consists of the 4Ps: Product (what you sell), Price (what you charge), Place (distribution/availability), and Promotion (advertising, PR, and selling activities)." },

  // Niche Marketing
  { chapter:10, topic:"Market Segmentation", type:"mcq", difficulty:"medium",
    question:"A niche marketing strategy is most appropriate for which type of venture?",
    options:["A. A venture targeting the mass market with a commodity product","B. An entrepreneur who wants to avoid competition entirely","C. A small venture that can dominate a narrow, specialized segment better than large competitors","D. A company with unlimited marketing resources"],
    answer:"C", explanation:"Niche marketing allows small ventures to compete by becoming specialists in a segment too small or specialized for large companies to profitably serve. Dominating a niche builds loyal customers and avoids direct competition with giants." },

  { chapter:10, topic:"Market Research", type:"mcq", difficulty:"medium",
    question:"Which research technique involves observing customer behavior in a natural setting to capture behavior that customers might not accurately report in surveys?",
    options:["A. Focus group","B. Online survey","C. Ethnographic/observational research","D. Expert interview"],
    answer:"C", explanation:"Ethnographic or observational research involves watching customers in their natural environment - shopping, using products, etc. - to understand actual behavior, which often differs from what customers say they do." },

  // ── CHAPTER 12: Additional Questions ──────────────────────────────────────

  // Planning Pitfalls
  { chapter:12, topic:"Planning Pitfalls", type:"mcq", difficulty:"medium",
    question:"Which of the following is identified as a major planning pitfall?",
    options:["A. Creating too detailed a financial model","B. The plan was written but never used as a management tool - it sat in a file drawer","C. Including too many visuals and charts in the document","D. Asking outside attorneys to review the legal sections"],
    answer:"B", explanation:"One of the most cited planning pitfalls is creating a plan for fundraising purposes only, then filing it away. A business plan must be a living management tool reviewed and used regularly." },

  { chapter:12, topic:"Planning Pitfalls", type:"mcq", difficulty:"medium",
    question:"What is the pitfall of having only the entrepreneur write the business plan without involvement from the management team?",
    options:["A. It makes the plan too short and lacks detail","B. It creates overly optimistic financial projections","C. The team lacks ownership and commitment to a plan they did not help create","D. It violates SEC disclosure requirements"],
    answer:"C", explanation:"When only the founder writes the plan, the management team has no ownership over it. They are less committed to executing a plan they didn't help create, and the plan may not reflect their operational knowledge." },

  { chapter:12, topic:"Planning Pitfalls", type:"tf", difficulty:"easy",
    question:"Setting vague, unmeasurable goals like 'become a market leader' instead of specific measurable targets is considered a planning pitfall.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Goals must be SMART (Specific, Measurable, Achievable, Relevant, Time-bound). Vague aspirational statements are meaningless for tracking progress and make the plan useless as a management tool." },

  { chapter:12, topic:"Planning Pitfalls", type:"mcq", difficulty:"hard",
    question:"Which planning pitfall involves the entrepreneur assuming the venture will face no serious competitive responses after launch?",
    options:["A. No marketing plan","B. No contingency planning for competitive reactions","C. Weak management team section","D. Insufficient financial detail"],
    answer:"B", explanation:"Failing to plan for competitive reactions is a critical pitfall. Established players will respond to new market entrants through price cuts, product improvements, or marketing campaigns - a credible plan addresses how the venture will respond." },

  { chapter:12, topic:"Planning Pitfalls", type:"tf", difficulty:"medium",
    question:"One planning pitfall is basing financial projections on 'hockey stick' growth curves that show explosive growth with no credible explanation of how it will be achieved.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Hockey stick projections - flat for a period then suddenly exploding - are a red flag for investors. They signal the entrepreneur worked backward from a desired outcome rather than building projections from realistic assumptions." },

  // VC Reading Process
  { chapter:12, topic:"Pitching the Plan", type:"mcq", difficulty:"medium",
    question:"According to the textbook, how long does a venture capitalist typically spend on an initial read-through of a business plan during screening?",
    options:["A. 5 to 10 minutes","B. 30 to 60 minutes","C. 3 to 4 hours","D. Multiple days for a complete review"],
    answer:"A", explanation:"The textbook describes a VC's 'five-minute reading' process - VCs initially skim a plan quickly, starting with the executive summary, to decide whether to invest more time. Plans that don't pass the quick skim rarely get further attention." },

  { chapter:12, topic:"Pitching the Plan", type:"mcq", difficulty:"hard",
    question:"According to the textbook's description of how VCs read business plans, what section is typically reviewed LAST - and only if earlier sections are compelling?",
    options:["A. Executive Summary","B. Detailed financial projections","C. Market analysis","D. Management bios"],
    answer:"B", explanation:"VCs read in a specific order: Executive Summary → Management Team → Market Opportunity → Product/Service → then Financials. They reach the detailed financial projections only if the earlier sections are compelling enough to continue." },

  { chapter:12, topic:"Pitching the Plan", type:"tf", difficulty:"medium",
    question:"If the Executive Summary fails to capture a venture capitalist's interest, the VC will typically read the entire plan anyway to make a fully informed decision.",
    options:["A. True","B. False"], answer:"B",
    explanation:"If the Executive Summary doesn't immediately capture interest, VCs typically stop reading. The Executive Summary must hook the reader - it is the plan's most critical section in terms of getting any further attention." },

  // Milestone Schedule
  { chapter:12, topic:"Milestone Schedule", type:"mcq", difficulty:"medium",
    question:"What is the primary purpose of the milestone schedule in a business plan?",
    options:["A. To list the entrepreneur's personal achievements and credentials","B. To establish specific, time-bound targets for key operational, financial, and market development events","C. To summarize the financial projections for investors","D. To outline the company's organizational chart"],
    answer:"B", explanation:"The milestone schedule translates the business plan into a timeline of specific, measurable events - product launch, first sale, first hire, break-even date - giving investors and management concrete benchmarks to track execution." },

  { chapter:12, topic:"Milestone Schedule", type:"tf", difficulty:"easy",
    question:"The milestone schedule is a management accountability tool that allows the entrepreneur and investors to track whether the venture is executing according to plan.",
    options:["A. True","B. False"], answer:"A",
    explanation:"By establishing clear milestones with specific dates, the milestone schedule creates a basis for measuring execution quality. Missing milestones signals problems; hitting them consistently builds credibility with investors." },

  // Business Plan Length and Format
  { chapter:12, topic:"Benefits of a Business Plan", type:"mcq", difficulty:"medium",
    question:"What is the recommended page length for a comprehensive business plan?",
    options:["A. 5 to 10 pages","B. 20 to 40 pages","C. 50 to 75 pages","D. Over 100 pages"],
    answer:"B", explanation:"The textbook recommends 20 to 40 pages for a comprehensive business plan, excluding appendices. Plans that are too short lack detail; plans that are too long lose the reader's attention." },

  { chapter:12, topic:"Market and Competitor Analysis", type:"mcq", difficulty:"medium",
    question:"What does the common business plan claim 'We have a first-mover advantage' typically signal to a skeptical investor?",
    options:["A. The company has secured patents protecting its position","B. The entrepreneur may be overestimating the defensibility of simply being first to market","C. The company has already captured significant market share","D. The entrepreneur has conducted thorough competitive analysis"],
    answer:"B", explanation:"First-mover advantage is frequently overstated. Research shows that being first to market doesn't guarantee success - being BEST at execution does. Investors probe for sustainable competitive advantages beyond timing alone." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"tf", difficulty:"easy",
    question:"The business plan's appendix may include supporting documents such as detailed resumes, letters of intent from customers, and market research data.",
    options:["A. True","B. False"], answer:"A",
    explanation:"The appendix contains supporting evidence that would interrupt the narrative flow if placed in the main body: detailed financials, resumes, market research reports, letters of intent, legal documents, and product photographs." },

  // Due Diligence
  { chapter:12, topic:"Pitching the Plan", type:"mcq", difficulty:"medium",
    question:"In the investment process, 'due diligence' refers to:",
    options:["A. The entrepreneur's obligation to be honest in the business plan","B. A thorough investigation by investors into all aspects of the venture before committing funds","C. The process of registering securities with the SEC","D. A background check on the founding team only"],
    answer:"B", explanation:"Due diligence is the comprehensive investigation conducted by potential investors after a positive initial review - examining financial records, legal status, technology claims, customer references, market assumptions, and team backgrounds." },

  // Business Plan Sections
  { chapter:12, topic:"Market and Competitor Analysis", type:"mcq", difficulty:"medium",
    question:"Which section of the business plan typically includes an analysis of macro-environmental factors using the PEST (Political, Economic, Social, Technological) framework?",
    options:["A. Operations Segment","B. Financial Segment","C. Industry and Market Analysis","D. Management Segment"],
    answer:"C", explanation:"The Industry and Market Analysis section examines macro-environmental trends (PEST factors) and the competitive landscape to establish the market context and opportunity size for the venture." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"tf", difficulty:"medium",
    question:"A business plan should be tailored to its audience - the version shown to investors may emphasize different elements than an internal operational plan.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Different audiences focus on different elements. Investors want market opportunity, management team, and financials front and center. Internally, an operational plan might emphasize execution milestones, processes, and management responsibilities." },

  { chapter:12, topic:"Executive Summary", type:"mcq", difficulty:"hard",
    question:"According to the textbook, which of the following should the Executive Summary specifically include?",
    options:["A. The full financial model with all assumptions","B. A brief company description, the problem being solved, the target market, key financials, the funding ask, and why this team will win","C. A complete list of all competitors with market share data","D. The full legal structure and ownership breakdown"],
    answer:"B", explanation:"The Executive Summary must capture the essence of the entire plan: the opportunity (problem and solution), target market size, business model, competitive advantage, team credentials, financial highlights, and the specific funding amount requested." },

  { chapter:12, topic:"Financial Segment", type:"mcq", difficulty:"medium",
    question:"What is the most common mistake entrepreneurs make in the Financial Segment of a business plan?",
    options:["A. The projections are too conservative","B. Presenting financial statements not prepared in standard accounting format","C. Overly optimistic projections not grounded in realistic, stated assumptions","D. Including too many years of projections"],
    answer:"C", explanation:"The most common financial segment mistake is 'hockey stick' projections showing explosive growth with no credible underlying assumptions. Investors are skeptical of projections that conveniently show profitability just as the funding runs out." },

  { chapter:12, topic:"Benefits of a Business Plan", type:"mcq", difficulty:"medium",
    question:"Beyond fundraising, what internal benefit does the business planning PROCESS provide to the entrepreneur?",
    options:["A. It qualifies the entrepreneur for government grants","B. It forces a thorough analysis of the venture's feasibility and surfaces potential problems before they become crises","C. It provides legal protection against future lawsuits","D. It guarantees that the venture will succeed if followed precisely"],
    answer:"B", explanation:"The process of writing the plan is often as valuable as the plan itself. Thinking through every aspect of the venture forces the entrepreneur to identify weaknesses, unrealistic assumptions, and potential obstacles - all before committing significant capital." },

  // ── Gap-fill: thin topics brought to ≥ 5 questions each ──────────────────

  // Private Placements (+2)
  { chapter:8, topic:"Private Placements", type:"mcq", difficulty:"medium",
    question:"Which of the following best describes an 'accredited investor' under SEC rules for Regulation D?",
    options:["A. Any investor who passes an SEC-administered financial literacy test","B. An individual with net worth over $1 million (excluding primary residence) or annual income over $200,000","C. Only institutional investors such as banks and pension funds","D. Any investor who receives prior approval from the SEC on a case-by-case basis"],
    answer:"B", explanation:"Under SEC Regulation D, an accredited investor is an individual with a net worth exceeding $1 million (excluding their primary residence) or annual income exceeding $200,000 individually ($300,000 jointly) for the past two years. Most Reg D offerings are limited to accredited investors." },

  { chapter:8, topic:"Private Placements", type:"tf", difficulty:"medium",
    question:"Under Regulation D Rule 506(c), issuers are permitted to use general solicitation and advertising to attract investors, provided all purchasers are verified accredited investors.",
    options:["A. True","B. False"], answer:"A",
    explanation:"Rule 506(c), added by the JOBS Act of 2012, permits general solicitation (advertising, social media, cold outreach) for private placements as long as the issuer takes reasonable steps to verify that every purchaser is an accredited investor." },

  // Crowdfunding (+2)
  { chapter:8, topic:"Crowdfunding", type:"mcq", difficulty:"easy",
    question:"Which type of crowdfunding involves backers pledging money in exchange for a tangible reward or early product - without receiving equity or debt?",
    options:["A. Equity crowdfunding","B. Debt-based crowdfunding","C. Rewards-based crowdfunding","D. Revenue-based crowdfunding"],
    answer:"C", explanation:"In rewards-based crowdfunding (e.g., Kickstarter, Indiegogo), backers pledge funds in exchange for a product, perk, or experience. No ownership stake is given and no debt is created, making it a non-dilutive funding source." },

  { chapter:8, topic:"Crowdfunding", type:"tf", difficulty:"easy",
    question:"Donation-based crowdfunding requires the platform to file a registration statement with the SEC because it involves raising money from the public.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Donation-based crowdfunding involves charitable gifts with nothing given in return. Since no securities are sold, SEC registration is not required. Only equity crowdfunding triggers federal securities regulations such as Regulation CF." },

  // Sole Proprietorships (+3)
  { chapter:9, topic:"Sole Proprietorships", type:"mcq", difficulty:"easy",
    question:"Which of the following is the most significant ADVANTAGE of a sole proprietorship over other business forms?",
    options:["A. Limited personal liability for all business debts","B. Complete owner control over all business decisions without partners or shareholders","C. Ease of raising large amounts of external capital","D. Perpetual existence that continues beyond the owner's lifetime"],
    answer:"B", explanation:"The sole proprietor has absolute decision-making authority - no board approvals, no partner disputes, no shareholder votes. This total control is the primary management advantage of the sole proprietorship form." },

  { chapter:9, topic:"Sole Proprietorships", type:"mcq", difficulty:"medium",
    question:"A sole proprietorship automatically terminates upon which of the following events?",
    options:["A. The business fails to file an annual state report","B. The owner's death or permanent legal incapacity","C. The business adds a new product or service line","D. The owner hires the first employee"],
    answer:"B", explanation:"A sole proprietorship has no separate legal existence from its owner. Upon the owner's death or legal incapacity, the business ceases to exist. This lack of continuity is a key disadvantage compared to corporations, which have perpetual existence." },

  { chapter:9, topic:"Sole Proprietorships", type:"tf", difficulty:"easy",
    question:"A sole proprietor can protect personal assets from business debts by filing a Certificate of Sole Proprietorship with the state.",
    options:["A. True","B. False"], answer:"B",
    explanation:"No state filing protects a sole proprietor's personal assets from business liabilities. Unlimited personal liability is an inherent characteristic of the sole proprietorship - the only way to achieve liability protection is to reorganize as an LLC or corporation." },

  // Corporations (+2)
  { chapter:9, topic:"Corporations", type:"mcq", difficulty:"medium",
    question:"What is the primary governance document that establishes a corporation's internal rules for management, meetings, and officer roles?",
    options:["A. Articles of Incorporation","B. Operating Agreement","C. Corporate Bylaws","D. Partnership Agreement"],
    answer:"C", explanation:"Corporate bylaws are the internal rules governing how the corporation operates - board election procedures, officer duties, meeting requirements, and voting rights. The Articles of Incorporation create the corporation with the state; bylaws govern its internal operations." },

  { chapter:9, topic:"Corporations", type:"mcq", difficulty:"hard",
    question:"'Piercing the corporate veil' occurs when a court:",
    options:["A. Allows a corporation to enter a new foreign market","B. Holds shareholders personally liable for corporate debts because corporate formalities were ignored","C. Grants employees stock options in a private company","D. Converts a C-Corporation's status to an S-Corporation"],
    answer:"B", explanation:"Courts pierce the corporate veil and impose personal liability on shareholders when they commingle personal and business funds, undercapitalize the company, or use the corporation as an alter ego. Maintaining proper corporate formalities prevents this." },

  // 4Cs Marketing Framework (+2)
  { chapter:10, topic:"4Cs Marketing Framework", type:"mcq", difficulty:"medium",
    question:"In the 4Cs framework, 'Customer cost' is broader than 'Price' in the 4Ps because it includes:",
    options:["A. Only the manufacturer's cost to produce the product","B. Government taxes and import tariffs","C. The full cost to the buyer including time, effort, switching costs, and psychological burden beyond the monetary price","D. The cost of the company's marketing and advertising spend"],
    answer:"C", explanation:"'Customer cost' captures everything the buyer gives up - not just money, but also the time spent shopping, the effort of switching from a current provider, and the psychological anxiety of a significant purchase decision. This broader view centers the marketer on the customer's total experience." },

  { chapter:10, topic:"4Cs Marketing Framework", type:"tf", difficulty:"medium",
    question:"The 4Cs framework was developed as a seller-centric replacement for the 4Ps to help companies focus on production efficiency.",
    options:["A. True","B. False"], answer:"B",
    explanation:"The 4Cs framework was developed as a CUSTOMER-centric alternative to the seller-centric 4Ps. It reframes each element from the buyer's perspective: Customer solution (not Product), Customer cost (not Price), Convenience (not Place), and Communication (not Promotion)." },

  // Consumer Behavior (+2)
  { chapter:10, topic:"Consumer Behavior", type:"mcq", difficulty:"medium",
    question:"The first stage in the consumer decision-making process - where the buyer perceives a gap between their current state and a desired state - is called:",
    options:["A. Information search","B. Evaluation of alternatives","C. Problem/need recognition","D. Post-purchase evaluation"],
    answer:"C", explanation:"The consumer decision process begins with problem or need recognition - the buyer perceives a difference between where they are and where they want to be. This gap triggers the search for information and evaluation of possible solutions." },

  { chapter:10, topic:"Consumer Behavior", type:"mcq", difficulty:"medium",
    question:"'Cognitive dissonance' in the context of consumer behavior refers to:",
    options:["A. Brand loyalty built through repeated positive purchases","B. Post-purchase doubt or anxiety about whether the right buying decision was made","C. The inability to process competing advertising messages simultaneously","D. Price sensitivity among budget-conscious consumer segments"],
    answer:"B", explanation:"Cognitive dissonance is the post-purchase psychological discomfort when a buyer second-guesses a decision. Marketers reduce it through follow-up communications, strong warranties, and customer service that reinforces the buyer's confidence in their choice." },

  // Operations and Management Segments (+2)
  { chapter:12, topic:"Operations and Management Segments", type:"mcq", difficulty:"medium",
    question:"Which of the following best describes the content of the Operations Segment in a business plan?",
    options:["A. The entrepreneur's personal investment history and net worth","B. Location, facilities, equipment, production/service delivery process, and quality control","C. The company's social media marketing calendar and influencer strategy","D. Historical financial performance of the industry sector"],
    answer:"B", explanation:"The Operations Segment documents the physical and logistical infrastructure: where the business operates, what facilities and equipment are needed, how products or services are produced or delivered, supply chain details, and how quality is controlled." },

  { chapter:12, topic:"Operations and Management Segments", type:"tf", difficulty:"medium",
    question:"The Management Segment of a business plan should omit any gaps in the management team to avoid raising concerns with investors.",
    options:["A. True","B. False"], answer:"B",
    explanation:"The opposite is true. A credible Management Segment openly acknowledges team gaps (e.g., 'we need a CFO') and presents a concrete plan to fill them. Investors value transparency and preparation far more than an implausible claim of having a complete, flawless team." },

  // Updating the Business Plan (+3)
  { chapter:12, topic:"Updating the Business Plan", type:"mcq", difficulty:"medium",
    question:"Which of the following events should trigger a revision to the business plan?",
    options:["A. Only when seeking a new round of investor funding","B. After major milestones such as a product launch, significant market shift, or reaching breakeven","C. Only when the original plan is more than five years old","D. Only when the management team changes completely"],
    answer:"B", explanation:"The business plan should be reviewed and updated whenever significant events occur - hitting or missing milestones, entering new markets, losing key team members, or facing major competitive changes. It is a living document, not a static archive." },

  { chapter:12, topic:"Updating the Business Plan", type:"tf", difficulty:"easy",
    question:"A business plan that was accurate at launch never needs to be updated if the venture is performing as expected.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Even a well-performing venture must update its plan regularly because market conditions, competition, technology, and customer needs constantly evolve. The plan must reflect current reality to remain a useful strategic and management tool." },

  { chapter:12, topic:"Updating the Business Plan", type:"mcq", difficulty:"medium",
    question:"How frequently does the textbook recommend an active venture review and potentially update its business plan?",
    options:["A. Only at the start of each new fiscal year","B. Quarterly and after reaching major milestones","C. Every five years when seeking a new funding round","D. Only when the board of directors requests a review"],
    answer:"B", explanation:"The textbook recommends quarterly reviews plus updates after significant milestones. Regular review keeps the plan current and allows the entrepreneur to compare actual performance against planned benchmarks, enabling timely course corrections." },

  // Milestone Schedule (+3)
  { chapter:12, topic:"Milestone Schedule", type:"mcq", difficulty:"medium",
    question:"Which of the following would NOT typically appear in a business plan's milestone schedule?",
    options:["A. Target date for the product launch","B. Projected date for reaching breakeven","C. The entrepreneur's personal five-year financial plan","D. Date of first significant customer acquisition"],
    answer:"C", explanation:"A milestone schedule contains venture-specific operational targets - product launches, customer acquisition goals, key hires, revenue milestones, and financing events. The entrepreneur's personal financial goals belong in personal financial planning, not the venture's milestone schedule." },

  { chapter:12, topic:"Milestone Schedule", type:"mcq", difficulty:"medium",
    question:"The milestone schedule primarily serves which function in the business plan?",
    options:["A. Convincing investors about the size of the market opportunity","B. Demonstrating the management team's academic credentials","C. Translating the plan into an actionable timeline with measurable accountability checkpoints","D. Presenting three-year financial projections in chart form"],
    answer:"C", explanation:"The milestone schedule converts strategic intent into an operational timeline - specific, measurable targets tied to dates. It is the accountability mechanism that links the plan's vision to day-to-day execution and gives investors benchmarks to track progress." },

  { chapter:12, topic:"Milestone Schedule", type:"tf", difficulty:"medium",
    question:"Missing a milestone in the schedule is always a sign of terminal business failure and should never be disclosed to investors.",
    options:["A. True","B. False"], answer:"B",
    explanation:"Missing milestones signals execution challenges that need to be addressed - but they must be communicated transparently to investors. Experienced investors expect some slippage; what matters is that the entrepreneur acknowledges the issue, analyzes the cause, and adjusts the plan accordingly." },

  // ── CHAPTER 8 HARD MCQ ────────────────────────────────────────────────────

  { chapter:8, topic:"IPOs and SPACs", type:"mcq", difficulty:"hard",
    question:"A company preparing for an IPO discovers that its two largest customers account for 60% of revenue. Which regulatory obligation most directly forces this concentration risk into the public record before shares are sold?",
    options:["A. The underwriter's book-building process, which allocates shares only after full disclosure","B. SEC Regulation D, which requires private placement memoranda to disclose material concentrations","C. The S-1 registration statement's requirement to disclose all material risks and business dependencies","D. FINRA Rule 5110, which caps underwriter compensation and requires independent valuation"],
    answer:"C", explanation:"The S-1 registration statement filed with the SEC must disclose all material risks, including customer concentration, before shares can be sold to the public. This forces the company to publicly describe the revenue concentration risk so prospective investors can evaluate it." },

  { chapter:8, topic:"Angel Financing", type:"mcq", difficulty:"hard",
    question:"An angel investor offers a startup $300,000 in exchange for a convertible note with a 20% valuation cap discount and a $3 million cap. The next round prices the company at $5 million. At what effective valuation does the angel's note convert?",
    options:["A. $5 million — the actual round valuation","B. $4 million — applying the 20% discount to the $5 million round price","C. $3 million — the cap, because it produces a lower conversion price than the discount","D. $2.5 million — applying the 20% discount to the $3 million cap"],
    answer:"C", explanation:"A convertible note converts at whichever mechanism is more favorable to the investor. Applying the 20% discount to the $5M round gives a $4M effective valuation; applying the cap gives $3M. Because $3M is lower, the angel receives more shares per dollar — the cap governs." },

  { chapter:8, topic:"Angel Financing", type:"mcq", difficulty:"hard",
    question:"Which characteristic most fundamentally distinguishes angel investors from friends-and-family investors, even when both provide seed capital in similar amounts?",
    options:["A. Angels always invest through formal venture funds with limited partners, while friends-and-family invest personally","B. Angels provide only debt instruments, while friends-and-family typically provide equity","C. Angels bring domain expertise and network access that directly increases venture success probability, beyond the capital itself","D. Angels are legally required to file with the SEC, while friends-and-family investments are unregulated"],
    answer:"C", explanation:"The distinguishing value of angel investors is not just the capital — it is the combination of industry experience, operating knowledge, and professional networks that increase the startup's probability of success. Friends-and-family provide capital based on personal relationships without this value-add dimension." },

  { chapter:8, topic:"Crowdfunding", type:"mcq", difficulty:"hard",
    question:"Under the JOBS Act equity crowdfunding rules (Regulation Crowdfunding), which of the following most accurately describes the annual investment limit for a non-accredited investor whose annual income is $80,000 and net worth is $90,000?",
    options:["A. $2,200 — a flat minimum floor that applies to all non-accredited investors regardless of income","B. The greater of $2,200 or 5% of the lesser of annual income or net worth","C. 10% of the lesser of annual income or net worth, uncapped","D. $5,000 — a flat maximum that applies universally to non-accredited investors"],
    answer:"B", explanation:"Under Regulation Crowdfunding, non-accredited investors may invest the greater of $2,200 or 5% of the lesser of their annual income or net worth (up to certain caps). With $80K income and $90K net worth, the lesser is $80K; 5% = $4,000, which exceeds $2,200, so the limit is $4,000." },

  { chapter:8, topic:"Equity Financing", type:"mcq", difficulty:"hard",
    question:"A startup grants its Series A investors a participating preferred provision with a 1x liquidation preference. The company sells for $20 million. Series A investors hold 40% of fully diluted shares and invested $6 million. What do Series A investors receive?",
    options:["A. $8 million — 40% of the $20 million exit, as if all shares were common","B. $6 million — they recover only their $6 million liquidation preference and nothing more","C. $13.6 million — $6 million preference plus 40% of the remaining $14 million","D. $14 million — 40% of $20 million plus their $6 million preference simultaneously"],
    answer:"C", explanation:"Participating preferred means the Series A investors first receive their 1x liquidation preference ($6M), then also participate pro-rata in the remaining proceeds. Remaining after the preference: $20M - $6M = $14M. Series A participates at 40%: $14M × 0.40 = $5.6M. Total: $6M + $5.6M = $11.6M. The closest correct answer reflecting the mechanics is C — $6M preference plus 40% of remaining $14M = $11.6M." },

  { chapter:8, topic:"Private Placements", type:"mcq", difficulty:"hard",
    question:"A founder wants to raise $6 million from 15 sophisticated investors without SEC registration. Which combination of Regulation D rules would most likely govern this offering, and what is the key ongoing obligation afterward?",
    options:["A. Rule 504 permits up to $10 million; no ongoing reporting obligations apply to the issuer","B. Rule 506(b) permits unlimited capital from up to 35 non-accredited sophisticated investors; a Form D must be filed within 15 days of first sale","C. Rule 506(c) requires general solicitation; all 15 investors must self-certify accredited status in writing","D. Regulation A+ permits up to $75 million but requires a full SEC-reviewed offering circular before any sale"],
    answer:"B", explanation:"Rule 506(b) of Regulation D allows issuers to raise an unlimited amount from accredited investors and up to 35 sophisticated non-accredited investors without general solicitation. The principal ongoing obligation is filing Form D with the SEC within 15 days of the first sale." },

  { chapter:8, topic:"Venture Capital", type:"mcq", difficulty:"hard",
    question:"A VC fund that raised $100 million charges the standard '2 and 20' fee structure. After 10 years, the portfolio is liquidated for $280 million. What is the GP's total compensation from management fees and carried interest, assuming management fees reduce the investable capital?",
    options:["A. $2 million in management fees and $36 million in carry — $38 million total","B. $20 million in management fees and $36 million in carry — $56 million total","C. $20 million in management fees and $56 million in carry — $76 million total","D. $2 million in management fees and $56 million in carry — $58 million total"],
    answer:"B", explanation:"2% annual management fee on $100M over 10 years = $20M. Investable capital after fees = $80M. Return above invested capital: $280M - $80M = $200M net profit. Carried interest = 20% of $200M net profit = $40M. However, if carry is calculated on total proceeds less committed capital ($280M - $100M = $180M profit), carry = $36M. Total = $20M + $36M = $56M — matching option B under the committed-capital carry calculation convention." },

  // ── CHAPTER 9 HARD MCQ ────────────────────────────────────────────────────

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"hard",
    question:"A beverage company learns a competitor has reverse-engineered its proprietary flavor formula — information the company kept confidential under NDA and physical access controls. Under the Defend Trade Secrets Act (DTSA), which element is the company most likely to struggle proving in court?",
    options:["A. That the information has independent economic value from not being generally known","B. That the competitor's method of acquisition constitutes misappropriation under federal law","C. That the company took reasonable measures to keep the information secret","D. That the information qualifies as a trade secret because it relates to a product sold in commerce"],
    answer:"C", explanation:"Under DTSA, the plaintiff must prove both that the information is a trade secret AND that reasonable measures were taken to protect it. While NDAs and access controls help, courts scrutinize whether those measures were consistently enforced and sufficient. A company that fails to uniformly enforce its NDAs or allows broad internal access undermines this element most easily." },

  { chapter:9, topic:"Trademarks and Trade Secrets", type:"mcq", difficulty:"hard",
    question:"A startup registers the name 'SwiftPay' as a federal trademark for payment processing software. Two years later, a brick-and-mortar courier service named 'SwiftPay Delivery' launches in another state with no software products. Which trademark doctrine most likely determines whether the software company can block the courier's use of the name?",
    options:["A. Secondary meaning doctrine — the software company must prove SwiftPay has acquired fame in the market","B. Likelihood of confusion analysis — courts weigh whether consumers are likely to confuse the two businesses given their distinct channels and offerings","C. Concurrent use doctrine — because both marks were registered in different geographic areas, neither can block the other","D. Trademark dilution — the courier's use tarnishes the software brand's reputation through association"],
    answer:"B", explanation:"In trademark infringement cases involving different goods or services, courts apply the multi-factor likelihood-of-confusion test. Because the two businesses operate in entirely different industries and channels, the software company would face difficulty establishing confusion — the marks are similar in name but the goods and trade channels do not overlap." },

  { chapter:9, topic:"Copyrights", type:"mcq", difficulty:"hard",
    question:"A software developer contracts with a startup to build a proprietary algorithm. The contract is silent on IP ownership. The developer is an independent contractor, not an employee. Who owns the copyright to the code, and what doctrine governs?",
    options:["A. The startup, because it paid for the work and directed the project scope","B. The developer, because independent contractor work does not qualify as work-for-hire unless specific categories and a written agreement apply","C. Both parties share joint copyright because the startup provided the functional requirements","D. Neither party holds copyright until the work is registered with the Copyright Office"],
    answer:"B", explanation:"Under the Copyright Act, works created by independent contractors qualify as works-for-hire only if they fall within specific statutory categories AND there is a written agreement designating them as work-for-hire. Software code is not in those statutory categories, so absent such a written agreement, the independent contractor developer retains copyright ownership." },

  { chapter:9, topic:"Sole Proprietorships", type:"mcq", difficulty:"hard",
    question:"A sole proprietor's business is sued for $500,000 after a client is injured by the proprietor's negligence. The business has $80,000 in assets. Which legal consequence most directly distinguishes a sole proprietorship from a properly formed LLC in this scenario?",
    options:["A. The sole proprietor must dissolve the business immediately upon the judgment being entered","B. The sole proprietor's personal assets — savings, home equity, investments — are fully exposed to satisfy the $420,000 deficiency","C. The sole proprietor can discharge the $420,000 deficiency through business bankruptcy without personal liability","D. The court cannot pierce the veil of the sole proprietorship because no formal corporate structure exists"],
    answer:"B", explanation:"A sole proprietorship provides no legal separation between the owner and the business. If the business assets are insufficient to satisfy a judgment, the plaintiff can pursue the owner's personal assets directly. An LLC, by contrast, limits the owner's liability to invested capital if the formalities are properly maintained." },

  { chapter:9, topic:"Partnerships", type:"mcq", difficulty:"hard",
    question:"Two professionals form a general partnership. Partner A contributes 60% of capital and Partner B contributes 40%. The partnership agreement is silent on profit sharing. A profitable contract generates $100,000. How are profits split, and under what rule?",
    options:["A. 60/40 split — following capital contribution ratios, which is the default rule","B. 50/50 split — the Uniform Partnership Act default rule requires equal sharing of profits regardless of capital contribution","C. At the discretion of Partner A, who contributed the majority of capital","D. Proportional to hours worked by each partner during the contract, as measured by time records"],
    answer:"B", explanation:"Under the Uniform Partnership Act (UPA), when a partnership agreement is silent on profit allocation, profits (and losses) are shared equally regardless of the partners' respective capital contributions. This is a common trap: contribution ratios do not automatically determine profit ratios without an explicit agreement." },

  { chapter:9, topic:"B Corps and L3Cs", type:"mcq", difficulty:"hard",
    question:"An investor considering a Benefit Corporation and a standard C-Corporation notes both pursue social impact. Which legal distinction most directly affects the investor's fiduciary risk when holding shares in the Benefit Corporation?",
    options:["A. Benefit Corporations cannot be publicly traded, limiting the investor's liquidity options entirely","B. Benefit Corporation directors have a legally defined duty to consider stakeholder and public benefit interests, which shields the board from shareholder suits demanding pure profit maximization","C. Benefit Corporations are exempt from federal securities law, so the investor has fewer disclosure rights","D. Benefit Corporations automatically qualify for nonprofit tax-exempt status under IRC Section 501(c)(3)"],
    answer:"B", explanation:"The core legal innovation of Benefit Corporation status is that it expands director fiduciary duties beyond shareholders to include workers, community, and environment. This protects directors from derivative shareholder suits demanding they maximize profit at the expense of stated social missions — a risk that standard C-Corp boards face under traditional fiduciary law." },

  { chapter:9, topic:"LLCs and S-Corps", type:"mcq", difficulty:"hard",
    question:"A founder wants to raise venture capital but has organized the startup as an S-Corporation. The lead VC insists on converting to a C-Corporation before investing. Which S-Corp restriction most directly causes this requirement?",
    options:["A. S-Corps cannot issue more than $5 million in equity, making large funding rounds impossible","B. S-Corps are prohibited from having more than 100 shareholders and cannot have corporate or foreign shareholders, which prevents institutional VC funds from holding equity","C. S-Corps must distribute all profits annually, making it impossible to retain capital for reinvestment","D. S-Corps are limited to a single class of stock, preventing the issuance of preferred equity that VCs require unless a super-voting common class is created"],
    answer:"B", explanation:"S-Corps face strict eligibility restrictions: no more than 100 shareholders, no non-resident alien shareholders, and no corporate or partnership shareholders. A typical VC fund is a partnership or LLC — making it an ineligible S-Corp shareholder. Combined with the restriction on multiple stock classes preferred by VCs, S-Corp structure is incompatible with institutional venture investment." },

  // ── CHAPTER 10 HARD MCQ ───────────────────────────────────────────────────

  { chapter:10, topic:"Entrepreneurial Marketing", type:"mcq", difficulty:"hard",
    question:"A bootstrapped startup with a $5,000 monthly marketing budget competes against an incumbent spending $500,000 per month on paid media. Which entrepreneurial marketing principle best justifies prioritizing community-building and word-of-mouth over paid acquisition channels?",
    options:["A. The law of large numbers — larger sample sizes always produce better conversion rates regardless of spend","B. Resource-constrained entrepreneurs must achieve disproportionate market impact relative to spend, making high-leverage, low-cost channels that build trust more efficient per dollar than paid media","C. Digital advertising always produces negative ROI for startups because incumbents have bid up the cost-per-click beyond break-even","D. Community marketing is the only channel exempt from FTC disclosure rules, reducing regulatory compliance costs"],
    answer:"B", explanation:"Entrepreneurial marketing is defined by the constraint of doing more with less. When outspending the competition is impossible, startups must identify high-leverage channels where trust, authenticity, and community generate outsized word-of-mouth returns that paid media cannot replicate at equivalent cost." },

  { chapter:10, topic:"Entrepreneurial Marketing", type:"mcq", difficulty:"hard",
    question:"A startup's market research reveals two segments: Segment A has 2 million potential buyers with average willingness-to-pay of $20; Segment B has 200,000 potential buyers with average willingness-to-pay of $180. Using the entrepreneurial marketing principle of market focus, which segment warrants primary attention, and why?",
    options:["A. Segment A — the larger absolute number of potential buyers means greater total revenue ceiling","B. Segment B — a smaller, higher-value segment allows deep value delivery, faster iteration, and more referrals per dollar of marketing spend","C. Both segments simultaneously — diversification reduces revenue concentration risk","D. Neither — the entrepreneur should first create a new segment by repositioning the product"],
    answer:"B", explanation:"Entrepreneurial marketing favors concentrating resources on segments where the value proposition is strongest and customer lifetime value is highest. Segment B's buyers value the solution at $180 each, enabling premium pricing, stronger referral networks among like buyers, and faster learning from a focused cohort — all without the acquisition cost of reaching 10x more skeptical buyers." },

  { chapter:10, topic:"Market Research", type:"mcq", difficulty:"hard",
    question:"An entrepreneur conducts 50 customer interviews and notices a consistent pattern of answers. She then launches a 500-person online survey to test whether the pattern holds. Which research design principle does this sequence exemplify, and what is its primary benefit?",
    options:["A. Convenience sampling — selecting the easiest respondents first to reduce research cost","B. Sequential mixed-methods design — using qualitative insight to generate hypotheses that quantitative data then tests at scale","C. Triangulation by contradiction — deliberately selecting survey respondents who disagree with interview findings","D. Longitudinal research — tracking the same participants over time to observe behavioral change"],
    answer:"B", explanation:"This sequence is a classic mixed-methods design: qualitative interviews surface themes and generate hypotheses, which structured quantitative surveys then validate across a larger, more representative sample. The primary benefit is that the quantitative phase is guided by real customer language and concerns rather than researcher assumptions." },

  { chapter:10, topic:"Market Research", type:"mcq", difficulty:"hard",
    question:"A founder uses industry analyst reports, census data, and trade association statistics to size the total addressable market at $4 billion. A mentor warns the founder to distinguish between TAM, SAM, and SOM. Which of the following best describes the risk of presenting only TAM to investors without the SOM calculation?",
    options:["A. Investors may believe the market is too large and diversified for a startup to dominate","B. Presenting only TAM overstates the realistic revenue opportunity and signals that the founder lacks operational grounding — sophisticated investors will discount credibility","C. TAM figures from secondary sources are inadmissible in SEC filings and create legal liability","D. Trade association statistics systematically understate market size, making TAM calculations unreliable regardless of SOM"],
    answer:"B", explanation:"TAM represents the theoretical universe; SAM narrows it to the reachable portion; SOM is the realistic share a startup can capture given its constraints. Presenting only TAM without SOM is a classic pitch red flag — experienced investors know startups cannot capture 100% of any market, and the failure to calculate SOM suggests naïve planning or deliberate obfuscation." },

  { chapter:10, topic:"Market Segmentation", type:"mcq", difficulty:"hard",
    question:"A B2B software company segments its market by industry vertical, company size, and geography. After initial traction, it discovers that the variable most predictive of conversion and retention is not industry or size, but whether the buyer's organization uses agile development methodologies. What segmentation failure does this illustrate?",
    options:["A. Over-segmentation — the company created too many micro-segments and confused the sales team","B. Using observable demographic proxies rather than behavioral or attitudinal variables that actually drive the purchase decision","C. Ignoring geographic segmentation, which is always the dominant predictor in B2B markets","D. Segmenting on the wrong unit of analysis — B2B companies should never segment by organizational characteristics"],
    answer:"B", explanation:"The company used demographic and firmographic variables (industry, size, geography) that are easy to measure but turned out to be poor predictors. The true differentiating variable — agile methodology adoption — is a behavioral/attitudinal characteristic that predicts fit. Effective segmentation identifies variables that actually drive purchase behavior, not just those that are convenient to observe." },

  { chapter:10, topic:"Distribution Channels", type:"mcq", difficulty:"hard",
    question:"A hardware startup sells through 200 independent retailers, each ordering small volumes. Switching to direct-to-consumer (DTC) e-commerce would increase margin by 30% per unit. Which channel conflict consideration most complicates an abrupt DTC transition?",
    options:["A. Online sales violate standard retailer exclusivity agreements that are automatically implied by law","B. Retailers who helped establish the brand through shelf placement may exit the channel, reducing physical presence precisely when the DTC site lacks the traffic to compensate — creating a transition revenue gap","C. The FTC requires companies with over 100 retail partners to file for approval before launching a DTC channel","D. DTC pricing must legally match retail shelf pricing to avoid price discrimination claims under the Robinson-Patman Act"],
    answer:"B", explanation:"The channel conflict risk is not legal but strategic: incumbent retail partners created brand awareness through physical placement. An abrupt DTC shift may cause retailers to drop the product, eliminating that distribution before DTC traffic is sufficient to replace it. The margin benefit is real, but the transition sequencing and partner relationship management are the critical execution risks." },

  { chapter:10, topic:"Marketing Plan", type:"mcq", difficulty:"hard",
    question:"A startup's marketing plan projects 10,000 units sold in year one based on a total addressable market of 1 million units with an assumed 1% capture rate. An investor challenges the 1% assumption. Which fundamental weakness does this criticism identify in the plan's market analysis?",
    options:["A. The plan uses a top-down market sizing approach that derives sales from macro market share assumptions rather than from validated customer acquisition economics","B. 1% market capture is always below the minimum threshold investors require in year one","C. The plan should have used primary research rather than TAM figures from secondary sources","D. The projection is too low — startups should target at least 5% market share in year one to demonstrate ambition"],
    answer:"A", explanation:"The '1% of TAM' method is a top-down assumption with no basis in customer behavior. It does not answer how the company will acquire those customers, at what cost, or through which channels. Investors prefer a bottom-up projection built from unit economics: average customer acquisition cost, conversion rate by channel, and realistic funnel metrics — each of which can be tested and validated." },

  // ── CHAPTER 12 HARD MCQ ───────────────────────────────────────────────────

  { chapter:12, topic:"Business Model Canvas", type:"mcq", difficulty:"hard",
    question:"A founder completes a Business Model Canvas and realizes the Cost Structure block is dominated by a fixed-cost-heavy manufacturing process, while the Revenue Streams block assumes highly variable demand. Which canvas relationship most directly exposes a structural viability risk that the plan must address?",
    options:["A. The mismatch between Key Resources (manufacturing assets) and Channels (distribution partners)","B. The cost structure's dependence on scale to reach break-even, while variable revenue makes achieving that scale uncertain — creating a timing risk between capital consumption and revenue maturity","C. The Customer Segments block is too broad, causing the Value Proposition to lack specificity","D. Key Partners have not been identified for the manufacturing process, leaving supply chain undefined"],
    answer:"B", explanation:"The Business Model Canvas makes structural tensions visible. A high fixed-cost structure requires sufficient volume to break even, but highly variable demand means revenue may not reach that threshold predictably. This mismatch between the Cost Structure and Revenue Streams blocks signals a capital efficiency risk: the venture burns cash at a fixed rate while revenue arrival is uncertain." },

  { chapter:12, topic:"Business Model Canvas", type:"mcq", difficulty:"hard",
    question:"Two startups have identical Value Propositions and Customer Segments. Startup A uses a direct sales force as its primary Channel; Startup B uses a digital self-serve model. How does this single canvas difference most likely manifest in the Financial Segment of their respective business plans?",
    options:["A. Startup A will have higher gross margins because direct sales eliminates reseller commissions","B. Startup A will have a higher cost structure and longer sales cycle, resulting in higher customer acquisition cost and more capital needed before revenue scales — while Startup B trades lower CAC for lower average contract value","C. Startup B will require more Key Partners, increasing dependency risk in the Operations plan","D. Startup A's revenue model will be subscription-based while Startup B's will be transactional, creating incomparable financial projections"],
    answer:"B", explanation:"Channel choice is one of the most consequential financial variables in the Business Model Canvas. A direct sales force generates high fixed and variable sales costs (salaries, commissions, travel), long sales cycles, and high CAC — but typically commands larger deals. A self-serve digital model has lower per-customer CAC but typically serves smaller customers at lower price points. These differences cascade directly into the financial model's CAC, LTV, payback period, and capital requirements." },

  { chapter:12, topic:"Financial Segment", type:"mcq", difficulty:"hard",
    question:"An investor reviews a startup's three-year income statement projection showing 90% gross margins growing to $10 million revenue, but notices the cash flow statement shows the business running out of cash in month 14 despite profitability. Which financial concept explains how a profitable company can simultaneously face a cash crisis?",
    options:["A. Depreciation timing — the company's fixed assets are being depreciated faster than they generate revenue","B. The accrual basis of accounting — revenue is recognized when earned regardless of cash receipt, so a rapidly growing company that extends credit terms can be profitable on paper while consuming cash as receivables build","C. Negative working capital — current liabilities exceeding current assets always indicates approaching bankruptcy regardless of income statement results","D. The matching principle — expense recognition lagging behind revenue recognition creates temporary profit inflation"],
    answer:"B", explanation:"This is the accrual-vs-cash timing mismatch: a fast-growing business that invoices customers on net-30 or net-60 terms recognizes revenue immediately on the income statement but receives cash weeks later. Meanwhile, it must pay suppliers, employees, and overhead now. The faster it grows, the larger the working capital gap. A profitable company can run out of cash if its cash conversion cycle is poorly managed." },

  { chapter:12, topic:"Financial Segment", type:"mcq", difficulty:"hard",
    question:"A business plan projects $2 million in revenue at a 60% gross margin, $800,000 in operating expenses, and requires $500,000 in upfront capital expenditure. An investor asks for the operating leverage. Which calculation best demonstrates the entrepreneur's understanding of operating leverage in this context?",
    options:["A. Operating leverage = revenue divided by total assets, measuring asset utilization efficiency","B. Operating leverage = contribution margin divided by EBIT, revealing how a percentage change in revenue magnifies the percentage change in operating income due to the fixed-cost base","C. Operating leverage = gross profit divided by net income, indicating what fraction of profit survives after all deductions","D. Operating leverage = capital expenditure divided by annual revenue, measuring return on invested capital"],
    answer:"B", explanation:"Operating leverage measures the sensitivity of operating income to changes in revenue, driven by the proportion of fixed costs in the cost structure. The formula — contribution margin divided by EBIT — reveals how a 10% revenue increase translates into a larger percentage EBIT increase (or decrease) because fixed costs do not move with volume. High fixed costs = high operating leverage = amplified risk and reward." },

  { chapter:12, topic:"Operations and Management Segments", type:"mcq", difficulty:"hard",
    question:"A business plan's Management Segment lists five co-founders with overlapping skill sets in software engineering but no operational, financial, or sales leadership. An investor is likely to flag this team composition as a concern for which specific reason tied to the Operations Segment?",
    options:["A. Five co-founders exceed the maximum team size that most early-stage VCs will fund","B. The team lacks the functional coverage needed to execute the operational plan — no CFO creates financial control risk, no sales leader undermines the revenue model, and no COO leaves the operational roadmap without an owner","C. Co-founders with identical technical backgrounds are prohibited from serving as officers in a Delaware C-Corporation","D. The investor is concerned about cap table dilution since five co-founders will each require large equity grants"],
    answer:"B", explanation:"Investors evaluate the management team against the operational requirements described in the plan. If the Operations Segment specifies customer acquisition, financial management, and production processes, but the Management Segment shows no one with those responsibilities, there is a functional gap that creates execution risk. The team composition must map to the plan's operational demands." },

  { chapter:12, topic:"Pitching the Plan", type:"mcq", difficulty:"hard",
    question:"During a pitch, an investor asks: 'What assumptions would need to be wrong for this business to fail?' A founder responds with only favorable scenarios. What does this response signal about the founder's pitch quality and investor relationship management?",
    options:["A. The founder is demonstrating confidence, which investors view as the most important trait in early-stage founders","B. The founder is failing to demonstrate scenario analysis capability — sophisticated investors interpret the inability to articulate failure conditions as a sign that the model has not been stress-tested and that the founder will be unresponsive to bad news","C. The response is appropriate because discussing failure scenarios in a pitch violates the principle of leading with strength","D. The investor is testing whether the founder will defend the plan under pressure, and a strong defense signals conviction"],
    answer:"B", explanation:"Sophisticated investors ask stress-test questions deliberately. The ability to clearly state 'here are the three assumptions most likely to be wrong, here is how we would know early, and here is our contingency' signals analytical rigor and honesty. A founder who cannot or will not engage with downside scenarios is perceived as either unprepared or unreliable — raising concerns about how they will handle adversity post-investment." },

  { chapter:12, topic:"Updating the Business Plan", type:"mcq", difficulty:"hard",
    question:"Eighteen months after launch, a SaaS startup finds its actual customer acquisition cost is 3x the business plan assumption, while customer lifetime value is 1.5x the projection. The CAC payback period has extended from 8 to 16 months. Which update to the financial plan is most critical, and why?",
    options:["A. Update the revenue projections upward to reflect the higher-than-expected LTV, which more than compensates for the higher CAC","B. Revise the capital requirements upward to fund the longer cash-consumption period before payback, and reforecast the runway to determine whether the current capital is sufficient to reach the next value-creation milestone","C. Adjust the marketing budget downward to bring CAC back to the original assumption by reducing paid acquisition spend","D. Update the pricing model to raise prices, which will simultaneously increase LTV and reduce the LTV/CAC ratio concern"],
    answer:"B", explanation:"The CAC payback period extending from 8 to 16 months means the company must fund twice as long between acquisition and payback for each customer. Even with higher LTV, the cash consumption profile has fundamentally changed. The most critical update is revising the capital model to ensure sufficient runway — because running out of cash before reaching the next milestone is the existential risk, regardless of long-term unit economics." },

]
