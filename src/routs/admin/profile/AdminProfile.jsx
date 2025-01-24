import React, { useState, useEffect } from "react";
import { isAdmin } from "../../../services/api";
import "../profile/adminProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
    faUserPen,
    faPencil,
    faLeftLong,
    faUserTag,
    faArrowDownAZ,
    faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import { product } from "../../../constans/product";


const SortButton = ({ ascIcon, descIcon }) => (
    <button className="sortButton border-0 bg-transparent mx-1">
        <span className="asc d-none">
            <FontAwesomeIcon icon={ascIcon} />
        </span>
        <span className="desc">
            <FontAwesomeIcon icon={descIcon} />
        </span>
    </button>
);

const AdminTable = ({ data, onToggle }) => (
    <table className="w-100">
        <thead>
            <tr>
                <th>
                    Name
                    <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                </th>
                <th>
                    Email
                    <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                </th>
                <th>Phone No.</th>
                <th>Activate</th>
            </tr>
        </thead>
        <tbody>
            {data.map((admin, index) => (
                <tr key={index}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    <td>
                        <div className="admin-activate">
                            <div id="button-3" className="btnToggleActivate">
                                <input
                                    className="checkActive"
                                    type="checkbox"
                                    checked={admin.active}
                                    onChange={() => onToggle(index)}
                                />
                                <div className="knobs"></div>
                                <div className="layer"></div>
                            </div>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const AdminProfile = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const adminResponse = await isAdmin();
                if (!adminResponse.data.isAuthenticated) {
                    navigate("/dashboard");
                }
            } catch (err) {
                navigate("/adminLogin");
            }
        };

        checkAuth();
    }, [navigate]);


    const [adminData, setAdminData] = useState([
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: false },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: false },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
        { name: "Firoj Sahab", email: "firoj@sahabji.com", phone: "0123456789", active: true },
    ]);

    const [isBtnHide, setBtnHide] = useState(true);
    const [editStates, setEditStates] = useState({
        name: true,
        email: true,
        phone: true,
    });

    const toggleActiveStatus = (index) => {
        setAdminData((prevData) =>
            prevData.map((admin, i) =>
                i === index ? { ...admin, active: !admin.active } : admin
            )
        );
    };

    const toggleEdit = (field) => {
        setBtnHide(false);
        setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const goBack = () => navigate(-1);

    return (
        <section className="profileSection mb-4">
            <div className="container">
                <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                    Profile
                </h1>
                <div className="row">
                    {/* Profile Section */}
                    <div className="col-12 col-xl-6 mx-auto">
                        <div className="detProfBox rounded border my-3 my-xl-0">
                            <form>
                                <div className="profileDetails d-flex align-items-center justify-content-start mb-4 p-2">
                                    <div className="rounded position-relative">
                                        <img
                                            src={product.profPic}
                                            alt="Profile"
                                            className="profilePic border userPicture"
                                        />
                                        <label
                                            className="btn btnProfPicEdit position-absolute border-0 rounded"
                                            htmlFor="userprofilePicture"
                                        >
                                            <FontAwesomeIcon icon={faUserPen} />
                                        </label>
                                        <input type="file" id="userprofilePicture" className="d-none" />
                                    </div>
                                    <div className="ms-3">
                                        <div className="profname roboto fw-bold text-dark fs-3">Zerom Dotsure</div>
                                        <div className="registeredDate fw-bold text-dark">
                                            Registered: <span>Aug 17, 2024</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="profContact my-3 p-3">
                                    <h1 className="fs-4 fw-bold text-dark">Contact Details</h1>
                                    <hr />
                                    {["name", "phone", "email"].map((field) => (
                                        <div className="nameProf" key={field}>
                                            <div className="text-dark">
                                                {field === "name" && "Full Name"}
                                                {field === "phone" && "Phone Number"}
                                                {field === "email" && "Email"}
                                            </div>
                                            <div className="input-group mb-3">
                                                <span
                                                    className="input-group-text prolfileDataInfo cursor-pointer"
                                                    id={`profile${field}`}
                                                    onClick={() => toggleEdit(field)}
                                                >
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={`Enter ${field === "phone" ? "Mobile Number" : "Email Address"}`}
                                                    aria-describedby={`profile${field}`}
                                                    value={
                                                        field === "name"
                                                            ? "Zerom Dotsure"
                                                            : field === "phone"
                                                                ? "0123456789"
                                                                : "zerom.otsure@email.com"
                                                    }
                                                    disabled={editStates[field]}
                                                />
                                            </div>
                                            <hr />
                                        </div>
                                    ))}

                                    <div className="d-flex">
                                        <div className="text-dark">
                                            <FontAwesomeIcon icon={faUserTag} className="me-2" />
                                            Role:
                                        </div>
                                        <div className="ms-2">Admin</div>
                                    </div>

                                    {!isBtnHide && (
                                        <div className="text-center mt-2">
                                            <button className="btn btn-dark updateDetails">Update Details</button>
                                        </div>
                                    )}
                                </div>
                            </form>

                            <div className="text-center my-2">
                                <button
                                    className="btn m-auto goBackBtn btn-dark d-flex align-items-center justify-content-center"
                                    onClick={goBack}
                                >
                                    <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                                    <span className="text-light fw-bold">Go back</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Admin Table */}
                    <div className="col-12 col-xl-6 mx-auto">
                        <div className="bg-light detProfBox rounded border p-3 my-3 my-xl-0">
                            <h1 className="fs-4 fw-bold text-dark">All admins</h1>
                            <div className="adminTable my-2">
                                <AdminTable data={adminData} onToggle={toggleActiveStatus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminProfile;
