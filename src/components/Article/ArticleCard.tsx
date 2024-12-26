import ArticleItem from "../../models/ArticleItem";

function ArticleCard({ article }: { article: ArticleItem }) {
  return (
    <div className="article-card">
      <img alt={article.title + "image"} src={article.image} />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>{article.date}</p>
      <p>{article.source}</p>
    </div>
  );
}

export default ArticleCard;
