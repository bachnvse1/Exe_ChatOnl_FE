import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [boxContent, setBoxContent] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [dataResponse, setDataResponse] = useState("");
  const usernameRequest = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");
  const imgUrl =
    sessionStorage.getItem("imgUrl") ||
    "https://bootdey.com/img/Content/avatar/avatar6.png";
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = `${config.API_BASE_URL}/Users/username/${usernameRequest}`;
        const response = await fetch(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataResponse = await response.json();
        setUsername(dataResponse.username);
        setDataResponse(dataResponse);
      } catch (error) {
        console.error("Lỗi khi lấy profile:", error);
      }
    };

    fetchProfile();
  }, [usernameRequest, token]);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Cập nhật dữ liệu khi dataResponse thay đổi
  useEffect(() => {
    if (dataResponse) {
      setFormData({
        username: dataResponse.username || "",
        fullName: dataResponse.fullName || "",
        email: dataResponse.email || "",
        phone: dataResponse.phone || "",
        address: dataResponse.address || "",
      });
    }
  }, [dataResponse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/Users/update/${usernameRequest}`,
        {
          method: "PUT",
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Cập nhật thành công!", {
          position: "top-left",
        });
        setFormDataPassword({
          password: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(
          `Cập nhật thất bại: ${errorData.message || "Lỗi không xác định"}`,
          {
            position: "top-left",
          }
        );
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại sau.", {
        position: "top-left",
      });
    }
  };

  const [formDataPassword, setFormDataPassword] = useState({
    username: dataResponse.username,
    Password: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setFormDataPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitChangePassword = async () => {
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/Users/updatePassword/${usernameRequest}`,
        {
          method: "PUT",
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataPassword),
        }
      );
      const result = await response.json();
      if (formDataPassword.ConfirmPassword !== formDataPassword.NewPassword) {
        toast.success("Re-password không khớp!", {
          position: "top-left",
        });
      } else if (result.success) {
        console.log("result" + result.success);
        toast.success("Cập nhật thành công!", {
          position: "top-left",
        });
      } else {
        console.log("result" + result.success);
        toast.error(`Cập nhật thất bại: Mật khẩu cũ không đúng!`, {
          position: "top-left",
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra!");
    }
  };
  const HomeButton = ({ className = "" }) => {
    const handleClickHome = () => {
      window.location.href = "/shop1";
    };

    const handleClickOrder = () => {
      window.location.href = "/order";
    };
    const handleClickOrderDetails = () => {
      window.location.href = "/orderDetail";
    };

    return (
      <div>
        <button
          className={`px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
          onClick={handleClickHome}
          style={{ marginBottom: "10px", marginRight: "10px" }}
        >
          Home
        </button>

        <button
          className={`px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
          onClick={handleClickOrder}
          style={{ marginBottom: "10px", marginRight: "10px" }}
        >
          Order
        </button>
        <button
          className={`px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
          onClick={handleClickOrderDetails}
          style={{ marginBottom: "10px" }}
        >
          Order Details
        </button>
      </div>
    );
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <HomeButton />
      <div className="main-body">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={imgUrl}
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <div className="mt-3">
                    <h4>{username || "Loading..."}</h4>
                    <p className="text-secondary mb-1">
                      {dataResponse.fullName}
                    </p>
                    <p className="text-muted font-size-sm">
                      {dataResponse.address}
                    </p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
                <hr className="my-4" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe me-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Website
                    </h6>
                    <span className="text-secondary">https://bootdey.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github me-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Github
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter me-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                      Twitter
                    </h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram me-2 icon-inline text-danger"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook me-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                {["fullName", "email", "phone", "address"].map(
                  (field, index) => (
                    <div className="row mb-3" key={index}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )
                )}
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="button"
                      className="btn btn-primary px-4"
                      value="Save Changes"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row"
              style={{ display: "block", marginTop: "50px" }}
            >
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">
                      Changes Password
                    </h5>
                    {["Password", "NewPassword", "ConfirmPassword"].map(
                      (field, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-3">
                            <h6 className="mb-0">
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="password"
                              className="form-control"
                              name={field}
                              value={formDataPassword[field]}
                              onChange={handleChangePassword}
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="button"
                          className="btn btn-primary px-4"
                          value="Save Changes"
                          onClick={handleSubmitChangePassword}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
