/**
 * Demo responses for the ChatBox component
 * Contains various markdown-rich responses showcasing different features
 */

export const demoResponses = [
	`# Hello! 👋

I'm **Amigo ChatBot AI**, your friendly assistant. I can help you with various tasks including:

## What I can do:
- Answer questions on a wide range of topics
- Help with **coding** and \`programming\`
- Provide explanations and tutorials
- Assist with writing and analysis

> Feel free to ask me anything! I'm here to help.

### Example Code:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

What would you like to know about today?`,

	`## Programming Help 💻

I'd be happy to help you with programming! Here are some areas I can assist with:

### Languages I support:
| Language | Frameworks | Use Cases |
|----------|------------|-----------|
| JavaScript | React, Node.js | Web development |
| Python | Django, Flask | Data science, AI |
| TypeScript | Angular, Next.js | Enterprise apps |
| Java | Spring Boot | Backend services |

#### Common Tasks:
1. **Code review** and optimization
2. **Debugging** assistance  
3. **Architecture** planning
4. **Best practices** guidance

\`\`\`python
# Example: Simple Python function
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
\`\`\`

What specific programming topic would you like help with?`,

	`## Markdown Features Demo 📝

This response showcases various markdown capabilities:

### Text Formatting:
- **Bold text**
- *Italic text*
- \`inline code\`
- ~~strikethrough~~

### Lists:
#### Ordered List:
1. First item
2. Second item
3. Third item

#### Unordered List:
- Bullet point one
- Bullet point two
  - Nested item
  - Another nested item

### Blockquotes:
> "The best way to predict the future is to create it." - Peter Drucker

### Code Blocks:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: User): Promise<User> => {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }).then(res => res.json());
};
\`\`\`

### Links and Images:
Check out [React Documentation](https://reactjs.org) for more info!

---

What else would you like to explore?`,

	`## Data & Analytics 📊

I can help you with data-related questions! Here's what I cover:

### Data Science Topics:
- **Machine Learning** algorithms
- **Statistical analysis**
- **Data visualization**
- **Database** design and queries

#### Sample Data Analysis:
\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

# Load and analyze data
df = pd.read_csv('data.csv')
summary_stats = df.describe()

# Create visualization
plt.figure(figsize=(10, 6))
plt.plot(df['date'], df['value'])
plt.title('Data Trends Over Time')
plt.xlabel('Date')
plt.ylabel('Value')
plt.show()
\`\`\`

### Database Queries:
\`\`\`sql
SELECT 
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2024-01-01'
GROUP BY u.id, u.name
ORDER BY total_spent DESC;
\`\`\`

What data challenge are you working on?`,

	`## Web Development 🌐

Let me help you with web development concepts:

### Frontend Technologies:
#### React Ecosystem:
- **React 18** with concurrent features
- **Next.js** for SSR/SSG
- **TypeScript** for type safety
- **Tailwind CSS** for styling

#### Modern Development:
\`\`\`jsx
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
\`\`\`

### Backend APIs:
\`\`\`javascript
// Express.js API endpoint
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

What aspect of web development interests you most?`
];

/**
 * Get a random demo response
 * @returns {string} A random demo response with markdown content
 */
export const getRandomResponse = (): string => {
	return demoResponses[Math.floor(Math.random() * demoResponses.length)];
};

/**
 * Get a specific demo response by index
 * @param index - The index of the response (0-4)
 * @returns {string} The demo response at the specified index
 */
export const getResponseByIndex = (index: number): string => {
	if (index < 0 || index >= demoResponses.length) {
		throw new Error(`Invalid index: ${index}. Valid range is 0-${demoResponses.length - 1}`);
	}
	return demoResponses[index];
};

/**
 * Get all demo responses
 * @returns {string[]} Array of all demo responses
 */
export const getAllResponses = (): string[] => {
	return [...demoResponses];
};

/**
 * Get the number of available demo responses
 * @returns {number} The total number of demo responses
 */
export const getResponseCount = (): number => {
	return demoResponses.length;
};