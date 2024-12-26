import { useEffect, useState } from "react";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ApiContentService from "../services/APIContentService";
import ResponseFormatter from "../middleware/ResponseFormatter";
import ArticleList from "../components/Article/ArticleList";
import HeroArticle from "../components/Article/HeroArticle";

function SportsPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesWithImage = articles.filter((article) => article.image);

  useEffect(() => {
    const articleService = new ArticleService();
    articleService.addSource(
      new ApiContentService(
        "SportsAPI",
        "https://newsapi.org/v2/top-headlines",
        ResponseFormatter.formatNewsAPIResponse,
        {
          apiKey: "c290bf206d824a7a92fdc5c2c3037342",
          pageSize: "10",
          country: "us",
          category: "sports",
        }
      )
    );
    articleService.getArticles().then((articles) => setArticles(articles));
  }, []);
  return (
    <div>
      <HeroArticle article={articlesWithImage[0]} />
      <ArticleList articles={articlesWithImage} title="All" />
    </div>
  );
}

export default SportsPage;
