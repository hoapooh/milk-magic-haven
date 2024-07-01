import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./Account.css";

export default function Account() {
  return (
    <div className="Account">
      <div className="account__left">
        <Sidebar />
      </div>
      <div className="account__right">
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Mật khẩu</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th style={{ width: 30 }}>Action</th> 
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
