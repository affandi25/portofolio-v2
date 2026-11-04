import React, { useState } from "react";
import { Modal, IconButton, Box, Backdrop, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { FileText, ExternalLink, Award } from "lucide-react";

const Certificate = ({ ImgSertif }) => {
	const [open, setOpen] = useState(false);

	const isPdf = typeof ImgSertif === "string" && ImgSertif.toLowerCase().includes(".pdf");
	const fileName = typeof ImgSertif === "string"
		? decodeURIComponent(ImgSertif.split("/").pop().replace(/\.pdf$/i, "").replace(/[-_]/g, " "))
		: "Certificate Document";

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<Box
				className=""
				sx={{
					position: "relative",
					overflow: "hidden",
					borderRadius: 0,
					border: "1px solid #000000",
					boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "scale(1.03)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
						"& .overlay": {
							opacity: 1,
						},
						"& .hover-content": {
							transform: "translate(-50%, -50%)",
							opacity: 1,
						},
						"& .certificate-image": {
							filter: "contrast(1.05) brightness(1) saturate(1.1)",
						},
					},
				}}>
				{/* Certificate Content (Image or PDF Preview) */}
				<Box
					sx={{
						position: "relative",
						"&::before": isPdf ? {} : {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(0, 0, 0, 0.05)",
							zIndex: 1,
						},
					}}>
					{isPdf ? (
						<div
							onClick={handleOpen}
							className="w-full aspect-[16/11.5] bg-[#E1E0DD] p-6 flex flex-col justify-between cursor-pointer border-b border-black"
						>
							<div className="flex items-center justify-between">
								<span className="text-[10px] font-mono tracking-widest uppercase text-neutral-600 font-semibold">
									VERIFIED CERTIFICATE // PDF
								</span>
								<div className="p-1.5 bg-white border border-black">
									<Award className="w-4 h-4 text-black" />
								</div>
							</div>

							<div className="my-auto py-2">
								<div className="w-10 h-10 border border-black bg-white flex items-center justify-center mb-2.5">
									<FileText className="w-5 h-5 text-black" />
								</div>
								<h4 className="text-xs sm:text-sm font-black tracking-tight text-black uppercase line-clamp-2 leading-snug">
									{fileName}
								</h4>
							</div>

							<div className="pt-2 border-t border-neutral-300 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-black">
								<span>CLICK TO PREVIEW</span>
								<ExternalLink className="w-3.5 h-3.5" />
							</div>
						</div>
					) : (
						<img
							className="certificate-image"
							src={ImgSertif}
							alt={fileName || "Certificate"}
							style={{
								width: "100%",
								height: "auto",
								display: "block",
								objectFit: "cover",
								filter: "contrast(1.10) brightness(0.95) saturate(1.1)",
								transition: "filter 0.3s ease",
								aspectRatio: "16/11.5",
							}}
							onClick={handleOpen}
						/>
					)}
				</Box>

				{/* Hover Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0,
						backgroundColor: "rgba(0, 0, 0, 0.45)",
						backdropFilter: "blur(2px)",
						transition: "all 0.3s ease",
						cursor: "pointer",
						zIndex: 2,
					}}
					onClick={handleOpen}>
					{/* Hover Content */}
					<Box
						className="hover-content"
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -60%)",
							opacity: 0,
							transition: "all 0.4s ease",
							textAlign: "center",
							width: "100%",
							color: "white",
							padding: 2,
						}}>
						<FullscreenIcon
							sx={{
								fontSize: 36,
								mb: 1,
								filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
							}}
						/>
						<Typography
							variant="subtitle2"
							sx={{
								fontWeight: 700,
								textTransform: "uppercase",
								letterSpacing: "0.15em",
								textShadow: "0 2px 4px rgba(0,0,0,0.4)",
							}}>
							{isPdf ? "Open Document" : "View Certificate"}
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* Modal Preview */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.85)",
						backdropFilter: "blur(4px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					p: 2,
				}}>
				<Box
					sx={{
						position: "relative",
						width: isPdf ? "90vw" : "auto",
						maxWidth: isPdf ? "1000px" : "90vw",
						maxHeight: "90vh",
						outline: "none",
						"&:focus": {
							outline: "none",
						},
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 12,
							top: 12,
							color: "white",
							bgcolor: "rgba(0,0,0,0.7)",
							zIndex: 10,
							padding: 1,
							border: "1px solid rgba(255,255,255,0.2)",
							"&:hover": {
								bgcolor: "#000000",
								transform: "scale(1.05)",
							},
						}}
						size="medium">
						<CloseIcon sx={{ fontSize: 20 }} />
					</IconButton>

					{isPdf ? (
						<div className="w-full h-[80vh] bg-white border border-black flex flex-col overflow-hidden">
							<div className="p-3.5 bg-black text-white flex items-center justify-between pr-14">
								<span className="text-xs font-mono tracking-widest uppercase font-semibold line-clamp-1">
									{fileName}
								</span>
								<a
									href={ImgSertif}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[11px] font-mono tracking-wider text-neutral-300 hover:text-white underline uppercase flex items-center gap-1.5"
								>
									<span>OPEN IN NEW TAB</span>
									<ExternalLink className="w-3.5 h-3.5" />
								</a>
							</div>
							<iframe
								src={`${ImgSertif}#toolbar=1`}
								className="w-full flex-1 border-0"
								title="Certificate PDF Viewer"
							/>
						</div>
					) : (
						<img
							src={ImgSertif}
							alt={fileName || "Certificate Full View"}
							style={{
								display: "block",
								maxWidth: "100%",
								maxHeight: "90vh",
								margin: "0 auto",
								objectFit: "contain",
								border: "1px solid #000000",
							}}
						/>
					)}
				</Box>
			</Modal>
		</Box>
	);
};

export default Certificate;
