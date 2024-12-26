import { useEffect, useState } from "react";
import ArticleList from "../components/Article/ArticleList";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import HeroArticle from "../components/Article/HeroArticle";

function HomePage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesWithImage = articles.filter((article) => article.image);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService.getArticles().then((articles) => {
      setArticles(articles)
      setLoading(false)
    });
  }, []);

  return (
    <div>
      {loading ? <div>Loading...</div> : (
        <>
          <HeroArticle article={articlesWithImage[0]} />
          <ArticleList articles={articlesWithImage} title="Latest Articles" />
        </>
      )}
    </div>
  );
}

export default HomePage;
