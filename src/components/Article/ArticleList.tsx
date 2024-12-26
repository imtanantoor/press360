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
    <div>
      <h2>{title}</h2>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
