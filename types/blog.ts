export interface BlogPost {
    id: string; // Slug
    title: string;
    excerpt: string;
    content: string; // Markdown or HTML
    author: string;
    date: string; // ISO Date string YYYY-MM-DD
    image: string; // URL to cover image
    tags: string[];
    readTime: string; // e.g., "5 min read"
}

export interface BlogCategory {
    id: string;
    name: string;
    description?: string;
}
