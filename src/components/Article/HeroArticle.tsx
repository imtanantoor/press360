import ArticleItem from "../../models/ArticleItem";

function HeroArticle({ article }: { article: ArticleItem }) {
  return (
    <div className="hero-article">
      <div className="hero-article-image">
        <img src={article?.image} alt={article?.title} />
      </div>
      <div className="hero-article-content">
        <h1>Breaking News</h1>
        <h2>{article?.title}</h2>
        <p>{article?.description}</p>
      </div>
    </div>
  );
}

export default HeroArticle;
