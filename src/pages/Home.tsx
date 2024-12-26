import { useEffect, useState } from "react";
import ArticleList from "../components/Article/ArticleList";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ApiContentService from "../services/APIContentService";
import ResponseFormatter from "../middleware/ResponseFormatter";

function HomePage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    const articleService = new ArticleService();
    articleService.addSource(
      new ApiContentService(
        "NewsAPI",
        "https://newsapi.org/v2/top-headlines",
        ResponseFormatter.formatNewsAPIResponse,
        {
          apiKey: "",
          pageSize: "10",
          country: "us",
        }
      )
    );
    articleService.getArticles().then((articles) => setArticles(articles));
  }, []);

  return (
    <div>
      <ArticleList articles={articles} title="Latest Articles" />
    </div>
  );
}

export default HomePage;
