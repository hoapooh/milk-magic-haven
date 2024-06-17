import React, { useState } from "react";
import "./FAQ.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Container } from "@mui/material";

import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ApiIcon from "@mui/icons-material/Api";

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&::before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ApiIcon sx={{ fontSize: "2.4rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(45deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function FAQ() {
	const [expanded, setExpanded] = useState("panel1");

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<>
			<Breadcrumb>FAQ's</Breadcrumb>
			<Container className="faq__container" maxWidth={"xl"}>
				<div className="faq">
					<h1 className="faq__title">FAQ'S</h1>
					<div className="faq__accordion">
						<Accordion
							className="faq__accordion__style first__panel"
							style={{ border: "none" }}
							expanded={expanded === "panel1"}
							onChange={handleChange("panel1")}
						>
							<AccordionSummary
								className="summary first"
								aria-controls="panel1d-content"
								id="panel1d-header"
							>
								<Typography sx={{ fontSize: "2.4rem" }}>
									How will my order be delivered to me?
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography sx={{ fontSize: "2.4rem" }}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="faq__accordion__style"
							style={{ border: "none" }}
							expanded={expanded === "panel2"}
							onChange={handleChange("panel2")}
						>
							<AccordionSummary
								className="summary"
								aria-controls="panel2d-content"
								id="panel2d-header"
							>
								<Typography sx={{ fontSize: "2.4rem" }}>
									What do I need to know?
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography sx={{ fontSize: "2.4rem" }}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="faq__accordion__style"
							style={{ border: "none" }}
							expanded={expanded === "panel3"}
							onChange={handleChange("panel3")}
						>
							<AccordionSummary
								className="summary"
								aria-controls="panel2d-content"
								id="panel2d-header"
							>
								<Typography sx={{ fontSize: "2.4rem" }}>
									How will I know if order is placed successfully?
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography sx={{ fontSize: "2.4rem" }}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="faq__accordion__style"
							style={{ border: "none" }}
							expanded={expanded === "panel4"}
							onChange={handleChange("panel4")}
						>
							<AccordionSummary
								className="summary"
								aria-controls="panel2d-content"
								id="panel2d-header"
							>
								<Typography sx={{ fontSize: "2.4rem" }}>
									How do I check the status of my order?
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography sx={{ fontSize: "2.4rem" }}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="faq__accordion__style last__panel"
							style={{ border: "none" }}
							expanded={expanded === "panel5"}
							onChange={handleChange("panel5")}
						>
							<AccordionSummary
								className="summary last"
								aria-controls="panel3d-content"
								id="panel3d-header"
							>
								<Typography sx={{ fontSize: "2.4rem" }}>
									Can I cancel my order?
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography sx={{ fontSize: "2.4rem" }}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			</Container>
		</>
	);
}
