<div
onMouseEnter={() => setHomeImageHovered(true)} // On hover, set to true
onMouseLeave={() => setHomeImageHovered(false)} // On hover leave, set to false
style={{
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden", // Ensure no overflow from the image
  transition: "all 0.3s ease", // Smooth transition for hover effects
}}
>
<Image
  src={homeImageHovered ? home3 : home2} // Replace with your image URL
  alt="Full-screen"
  style={{
    objectFit: "cover", // Still cover but with max width/height
    width: "100%", // Ensure it spans the full width
    height: "100%", // Ensure it spans the full height
    maxWidth: "100%", // Prevent image from overflowing horizontally
    maxHeight: "100%", // Prevent image from overflowing vertically
    display: "block",
    filter: homeImageHovered ? "contrast(150%)" : "none",
    transition: "filter 0.3s ease",
  }}
/>
{/* Text over the image */}
<Text
  style={{
    position: "absolute", // Position the text absolutely within the container
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Adjust for perfect centering
    color: "white", // Make text white for visibility
    textAlign: "center",
    backgroundColor:
      "rgba(0, 0, 0, 0.5)" /* Optional: Add a semi-transparent background */,
    borderRadius: 15 /* Optional: Rounded corners */,
    fontSize: "3rem", // Large text size
    fontWeight: "bold", // Optional: Make the text bold
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Optional: Add text shadow for contrast
  }}
>
  Welcome to Y E M I GENERAL TRADING L.L.C. Your Gateway to Global
  Trade Excellence
</Text>
</div>
