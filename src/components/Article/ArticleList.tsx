import ArticleItem from "../../models/ArticleItem";
import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  articles: ArticleItem[];
  title: string;
}

function ArticleList({ articles, title }: Readonly<ArticleListProps>) {
  if (articles.length === 0) {
    return (
      <div style={{padding:20}}>
        <h3>No articles found</h3>
      </div>
    );
  }

  return (
    <div className="article-list">
      <h2 className="article-list-title">{title}</h2>
      <div className="article-list-container">
        {articles.map((article, index) => (
          <ArticleCard key={`${article.id}-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
