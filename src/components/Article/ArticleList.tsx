import ArticleItem from "../../models/ArticleItem";
import ArticleCard from "./ArticleCard";

function ArticleList({
  articles,
  title,
}: {
  articles: ArticleItem[];
  title: string;
}) {
  return (
    <div className="article-list">
      <h2 className="article-list-title">{title}</h2>
      <div className="article-list-container">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
