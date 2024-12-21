export interface News {
    id: string;
    title: string;
    description: string;
    image: string | null;
    created_at: string;
}

export type NewsWithoutId = Omit<News, 'id' | 'created_at'>

export interface Comment {
    id: string;
    comments_id: string;
    author: string;
    comments_text: string;
}

export type CommentWithoutId = Omit<Comment, 'id'>;