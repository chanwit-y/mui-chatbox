/**
 * Demo responses for the ChatBox component
 * Structured based on amigo_doa_response.json format
 */

export interface Source {
	title: string;
	content: string;
	path: string;
	media_type: string;
	relevance_score: number;
}

export interface Answer {
	role: string;
	content: string;
}

export interface DemoResponse {
	created: number;
	contextualized_question: string;
	answer: Answer;
	sources: Source[];
}

export const demoResponses: DemoResponse[] = [
	{
		created: Date.now(),
		contextualized_question: "Who is responsible for approving the project investment when the internal rate of return (IRR) criteria are not met?",
		answer: {
			role: "assistant",
			content: "## Investment Approval Authority 📋\n\nWhen the **internal rate of return (IRR)** criteria are not met, the approval for a project investment should be referred to the **approver of the discount grant authority** in the Delegation of Authority (DOA).\n\n### Key Points:\n- The discount is calculated referring to the required IRR\n- Then proceed to the appropriate approver in the DOA\n- This ensures proper governance and risk management\n\n> This process maintains compliance with corporate investment policies while allowing flexibility for strategic investments."
		},
		sources: [
			{
				title: "Approval Authority for Below-IRR Project Investments",
				content: "The discount is to be calculated referring to the required IRR then proceed to the approver of the discount grant authority in the DOA",
				path: "https://bpdevfilestore1.blob.core.windows.net/chatbot/doa/DOA_Log_Book_2025.xlsx",
				media_type: "text",
				relevance_score: 0.9985104
			}
		]
	},
	{
		created: Date.now(),
		contextualized_question: "What is the approval process for project investments in the company?",
		answer: {
			role: "assistant",
			content: "## Executive Committee Investment Approval Process 🏢\n\nThe **Executive Committee** assists the CEO in evaluating new opportunities and allocating resources appropriately.\n\n### Committee Composition:\n- **Chief Executive Officer (CEO)**\n- **Head of Corporate Development**\n- **Chief Operating Officer (COO)**\n- **CEO of Banpu Next**\n- **Head of Corporate Services**\n- **Executive Committee Advisors**\n\n### Investment Scope:\n**Inorganic Projects:**\n- New M&A with another business or entity\n- Acquisition of concession to develop a project\n- New investment in funds or fund-type entity\n\n**Organic Projects:**\n- Total project cost more than **USD 50 million**\n- Non-M&A expansion of existing projects\n- Acquisition of additional equity in existing investments\n\n### Key Assessment Areas:\n- ✅ **Strategic fit** towards company objectives\n- ✅ **Equity participation** / Management control\n- ✅ **Project economics** in relation to risks\n- ✅ **Technology** considerations\n- ✅ **Financing structure** and Portfolio impact\n- ✅ **ESG impact** assessment"
		},
		sources: [
			{
				title: "Executive Committee Project Investment Approval Process",
				content: "The Executive Committee is established to assist the CEO in new opportunities evaluation and allocate resources into the appropriate development stage",
				path: "https://bpdevfilestore1.blob.core.windows.net/chatbot/doa/DOA_Log_Book_2025.xlsx",
				media_type: "text",
				relevance_score: 0.9846347
			}
		]
	},
	{
		created: Date.now(),
		contextualized_question: "What are the financial analysis requirements for investment proposals?",
		answer: {
			role: "assistant",
			content: "## Financial Analysis Requirements 📊\n\nInvestment proposals must include comprehensive financial analysis with the following components:\n\n### Required Financial Metrics:\n| Metric | Description |\n|--------|-------------|\n| **IRR** | Project IRR, Equity IRR, Dividend IRR, Cash basis IRR |\n| **NPV** | Project NPV and Company's Stake NPV |\n| **Ratios** | Revenue growth, EBITDA margin, Net profit margin |\n| **Returns** | Return on Equity, Debt/Equity, Net Debt/Equity |\n| **Payback** | Capex/NPV and Investment payback period |\n\n### Analysis Components:\n\n#### 📈 **Financial Projections:**\n- Revenue and Cost projection\n- Forecasted cash flow and capital expenditure (Capex)\n- Sensitivity analysis on key value drivers\n\n#### 🎯 **Risk Assessment:**\n- ESG checklist and climate change related risks\n- Risk profile and mitigation plan\n- Third party opinions\n\n#### ⏰ **Project Timeline:**\n- Project schedule with major milestones\n- Implementation phases\n\n> **Note:** All models use XIRR and XNPV functions for conservative calculations."
		},
		sources: [
			{
				title: "Financial Analysis Requirements for Investment Proposals",
				content: "Investment proposals require comprehensive financial analysis including IRR, NPV, sensitivity analysis, and risk assessment",
				path: "https://bpdevfilestore1.blob.core.windows.net/chatbot/doa/DOA_Log_Book_2025.xlsx",
				media_type: "text",
				relevance_score: 0.9654321
			}
		]
	},
	{
		created: Date.now(),
		contextualized_question: "What is the role of Corporate Strategy and ERM in the investment process?",
		answer: {
			role: "assistant",
			content: "## Corporate Strategy and ERM Role 🎯\n\n**Corporate Strategy and Enterprise Risk Management (ERM)** play crucial roles in the investment evaluation process.\n\n### Primary Responsibilities:\n\n#### 📋 **Analysis and Review:**\n- **5-day verification** of all assumptions\n- Conducting comprehensive analysis\n- Preparing strategic fit assessment\n- Risk and return evaluation at project and corporate level\n\n#### 📄 **Documentation:**\n- Prepare **1-page executive summary** for Executive Committee\n- Investment approval report preparation\n- Opinion sharing with project owners\n\n### Executive Summary Contents:\n- **Strategy Alignment** assessment\n- **Investment terms** and structure\n- **Financial analysis** summary\n- **Key assumptions** and ratios\n- **Valuation analysis** summary\n- **Risk analysis** including ESG risks\n- **Funding and timing** recommendations\n\n#### 🤝 **Collaboration Process:**\n```\n1. Project owner submits presentation 7 days prior\n2. Corp Strategy & ERM conduct 5-day analysis\n3. Opinion sharing with project owner\n4. Executive summary preparation\n5. Distribution 1 day before meeting\n```\n\n> The team provides independent professional opinion whether they agree with the project or not."
		},
		sources: [
			{
				title: "Corporate Strategy and ERM Investment Process Role",
				content: "Corporate Strategy and ERM conduct analysis, prepare executive summaries, and provide independent opinions on investment proposals",
				path: "https://bpdevfilestore1.blob.core.windows.net/chatbot/doa/DOA_Log_Book_2025.xlsx",
				media_type: "text",
				relevance_score: 0.9432109
			}
		]
	},
	{
		created: Date.now(),
		contextualized_question: "What is the Business Evaluation Team (BET) and what are its responsibilities?",
		answer: {
			role: "assistant",
			content: "## Business Evaluation Team (BET) 🔍\n\nThe **Business Evaluation Team** is a specialized group that handles due diligence and deal structuring for new investment opportunities.\n\n### Team Composition:\n- **Corporate Strategy Management**\n- **Enterprise Risk Management**\n- **Project Management Office**\n\n### Core Responsibilities:\n\n#### 🏗️ **Deal Structure:**\n- Prepare optimal deal structures\n- Negotiate investment terms\n- Structure corporate governance rights\n\n#### 🔎 **Due Diligence:**\n- Assist full due diligence process\n- Evaluate new opportunities from Business Development\n- Conduct comprehensive risk assessment\n\n#### 📋 **Governance:**\n- Ensure proper governance mechanisms\n- Deploy governance from parent company to subsidiaries\n- Reduce investment-associated risks\n\n### Process Flow:\n```\n1. New Opportunity Identification\n    ↓\n2. BET Review and Analysis\n    ↓\n3. Deal Structure Preparation\n    ↓\n4. Due Diligence Execution\n    ↓\n5. Risk Assessment & Mitigation\n    ↓\n6. Recommendation to Executive Committee\n```\n\n### Third Party Involvement:\n- **Independent professionals** appointed for specialized expertise\n- **Professional opinions** for investment recommendations\n- **Specific area expertise** for new business opportunities\n\n> BET ensures thorough evaluation and proper structure for all new investment opportunities."
		},
		sources: [
			{
				title: "Business Evaluation Team Structure and Responsibilities",
				content: "BET prepares deal structure and assists due diligence for new opportunities, comprised of Corporate Strategy, ERM, and PMO",
				path: "https://bpdevfilestore1.blob.core.windows.net/chatbot/doa/DOA_Log_Book_2025.xlsx",
				media_type: "text",
				relevance_score: 0.9210987
			}
		]
	}
];

