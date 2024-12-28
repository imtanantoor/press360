import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import NewsLayout from "../layout/NewsLayout";
import ArticleList from "../components/Article/ArticleList";
import { useEffect } from "react";
import { fetchMyFeed } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function MyFeedPage() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { myFeed, myFeedLoading, preferences } = useAppSelector(
    (state: RootState) => state.user
  );
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to view your feed");
      navigate("/");
      return;
    }

    dispatch(fetchMyFeed({}));
  }, []);


  return (
    <NewsLayout>
      {myFeedLoading ? (
        <p>Fetching my feed...</p>
      ) : (
        <ArticleList articles={myFeed} title="My Feed" />
      )}
    </NewsLayout>
  );
}

export default MyFeedPage;
