import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./ProductAdmin.css";

export default function ProductAdmin() {
  return (
    <div className="ProductAdmin">
      <div className="ProductAdmin__left">
        <Sidebar />
      </div>
      <div className="ProductAdmin__right">
        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Độ tuổi</th>
              <th>Ảnh</th>
              <th style={{ width: 30 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>a</td>
              <td>
                <img
                  src="https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg"
                  alt="milk"
                  width={80}
                />
              </td>
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
