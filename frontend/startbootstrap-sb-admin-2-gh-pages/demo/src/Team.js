import "./bootstrap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faMessage,
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import TeamList from "./components/TeamList.js";
import InviteMsg from "./components/InvitationMsg.js";
import TeamInfo from "./components/TeamInfo";
import Notice from "./components/Notice";
import FileStorage from "./components/FileStorage";
import InviteModal from "./components/InviteModal";
import InvitationNav from "./components/InvitationNav";
import DropdownButton from "./components/DropdownButton";

function Team() {
  const [userInfo, setUserInfo] = useState({});
  const [teamId, setTeamId] = useState(0);
  const [inviteModalShow, setInviteModalShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(teamId);
  }, [teamId]);

  const handleTeamIdFromChild = (data) => {
    setTeamId(data);
  };

  useEffect(() => {
    console.log(inviteModalShow);
  }, [inviteModalShow]);
  const handleInviteModalShow = (data) => {
    setInviteModalShow(data);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    fetch("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    //localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div id="wrapper">
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <img
            className="login-dongguk-logo"
            src={`${process.env.PUBLIC_URL}/dongguk_logo.png`}
          />
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - 메인 페이지 -->*/}
        <li className="nav-item active">
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link collapsed dropdown-button">
              {/*<!--<i className="fas fa-fw fa-tachometer-alt"></i>-->*/}
              <div style={{ textAlign: "center" }}>
                <span>메인 페이지</span>
              </div>
            </a>
          </li>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - 팀 활동 페이지 -->*/}
        <li className="nav-item active">
          <li className="nav-item dropdown no-arrow mx-1">
            <DropdownButton
              label={
                <div style={{ textAlign: "center" }}>
                  <i className="fas fa-fw fa-cog"></i>
                  <span>팀 활동 페이지</span>
                </div>
              }
              content={
                <div className="collapse" style={{ display: "block" }}>
                  <TeamList handleTeamIdFromChild={handleTeamIdFromChild} />
                </div>
              }
              style="nav-link collapsed"
            />
          </li>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}

      {/*<!-- Content Wrapper -->*/}
      <div id="content-wrapper" className="d-flex flex-column">
        {/*<!-- Main Content -->*/}
        <div id="content">
          {/*<!-- Topbar -->*/}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/*<!-- Sidebar Toggle (Topbar) -->*/}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/*<!-- Topbar Search -->*/}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <h1 className="h4 mb-0 text-gray-800">
                  오픈소스소프트웨어프로젝트
                </h1>
              </div>
            </form>

            {/*<!-- Topbar Navbar -->*/}
            <ul className="navbar-nav ml-auto">
              {/*<!-- Nav Item - Alerts -->*/}
              <InvitationNav />
              {/*<!-- Nav Item - User Information -->*/}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {userInfo.name} ({userInfo.studentId})
                  </span>
                  {/*<!-- <span style="padding-right: 5px"> -->*/}
                  <div className="btn btn-primary btn-user">My Page</div>
                  <div
                    className="btn btn-primary btn-user"
                    style={{ marginLeft: "5px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          {/*<!-- End of Topbar -->*/}

          {/*<!-- Begin Page Content -->*/}
          <div className="container-fluid">
            {/*<!-- Page Heading -->*/}
            <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

            {/*<!-- Content Row -->*/}

            <div className="row">
              {/*<!-- 파일 스토리지 섹션 -->*/}
              <FileStorage />
              <div className="col-xl-4 mb-4">
                {/*<!-- 팀 구성 정보 -->*/}
                {/* {useEffect(() => {
                  <TeamInfo teamId={teamId} />;
                }, [teamId])} */}
                <TeamInfo
                  teamId={{ id: teamId }}
                  handleInviteModalShow={handleInviteModalShow}
                />
                {/*<!--공지사항-->*/}
                <Notice />
              </div>
              {/*<!-- /.container-fluid -->*/}
            </div>
            {/*<!-- End of Main Content -->*/}

            {/*<!-- Footer -->*/}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
            {/*<!-- End of Footer -->*/}
          </div>
          {/*<!-- End of Content Wrapper -->*/}
        </div>
      </div>
      {/* 팀원 초대 모달 */}
      {inviteModalShow && (
        <InviteModal
          userInfo={userInfo}
          teamId={{ id: teamId }}
          inviteModalShow={inviteModalShow}
          handleInviteModalShow={handleInviteModalShow}
        />
      )}
    </div>
  );
}

export default Team;
