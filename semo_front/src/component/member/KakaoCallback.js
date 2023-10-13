import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, MenuItem, Select } from "@mui/material";
import Input from "../util/InputFrm";
import { Button1 } from "../util/Buttons";

const KakaoCallBack = () => {
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberContent, setMemberConTent] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [memberCategory1, setMemberCategory1] = useState(0);
  const [memberCategory2, setMemberCategory2] = useState(0);
  const [memberLocal, setMemberLocal] = useState(0);
  //최초 렌더링 시 발동
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
    /*
    axios
      .post("/member/oauth/kakao", {
        authorizationCode: code,
      })
      .then((res) => {
        //spring에서 발급된 jwt localStorage 저장

        localStorage.setItem("accessToken", res.headers.accesstoken);
        //메인 페이지로 이동
        window.location.href = "/";
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        alert(err.response.data.detail);
        window.location.href = "/login";
      });
      */
  }, []);
  const handleChange1 = (event) => {
    setMemberLocal(event.target.value);
  };
  const handleChange2 = (event) => {
    setMemberCategory1(event.target.value);
  };
  const handleChange3 = (event) => {
    setMemberCategory2(event.target.value);
  };
  return (
    <div className="join-wrap">
      <div className="join-title">추가정보 입력</div>
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="text"
        content="memberPhone"
        placeholder="010-1234-1234"
      />
      <JoinInputWrap
        data={memberMail}
        setData={setMemberMail}
        type="text"
        content="memberMail"
        placeholder="abcd@gmail.comm"
      />
      <div className="join-category-title">피드 설정</div>
      <div className="member-thumbnail">
        <textarea
          value={memberContent}
          id="jointext"
          placeholder="피드 소개글"
          onChange={(e) => {
            setMemberConTent(e.target.value);
          }}
        />
      </div>
      <div className="join-category">
        <div className="join-category-title">관심 카테고리</div>
        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={memberCategory1} onChange={handleChange2}>
              <MenuItem value={1}>문화·예술</MenuItem>
              <MenuItem value={2}>운동·액티비티</MenuItem>
              <MenuItem value={3}>푸드·드링크</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={memberCategory2} onChange={handleChange3}>
              <MenuItem value={1}>문화·예술</MenuItem>
              <MenuItem value={2}>운동·액티비티</MenuItem>
              <MenuItem value={3}>푸드·드링크</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={memberLocal} onChange={handleChange1}>
              <MenuItem value={1}>서울</MenuItem>
              <MenuItem value={2}>경기</MenuItem>
              <MenuItem value={3}>부산</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="join-btn-box">
        <Button1 text="회원가입" clickEvent="#" />
      </div>
    </div>
  );
};
const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  const placeholder = props.placeholder;
  return (
    <div className="join-input-wrap">
      <div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};

export default KakaoCallBack;
