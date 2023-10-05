import { useEffect, useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import "./component/common/default.css";
import { Button1 } from "./component/util/Buttons";
import MyModal from "./component/util/MyModal";
import { Route, Routes } from "react-router";
import AdminMain from "./component/admin/AdminMain";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import GrBoardMain from "./component/board/GrBoardMain";
import GroupMain from "./component/group/GroupMain";
import Mainpage from "./component/mainpage/MainPage";
import NoticeMain from "./component/notice/NoticeMain";
import MeetingCreate from "./component/meeting/MeetingCreate";
import FeedMain from "./component/feed/FeedMain";
import PageMain from "./component/page/PageMain";

function App() {
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);
  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
      <div className="content">
        <Routes>
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/group/*"
            element={<GroupMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/groupBoard/*" element={<GrBoardMain />} />
          <Route
            path="/notice/*"
            element={<NoticeMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />

          <Route path="/meeting" element={<MeetingCreate />} />
          <Route path="/feed/*" element={<FeedMain />} />
          <Route
            path="/page/*"
            element={<PageMain />}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
