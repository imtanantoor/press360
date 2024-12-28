import ArticleItem from "../../models/ArticleItem";

function ArticleCard({ article }: { article: ArticleItem }) {
  return (
    <div className="article-card">
      <div className="article-card-content">
        <h2>{article.title}</h2>
        <p>{article.description}</p>

        <p>
          <span>Date: </span>
          {article.date}
        </p>
        <p>
          <span>Source: </span>
          {article.source}
        </p>
      </div>
      <figure>
        <img alt={article.title + "image"} src={article.image} />
      </figure>
    </div>
  );
}

export default ArticleCard;
