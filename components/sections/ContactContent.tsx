import { Box, Typography, Button, useMediaQuery, Chip, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ColourfulText } from "../aceternity-ui/colourful-text";
import { Email, Facebook, Phone, GitHub, ContactPhone } from "@mui/icons-material";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [timestamp, setTimestamp] = useState("1717657112358"); // giá trị cố định để SSR
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    // Cập nhật timestamp chỉ ở client-side sau khi hydration
    setTimestamp(Date.now().toString());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    try {
      // Sử dụng Formspree để gửi form mà không cần backend
      const response = await fetch("https://formspree.io/f/luongminhtri2411@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSent(true);
        setTimestamp(Date.now().toString());
        // Reset form sau khi gửi thành công
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again or use other contact methods.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      alert("Something went wrong. Please try again or use other contact methods.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Email liên hệ trực tiếp
  const handleEmailClick = () => {
    window.location.href = "mailto:luongminhtri2411@gmail.com?subject=Contact from Portfolio&body=Hello Minh Tri, ";
  };

  // Mở Messenger chat
  const handleMessengerClick = () => {
    window.open(SOCIAL_LINKS.facebook, "_blank");
  };

  const codeSnippet = `// ContactInfo.js
const contactOptions = {
  name: "${form.name || 'your_name'}",
  email: "your_email@gmail.com",
  message: \`${form.message || 'Hey, I want to contact you.'}\`,
  timestamp: ${timestamp},
  status: "${sent ? 'SENT' : 'PENDING'}",
  directContact: [
    { type: "Email", value: "luongminhtri2411@gmail.com" },
    { type: "Phone", value: "0926 442 554" },
    { type: "Facebook", value: "luongminhtri2411" },
    { type: "GitHub", value: "MTri2411" }
  ]
};

function getResponse() {
  return {
    status: "available",
    message: "I'll get back to you soon!",
    responseTime: "24-48 hours"
  }
}`;

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={3} color="primary.main">
        📬 Contact
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
          flex: 1
        }}
      >
        {/* FORM & DIRECT CONTACT */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {/* DIRECT CONTACT METHODS */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{
              bgcolor: "rgba(2, 8, 20, 0.7)",
              color: "#f1f5f9",
              borderRadius: 3,
              p: 3,
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2} color="#a5e844">
              // Liên hệ trực tiếp
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.02, x: 5 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onClick={handleEmailClick}
              >
                <Email sx={{ color: "#3b82f6" }} />
                <Box>
                  <Typography variant="body2" color="#676e95">
                    // Email me
                  </Typography>
                  <Typography>luongminhtri2411@gmail.com</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(245, 158, 11, 0.1)"
                }}
              >
                <ContactPhone sx={{ color: "#f59e0b" }} />
                <Box>
                  <Typography variant="body2" color="#676e95">
                    // Call/Zalo
                  </Typography>
                  <Typography>0926 442 554</Typography>
                </Box>
              </Box>

              <Box
                component={motion.div}
                whileHover={{ scale: 1.02, x: 5 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(16, 185, 129, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onClick={handleMessengerClick}
              >
                <Facebook sx={{ color: "#10b981" }} />
                <Box>
                  <Typography variant="body2" color="#676e95">
                    // Messenger
                  </Typography>
                  <Typography>luongminhtri2411</Typography>
                </Box>
              </Box>

              <Box
                component={motion.div}
                whileHover={{ scale: 1.02, x: 5 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(124, 58, 237, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onClick={() => window.open(SOCIAL_LINKS.github, "_blank")}
              >
                <GitHub sx={{ color: "#7c3aed" }} />
                <Box>
                  <Typography variant="body2" color="#676e95">
                    // GitHub
                  </Typography>
                  <Typography>MTri2411</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* FORM */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              bgcolor: "rgba(2, 8, 20, 0.7)",
              color: "#f1f5f9",
              borderRadius: 3,
              p: 3,
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ margin: "auto", textAlign: "center" }}
              >
                <Typography color="#a5e844" fontWeight={600} variant="h6" mb={2}>
                  // Message sent successfully!
                </Typography>
                <Typography color="#f1f5f9" fontSize="0.9rem" mb={3}>
                  Thank you for contacting. I will respond as soon as possible.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setSent(false)}
                  sx={{
                    color: "#a5e844",
                    borderColor: "#a5e844",
                    '&:hover': {
                      borderColor: "#a5e844",
                      bgcolor: "rgba(165, 232, 68, 0.1)"
                    }
                  }}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <>
                <Typography variant="caption" sx={{ color: "#676e95", mb: 1 }}>
                  // Fill in contact information
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: "#676e95" }}>// Your name</Typography>
                    <Box
                      component="input"
                      sx={inputStyle}
                      value={form.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setForm(prev => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="your_name"
                      required
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: "#676e95" }}>// Your email</Typography>
                    <Box
                      component="input"
                      type="email"
                      sx={inputStyle}
                      value={form.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setForm(prev => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="your_email@example.com"
                      required
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "#676e95" }}>// Message content</Typography>
                  <Box
                    component="textarea"
                    sx={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                    value={form.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setForm(prev => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Enter message content here..."
                    required
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isFormSubmitting}
                  sx={{
                    mt: 2,
                    bgcolor: "#f59e0b",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    '&:hover': {
                      bgcolor: "#d97706",
                      transform: "translateY(-2px)",
                      boxShadow: "0 0 12px rgba(245, 158, 11, 0.5)"
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  {isFormSubmitting ? "sending()..." : "submit()"}
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* CODE SNIPPET */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "rgba(2, 8, 20, 0.7)",
            borderRadius: 3,
            p: 3,
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            overflow: "auto",
            position: "relative",
          }}
        >
          <Chip
            size="small"
            label="Contact Information"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "rgba(99, 102, 241, 0.2)",
              color: "#a5e844",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              fontFamily: "monospace"
            }}
          />
          <ColourfulText
            text={codeSnippet}
            className="h-full overflow-auto text-[0.9rem] font-mono"
            highlightClass={{
              keyword: "text-[#c792ea] font-semibold",
              string: "text-[#a5e844]",
              comment: "text-[#676e95] italic",
              number: "text-[#ff9d00]",
              function: "text-[#82aaff]",
              property: "text-[#4fc1ff]",
              operator: "text-[#89ddff]",
              jsxTag: "text-[#ff596f]",
              jsxAttr: "text-[#ffcb6b]",
              variable: "text-[#f78c6c]",
              plain: "text-[#d4d4d8]"
            }}
          />
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        sx={{
          mt: 3,
          p: 2,
          bgcolor: "rgba(2, 8, 20, 0.4)",
          borderRadius: 2,
          borderLeft: "4px solid #10b981",
          textAlign: "center"
        }}
      >
        <Typography variant="body2" color="#d4d4d8">
          // Response within 24 hours, work within 1-2 weeks after agreeing to the requirements
        </Typography>
      </Box>
    </Box>
  );
}

const inputStyle = {
  width: "100%",
  p: 1.5,
  border: "1px solid rgba(99, 102, 241, 0.2)",
  borderRadius: 1,
  bgcolor: "rgba(2, 8, 20, 0.6)",
  color: "#f1f5f9",
  fontFamily: "monospace",
  fontSize: "0.9rem",
  '&:focus': {
    outline: "none",
    borderColor: "#f59e0b",
    boxShadow: "0 0 0 2px rgba(245, 158, 11, 0.2)"
  }
};
