import React from "react";
import {
	PhoneOutlined,
	MailOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import "./Contact.css";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

function Contact() {
	return (
		<>
			<Breadcrumb>Liên hệ</Breadcrumb>
			<div className="contact">
				<div className="contact_title">Thông tin liên hệ</div>
				<div className="contact_info">
					<div className="contact_card">
						<PhoneOutlined className="icon" />
						<div className="contact_details">
							<h3>Phone number</h3>
							<p>123-456-7868</p>
						</div>
					</div>
					<div className="contact_card">
						<MailOutlined className="icon" />
						<div className="contact_details">
							<h3>Email</h3>
							<p>info@example.com</p>
						</div>
					</div>
					<div className="contact_card">
						<EnvironmentOutlined className="icon" />
						<div className="contact_details">
							<h3>Address place</h3>
							<p>
								1930 Marigold Lane, Way
								<br />
								Miami, Florida USA
							</p>
						</div>
					</div>
				</div>
				<div className="contact_content">
					<div className="contact_content_left">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370124!2d106.80730807480579!3d10.841127589311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1718024680824!5m2!1sen!2s"
							width="600"
							height="450"
							title="map"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
					<div className="contact_content_right">
						<div className="contact_content_right_header">
							Liên hệ với chúng tôi
						</div>
						<div className="contact_content_right_body">
							<Form className="contact_content_right_body_form">
								<Form.Item className="content_input">
									<Input placeholder="Tên của bạn" />
								</Form.Item>
								<Form.Item>
									<Input placeholder="Số điện thoại" />
								</Form.Item>
								<Form.Item>
									<Input placeholder="Email" />
								</Form.Item>
								<Form.Item>
									<TextArea rows={4} placeholder="Thêm ghi chú ở đây" />
								</Form.Item>
								<Form.Item>
									<Button type="primary">Send</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Contact;
