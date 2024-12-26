import ArticleItem from "../../models/ArticleItem";

function ArticleCard({ article }: { article: ArticleItem }) {
  return (
    <div className="article-card">
      <img alt={article.title + "image"} src={article.image} />
      <div className="article-card-content">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
      <div className="article-card-footer">
        <p>
          <span>Date: </span>
          {article.date}
        </p>
        <p>
          <span>Source: </span>
          {article.source}
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;
