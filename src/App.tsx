import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/navigation/Nav";
import AuthContextProvider from "./contexts/AuthContext";
import AuthorDetailPage from "./pages/authors/AuthorDetailPage";
import AuthorList from "./pages/authors/AuthorList";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostList from "./pages/posts/PostList";
import TagDetailPage from "./pages/tags/TagDetailPage";
import TagList from "./pages/tags/TagList";
import TopicDetailPage from "./pages/topics/TopicDetailPage";
import TopicList from "./pages/topics/TopicList";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import PrivateRoutes from "./PrivateRoute";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30 * 1000 } },
});

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/register" element={<Register />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/authors" element={<AuthorList />} />
                <Route path="/authors/:id" element={<AuthorDetailPage />} />
                <Route path="/topics" element={<TopicList />} />
                <Route path="/topics/:id" element={<TopicDetailPage />} />
                <Route path="/tags" element={<TagList />} />
                <Route path="/tags/:id" element={<TagDetailPage />} />
              </Route>
            </Routes>
          </Router>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
