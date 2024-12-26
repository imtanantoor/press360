import { useEffect, useState } from "react";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ArticleList from "../components/Article/ArticleList";
import HeroArticle from "../components/Article/HeroArticle";

function SportsPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesWithImage = articles.filter((article) => article.image);
  const articlesFromGuardian = articles.filter(
    (article) => article.source === "The Guardian"
  );

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService
      .searchArticles({
        q: "sports",
        category: "sports",
        page: "1",
        pageSize: "5",
      })
      .then((articles) => setArticles(articles));
  }, []);

  return (
    <div>
      <HeroArticle article={articlesWithImage[0]} />
      <ArticleList articles={articlesWithImage} title="Latest in Sports" />
      <ArticleList articles={articlesFromGuardian} title="The Guardian" />
    </div>
  );
}

export default SportsPage;
