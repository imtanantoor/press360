import { useEffect, useState } from "react";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ArticleList from "../components/Article/ArticleList";
import HeroArticle from "../components/Article/HeroArticle";

function EntertainmentPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesWithImage = articles.filter((article) => article.image);
  const [loading, setLoading] = useState(true);
  const articlesFromGuardian = articles.filter(
    (article) => article.source === "The Guardian"
  );

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService
      .searchArticles({
        q: "entertainment",
        category: "entertainment",
        page: "1",
        pageSize: "5",
      })
      .then((articles) => {
        setArticles(articles)
        setLoading(false)
      });
  }, []);

  return (
    <div>
      {loading ? <div>Loading...</div> : (
        <>
          <HeroArticle article={articlesWithImage[0]} />
          <ArticleList articles={articlesWithImage} title="Latest in Entertainment" />
          <ArticleList articles={articlesFromGuardian} title="The Guardian" />
        </>
      )}
    </div>
  );
}

export default EntertainmentPage;
