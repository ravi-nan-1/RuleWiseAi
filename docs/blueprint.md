# **App Name**: RuleWise AI

## Core Features:

- File Upload: Allow users to upload XML rule files and content files (txt).
- File Parsing and Storage: Parse the uploaded XML and txt files and store their content in the session. The XML structure will be turned into a tool so that the LLM can incorporate rule data into its analyses and answers.
- Chat Interface: Provide a chat interface for users to interact with the system after file upload.
- File Analysis via AI: Use the google/flan-t5-base model from the external API (https://algotrading-1-dluo.onrender.com) to analyze the txt file based on the uploaded XML rule file.
- Issue and Suggestion Generation: The AI will identify issues in the txt file based on the rules in the XML file, and it suggests fixes.
- Report Generation: Allow users to generate a report file summarizing the analysis, identified issues, and suggested fixes. This is not created via the API; rather, the app creates it directly, based on the same data from the txt/xml parsing and LLM that is used to drive the chat functionality.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) for sophistication and intelligence.
- Background color: Light gray (#F5F5F5) to ensure readability and focus on content.
- Accent color: Electric Green (#7CFC00) for highlighting important suggestions and calls to action.
- Headline font: 'Space Grotesk' sans-serif for a modern, technical feel, and 'Inter' sans-serif for body text
- Code font: 'Source Code Pro' for displaying XML rules and code snippets.
- Use minimalistic, clear icons to represent file types, actions (upload, analyze, generate), and issue categories.
- Subtle animations to indicate loading, processing, and report generation.