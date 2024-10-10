// store/types/newsTypes.ts

export interface NewsResponse {
    status: string;
    results: NewsArticle[];
  }
  
  export interface NewsArticle {
    section: string;
    title: string;
    abstract: string;
    url: string;
    byline: string;
    item_type: string;
    // Adicione outros campos conforme necessário
  }
  