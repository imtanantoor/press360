import { useEffect, useState } from "react";
import ArticleList from "../components/Article/ArticleList";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ApiContentService from "../services/APIContentService";
import ResponseFormatter from "../middleware/ResponseFormatter";
import HeroArticle from "../components/Article/HeroArticle";

function HomePage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesWithImage = articles.filter((article) => article.image);

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService.addSource(
      new ApiContentService(
        "NewsAPI",
        "https://newsapi.org/v2/top-headlines",
        ResponseFormatter.formatNewsAPIResponse,
        {
          apiKey: "c290bf206d824a7a92fdc5c2c3037342",
          country: "us",
        }
      )
    );
    articleService.addSource(
      new ApiContentService(
        "The Guardian",
        "https://content.guardianapis.com/search",
        ResponseFormatter.formatGuardianAPIResponse,
        {
          "api-key": "6ad89547-81bc-4318-8dc7-0eecb1f5c274",
        }
      )
    );
    articleService.getArticles().then((articles) => setArticles(articles));
  }, []);

  return (
    <div>
      <HeroArticle article={articlesWithImage[0]} />
      <ArticleList articles={articlesWithImage} title="Latest Articles" />
    </div>
  );
}

export default HomePage;