/**
 * Get a random demo response content (markdown)
 * @returns {string} A random demo response content with markdown
 */
export const getRandomResponse = (): string => {
	const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
	return randomResponse.answer.content;
};

/**
 * Get a specific demo response by index
 * @param index - The index of the response (0-4)
 * @returns {DemoResponse} The demo response object at the specified index
 */
export const getResponseByIndex = (index: number): DemoResponse => {
	if (index < 0 || index >= demoResponses.length) {
		throw new Error(`Invalid index: ${index}. Valid range is 0-${demoResponses.length - 1}`);
	}
	return demoResponses[index];
};

/**
 * Get response content by index
 * @param index - The index of the response (0-4)
 * @returns {string} The markdown content of the response
 */
export const getResponseContentByIndex = (index: number): string => {
	const response = getResponseByIndex(index);
	return response.answer.content;
};

/**
 * Get all demo responses
 * @returns {DemoResponse[]} Array of all demo response objects
 */
export const getAllResponses = (): DemoResponse[] => {
	return [...demoResponses];
};

/**
 * Get all response contents as markdown strings
 * @returns {string[]} Array of all demo response contents
 */
export const getAllResponseContents = (): string[] => {
	return demoResponses.map(response => response.answer.content);
};

/**
 * Get the number of available demo responses
 * @returns {number} The total number of demo responses
 */
export const getResponseCount = (): number => {
	return demoResponses.length;
};

/**
 * Get response with sources for detailed analysis
 * @param index - The index of the response
 * @returns {DemoResponse} Complete response object with sources
 */
export const getResponseWithSources = (index: number): DemoResponse => {
	return getResponseByIndex(index);
};

/**
 * Search responses by question content
 * @param searchTerm - Term to search for in contextualized questions
 * @returns {DemoResponse[]} Array of matching responses
 */
export const searchResponses = (searchTerm: string): DemoResponse[] => {
	const term = searchTerm.toLowerCase();
	return demoResponses.filter(response => 
		response.contextualized_question.toLowerCase().includes(term) ||
		response.answer.content.toLowerCase().includes(term)
	);
};