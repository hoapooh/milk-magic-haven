import { useState } from "react";
import PropTypes from "prop-types";

// const containerStyle = {
// 	display: "flex",
// 	alignItems: "center",
// 	gap: "16px",
// };

const starContainerStyle = {
	display: "flex",
};

// PropType is used to validate the type of the props
// If the type is not matched then it will throw an error
StarRating.propTypes = {
	maxRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
	messages: PropTypes.array,
	defaultRating: PropTypes.number,
	rating: PropTypes.number,
	setRating: PropTypes.func,
	onSetRating: PropTypes.func,
};

// maxRating use to set the maximum rating value
// default value can be set if there is no value passed
export default function StarRating({
	maxRating = 5,
	color = "#fcc419",
	size = 30,
	className = "",
	messages = [],
	defaultRating = 0,
	rating,
	setRating,
	onSetRating,
}) {
	const [tempRating, setTempRating] = useState(0);

	// Use to set the Ratin Star value
	function handleRating(rating) {
		setRating(rating);
		onSetRating && onSetRating(rating);
	}

	const textStyle = {
		lineHeight: "1",
		margin: "0",
		color,
		fontSize: `${size / 1.5}px`,
		textAlign: "center",
	};

	// If there is a tempRating exist (only when hover on the star)
	// then use tempRating value to show the rating value
	// otherwise use rating value (default value)
	return (
		<div>
			<p style={textStyle}>
				{messages.length === maxRating
					? messages[tempRating ? tempRating - 1 : rating - 1]
					: tempRating || rating || 0}
			</p>
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						full={tempRating ? tempRating > i : rating > i}
						onRate={() => handleRating(i + 1)}
						onHoverIn={() => setTempRating(i + 1)}
						onHoverOut={() => setTempRating(0)}
						color={color}
						size={size}
					/>
				))}
			</div>
		</div>
	);
}

// onRate use to set the rating value
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
	// Style of Star component
	const starStyle = {
		display: "block",
		width: `${size}px`,
		height: `${size}px`,
		cursor: "pointer",
	};
	return (
		// onMouseEnter and onMouseLeave can be used to change the color of the star
		<span
			role="button"
			style={starStyle}
			onClick={onRate}
			onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				// Change only fill property is enough to change the color of the star
				fill={full ? color : "none"}
				stroke={color}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="{2}"
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
		</span>
	);
}
