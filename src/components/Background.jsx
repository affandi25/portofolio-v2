import React from "react";

const AnimatedBackground = () => {
	return (
		<div className="fixed inset-0 pointer-events-none z-0">
			{/* Very subtle studio background grid & soft radial vignette */}
			<div className="absolute inset-0 bg-[#eae8e3]"></div>
			<div className="absolute inset-0 studio-grid opacity-60"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_40%,rgba(0,0,0,0.03)_100%)]"></div>
		</div>
	);
};

export default AnimatedBackground;
