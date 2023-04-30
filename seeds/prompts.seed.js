const mongoose = require("mongoose");
const Prompt = require("../models/Prompt.model");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI;

const prompts = [
  {
    tag: "Buyer Persona Development",
    definition:
      "Create a social media campaign that showcases real-life examples of how <product/service> has made a positive impact on the lives of your customers. Use customer testimonials, photos, and videos to inspire and engage your <target audience>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm having trouble understanding my target audience. What are some techniques for gathering <demographic> data to create a more accurate buyer persona?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a Social Media Analyst. You will analyze social media data for <target audience>, including their engagement, reach, sentiment, demographics, and behavior patterns. You will gather this information through social media monitoring tools, surveys, and data analysis. Your goal is to create a comprehensive understanding of the target audience's social media behavior, which will inform social media strategies and tactics. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Provide us with a list of <number> online forums or social media groups where our target audience is actively discussing topics relevant to our <product/service>, and suggest ways we can engage with them to gain insights and promote our brand.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Sales funnel optimization: I want to optimize my sales funnel in <e-commerce store/landing page/email marketing campaign> to increase conversions and revenue.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Customer segmentation: I want to identify <3> key customer segments and develop targeted marketing strategies for each segment within <2 months>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Purchase decision-making: I want to identify the key factors and influences that drive my target audience's purchase decisions in <product/service category> to improve my marketing messaging.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Brand awareness: I want to increase brand awareness among <Gen Z> by <30%> within the next <12 months>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Can you suggest <number> key characteristics that define our ideal buyer persona for our <product/service> based on our current consumer data analysis?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "My business has a lot of competitors in our industry. What strategies can I use to differentiate my brand and appeal to <unique selling point>, <brand personality>, and <target audience>?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create Plan to Develop Targeted Content for Each Stage of the Buyer Journey, Including Educational, Promotional and Supportive Content that Addresses Specific Customer Needs and Challenges.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You're tasked with developing a buyer persona for <company name>. What information do you need to gather in order to accurately represent their ideal customer?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a focus group moderator. You will lead a group discussion on a specific product or service, asking open-ended questions that encourage participants to share their thoughts, opinions, and experiences. You will also take notes on what they say and follow-up with additional questions when necessary. Depending on the research objective, you may choose specific variables for your focus group e.g., if it’s a new product launch then you can focus on pricing, features, benefits and purchase intent; If it’s improving existing product then you can concentrate on user experience, satisfaction and loyalty etc. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "How can you identify your ideal target audience and create buyer personas that accurately reflect them?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Brainstorm a content marketing strategy to attract <target audience> to your website. Your company is looking to increase traffic to your website and generate leads. Your task is to develop a content marketing strategy that will attract your target audience. Think about the topics and formats that would be most appealing to your audience and how you can use SEO and social media to promote your content.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "As a buyer persona development expert with experience in <industry>, how would you recommend identifying <specific demographics> to target for a <product/service>?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Your company is expanding its product line, and you need to develop buyer personas for these new products. How will you integrate these personas with your current marketing strategy to effectively reach your target audience?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "How can you use buyer personas to tailor your messaging and content to specific segments of your audience, and increase engagement and conversions?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You have developed a buyer persona for a product, but it does not seem to be resonating with your target audience. What changes will you make to the persona to better align with your market?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want to improve my website's conversion rate, but I'm not sure where to start. Can you provide some tips for creating compelling and user-friendly landing pages that will encourage <call-to-action>, <social proof>, and <value proposition>?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm looking to expand my business into a new market. Can you recommend some <market research> tools and techniques to evaluate the potential for success?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm having difficulty creating content that resonates with my audience. Can you provide some guidance on how to <analyze customer feedback> to create more impactful content?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Conduct customer research to gain insights into <customer segment> and develop a buyer persona. Your company is looking to develop a better understanding of a specific customer segment. Your task is to conduct customer research to gain insights into this segment's needs, preferences, and behaviors. Use this information to create a buyer persona that can inform your marketing strategy.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What strategies can you implement to move potential <leads> down the sales funnel and turn them into paying customers?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create Plan to Establish a Metrics Dashboard that Tracks Key Performance Indicators such as Conversion Rates, Customer Acquisition Costs, and Customer Lifetime Value, and Use this Data to Continuously Optimize the Customer Experience and Drive Revenue Growth.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "As someone experienced in buyer persona development, what advice would you give to a company struggling to connect with their target audience? How can they use buyer personas to improve their marketing efforts?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want to improve my website's conversion rate. Can you recommend some <A/B testing> strategies to increase user engagement?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Develop a social media post series that promotes <brand/product/service> as the solution to common <target audience pain points>, using engaging visuals and copy that resonates with their needs and interests.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What tactics can you employ to nurture and maintain relationships with your <most valuable customers> and keep them coming back for more?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a Sales Funnel Optimizer. You will optimize the sales funnel for <target audience>, by analyzing the customer journey from awareness to conversion, and identifying areas for improvement. You will gather this information through customer surveys, sales data analysis, and website analytics. Your goal is to increase conversion rates and revenue by improving the user experience and optimizing the sales process. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Brainstorm potential target audience demographics to guide our buyer persona development process. Your task is to think about the characteristics of your ideal customers, including age, gender, interests, and behaviors. Use this information to create a detailed buyer persona that will guide your marketing strategy.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What methods can you use to collect and analyze data about your customers' <buying behavior> and preferences?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Product positioning: I want to develop a clear and differentiated positioning strategy for my product/service in <market/niche> to stand out from competitors.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Brainstorm potential messaging strategies to appeal to our buyer persona. Your goal is to create messaging that will resonate with your ideal customers, including persuasive language, relevant content, and targeted offers. Think about what your customers are looking for and how you can differentiate your brand from the competition.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a Empathy Map Creator. You will create an empathy map for <target audience>, which will help us understand their emotions, behaviors, beliefs, and goals. The empathy map should be divided into four quadrants: say, think, feel, and do. You will gather this information through research, surveys, interviews, and data analysis. Your goal is to create a visual representation of the target audience's mindset which will inform marketing strategies and tactics. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Establish KPIs and metrics to measure the effectiveness of your buyer persona development efforts for <> and iterate based on the results.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Identify five key phrases that <entrepreneurs> commonly search for when looking for buyer persona development services and suggest how we can incorporate them into our website content to improve our SEO ranking.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "As an expert in buyer persona development, how can a company best use <relevant metrics> to measure the success of their marketing campaigns targeted at specific buyer personas?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Your client has recently launched a new product. How do you adjust the buyer persona to reflect this new offering and reach its target audience?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Content creation: I want to create a content strategy and calendar for my brand in <social media platform/website/blog> to attract and engage my target audience.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Suggest three primary and seven secondary keywords for our buyer persona development webinar that we should use in our promotional email campaign to reach <startups>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Develop a buyer persona report for <company name> that includes detailed insights into the motivations, pain points, and preferences of your target audience, along with recommendations for how to engage and convert them into customers.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create Plan to Map the Customer Journey and Identify Key Touchpoints and Opportunities to Improve the User Experience and Increase Customer Loyalty.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What are the most popular <number> keywords and phrases that our competitors are targeting in their marketing campaigns related to our <product/service>? Can you suggest how we can differentiate our messaging to stand out from the competition?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Your marketing team has identified a new market segment to target, but you are unsure how to develop a buyer persona for this group. What steps will you take to research and create a successful persona?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create a knowledge base article that answers <target audience's> most pressing questions about <product/service> and includes helpful resources or next steps for those looking to take further action.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Brainstorm and prioritize a list of marketing tactics to reach <business objective>. Your company is looking to achieve a specific business objective, such as increasing sales or improving brand awareness. Your task is to brainstorm a list of marketing tactics that could help achieve this objective. Prioritize the tactics based on their potential impact and feasibility.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "<Company name> has just merged with another company. How do you adjust the buyer persona to accurately reflect the new combined company and identify potential opportunities for growth?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Provide a list of 10 industry-specific keywords for our buyer persona development eBook that we should include in the title, subtitle, and description to generate leads from <healthcare providers>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Sales growth: I want to increase sales revenue by <20%> within <1 year> by expanding into <international markets>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You have extensive experience in Buyer Persona Development and you are a top talent in your field. You graduated from <university/school> and currently work at <big company>. How would you go about simulating experts to ensure accurate Buyer Persona Development?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a Buyer Persona Developer. You will come up with detailed and specific descriptions of <target audience>, including their demographics, psychographics, behavior patterns, pain points, needs, and goals. You will gather this information through research, surveys, interviews, and data analysis. Your goal is to create a comprehensive understanding of the target audience which will inform marketing strategies and tactics. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create a competitive analysis report to understand <competitor> strengths and weaknesses. Your company is looking to better understand a specific competitor in your market. Your task is to conduct a competitive analysis and create a report that covers the competitor's strengths, weaknesses, opportunities, and threats. Use this information to inform your own marketing strategy and identify areas where you can differentiate your brand.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You are working with a team to create a buyer persona for a global market. What cultural considerations will you include to ensure a successful persona that transcends borders?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "How can you identify your <target audience> and create a buyer persona that truly resonates with them?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Develop a plan to test and iterate on our buyer persona. Your task is to continually test your buyer persona and refine it based on feedback from customers and data analysis. Use this information to iterate on your messaging, offers, and marketing strategies to continually improve your results.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Product development: I want to create a new product/feature within <3 months> that will appeal to <millennial women>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm looking to expand my email marketing efforts, but I want to ensure that my messages are relevant and engaging. What are some key components of an effective email campaign, including methods for targeting <segments>, crafting <subject lines>, and measuring <metrics>?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create Plan to Identify the Ideal Customer for <Product/Service> and Develop a Persona Profile that Includes Demographics, Pain Points and Motivations.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Write a whitepaper or e-book that delves deeper into the benefits and applications of <product/service> for a specific industry or use case, providing in-depth insights and expert opinions to position our brand as a thought leader in the field.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Write a blog post that explores the benefits and features of <product/service>, with a focus on the unique value proposition that sets your offering apart from competitors, and targets <ideal customer persona>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a content marketer. You will create compelling content that will attract, engage and persuade your target audience to take action. You will also optimize the content for search engines and promote it via different channels to amplify its reach. Depending on the objective, you may choose specific types and formats of content e.g., if it’s blog posts then you can focus on listicles, how-to articles and interviews; If it’s video marketing then you can concentrate on product demos, customer testimonials and explainer videos etc. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What research methods can you use to gather important insights into your audience, such as demographics, pain points, and buying behaviors?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Develop a buyer persona for <> by conducting market research and identifying their demographics, behaviors, pain points, and goals.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Identify the channels and tactics that resonate most with <> by analyzing their online behavior, preferences, and feedback.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "As a Buyer Persona Development specialist, you have a deep understanding of who your target audience is. You graduated from <university/school> and currently work at <company>. Can you provide advice on how to create a simulation of experts for Buyer Personas that truly represents your target audience?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You are an expert in the field of Buyer Persona Development and have graduated from <university/school>. You currently work at <company>. How do you think simulating experts can assist businesses in engaging with their target audience?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You are a Buyer Persona Development expert and you graduated from <university/school>. You are currently working at <company>. Can you give me your opinion on how to effectively simulate experts for Buyer Personas?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a Job Description Analyst. You will analyze job descriptions for <target audience>, and extract information about their skills, experience, education, and qualifications. You will also analyze the language and tone used in the job description, to understand the values and culture of the company. Your goal is to create a profile of the ideal candidate for a job, which will inform talent acquisition strategies and tactics. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm starting a business and need to identify my ideal customer. What steps can I take to develop a buyer persona that accurately reflects <name>, <age>, <gender>, <occupation>, and <interests>?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm struggling to differentiate my brand from competitors. What are some key factors to consider when developing a <unique selling proposition> for my product or service?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Provide a list of 10 long-tail keywords related to buyer persona development that we should optimize for, and suggest how we can incorporate them into our content strategy to reach <marketing managers>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Content creation: I want to produce <50> pieces of high-quality content within <6 months> that will attract <B2B decision makers>.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a buyer persona developer. You will come up with detailed descriptions of ideal customers, including their demographics, psychographics, pain points, goals, interests, behaviors and preferred channels of communication. Depending on the target market, you may choose specific variables for your persona development e.g., if it’s B2B market then you can focus on company size, industry and decision-making process; If it’s a B2C market then you can concentrate on hobbies, lifestyles and shopping habits etc. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Map out a lead nurturing strategy for <> that leverages marketing automation, personalization, and segmentation to move them closer to the sale.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Develop an email marketing series that provides helpful tips, expert advice, and exclusive offers to subscribers who have expressed interest in <product/service>. Use personalized language and insights from your buyer persona report to tailor the messages to their specific needs and interests.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You are tasked with developing a buyer persona for a <type of product/service>. What questions will you ask to gather insightful information about your target audience?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Suggest five keywords that we should target in our buyer persona development services to attract <B2B> clients, taking into account our current SEO strategy and competitor analysis.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What are some best practices for testing and refining your buyer personas over time, to ensure that they remain accurate and effective?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "How can you tailor your marketing messages to appeal to <specific customer segments> and increase engagement and conversions?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Analyze industry trends and customer behaviors to ensure our buyer persona is up-to-date. Your task is to stay on top of industry trends and customer behaviors, including changes in technology, customer preferences, and market trends. Use this information to update your buyer persona regularly and ensure it remains relevant.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Target audience: I want to identify and understand the characteristics and behaviors of my target audience in <industry/location> to better tailor my marketing strategies.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create Plan to Conduct Market Research and Gather Customer Feedback to Understand the Customer Buying Process and the Most Effective Ways to Engage with Them.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Identify the pain points of <customer segment> and create a messaging strategy to address them. Your company is looking to market a new product to a specific customer segment. Your task is to identify the pain points that this segment experiences and develop a messaging strategy that addresses those pain points. Think about how you can use language, visuals, and emotional appeals to connect with your audience.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a survey designer. You will create a questionnaire that asks participants to rate their opinions or behaviors on a specific topic using a scale (e.g., 1-5) or multiple-choice questions. You will also include open-ended questions that allow participants to elaborate on their answers in their own words. Depending on the research objective, you may choose specific variables for your survey e.g., if it’s customer satisfaction then you can focus on product quality, customer service, and value; If it’s market research then you can concentrate on product demand, competition, and pricing etc. My first request is:",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You've identified a gap in the market and want to create a new buyer persona to target this untapped audience. What steps do you take to research and develop this new persona?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I'm struggling to reach my target audience through my marketing efforts. Can you suggest some tools and techniques for conducting effective market research?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "The <industry> market has been consistently declining over the past year. How do you adjust your buyer persona to accurately reflect the current market and its challenges?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "How can you use data analytics and other tools to track and measure the impact of your buyer persona development efforts, and continually optimize your marketing strategy?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You are a highly talented Buyer Persona Development professional and a graduate of <university/school>. You currently work at <big company>. How can simulating experts aid in creating Buyer Personas that lead to higher engagement rates and increased success?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Draft an email campaign that highlights the unique features of our <product/service> and encourages <ideal customer persona> to take advantage of exclusive offers or promotions designed just for them.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Write a blog post on the benefits of <product/service> specifically designed for <ideal customer persona> that provides clear and actionable tips for optimizing their experience with our brand.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You graduated from <prestigious institution> with a degree in buyer persona development and now work for <prominent company>. How should a business approach the issue of creating accurate and effective buyer personas when dealing with limited data?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Generate a landing page that highlights the key benefits and features of <product/service>, and includes a clear call-to-action that encourages visitors to sign up for a free trial, download a guide, or request more information. Use compelling visuals, copywriting, and design elements to make the page stand out and convert visitors into leads.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Create a content plan that targets each stage of the buyer's journey for <> to drive engagement and conversions.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "Develop a plan to gather qualitative data from customers to refine our buyer persona. Your goal is to collect information about customers' needs, pain points, and purchasing habits. Think about how you can use surveys, focus groups, and customer interviews to gather this data and refine your buyer persona.",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "What are the top <number> pain points that our target audience experiences when looking for solutions related to our <product/service> and how can we effectively address them in our marketing strategy?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "We want to expand our reach to new markets for our <product/service>. Can you provide us with a list of <number> buyer personas for different geographic regions or demographic groups, and suggest ways we can tailor our marketing efforts to connect with them effectively?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "You are a highly skilled professional in the field of buyer persona development with a degree from <top university>. In your opinion, what are the key factors to consider when creating a buyer persona for a <niche market>?",
  },
  {
    tag: "Buyer Persona Development",
    definition:
      "I want you to act as a social media strategist. You will develop a plan for creating and sharing content on social media platforms that will engage your target audience and drive business results. You will also analyze metrics regularly to measure success and adjust the plan as needed. Depending on the objective, you may choose specific platforms and tactics e.g., if it’s brand awareness then you can focus on creating viral videos, infographics and contests; If it’s lead generation then you can concentrate on creating e-books, white papers and webinars etc. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Having worked at <company> as a leading <field> professional, what advice do you have for individuals looking to build a strong personal brand within the space?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a content marketing audit report for our <company/brand> and provide recommendations on how we can improve our current strategy, including a list of potential topics and formats that we should explore.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "As an experienced content creator in <field>, what tips do you have for optimizing <type of content> to improve engagement?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a travel blogger. You will create a travel guide for <location/country>. Your guide should include <number> recommendations for places to stay, attractions to visit, and restaurants to try. You should also provide insider tips and tricks to help your readers make the most out of their trip. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You are a content manager for a news website and want to ensure accuracy and diversity in your articles. How do you curate and edit content that represents a range of perspectives and voices?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Conduct a competitive analysis of our top five competitors' content marketing efforts, including their strengths and weaknesses, and provide recommendations on how we can differentiate ourselves and stay ahead of the game.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Research trending topics and keywords relevant to <industry>, and develop a plan for creating blog posts that rank highly in search results and drive traffic to <company's> website. Incorporate SEO best practices and a publishing schedule.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Blogging: I want to increase my monthly blog traffic from <1000> to <10,000> unique visitors within 6 months.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I'm interested in creating a <type of content> for my business but I don't have the resources to produce it in-house. Can you recommend some reliable <type of content> production services that can help me create high-quality content at an affordable price?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Curate a list of the top <number> <industry/topic>-related resources and tools for <target audience>, providing an overview of each and explaining how they can be helpful.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Content strategy: I want to develop a comprehensive content strategy that aligns with my business goals and objectives.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You are a seasoned content creator who graduated from <university> and now works for a large media corporation. How would you advise a new content creator on how to craft compelling narratives for their brand's social media presence?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Create a content strategy for <company name> that targets <specific audience demographic> and drives conversions. Outline a plan for creating and distributing content across multiple channels.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You've curated content from multiple sources, but you're concerned about ensuring that each creator is properly credited. What steps do you take to ensure ethical curation practices?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Write a <type of content> that tells the story of how your company started, emphasizing the values and mission that inspire <ideal customer persona> to engage with your brand.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "As a skilled curator in <field>, how do you decide which <type of content> to feature on your platform? Are there specific criteria you look for?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Curate a list of the top <number> resources, tools, or technologies that are essential for <industry/niche> professionals to know about in <year>.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Influencer Marketing: I want to build and maintain relationships with <20> influencers to connect with my target audience and drive <1000> new customers within 3 months.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Suggest 8 keywords related to [digital marketing] that are often overlooked but can provide significant results when incorporated into our content strategy, taking into account our niche market and competitor analysis.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You want to create a blog for your business, but don't know what content to include. What steps do you take in curating engaging and relevant content for your readers?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Podcasting: I want to launch and grow a podcast to reach <10,000> monthly downloads within the first year.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a <type of content> that shares strategies and best practices for <target audience> on how to use <product/service> effectively, including tips and tricks for overcoming common challenges.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a fashion stylist. You will help me develop a signature style that reflects my personality and flatters my body type. You will recommend outfits, accessories and colors that work well together and meet my <budget/event type>. You will also provide tips and advice on how to shop smart, maintain my wardrobe and elevate my overall look. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition: "What are some effective strategies for creating and promoting video content on social media?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a social media campaign for <product/service> that increases engagement and builds a community of loyal followers. Include a detailed plan for posting frequency, content themes, and paid promotion.",
  },
  {
    tag: "Content Creation and Curation",
    definition: "What are some best practices for <re-purposing> existing content to <maximize engagement>?",
  },
  {
    tag: "Content Creation and Curation",
    definition: "How can you curate <user-generated content> to enhance your brand's <online presence>?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Brainstorm potential partnerships or collaborations with other companies or organizations to expand <our brand's> reach and impact. Your company wants to expand its reach and collaborate with other organizations to make a bigger impact. Your task is to brainstorm potential partnerships, collaborations, or sponsorships that align with your brand's values and mission and could increase your visibility and reputation.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Research and suggest three social media influencers or industry experts that we should collaborate with, and provide specific ideas for content partnerships that we could pursue.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Audit <company's> current content to identify gaps and opportunities for improvement. Create a plan for updating and repurposing existing content to improve SEO and increase traffic.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a content curation plan for <social media platform> that highlights user-generated content and encourages engagement from our audience. Set goals for engagement and measure performance over time.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want to start a <type of content> campaign for my business but I'm not sure how to measure its success. Can you recommend some key metrics to track and tools to use for measuring my campaign's performance?",
  },
  {
    tag: "Content Creation and Curation",
    definition: "How can businesses use social media to build brand awareness and engage with their target audience?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You have established yourself as a successful content creator after graduating from <school/university>. What do you believe are the most important skills for someone entering the field of <field> to possess?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a tutorial video for <product/service> that provides a step-by-step guide for <target audience> on how to use it effectively, highlighting its unique features and benefits.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Your <platform> is being flooded with content on a particular topic. How do you differentiate yourself and cater to a unique audience?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Provide a list of 5 long-tail keywords related to our [food delivery] service that we should incorporate into our website content to better attract customers and increase online orders.",
  },
  {
    tag: "Content Creation and Curation",
    definition: "How can <insert brand/product> effectively use influencer marketing to reach a wider audience?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Create a white paper or research-based article that delves into the current state of <industry/niche>, highlighting trends, challenges, and emerging opportunities that professionals operating in this space need to understand.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "When <creating a content calendar>, how can you ensure a balance between <educational> and <promotional> content?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Recommend three sources where we can find high-quality <content> related to our <industry/niche>, and provide suggestions on how we can curate or repurpose this content for our own channels.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Email marketing: I want to grow my email subscriber list by <X>% and increase open and click-through rates by <Y>% through targeted campaigns and promotional offers.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Create a <type of content> that showcases the unique benefits of our <product/service> to <target audience>, featuring <industry expert/testimonials/infographics>.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Create a content calendar for the next quarter based on our <product/service> launch, including relevant events or holidays that we can leverage to drive engagement and conversions, as well as outlining distribution channels for each piece of content.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Create a curated plan for <topic/niche> that includes a mix of original and repurposed content from trusted sources on <platform>. Set measurable goals and track progress over time.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Conduct a content audit of your company's website and social media channels to identify areas for improvement and optimization. Your company's website and social media channels can always be improved to better serve your audience and meet your business goals. Your task is to conduct a comprehensive content audit to assess the quality, relevance, and effectiveness of your content and identify areas for improvement and optimization.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You've been tasked with managing a social media account for a non-profit organization. How do you create and curate content that supports the organization's mission and values?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Generate a <type of content> that explores the latest trends/developments in <industry/topic>, providing actionable tips and insights for <ideal customer persona> to stay ahead.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a social media influencer. You will create <number> posts to promote <product/service> to your followers. In each post, you should highlight the unique benefits of <product/service> and why your followers should consider using it. Use engaging visuals and relatable captions to help your audience connect with the product/service. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a content creation plan that accounts for <target audience>, <platform>, and <content type> to increase engagement and reach.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Create a plan for leveraging <influencers/experts> in our industry to help promote our <product/service>. Research and reach out to potential partners and develop a strategy for collaborating on content creation and distribution.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "As a respected expert in <field>, how do you balance the need for original content with the value of sharing existing content from others in the industry?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I'm a freelance writer looking to improve my portfolio and attract more clients. What are some tips for creating a standout writing portfolio that showcases my skills and experience?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a podcast host. You will invite a guest to your podcast and interview them about their <field/industry/hobby>. You should prepare relevant questions beforehand and ask follow-up questions to keep the conversation flowing. Your objective is to entertain, educate and engage your audience with insightful discussion. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You are a freelance writer and have been given a specific topic to write about. What research methods do you use to gather information and curate high-quality content for your client?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I'm a blogger trying to gain more followers and improve my content. What are some effective strategies for increasing my blog's visibility and engagement?",
  },
  {
    tag: "Content Creation and Curation",
    definition: "What are some effective <content creation> strategies for <social media platforms>?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Brainstorm ideas for a <holiday> themed email marketing campaign. Your boss has asked you to design an email marketing campaign to promote your company's products or services for <a holiday>. Your task is to come up with creative ideas that will capture the attention of your audience and encourage them to take action.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Provide three keywords that we should prioritize in our [e-commerce] product descriptions and website content to attract customers in <insert specific location> and improve our overall conversion rate.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You are a content creator for an e-commerce website and want to increase organic traffic. What strategies do you use to curate and optimize SEO-friendly content?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a recipe creator. You will come up with innovative and delicious recipes that meet my <dietary restrictions/cuisine preferences/equipment availability>. You will provide detailed instructions, measurements and cooking times that make it easy for me to follow along. You will also suggest creative ways to plate and present the dishes. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want to improve my website's <website element> but I'm not sure where to start. Can you provide some tips on how to optimize <website element> for better user experience and SEO?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "As you're creating content, you feel like it's becoming monotonous and stale. What techniques do you use to spice it up and keep it engaging for your audience?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "As a simulated expert in content creation and curation, how would you advise someone who graduated from <university> and is struggling with generating new content ideas for their <company>?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a career coach. You will help me develop a winning resume and cover letter. You will provide feedback on my professional skills, experience and achievements, and recommend ways to present them in the most compelling way. You will also prepare me for potential interview questions and provide feedback and strategies for effective communication during the process. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition: "What are the best practices for optimizing website content for search engine rankings?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Research and identify <keywords/topics> related to our <product/service> and develop an editorial calendar that includes blog posts and social media updates. Ensure that each piece of content is optimized for SEO.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a social media manager. You will curate eye-catching and shareable content that fits my <business/personal> brand's voice and message. It can include pictures, videos, gifs and written posts. Your goal is to increase engagement, followers and overall online presence. Depending on the platform, you may need to consider specific posting times and hashtags that will maximize reach. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a recipe creator. You will come up with <number> recipes that feature <ingredient>. Your recipes should be easy to follow and include clear instructions and ingredients. You should also provide nutritional information and suggest potential modifications for dietary restrictions. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I'm interested in starting a <social media platform> account for my business. Can you provide some guidelines on how to create engaging content and grow my following on this platform?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You have an idea for a <type of content>, but don't know how to develop it. What's the first step you take in bringing your vision to life?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Brainstorm ideas for a <customer appreciation> event. Your company wants to show your customers how much you value their business, and your task is to come up with ideas for a customer appreciation event. Think about what kind of event would be most appealing to your audience, and how you can make them feel special and appreciated.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Organize a brainstorming session with your team to generate ideas for a new marketing campaign. Your company is planning a new marketing campaign, and you want to involve your team in the brainstorming process to generate fresh ideas and perspectives. Your task is to organize a brainstorming session and facilitate a productive discussion that results in creative and actionable ideas for the campaign.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "How can you measure the <impact> of your content marketing efforts <on lead generation and conversion>?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I'm starting a YouTube channel, but I'm not sure how to optimize my videos for maximum views and engagement. What tips can you provide for improving my YouTube video content and SEO?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Video Marketing: I want to create and curate a YouTube channel with <100> quality videos to drive <1,000,000> views and <10,000> subscribers within 2 years.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Brainstorm creative ideas for a social media campaign to promote <our new product launch>. Your company has just launched a new product, and you need to generate buzz around it on social media. Your task is to come up with unique and engaging ideas for a social media campaign that will grab the attention of your audience and drive awareness and interest in the new product.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Write a case study detailing how <company/brand> helped a client overcome a significant challenge or achieve a specific goal, including quotes from the client and data that demonstrates the success of the solution.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Research <industry> trends and create a content calendar for <the upcoming quarter>. Your company is committed to producing high-quality content on a regular basis, and your task is to research industry trends and create a content calendar for the upcoming quarter. Think about what topics are relevant to your audience, and how you can create content that is both informative and engaging.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You're a top talented content curator who earned their degree from <school>, and you currently work for <company>. Can you help me select the best pieces of user-generated content to feature on our brand's social media channels?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Imagine you're a simulated expert in the field of content curation, and you completed your education at <school>. How would you recommend identifying and incorporating popular trends into your brand's content creation process?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "If you're an expert in content creation, having graduated from <university> and working at <company>, how would you approach creating an effective content strategy to increase online engagement for a small start-up business?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "You have a piece of content that's performing well, but you want to repurpose it for another platform. What elements do you need to consider in order to optimize its impact?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "My company is hosting a virtual event, but we're struggling to create engaging content. What are some creative ideas for virtual event content that will keep attendees interested and engaged?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Provide five trending keywords in the [health and wellness] industry that we should include in our social media content to reach a wider audience, taking into account our target market and brand message.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Video production: I want to create a series of professional-quality videos to promote my business or brand across social media platforms.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Generate a list of influencer partnerships for <brand> that align with our values and target audience. Create a plan for outreach and collaboration, including compensation and metrics for success.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a book reviewer. You will select <number> books in <genre> and write a review for each one. Your reviews should include a brief summary of the plot, your personal opinion on the book, and an analysis of the writing style and themes. You should also provide a rating and recommend the book to your audience. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Writing: I want to publish <1> book/ <10> articles / <25> blog posts within the next 12 months to establish myself as an expert in my niche.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Design a visually captivating infographic that presents data on a topic of interest to <target audience>, and provides actionable insights or guidance based on the information presented.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I recently launched a new product, but I'm not getting enough sales. Can you recommend some ways to improve my product messaging and optimize my product pages to increase conversions?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "My brand has a presence on multiple social media platforms, but I'm having trouble maintaining a consistent brand voice and aesthetic. Can you provide some guidelines for creating and curating consistent social media content?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Branding: I want to create a strong brand identity that resonates with my target audience and sets me apart from competitors.",
  },
  {
    tag: "Content Creation and Curation",
    definition: "Blogging: I want to start a blog and increase traffic to my site by <X>% in <Y> months.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a content strategy for your company's blog to increase website traffic and engagement. Your company has a blog, but it's struggling to attract visitors and generate engagement. Your task is to create a content plan that includes topics, formats, and promotion strategies that will help increase traffic to the blog and encourage reader engagement.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Brainstorm content ideas for a <new product launch> campaign on social media. You work for a consumer goods company, and your task is to come up with content ideas for a social media campaign to promote a new product launch. Think about what kind of content will resonate with your audience, and how you can use social media to generate buzz and excitement.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "What are the latest trends and developments in content marketing, and how can brands stay ahead of the curve?",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Suggest 10 high-volume search terms related to [home improvement] that we should target in our blog content to improve our SEO ranking and beat out our competitors in the industry.",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "I want you to act as a travel blogger. You will create engaging and informative content that showcases different <destinations/attractions/experiences>. Your goal is to inspire and entertain while providing practical tips, insights and recommendations on what to do, see and eat. You will also provide beautiful visuals, including pictures and videos that enhance the experience. My first request is:",
  },
  {
    tag: "Content Creation and Curation",
    definition:
      "Develop a strategy for repurposing <existing content> to reach a new audience. Your company has a large library of content that has been created over the years. Your task is to develop a strategy for repurposing that content to reach a new audience. Think about what formats would be most effective (e.g. blog posts, infographics, videos) and how you can refresh the content to make it relevant and engaging.",
  },
  {
    tag: "Content Performance",
    definition: "Website traffic: I want to increase my website traffic by <X>% within the next six months.",
  },
  {
    tag: "Content Performance",
    definition:
      "What are the top five keywords that are driving significant organic search traffic to our website, and how can we enhance our content using those keywords?",
  },
  {
    tag: "Content Performance",
    definition:
      "Can you suggest three highly specific niche-related keywords that can drive qualified leads and increase our conversion rates, and advise how to incorporate them into our content strategy?",
  },
  {
    tag: "Content Performance",
    definition:
      "Write a video script that showcases the features and benefits of our latest <product/service>, and includes customer testimonials and user demonstrations. The video should be upbeat and engaging, and should be aimed at <target audience>.",
  },
  {
    tag: "Content Performance",
    definition:
      "Social media engagement: I want to increase my Instagram engagement rate from <2%> to <10%> and grow my following from <1,000> to <50,000> within nine months.",
  },
  {
    tag: "Content Performance",
    definition:
      "Your recent blog post has received a surge in traffic and shares. How do you analyze its success and replicate its winning factors in future content?",
  },
  {
    tag: "Content Performance",
    definition:
      "Outline a <content distribution plan/strategy> for our <new product/service launch> campaign, including target platforms, post frequency, multimedia elements, and messaging themes. Consider our audience segmentation and competitor tactics in your recommendations.",
  },
  {
    tag: "Content Performance",
    definition:
      "Brainstorm potential digital marketing channels to reach <our target audience>. Your company wants to expand its reach to a wider audience, and you have been tasked with brainstorming potential digital marketing channels to achieve this goal. Your task is to identify channels that align with your target audience's online behavior and preferences, such as social media, email marketing, or display advertising.",
  },
  {
    tag: "Content Performance",
    definition:
      "Your story has hit a plateau and you're not sure why. What steps do you take to analyze the performance of your content and identify areas for improvement?",
  },
  {
    tag: "Content Performance",
    definition: "Brand awareness: I want to increase my brand awareness by <X>% on <Platform> within the next year.",
  },
  {
    tag: "Content Performance",
    definition:
      "As a content performance analysis expert with a degree from <university>, can you provide advice on how to improve the click-through rate on <website's> blog posts?",
  },
  {
    tag: "Content Performance",
    definition:
      "Brainstorm ideas for a video series to introduce <new feature> of our product. Your company has recently added a new feature to one of its products, and you need to create a video series to introduce the feature to customers. Your task is to brainstorm ideas for the video series, including the format, structure, and messaging. Think about how you can leverage humor, storytelling, and other visual elements to create a compelling video series.",
  },
  {
    tag: "Content Performance",
    definition:
      "How can you improve the <website/app> conversion rate, and what metrics should you track to measure success?",
  },
  {
    tag: "Content Performance",
    definition:
      "Your brand has been producing a lot of content, but you're not sure if it's resonating with your target audience. How do you conduct an audience analysis to ensure your content is meeting their needs and preferences?",
  },
  {
    tag: "Content Performance",
    definition:
      "Email marketing: I want to increase my email open rate from <10%> to <25%> and click-through rate from <2%> to <10%> within three months.",
  },
  {
    tag: "Content Performance",
    definition:
      "Brainstorm creative ideas for a social media campaign to promote <our new product launch>. Your company is launching a new product, and you need to create a buzz on social media. Your task is to brainstorm ideas for a social media campaign that will generate excitement and interest around the new product. Think about how you can leverage user-generated content, social media influencers, and unique visual elements to create a memorable campaign.",
  },
  {
    tag: "Content Performance",
    definition:
      "As a simulated expert in <content creation>, having graduated from <Columbia University> and working in <content agency>, can you share with me your advice on how to engage readers with my articles and improve content performance?",
  },
  {
    tag: "Content Performance",
    definition:
      "Draft an email campaign that promotes our upcoming <event/webinar>, and offers registration information and incentive offers to encourage participation. The email should be concise and persuasive, and should be tailored to <target audience>.",
  },
  {
    tag: "Content Performance",
    definition:
      "You have extensive experience in content performance analysis at <company>, and have seen a wide range of strategies used to analyze data. What have you found to be the most effective method for measuring engagement?",
  },
  {
    tag: "Content Performance",
    definition:
      "What are some common challenges in <customer experience/marketing automation>, and how can you address them to improve performance?",
  },
  {
    tag: "Content Performance",
    definition:
      "You are a highly skilled content performance analyst who has worked with numerous companies across a variety of industries. Can you share your insights on how to optimize website content to improve search engine rankings?",
  },
  {
    tag: "Content Performance",
    definition:
      "Develop a content calendar for a blog series on <industry-related topic>. Your company wants to establish itself as a thought leader in your industry, and you have been tasked with creating a blog series. Your task is to develop a content calendar that outlines the topics, audience, and goals for each blog post. Think about how you can create dynamic, engaging content that provides value to your readers and positions your company as an authority in the industry.",
  },
  {
    tag: "Content Performance",
    definition:
      "Blog traffic: I want to increase my monthly blog traffic from <500> sessions to <10,000> sessions within six months.",
  },
  {
    tag: "Content Performance",
    definition:
      "I'm interested in exploring influencer marketing for my business. What are some tips for finding the right influencers and creating successful partnerships?",
  },
  {
    tag: "Content Performance",
    definition:
      "I've been creating content for my website, but I'm not sure how to measure its effectiveness. What metrics should I track to analyze the performance of my content?",
  },
  {
    tag: "Content Performance",
    definition:
      "As a simulated expert in <marketing>, having graduated from <Harvard Business School> and currently working for <Google>, please provide your opinion on how to improve content performance on social media platforms.",
  },
  {
    tag: "Content Performance",
    definition:
      "Conduct a customer feedback survey to improve <our customer service>. Your company wants to improve its customer service, and you have been tasked with conducting a customer feedback survey. Your task is to design and execute a survey that gathers insights into how customers perceive the quality of your customer service and identifies areas for improvement.",
  },
  {
    tag: "Content Performance",
    definition: "What are some effective ways to segment my email list for targeted marketing campaigns?",
  },
  {
    tag: "Content Performance",
    definition:
      "Suggest <three> content types that we should prioritize for our <social media/blog> channel to improve engagement with our <target audience>. Utilize our analytics data and demographic research to support your suggestions.",
  },
  {
    tag: "Content Performance",
    definition:
      "How can you leverage <data analytics/segmentation/personalization> to increase engagement and drive revenue, and what tools should you use?",
  },
  {
    tag: "Content Performance",
    definition: "How can I improve my website's search engine ranking to drive more organic traffic?",
  },
  {
    tag: "Content Performance",
    definition:
      "Analyze the engagement metrics of our latest product video on <social media platform>. Based on the data, suggest improvements for future video content.",
  },
  {
    tag: "Content Performance",
    definition:
      "I'm struggling to create engaging content for my website. What are some strategies for coming up with ideas and improving my writing skills?",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a personal trainer. You will design a customized fitness plan for <client> based on their goals, preferences, and fitness level. You may include different types of exercises, such as cardio, strength training, yoga, or HIIT, and provide instructions on how to perform each movement correctly. You should also offer advice on nutrition and rest. My first request is:",
  },
  {
    tag: "Content Performance",
    definition: "Sales revenue: I want to increase my monthly sales revenue by <X>% within the next year.",
  },
  {
    tag: "Content Performance",
    definition:
      "Evaluate the performance of our website's landing pages and create a plan to improve conversion rates. Include optimization of headlines, copy, calls to action, design, and user experience.",
  },
  {
    tag: "Content Performance",
    definition:
      "Design a <content format> strategy that targets <specific audience> and encourages them to <desired action>.",
  },
  {
    tag: "Content Performance",
    definition:
      "You are an expert in <branding>, having attended <New York University> and currently working at <Apple>. Can you offer any tips on how to create a consistent visual identity for a brand and improve content performance?",
  },
  {
    tag: "Content Performance",
    definition:
      "Recommend <three> changes we can make to our <landing page/product page> content to reduce bounce rate and increase conversions. Take into account our user behavior data and A/B testing results.",
  },
  {
    tag: "Content Performance",
    definition:
      "How can I use data analysis to identify opportunities for growth and optimization across my marketing channels?",
  },
  {
    tag: "Content Performance",
    definition:
      "E-commerce: I want to increase my online store's conversion rate from <1%> to <5%> and revenue from <$10,000> to <$100,000> within twelve months.",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a salesperson. You will approach potential customers and offer them <product/service> using persuasive language and techniques, such as creating a sense of urgency, addressing their needs and objections, or offering incentives or discounts. You should also be knowledgeable about the features and benefits of the product, and able to handle any questions or objections they may have. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a nutritionist. You will provide me with a customized meal plan based on my <dietary requirements/health concerns>. Your plan should include nutritious and delicious meals that are easy to prepare and fit my lifestyle. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "You are an accomplished <SEO professional>. Having finished your degree at <Stanford>, you are currently employed at <Amazon>. Can you provide me with some tips on how to optimize my website's content to increase organic traffic?",
  },
  {
    tag: "Content Performance",
    definition:
      "Design a landing page that highlights the benefits of signing up for our monthly newsletter, and includes a sign-up form and compelling call-to-action. The landing page should be visually appealing and easy to navigate, and should target <ideal customer persona>.",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a financial advisor. You will analyze the financial situation of <client> and offer recommendations on how to improve their financial health, such as creating a budget, reducing debts, saving for emergencies, or investing in stocks or real estate. You should also explain the risks and benefits of each option, and take into account their short-term and long-term goals. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "Generate a series of Tweets and Instagram posts that highlight the unique features and benefits of our <product/service>, with a strong call to action for followers to visit our website or make a purchase.",
  },
  {
    tag: "Content Performance",
    definition:
      "Develop a monthly content calendar that includes <content themes>, <publishing platforms> and specific <key performance indicators>.",
  },
  {
    tag: "Content Performance",
    definition:
      "I'm managing a social media account for my business, but I'm having trouble growing my following. What strategies can I use to increase engagement and attract new followers?",
  },
  {
    tag: "Content Performance",
    definition:
      "Provide a list of <ten> trending topics related to our <industry/product/service> that we should monitor and potentially create content around. Use our competitor analysis and keyword research tools to inform your choices.",
  },
  {
    tag: "Content Performance",
    definition:
      "Come up with a list of creative hashtags for <our social media campaign>. Your company is launching a social media campaign, and you need to come up with a list of creative hashtags to use across social media platforms. Your task is to brainstorm hashtags that resonate with your target audience, reflect your company's brand values, and are easy to remember and use. Think about how you can create hashtags that encourage user-generated content and spark conversations around your campaign.",
  },
  {
    tag: "Content Performance",
    definition:
      "As a content performance analysis expert, you have an in-depth understanding of the importance of data analysis in creating high-performing content. Can you walk me through your process for analyzing content marketing campaign data to identify which strategies are most effective?",
  },
  {
    tag: "Content Performance",
    definition:
      "Your content has received negative feedback from a particular sector of your audience. How do you address their concerns and adjust your strategy without alienating the rest of your readership?",
  },
  {
    tag: "Content Performance",
    definition:
      "Analyze data from <current content marketing efforts> and develop a plan to optimize <top performing areas> to increase overall engagement and conversions.",
  },
  {
    tag: "Content Performance",
    definition:
      "Brainstorm ideas for social media content to promote <our new product>. Your company has just launched a new product, and you need to create social media content to generate buzz and drive sales. Your task is to brainstorm ideas for social media posts that highlight the benefits of the new product and encourage customers to make a purchase.",
  },
  {
    tag: "Content Performance",
    definition:
      "Please provide five essential keywords that we must incorporate in our website's content to improve our search engine ranking for <target audience> while considering our ongoing SEO strategy and competitor analysis.",
  },
  {
    tag: "Content Performance",
    definition:
      "I'm considering investing in paid search advertising for my business. How can I ensure that my ads are optimized for maximum performance and ROI?",
  },
  {
    tag: "Content Performance",
    definition:
      "Video marketing: I want to increase my YouTube channel subscribers from <100> to <5,000> and monthly views from <1,000> to <100,000> within one year.",
  },
  {
    tag: "Content Performance",
    definition:
      "Develop a comprehensive influencer marketing strategy to promote <product/service> to a wider audience. Include identifying influencers, compensation models, promotional materials, and success metrics.",
  },
  {
    tag: "Content Performance",
    definition: "What strategies can I use to optimize my PPC ads for better click-through rates?",
  },
  {
    tag: "Content Performance",
    definition:
      "Content engagement: I want to increase my <Blog/Podcast/Videos> engagement by <X>% within the next six months.",
  },
  {
    tag: "Content Performance",
    definition:
      "Create a social media content calendar for the next six months that aligns with our brand's voice and mission. Include platforms, post types, themes, and engagement strategies.",
  },
  {
    tag: "Content Performance",
    definition:
      "Create a list of <content types> for each stage of the customer journey, tailored to <specific audience> and their pain points.",
  },
  {
    tag: "Content Performance",
    definition:
      "I want to improve the conversion rate of my website, but I'm not sure where to start. Can you recommend some strategies for optimizing my website's user experience and increasing conversions?",
  },
  {
    tag: "Content Performance",
    definition:
      "Email marketing: I want my email conversion rate to increase from <X>% to <Y>% within the next three months.",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a public speaker. You will deliver a motivational speech to a <target audience> audience. Your speech should include personal anecdotes, inspiring quotes, and real-life examples to motivate and inspire the audience to take action towards their goals. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "Develop a white paper that explores the ways in which <industry> companies can use <specific technology> to enhance their operations, and provides real-world examples of businesses that have successfully implemented this technology.",
  },
  {
    tag: "Content Performance",
    definition:
      "Analyze the performance of our current email marketing campaigns and create a plan to optimize open rates, click-through rates, and conversion rates. Include A/B testing, improved targeting, and personalized messaging.",
  },
  {
    tag: "Content Performance",
    definition:
      "I'm launching a new email marketing campaign for my business. What are some best practices for crafting effective subject lines and calls to action?",
  },
  {
    tag: "Content Performance",
    definition:
      "Using <content management system> analytics, identify the top-performing pages on our website. Develop a plan to optimize these pages for SEO and user experience.",
  },
  {
    tag: "Content Performance",
    definition:
      "I'm looking to improve my website's conversion rates. What are some strategies for optimizing my landing pages and streamlining the user experience?",
  },
  {
    tag: "Content Performance",
    definition:
      "Identify <five> high-performing <blog post/pages> that we should update with fresh content, keyword optimization, and improved multimedia to maintain their SEO and user engagement success. Use our content analytics and industry best practices to support your choices.",
  },
  {
    tag: "Content Performance",
    definition:
      "Create a plan to increase <website/blog> traffic by X% in the next quarter through targeted content marketing efforts. Include specific content topics, publishing frequencies, and promotional channels.",
  },
  {
    tag: "Content Performance",
    definition:
      "Your website has seen a recent dip in traffic and user engagement. What tools and metrics do you use to analyze the content that's causing the drop, and how do you make data-driven decisions to address the issue?",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a psychologist. You will provide counseling and support for <client> who is struggling with <mental health issue>. You should create a safe and supportive environment for them to share their feelings and experiences, and offer practical tools and strategies to cope with their symptoms and improve their well-being. You should also be sensitive to their cultural background and personal beliefs. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "Please recommend five alternative keywords to our current primary keywords that can improve our website's ranking with respect to our <target audience> and increase our organic traffic.",
  },
  {
    tag: "Content Performance",
    definition: "What metrics should I track to evaluate the success of my social media campaigns?",
  },
  {
    tag: "Content Performance",
    definition:
      "What are the most effective <social media/search engine> advertising strategies for driving traffic and conversions, and how can you optimize them?",
  },
  {
    tag: "Content Performance",
    definition:
      "Create an infographic that visually displays the key findings of our latest consumer survey, and offers insights into the preferences and behaviors of <specific demographic>. The infographic should be easy to read and understand, and should be shareable on social media.",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a fitness trainer. You will create a personalized workout routine for me based on my <fitness goals/physical limitations>. Your routine should include warm-ups, exercises, and cool-downs that are challenging yet achievable for me. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "Identify <industry trends> and create a plan to integrate them into your content strategy, ensuring it stays relevant and competitive.",
  },
  {
    tag: "Content Performance",
    definition:
      "As a simulated expert in <video production>, having graduated from <University of California, Los Angeles> and working in <YouTube studio>, what are some things I can do to improve video content performance and increase views and engagement?",
  },
  {
    tag: "Content Performance",
    definition:
      "Your content is generating a lot of traffic, but not enough conversions. How do you optimize your messaging and calls-to-action to drive more action from your audience?",
  },
  {
    tag: "Content Performance",
    definition:
      "How do you create a <content/blog/infographic> that resonates with your target audience, and what metrics should you track to measure engagement?",
  },
  {
    tag: "Content Performance",
    definition:
      "I have a growing social media following, but I'm not seeing a lot of engagement. Can you recommend some tactics for increasing interaction and building a community?",
  },
  {
    tag: "Content Performance",
    definition:
      "Brainstorm ideas for a webinar series on <relevant industry topic>. Your company wants to position itself as a thought leader in the industry, and you have been tasked with developing a webinar series on a relevant industry topic. Your task is to brainstorm ideas for the topics, guest speakers, and goals of the webinar series. Think about how you can create interactive, engaging webinars that provide valuable insights and position your company as an authority in the industry.",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a customer service representative. I will be the customer and you will handle my <complaint/query> professionally and efficiently. You should provide clear, concise and helpful solutions to my problem to ensure customer satisfaction. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "Could you suggest ten long-tail keywords related to our <product/service> that we should optimize for, and recommend how we can efficiently integrate them into our content strategy?",
  },
  {
    tag: "Content Performance",
    definition:
      "Your content has been well-received, but you're struggling to keep up with the demand for fresh material. What are some strategies for maintaining a consistent and engaging content pipeline?",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a career coach. You will provide me with guidance and advice on <career choices/job search/interview prep>. Your coaching should be tailored to my individual needs and goals, and should help me identify and overcome any obstacles in my career path. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "As a top-performing content analyst with a degree from <school>, what advice would you give to a company struggling to determine the optimal timing and frequency for their social media posts?",
  },
  {
    tag: "Content Performance",
    definition:
      "I recently launched a new website, but it's not ranking well in search engine results. What are some ways I can improve my website's SEO and boost its visibility online?",
  },
  {
    tag: "Content Performance",
    definition:
      "You've just published a new piece of content, but it's not receiving the traffic or engagement you had hoped for. What steps do you take to analyze its performance and identify areas of improvement?",
  },
  {
    tag: "Content Performance",
    definition:
      "Conduct a survey of <customer demographic> to determine the most pressing questions or concerns they have about our industry. Create a blog post that answers these questions and offers valuable insights.",
  },
  {
    tag: "Content Performance",
    definition:
      "It's time to promote your content, but you're not sure where to start. What are some effective strategies for increasing visibility and engagement?",
  },
  {
    tag: "Content Performance",
    definition:
      "Develop a plan to optimize the <website/blog> for SEO. Your company's website or blog needs to rank higher in search engine results pages (SERPs), and you have been tasked with developing a plan to optimize it for SEO. Your goal is to increase organic traffic by identifying and implementing the most effective SEO tactics.",
  },
  {
    tag: "Content Performance",
    definition:
      "You've noticed that your competitors are producing content that seems to be performing better than yours. What methods do you use to analyze their strategy and tactics, and how do you adapt your content to stay competitive?",
  },
  {
    tag: "Content Performance",
    definition:
      "I want you to act as a social media marketer. You will come up with engaging content that will catch the attention of potential clients or followers for <company/product/person>. Depending on the platform, you may use different techniques and formats e.g., witty captions, visually appealing images or videos, hashtags, influencer partnerships, etc. My first request is:",
  },
  {
    tag: "Content Performance",
    definition:
      "Evaluate the conversion rates of our current email marketing campaigns. Develop a strategy for A/B testing different subject lines, messaging, and calls to action to improve performance.",
  },
  {
    tag: "Content Performance",
    definition:
      "Analyze <our campaign> data to optimize performance. Your company has launched a marketing campaign, and now you need to analyze the data to optimize its performance. Your task is to identify key metrics, such as conversion rate and click-through rate, and use them to evaluate the effectiveness of the campaign. Based on your findings, you should make recommendations for how to improve performance moving forward.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a personalized outreach plan to <target audience/demographic> using email, social media, and other channels. Include specific messaging and incentives that speak directly to their needs and interests.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "What are some innovative <content distribution channel> strategies to broaden your audience and brand awareness?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as an email marketer. You will craft a persuasive email for <insert product/service> that will entice the recipient to take action. Your subject line should be attention-grabbing and your content should address the recipient’s pain points and present a solution. You should also include a clear call-to-action that encourages the recipient to click through to the website. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've distributed your content, but it's not getting the engagement you had hoped for. What are some ways to increase your audience's engagement with your content?<Content>, <Audience engagement methods>",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "How can <insert brand/business> use influencer marketing to reach a wider audience?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Email Marketing: I want to increase email subscription rates by <X>% within <Y> months through effective email marketing campaigns.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a community outreach program to raise brand awareness. Your company wants to connect with the local community and promote your brand at the same time. Your task is to develop a community outreach program that will build relationships with potential customers, generate visibility, and support your brand values. Think about charity partnerships, events, sponsorships, and volunteering opportunities.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Provide a list of 10 long-tail keywords related to our <blog/website> content that we should optimize for, and suggest how we can incorporate them into our content strategy to improve our search engine ranking.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Social media reach: I want to increase <LinkedIn/Facebook/Twitter/Instagram> reach from X followers to Y followers in Z months.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Suggest five keywords that we should use in our social media advertisements to promote our <product/service> to <target audience>, taking into account our competitor analysis and ad budget.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a video producer. You will produce a video that showcases <company/product/service> in a creative and interesting way. Your video should be entertaining, informative and engaging for the audience. Depending on the target audience, you may choose specific topics or themes that would resonate with them better. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a public relations specialist. You will draft a press release for <insert company/organization> that effectively communicates their latest news and achievements. Your writing should be clear, concise and free of any grammatical errors. You must also follow AP style formatting guidelines. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I have <insert type of content> that I want to promote. What are some effective distribution channels to increase its visibility?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Video marketing: I want to increase engagement on my <YouTube/Facebook/Instagram/TikTok> channel by Z% within X months by creating and promoting high-quality video content.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Email marketing: I want to increase <leads/subscribers/sales> by Z% through email marketing campaigns in X months.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "What are some creative strategies for <insert business/product> to promote content offline?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a paid advertising campaign that targets <specific demographics/segments> and drives conversions at each stage of the funnel. Include specific targeting criteria, ad formats, and budget allocations.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I have a limited budget for promoting my content. Can you suggest some cost-effective strategies that can still yield good results?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create a content calendar for <our blog>. Your company has a blog that you need to populate with high-quality content on a regular basis. Your task is to create a content calendar that will guide your team's content creation process. Think about what topics are relevant to your target audience, which types of content perform best on your blog, and how often you want to publish new content.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Write a case study about <client/customer> and how they use our <product/service> to achieve their business goals, including quotes and measurable results.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Provide a list of five target keywords that we should focus on when optimizing our content for search engines, and suggest strategies we can use to incorporate these keywords into our <blog/website> content.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Your content has been shared widely, but now you need to sustain that momentum. What are some strategies for keeping your content fresh and gaining new followers over time?<Content refreshment>, <Follower growth strategies>",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop an outreach strategy to promote <our industry report>. Your company has just released a new industry report, and you need to promote it to reach a wider audience. Your task is to develop an outreach strategy that will generate interest and increase visibility for the report. Think about who your target audience is, which channels are best for reaching them, and what kind of messaging will be most effective in convincing them to download and read the report.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Brainstorm creative ways to promote <our new product launch>. Your company is launching a new product, and you need ideas to promote it effectively. Your task is to brainstorm strategies that will generate buzz, reach your target audience, and drive sales. Think about social media campaigns, influencer partnerships, content marketing, and other tactics.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a social media specialist. You will come up with a social media campaign that will increase engagement and reach of <company/product/service>'s social media platforms. Your campaign should be unique, creatively designed, and drive traffic to the website or landing page. Depending on the target audience, you may choose specific topics or themes that would engage them better. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a video producer. You will create a short promotional video for <insert company/brand> that showcases their product or service. Your video should be visually stunning and use engaging storytelling to communicate the brand’s message. You should also incorporate text and music that align with the brand’s personality. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "What are some effective <social media platforms> strategies to increase content reach and engagement?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've created an amazing blog post, but how do you get it in front of your target audience? What content promotion and distribution strategies do you use?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "My website's bounce rate is high, and visitors aren't staying on the site for very long. What are some tips for creating more engaging content?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a white paper about <industry trend/topic> that provides <target audience> with in-depth analysis and actionable takeaways to help them stay ahead of the curve.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You are an industry-leading Content Promotion and Distribution specialist who studied at <university> and has experience working with <big clients>. Can you share your insights on how to approach <content distribution strategy for B2B businesses/B2C brands>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Collaborate with <industry expert> to create thought leadership content. Your company wants to position itself as a thought leader in your industry, but you need expert insights and advice. Your task is to identify an industry expert who can collaborate with your team to create high-quality thought leadership content. Think about how you can leverage their expertise, create valuable content, and promote it to your target audience.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Suggest five guest blog topics related to our <product/service> that we can pitch to other websites, and provide reasoning behind why you think each topic would be engaging and informative for their audience.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Craft a press release announcing our latest <product/service> launch, highlighting key features and benefits, and positioning it as a solution to <industry challenge/problem>.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Recommend five external websites where we can share our <blog/website> to reach a wider audience, and explain why these websites would be beneficial for our content distribution strategy.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "What are the top five trending keywords in our industry, and how can we create content that incorporates these keywords to attract both our target audience and new potential customers?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Lead Generation: I want to generate <X> leads per month through targeted content distribution on social media platforms.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Produce a video tutorial that showcases the benefits and features of our <product/service> and how it can solve <target audience's> pain points, while also highlighting industry best practices.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create an infographic that visually demonstrates <industry stats/facts> and how our <product/service> compares to competitors, while also highlighting key differentiators that make us stand out in the market.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "What are some best practices for optimizing your <website/blog> for search engines to improve content visibility and traffic?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "As a seasoned Content Promotion and Distribution expert who has worked for <big company> for <number> years, what advice would you offer to <social media marketer/PR strategist> on how to create more buzz for their brand?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You're a talented <graphic designer> who achieved a degree from <Rhode Island School of Design> and now works at <Apple>. Can you share your thoughts on how businesses can create <eye-catching visuals> that appeal to their <target demographics> and draw attention to their <brand message>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a strategy for using <user-generated content> to promote <our brand>. Your company has a loyal group of customers who are creating content related to your brand on social media. Your task is to develop a strategy for harnessing this user-generated content to promote your brand. Think about which platforms your customers are using, what kind of content they are creating, and how you can incentivize them to continue engaging with your brand.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You're a top-tier <public relations consultant> who completed your education at <Columbia University> and now works at <Edelman>. Can you provide insight on how to <craft an effective media pitch> that grabs journalists' attention and boosts <brand visibility>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Content Repurposing: I want to repurpose <X> pieces of existing content into different formats, such as infographics, videos, and blog posts, within <Y> weeks for better content distribution.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "Website Traffic Boost: I want to increase monthly website traffic from <X> to <Y> within <Z> months.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a public relations representative. You will create a buzz for <celebrity/brand/event> by crafting a press release that garners attention and effectively communicates the message to the audience. Your press release should be well-written, catchy, and informative. Depending on the target audience, you may choose specific media outlets or journalists that would be interested in the story. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Brainstorm ideas for a social media campaign to promote <our latest product launch>. Your company has a new product that is about to launch, and you've been tasked with creating a social media campaign to promote it. Your goal is to generate buzz and excitement around the launch, and drive traffic to the product page on your website. Think about which social media channels are most effective for your target audience, what kind of content will be most engaging, and what calls to action will encourage people to learn more about the product.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "How can you leverage <paid advertising> to boost content promotion and achieve better conversion rates?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create a social media campaign that highlights the cultural relevance of our <product/service> for <target audience>, such as a hashtag challenge or influencer partnership, that encourages user-generated content and amplifies our brand message.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Design a referral program that incentivizes current customers to share our <product/service> with their networks. Include specific rewards, messaging, and tracking mechanisms to ensure success.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've published an e-book on a niche topic, but how do you ensure it reaches a wider audience? What content promotion and distribution tactics can you use to generate interest and increase downloads?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "What are some ways to optimize <insert website/channel> for search engine results?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "With your expertise in Simulate Expert, what strategies would you recommend to <small business/entrepreneur> in order to optimize their content and boost engagement?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I'm interested in collaborating with other businesses or influencers to expand my reach. How can I go about finding potential partners in my industry?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Build a content distribution matrix to share <product/service> content with relevant online communities, influencers, and media outlets. Utilize tools like Google Analytics, Buzzsumo, and HARO to identify relevant communities and influencers.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop an email marketing campaign to promote the <product/service> by creating compelling subject lines, personalized content, and calls to action. Ensure that the email list is segmented by consumer behavior and interests for maximum efficacy.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Suggest three niche keywords that we can use to target a specific subset of our <target audience>, and provide strategies for reaching this group through our content distribution channels.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Launch a referral program that incentivizes current customers to share their positive experience with the <product/service> with their networks. This will need to involve crafting a clear incentive program, providing referral links, and tracking results.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Build a content distribution plan that targets <key industry influencers/publications> in order to expand our reach and establish credibility within the <industry/niche>.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You are an experienced <content strategist> who completed their studies at <University of California, Los Angeles> and currently works in <Content Marketing Agency X>. How would you recommend optimizing <social media> to reach <young audiences> and drive <organizational goals>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as an SEO specialist. You will optimize <website/product/service> for search engine visibility and ranking. Your optimization should be well-researched, effective, and align with current SEO practices. Depending on the target audience, you may include specific keywords or phrases that would increase organic traffic. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Provide a list of five location-based keywords that we can use in our online advertising to target customers in specific regions, and suggest how we can customize our content to appeal to these customers.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I've been using <insert social media platform> to promote my content, but I'm not getting the engagement I want. What are some best practices for increasing engagement on social media?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want to get my content featured on other websites/blogs. What are some best practices for content outreach and promotion?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I have <insert type of content> that I want to promote, but I'm not sure what platforms to use. Can you recommend some channels for content distribution?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've created an incredible piece of content, but now you need to promote it. What are some effective methods for getting your message out to your target audience?<Target audience>, <Promotion methods>",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Your company has produced a whitepaper aimed at a specific industry, but how do you get it in front of the right people? What content promotion and distribution strategies can you use to ensure it's downloaded and read by your target audience?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Please generate a white paper that delves into the science behind our <product/service>, exploring how it works and its impact on our <target audience>, and including case studies and testimonials from satisfied customers.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a video series that showcases the features and benefits of our <product/service>, while also addressing common pain points for our <target audience>, and highlighting how our solution can help solve these problems.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You are a highly skilled professional in Content Promotion and Distribution, having graduated from <university/school> and working for <company>. Can you share your opinion on how to effectively promote <newly-launched app/service>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as an email marketer. You will create an email campaign that will increase <company/product/service> sales and engagement. Your email should be personalized, engaging, and provide value to the recipient. Depending on the target audience, you may include specific call-to-actions or promotions that would get them interested. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I've been creating a lot of content, but I'm not sure if it's resonating with my target audience. How can I measure engagement and adjust my strategy accordingly?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Brainstorm ideas for a webinar series to promote <our expertise>. Your company is known for its expertise in a particular industry, and you want to share that expertise with a wider audience. Your task is to brainstorm ideas for a webinar series that will attract potential customers and position your company as a thought leader in the industry. Think about which topics are most relevant to your target audience, what format will be most engaging, and how you can promote the webinars to generate interest.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create a content distribution plan to reach <our target audience>. Your company has created valuable content, but you need a plan to distribute it effectively. Your task is to create a content distribution plan that will reach your desired audience and maximize engagement. Think about social media platforms, email marketing, syndication, guest posting, and other distribution channels.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "How can you use <influencer marketing/affiliate marketing> to promote your content and reach a wider audience?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Recommend five industry influencers in our niche that we can collaborate with to promote our <product/service>, and outline the benefits of partnering with each influencer.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Influencer marketing: I want to collaborate with <3/5/10> influencers with a following of X to Y followers to promote my product/service within Z months.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create a social media marketing strategy to increase engagement and drive traffic to <website/platform>. This should involve identifying the best social media platforms to use, planning content campaigns, and using analytics to track progress.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a social media marketer. You will create compelling posts for <insert platform> that will engage and inspire the target audience. Your content should be visually appealing and use relevant hashtags to increase visibility. Depending on the industry and target audience, you may need to use different types of content such as inspirational quotes or product images. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Conduct a survey to gather insights on <relevant industry trend>. Your company wants to stay up-to-date on the latest industry trends and gather insights from your target audience. Your task is to conduct a survey that will provide valuable data and insights on a relevant industry trend. Think about the questions you need to ask, the survey platform to use, and how you can analyze and use the data to inform your strategy.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "Brand Awareness: I want to increase brand awareness by <X>% in <Y> months through content marketing.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want to start a podcast for my business, but I'm not sure what topics to cover. Can you recommend some strategies for generating content ideas?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "As a Content Promotion and Distribution expert with <number> years of experience, what advice would you give to <newly-launched blog/website> on how to increase their traffic?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create a thought-leadership article discussing <industry trend> and the opportunities/challenges it presents for <target audience>, incorporating quotes from relevant experts and data to support your points.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Your company has just released a new product, but sales are slow. What are some effective content promotion and distribution tactics to increase awareness and drive sales?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Name five social media platforms that we should focus on for promoting our <product/service> to reach our target audience, and provide recommendations for the best types of content to share on each platform based on our marketing strategy.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've launched a content marketing campaign, but you're not sure if it's reaching the right people. What are some ways to measure the success of your campaign?<Campaign metrics>, <Measurement methods>",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've created a video series to showcase your expertise, but how do you ensure it gets seen and shared by your target audience? What content promotion and distribution techniques can you employ to maximize its reach?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition: "How can <insert business/product> effectively promote content on social media platforms?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Create a comprehensive social media strategy for <company/product> that outlines specific platforms, content types, and posting schedules in order to increase engagement and drive conversions.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "As an expert <SEO specialist> who graduated from <University of Miami> and works at <Hubspot>, how would you suggest <developing a keyword strategy> for a <new blog> to rank well on <search engine results pages> and increase <organic traffic>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "How can <insert brand/business> effectively leverage email marketing to drive engagement and conversions?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "As a skilled <digital marketer> who graduated from <University of Pennsylvania> and works at <Google>, what's your take on effective ways to increase <website traffic> for an <e-commerce platform>?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Develop a comprehensive content marketing plan to promote <product/service>. This should include key messaging, target audience, channels for distribution, and metrics for success.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want to repurpose some of my existing content (e.g. turning a blog post into a video or a social media post). How can I ensure that the repurposed content stays fresh and engaging for my audience?",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Content promotion goals: I want to increase <website/blog/PDF/downloadable> traffic from X visitors per month to Y visitors per month in Z months.",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "You've got a new product to promote, but you're not sure where to start. What are some tactics for effectively promoting your product to your target audience?<Product>, <Promotional tactics>",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "I want you to act as a podcast host. You will lead a discussion with <insert guest> on <insert topic>. Your questions should be well-researched and thought-provoking, encouraging the guest to share their expertise and insights. Your conversation should be informative, engaging and entertaining for the listeners. My first request is:",
  },
  {
    tag: "Content Promotion and Distribution",
    definition:
      "Please develop an infographic that showcases the benefits of <product/service> for our <target audience>, including statistics and eye-catching visuals that will encourage social media shares and engagement.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Write a product description that showcases <key features> with concise and compelling language, targeted to <customer demographic> who prioritize <value elements>.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You've been given a blog post to optimize for a specific keyword. What are some on-page SEO techniques you can use to ensure the post is well-optimized for search engines?",
  },
  {
    tag: "SEO Copywriting",
    definition: "What are some effective strategies for <business> to create high-quality backlinks?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a blog writer. You will write informative and engaging blog posts that will attract our target audience. The posts must use relevant keywords and have a clear purpose. Use visuals and research to back up your points. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want to create a blog to attract more traffic to my website. Can you provide some tips for producing <high-quality> content that will rank well?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a social media manager. You will create engaging <platform> posts that align with our brand voice and tone. The posts should have eye-catching visuals that can capture our audience's interest. Make sure to use relevant hashtags to increase our reach. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Design a landing page for <product/service> that is optimized for high conversion rates. Include <customer testimonials, product features, call-to-action buttons, etc.> to encourage visitors to take action.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "As a top talented SEO copywriter who finished <university> and works at <big company>, how can I effectively incorporate <long-tail keywords/LSI keywords> into my content to improve search engine rankings?",
  },
  {
    tag: "SEO Copywriting",
    definition: "How can <your brand> use social media to build brand awareness and increase website traffic?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a series of how-to guides that demonstrate <product/service> functionality, offering step-by-step instructions, screenshots, and tips for optimization, specifically tailored to <target user personas>.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Write a case study that describes how your <product/service> solved a problem for a real customer, and provide data and other evidence that supports its effectiveness. Use language that connects with your <target audience>, and highlight the features and benefits that differentiate your solution from others on the market.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Analyze current website content and make recommendations for improvement. Your company's website needs improvement to better engage and convert visitors. Your task is to analyze the current content and make recommendations for improvement. Consider factors like readability, user experience, and calls-to-action.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You are an experienced SEO copywriter who graduated from <University>, and you are working with <company>. What are your top tips for optimizing website content for <search engine>?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Write an email series to nurture leads for <specific product/service>. Your company offers a complex product or service that requires a longer sales cycle. Your task is to write an email series that educates and nurtures leads throughout the sales funnel. Think about the pain points and questions that your leads have, how your product or service can solve their problems, and how you can build trust and credibility through your email content.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a social media marketer. You will develop engaging and informative posts for <insert social media platform>, targeting <insert target audience>. Your job is to increase brand awareness and engagement through creative storytelling and relevant content. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "As a skilled <field> expert with a degree from <University> and employment at <company>, how would you suggest optimizing a <specific industry> website for mobile users?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a content strategy for <company name> that focuses on <target audience> and includes <X> blog posts per month, <X> social media posts per week, and <X> email campaigns per quarter.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "How can we incorporate <location-based keywords> into our website copy to improve our local search ranking and reach our target audience in <local area>?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Could you analyze our competitor's content and suggest <3> target keywords that we should include in our <blog> to improve our search ranking and stay ahead of the competition?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You are a seasoned SEO copywriter who's worked with both <B2B/B2C> clients, graduating from <School>. What are some unconventional methods you've found effective at improving website ranking and organic traffic?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Can you suggest some strategies for creating <compelling> metadata that will entice users to click on my website's search results?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You're tasked with optimizing the <title> tag for a webpage. What are some key elements you should consider when crafting a title that is both SEO-friendly and engaging for users?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "In your opinion, what is the most effective way to conduct keyword research for a website in <industry>? Share your process and recommended tools.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You've been asked to optimize the <alt> tags for the images on a webpage. How can you ensure the tags are both descriptive for screen readers and optimized for search engines?",
  },
  {
    tag: "SEO Copywriting",
    definition: "How can <company> use social media to boost their website traffic?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Conduct a competitive analysis of <specific industry> to identify opportunities for growth. Your company wants to expand its market share in a specific industry. Your task is to conduct a thorough competitive analysis and identify areas where your company can differentiate itself and capture more market share. Consider factors like pricing, customer service, and unique value propositions.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Write a landing page that effectively communicates the value of your <product/service> and encourages visitors to take a specific action, such as filling out a form or making a purchase.",
  },
  {
    tag: "SEO Copywriting",
    definition: "Content Engagement: I want to increase my blog post engagement by <200%> within the next <6 months>",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Based on our industry research and target audience, what are <5> high-potential keywords that we can leverage to attract more traffic to our <landing page>, and how can we use them in our copy effectively?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create an infographic that explains the complexities of your <industry/topic>, using eye-catching graphics and clear, concise language that appeals to your <target audience>.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as an email marketer. You will craft persuasive and personalized messages for <insert target audience>, with the goal of increasing open and click-through rates. Your writing should be clear, concise, and action-oriented, with a focus on converting leads into customers. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a product promoter. You will come up with compelling descriptions of <insert product>, highlighting its unique features and benefits. Your goal is to persuade potential customers to purchase the product based on its value proposition. Consider targeting specific audiences based on interests, demographics, or location. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Share your opinion on the importance of meta descriptions in SEO copywriting for <industry>. How can we effectively craft compelling meta descriptions while still optimizing for search engines?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create a comprehensive SEO strategy for <website/product/service> that will increase search engine rankings and drive more organic traffic to the site. Include a detailed keyword research analysis, on-page optimization techniques, and a plan for building high-quality backlinks.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "e-Commerce Sales: I want to increase my online store's monthly sales from <$10,000> to <$100,000> in <6 months>",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Your team is conducting keyword research for a new website. What tools and techniques do you use to identify low competition, high volume keywords that can be realistically targeted?",
  },
  {
    tag: "SEO Copywriting",
    definition: "Website Traffic: I want to increase my monthly website traffic from <500> to <10,000> in <3 months>",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Brainstorm content topics and keywords for an <industry-specific> blog. Your company is starting a blog to attract customers and establish thought leadership in your industry. Your task is to brainstorm content topics and keywords that align with your company's mission and expertise. Think about what your customers are searching for, what questions they have, and what kind of content they would find valuable.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "How can we leverage <competitor keywords> to improve our own SEO strategy and gain a competitive advantage in our online industry?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a website reviewer. You will assess the usability, design, and content of <insert website>, providing constructive feedback and recommendations for improvement. Your insights should be relevant to the target audience and aligned with the website's purpose. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Can you suggest some high-traffic <industry-specific keywords> that we should target in our website copy to increase our online visibility and attract more traffic to our site?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a SEO copywriter. You will create captivating <product/service> descriptions that will engage with our target audience. The descriptions must use relevant keywords to improve our search engine rankings. Make sure to explain the benefits of the <product/service> in a clear and concise manner. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Can you suggest <5> high-ranking keywords that we should prioritize for our <e-commerce website> to improve visibility for our <target audience> based on our current SEO analysis?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I'm struggling to come up with effective keywords for my website. Can you recommend some tools or techniques for finding relevant and high-traffic keywords?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "My website's search engine ranking is low. How can I optimize my website's on-page <keywords> to improve my ranking?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "My website's load times are slow, and I'm concerned that this could be affecting my SEO. What are some steps I can take to improve my website's speed and loading times?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as an email marketer. You will create engaging emails that will encourage our subscribers to take action. The emails should have a clear message and a call to action. Use personalized content that will make our subscribers feel valued. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition: "How can <client> improve their meta descriptions to increase click-through rates?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want to increase my website's backlinks to improve its ranking. What are some ethical ways to <build> backlinks that will positively affect my website's SEO?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Generate a product description for <product> that highlights its unique features and benefits, and uses language that resonates with your <target audience>.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create a webpage that provides comprehensive information about <product/service>, including <unique features/benefits>, customer reviews, and frequently asked questions.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop an email marketing campaign for <company/brand> that will capture leads and nurture them through the sales funnel. Use segmentation, personalization, and automation to deliver targeted messages to specific audiences at the right time. Include A/B testing to optimize open rates, click-through rates, and conversions.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "A competitor has recently launched a successful <product/service> and you've been tasked with writing copy for your client's comparable offering. What strategies do you employ to differentiate your client's offering and stand out among similar products/services?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "A client has asked you to create a meta description for their homepage. How can you craft a compelling and concise description while also incorporating relevant keywords?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a keyword strategy for <specific product/service>. Your company wants to improve its search engine rankings for a specific product or service. Your task is to develop a keyword strategy that will help your pages rank higher in search results. Consider both short-tail and long-tail keywords, as well as location-based searches.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "My website's search engine rankings have been slipping. What are some strategies I can use to boost my SEO and regain my position?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Lead Generation: I want to generate <100> new leads per month for my business within the next <3 months>",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "What are some effective strategies for incorporating <long-tail keywords> into our blog content to increase engagement and improve our SEO ranking for <target audience>?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Compose a series of email newsletters that highlight industry news, <tips/tricks>, and <company updates>, customized for <target audience> based on their interests and preferences.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a landing page optimizer. You will analyze the effectiveness of <insert landing page>, identifying areas of improvement and optimizing the elements to increase conversions. Your recommendations should be data-driven and aligned with the target audience's needs and preferences. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Generate persuasive sales copy for <product/service> that highlights its benefits, features, and unique selling proposition. Use emotional triggers and psychological techniques to grab attention, build trust, and overcome objections. Include calls-to-action that encourage users to take the desired action, such as making a purchase or filling out a form.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create a social media content calendar to promote <product/service>. Your company is launching a new product or service, and you need to promote it on social media. Your task is to create a social media content calendar that aligns with your launch goals and target audience. Think about the social media platforms that your target audience uses, the type of content that resonates with them, and how you can track and measure engagement.",
  },
  {
    tag: "SEO Copywriting",
    definition: "How can <company> optimize their website for search engines?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Your client has provided you with a specific target audience for their <product/service>. How do you use audience research to tailor your copy to effectively speak to the needs and desires of this group?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Blog subscribers: I want to increase my blog subscribers from 500 subscribers to 10,000 subscribers in six months.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "As a knowledgeable <field> specialist who graduated from <School>, and is currently employed by <company>, what strategies can you recommend to improve the keyword rankings of a <specific industry> website?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I want you to act as a landing page designer. You will design a landing page that will convert visitors into customers. The landing page must have clear and concise content that explains the benefits of our <product/service>. Use a call to action that will encourage visitors to take action. My first request is:",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a series of email newsletters that provide valuable information, special promotions, and other enticing offers to your subscribers. Tailor your messaging to your <target audience>, and use engaging subject lines that make them want to open and read your emails.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create a SEO copywriting plan for <ecommerce website>, with the goal of increasing traffic by <X>% within the next <3/6/12> months.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Website traffic: I want to increase my website traffic from 10,000 unique visitors per month to 50,000 unique visitors per month in six months.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Brainstorm social media campaign ideas to <promote upcoming event>. Your company is hosting an upcoming event and wants to promote it on social media. Your task is to brainstorm campaign ideas that will generate buzz and drive attendance. Consider different social media platforms, creative visuals, and engaging captions.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Write email copy for <product/service> that targets <specific audience> and is designed to increase click-through rates. Use personalization, compelling subject lines, and persuasive language to drive engagement.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "As an expert in SEO copywriting who graduated from <university>, and now works at <company>, what advice do you have for improving website traffic through <keyword> optimization?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Email opt-ins: I want to increase my email opt-ins from 100 per month to 1,000 per month in six months.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Brainstorm new and creative content ideas to target <specific audience>. Your company wants to create fresh and engaging content to attract a specific target audience. Your task is to brainstorm ideas that will resonate with this audience and encourage them to engage with your brand. Consider different formats, such as blog posts, videos, and social media content.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Can you provide a list of <10-15> relevant keywords for our <product/service> that we can use to optimize our website content and improve our SEO ranking?",
  },
  {
    tag: "SEO Copywriting",
    definition: "How can <your business> create unique and valuable content that stands out from competitors?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create a social media marketing plan for <brand/business> that will increase engagement, followers, and conversions on platforms such as Facebook, Twitter, Instagram, and LinkedIn. Include strategies for creating shareable content, engaging with followers, analyzing metrics, and using paid ads to reach new audiences.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "E-commerce sales: I want to increase my e-commerce sales from $5,000 per month to $50,000 per month in one year.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I've heard a lot about backlinks and their importance for SEO, but I'm not sure where to start. Can you provide some guidance on how to acquire high-quality backlinks?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Google ranking: I want to improve my Google ranking from page 5 to page 1 for <my keyword> in three months.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I'm interested in optimizing my website for voice search, but I'm not sure where to start. Can you provide some tips or best practices for optimizing a website for voice search?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You are an accomplished SEO copywriter who has worked with <client type> businesses, and graduated from <School>. When optimizing a blog post for search engines, what are the most effective techniques to use?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You've written copy for a <landing page/email campaign/blog post> that isn't converting as well as expected. What analysis do you conduct to identify areas for improvement and optimize for better results?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Create a monthly editorial calendar for <industry/niche> that includes <X> blog posts, <X> social media posts, and <X> email campaigns. Use keyword research and audience targeting to maximize visibility and engagement.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Craft a brand story that conveys the <company's mission/values>, history, and unique selling proposition, using engaging language and storytelling techniques to connect with potential customers and build brand awareness.",
  },
  {
    tag: "SEO Copywriting",
    definition: "What are some keyword research tools that can help improve <your website's> SEO strategy?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "What are some best practices for writing meta descriptions that improve search engine visibility of <your website>?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "As an experienced SEO copywriter, how can we ensure that our website content is optimized for voice search without sacrificing quality and relevance?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a keyword research strategy to improve <website> SEO. Your company's website is not ranking well in search engines, and you need to improve its SEO. Your task is to develop a keyword research strategy to identify relevant and high-traffic keywords that can be incorporated into your website's content. Think about your target audience, their search behavior, and your competition.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "What are <3> low-competition long-tail keywords that we can use to create content targeting specific pain points of our <target audience>, and how can we measure the success of our keyword strategy over time?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a content marketing plan for <company/business> that will attract, engage, and retain customers through high-quality, informative, and shareable blog posts, articles, social media updates, and other forms of content. Include a schedule for publishing, promotion, and distribution to increase reach and visibility.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Your client is launching a new <product/service> in a competitive market with many established players. How do you write copy that highlights the unique value proposition and makes the brand stand out to potential customers?",
  },
  {
    tag: "SEO Copywriting",
    definition: "What are some effective ways to optimize <your company's> landing page for better conversion rates?",
  },
  {
    tag: "SEO Copywriting",
    definition: "What are the best keyword research tools for <industry> businesses?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "You've been tasked with writing copy for a new <product/service>, but aren't sure where to start. What research techniques do you use to identify key selling points and unique features to highlight in your copy?",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "I'm launching a new product and want to make sure it ranks well in search results. How can I perform <keyword research> to optimize my product listing and attract more potential customers?",
  },
  {
    tag: "SEO Copywriting",
    definition: "Brand Awareness: I want to increase my brand awareness by <50%> within <1 year>",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Develop a product description template to improve <online store> sales. Your online store is struggling to convert visitors into customers, and you need to improve your product descriptions. Your task is to develop a product description template that highlights the features and benefits of your products, while also addressing common objections and questions. Think about the tone and language that resonates with your target audience, as well as the visual and formatting elements that can make your product descriptions more appealing.",
  },
  {
    tag: "SEO Copywriting",
    definition:
      "Please provide a list of top <10> long-tail keywords that we can optimize for our <service offering>, and suggest ways to seamlessly integrate them into our content strategy for better organic traffic.",
  },
  {
    tag: "Marketing Storytelling",
    definition: "What metrics should <business> measure to evaluate the success of their content marketing efforts?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as an English translator, spelling corrector, and improver. Take my text in any language and translate it, improving the language to a more literary version in English. Remember to keep the meaning the same. My first sentence is: <example sentence>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "As a seasoned <marketing strategist>, having graduated from <top university>, and currently working at <top agency>, what advice would you give to companies struggling with <brand identity>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as an English translator and spelling corrector. Take my text in <insert language> and provide a corrected and more elegant version of the text in English. Keep the meaning the same.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Plan a user-generated content campaign to promote <our brand>. Your company wants to increase engagement and promote brand loyalty through user-generated content. Your task is to plan a campaign that inspires customers to share their experiences with your brand on social media. Think about how you can incentivize customers to participate, what types of content would be most effective (e.g., photos, videos, testimonials), and how you can use the content to elevate your brand's image.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as a storyteller. Come up with a captivating story that <insert desired theme or topic> for <insert target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are a highly skilled <copywriter> with a degree from <prestigious school>, and you work for <leading marketing firm>. Help me craft a compelling story to promote <new product>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create a lead generation strategy for <company> that identifies potential customers, engages them with relevant and personalized messaging, and converts them into qualified leads for the sales team.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are a top talented Marketing Storyteller, you finished your degree at Columbia University, and you are working at Apple. Help me with creating a compelling campaign story for <product>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a podcast series that explores different aspects of <industry/topic> for <ideal customer persona>. The podcast should include interviews with experts, behind-the-scenes stories, and actionable insights that can help listeners improve their daily lives or businesses.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a comprehensive storytelling plan for a new promotion centered around the keyword <keyword>, that is designed to engage our <target audience> and maximize our ROI using multi-channel marketing tactics.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm looking to expand my business's reach and recognition through influencer marketing. Can you recommend some strategies for identifying and partnering with <relevant industry/niche-specific> influencers who can help amplify my brand message to a wider audience?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create a social media campaign that utilizes user-generated content to showcase how <target audience> uses our <product/service> in their daily lives, with a specific emphasis on how it solves their pain points or improves their productivity.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "How can <insert business name> use storytelling to differentiate itself from competitors and strengthen customer loyalty?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create Plan: Launch a referral program that incentivizes current customers to refer new business. Develop the messaging and rewards program, including social media and email marketing campaigns.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm considering investing in influencer marketing for my brand. How can I identify the right influencers for my target audience and ensure a successful partnership?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You've been tasked with creating a marketing strategy for a <target audience> that is notoriously difficult to reach. How do you use storytelling to connect with this audience and convey the value of your product/service?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Your team needs to create a pitch for a <client/partnership>. How do you craft a narrative that effectively showcases your company's strengths and unique value proposition, while still providing relevant data and information?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Your company has recently experienced a major setback or failure, and now you need to rebuild your brand's reputation. How can you use storytelling to acknowledge the mistake, show your company's values, and ultimately regain the trust of your customers?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Target a niche market with an email marketing campaign. Your company has identified a niche market that would benefit from your products or services. Your task is to create an email marketing campaign that speaks directly to this market, promotes the benefits of your offerings, and encourages them to take action.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Brand positioning: I want to establish <company name> as a thought leader in the <industry> by securing <5> guest post opportunities on top industry blogs by <date>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a customer journey map for <our e-commerce website>. Your company has an e-commerce website and wants to improve the customer experience. Your task is to develop a customer journey map that outlines the touchpoints that customers interact with on your website. Think about how you can make the process easy and enjoyable for customers, from the first visit to the final purchase.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm struggling to understand my target audience. How can I create buyer personas to better understand and tailor my marketing efforts?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Your organization is facing a crisis that could potentially damage your brand reputation. How do you use storytelling to craft a response that addresses the issue transparently and authentically, while still maintaining the trust of your customers?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "As an expert in <social media marketing> who studied at <renowned university> and works at <well-known company>, what are some effective strategies for businesses trying to appeal to <millennial customers>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Product launch: I want to launch my new <product/service> and generate <100> sales within the first month by implementing a strategic marketing plan by <date>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Write a case study that features a real-life example of how <product/service> has helped a customer overcome a challenge or achieve a specific goal. This case study should be targeted towards <target audience>, and highlight the unique features, benefits, and value of the product/service.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Customer Retention: I want to increase <customer retention rate> by 20% through a personalized email marketing campaign within the next quarter.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as a movie critic. Develop an engaging and creative movie review that covers topics such as plot, themes, acting, direction, and cinematography. Focus on how the movie made you feel, and be critical (without giving spoilers).",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create a content calendar to promote <our brand> on Instagram. Your company wants to increase its visibility and engagement on Instagram. Your task is to create a content calendar that aligns with your brand's messaging and showcases your products or services in an engaging way. Think about how you can use different types of content (e.g., photos, videos, stories) to keep your audience interested and involved.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You have been given a limited budget to promote a <brand/event>. How do you use storytelling to create an impactful and memorable campaign that resonates with your target audience?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as a football commentator. Commentate on a football match in progress, analyzing the players, teams, and tactics involved in the game. Provide your prediction of how the game may end.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Write an e-book that identifies the top <number> challenges faced by <target audience> in <industry>, and provides actionable solutions and case studies that demonstrate how our <product/service> can help overcome these obstacles.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Lead Generation: I want to generate <number> leads for <product/service> through a targeted email marketing campaign within the next 3 months.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are an expert in Marketing Storytelling and you graduated from Harvard University and you are working on Simulate Expert. Give me your advice on how to create a memorable brand story for <target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a brand storytelling strategy to connect with your audience. Your company wants to connect with its audience on a deeper level by sharing its compelling story. Your task is to develop a brand storytelling strategy that highlights your company's history, vision, and values, and creates an emotional connection with your audience.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Event planning: I want to host a <virtual/physical> event that attracts <100> attendees and generates <10> new leads by <date>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a video series that highlights the unique features and benefits of <product/service> in <industry>, and showcases customer success stories for <target audience> to envision how it can improve their own workflows or processes.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as an interviewer. Ask me interview questions for the position of <insert desired job position>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create Plan: Design a lead magnet for [target audience] that addresses their specific pain points and offers a valuable solution. Choose a format (e-book, webinar, video series, etc.) and outline the content.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "How can <insert business name> use customer feedback and data to optimize their marketing efforts and improve ROI?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Please generate a blog post on the importance of <topic> in <industry>, that is targeted to <ideal customer persona>, using language that captures their attention and provides relevant examples to demonstrate the value of <topic>.",
  },
  {
    tag: "Marketing Storytelling",
    definition: "What are some creative ways to use video marketing to engage <insert target audience>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Suggest five high-traffic blogs or websites within the <industry> sector that we should target with our outreach efforts, and identify key influencers or thought leaders to approach.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want to create a content marketing plan for my business, but I'm not sure where to start. Can you recommend some strategies for identifying high-performing topics and formats?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm looking to leverage Instagram's growing popularity to promote my business and attract new customers. Can you recommend some effective strategies for running successful Instagram campaigns, including the use of hashtags, paid ads, and other promotional tactics?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Brainstorm ideas for a social media campaign to promote <a new product launch>. Your company is launching a new product and you need to create a social media campaign to generate buzz and encourage sales. Your task is to think of creative ways to showcase the product, engage your audience, and drive traffic to your website or store.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "What strategies can <company> implement to increase brand awareness and engagement among <target audience>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create a storytelling framework for a <blog/website> series focused on <keyword>, with the goal of establishing ourselves as thought leaders in our industry and driving organic traffic to our <blog/website>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Your <product/service> is launching soon, but you're struggling to create an interesting and engaging marketing campaign. What kind of story can you tell to captivate your audience and create buzz around the launch?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Propose 2 creative marketing storytelling campaigns that can leverage the trend towards <keyword> to increase brand awareness and engagement with our current and potential <target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition: "How can <brand> leverage user-generated content to build trust and credibility with their audience?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are an experienced Marketing Storytelling strategist who graduated from Wharton School and working at PepsiCo. Help me understand the importance of incorporating <emotions> into a brand's story.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Brand Awareness: I want to increase <brand>'s recognition among <target audience> by 50% within the next 6 months.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create Plan: Launch a product/service that solves a unique problem for [target audience]. Develop a launch plan that includes a sales funnel, advertising campaigns, and outreach to key influencers in the industry.",
  },
  {
    tag: "Marketing Storytelling",
    definition: "What are some effective <insert industry> influencer marketing strategies?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "My company has been around for a while, but our branding isn't cohesive. How can I conduct a brand audit and develop a rebranding strategy that aligns with our values and resonates with our audience?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create a knowledge base article that provides a step-by-step guide on how to effectively use <product/service>, and includes FAQs and common troubleshooting tips for <target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Content development: I want to create a series of <10> blog posts, each with <1,000> words, that educate my target audience on <relevant topic> by <date>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as an interviewer. Ask me interview questions for the position of <position>. Wait for my answers before moving on to the next question.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Recommend three high-performing content formats (e.g. video, podcast, infographics) that we should produce to amplify our <product/service> messaging and attract <target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Provide a list of 7 trending hashtags that we can incorporate into our social media campaign for <product/service>, and suggest three accompanying visual themes to pair with each.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a comprehensive email marketing campaign for <product/service> that includes segmentation, personalized messaging, A/B testing, and measurement of open rates, click-through rates, and conversions.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a customer persona and create a content plan to target them. Your company has identified a target audience and you need to create a content plan that will resonate with them. Your task is to develop a persona that represents your target audience and create content that speaks to their needs, interests, and pain points.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are a Marketing Storytelling specialist who graduated from Stanford University and works for Nike. Give me your opinion on how to craft a story that will resonate with <millennial> customers.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are an experienced <digital marketer> who graduated from <respected institution> and currently employed by <prominent company>. Can you suggest some innovative ways to <increase website traffic>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are a top-notch <brand manager> with a degree from <esteemed institution>, and you are a vital part of <major conglomerate>. How can a brand successfully <rebrand> without losing its customer base?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as a movie critic. Write an engaging and creative review of a movie. Cover topics such as plot, themes, direction, and characters, and focus on how the movie made you feel. Avoid spoilers. My first request is: <movie title>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "What are the best tactics for creating a successful social media advertising campaign for <insert target audience>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create Plan: Develop a content calendar for [industry/niche] that positions [company] as an authority in the space. Include blog posts, social media content, and guest posts on industry websites.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a content marketing plan for <product/service> that includes ideation, creation, and distribution of valuable and relevant content to attract and retain a clearly defined audience and drive profitable customer action.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Conduct a survey and analyze data to improve your marketing strategy. Your company needs to gather data about your target market and their preferences in order to improve your marketing strategy. Your task is to conduct a survey, analyze the data, and develop insights that can inform your future campaigns.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Which storytelling techniques can <brand> use to create a powerful emotional connection with their customers?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "My email marketing campaigns aren't converting as well as I'd like. What are some tips for improving my email subject lines and calls-to-action?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Identify three unique storytelling angles for our brand that we can leverage to enhance our marketing strategy and generate engagement from <target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Storytelling Content: I want to create a <blog/video/infographic> that tells the story of <company/product> which emotionally connects with <target audience> and generates <number> leads within the next 2 weeks.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create Plan: Develop a social media strategy for [company] that increases engagement and drives traffic to our website. Include specific tactics and content ideas for each platform (Facebook, Instagram, Twitter, etc.).",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Conduct a competitor analysis of five top-performing brands in our <industry> niche, and identify gaps in their content strategies that we can leverage to differentiate our brand's storytelling approach.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm struggling to make my email marketing campaigns stand out from the competition. What are some creative ways to craft engaging subject lines and email content that will encourage my subscribers to open and interact with my messages?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Conduct market research on our competitors and advise on 3 unique approaches we can take in our marketing storytelling to differentiate ourselves and appeal to our <target audience>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You want to create a case study that showcases how your product/service has helped a particular customer achieve their goals. How can you craft a compelling narrative that highlights the customer's journey and clearly demonstrates the value of your offering?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create a social media strategy for <company> that establishes brand voice and identity, as well as specific tactics for each platform to maximize engagement and reach.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Digital Advertising: I want to increase website traffic by 30% through a <social media platform>/Google AdWords/Facebook Ads campaign within the next month.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You are a Marketing Storytelling expert who earned their degree from the London School of Economics and you are currently working at Coca-Cola. Give me your advice on how to create an impactful story that will attract <Gen Z> consumers.",
  },
  {
    tag: "Marketing Storytelling",
    definition: "How can <business> effectively use social media to market their <product/service>?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You're tasked with creating a marketing campaign for a new <product/category>. What steps do you take to ensure your campaign is effective and captures your target audience's attention?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Create an eBook that offers valuable insights on <industry/topic> for <ideal customer persona>. The eBook should provide actionable solutions and advice that can help improve their daily lives or businesses.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Brainstorm creative social media tactics to promote <our new product launch>. Your company is preparing to launch a new product and needs to create buzz on social media. Your task is to brainstorm tactics that will grab attention and generate interest in the new product. Think about how you can leverage user-generated content, influencer partnerships, and unique visual elements in your plan.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "You're creating a series of social media ads to promote your product/service. What kind of story can you tell in each ad to grab your audience's attention and encourage them to take action?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as a storyteller. Create an entertaining story that is engaging and captivating for <target audience> about <theme or topic>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Generate ideas for a PR stunt to promote <our brand>. Your company wants to make a splash in the news and generate buzz for your brand. Your task is to brainstorm ideas for a PR stunt that will capture media attention and create awareness for your brand. Think about what would make your brand stand out, how you can tie the stunt to your brand's values and mission, and what types of media outlets are most likely to cover the event.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Design an infographic that visualizes the key benefits and features of <product/service> in a simple and easy to understand way for <target audience>. The infographic should include statistics, facts, and other relevant information that proves the value of the product/service for potential customers.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm interested in launching a YouTube channel to promote my business and products, but I'm not sure how to make my videos stand out and attract viewers. What are some best practices for creating engaging, informative videos that will appeal to my target audience and keep them coming back for more?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Please suggest 5 creative storytelling techniques that can effectively communicate our new <product/service> to our <target audience>, while aligning with our brand messaging and values.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Video marketing: I want to create a <2> minute animated explainer video that showcases the benefits of my <product/service> and generates <1,000> views on YouTube by <date>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Your company is launching a new <service/feature>. How do you incorporate storytelling into your marketing strategy to create buzz and excitement among potential customers?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a series of educational videos that showcases the benefits of <product/service> and how they can be incorporated into daily life for <target audience>. These videos should be informative, engaging, and visually appealing.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I'm hoping to increase my website's conversion rates through effective landing page design. What are some key design elements and techniques that I should consider incorporating into my landing pages to maximize visitor engagement and encourage more conversions?",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "I want you to act as a football commentator. Commentary on a match in progress, providing analysis and predictions on what has happened so far and how the game may end. Please be familiar with the players, teams, and terminology. My first request is: <match description>.",
  },
  {
    tag: "Marketing Storytelling",
    definition:
      "Develop a comprehensive marketing plan for <product/service> that includes target audience analysis, competitive research, and measurable goals to increase sales and brand awareness.",
  },
];

// Update database

mongoose
  .connect(MONGO_URI)
  .then((db) => {
    console.log(`Connected to Mongo database: "${db.connections[0].name}"`);
    return Prompt.create(prompts);
  })
  .then((promptsFromDB) => {
    console.log(`Create ${promptsFromDB.length} prompts`);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(`An error ocurrred while creating prompts from the DB: ${err}`);
  });
