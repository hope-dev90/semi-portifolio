import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:mutimutujehope90@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backdropFilter: "blur(8px)"
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: "#111109",
          border: "1px solid rgba(200,149,42,0.2)",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          padding: "40px",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "#c8952a",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px"
          }}
        >
          ×
        </button>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "32px",
          color: "#f5f0e8",
          marginBottom: "8px"
        }}>
          Send a Message
        </h2>
        <p style={{
          color: "rgba(245,240,232,0.5)",
          marginBottom: "32px",
          fontSize: "14px"
        }}>
          Fill out the form below and I'll get back to you soon.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#c8952a",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(245,240,232,0.05)",
                border: "1px solid rgba(245,240,232,0.1)",
                borderRadius: "4px",
                color: "#f5f0e8",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#c8952a",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              Your Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(245,240,232,0.05)",
                border: "1px solid rgba(245,240,232,0.1)",
                borderRadius: "4px",
                color: "#f5f0e8",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif"
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#c8952a",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              Message
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={5}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(245,240,232,0.05)",
                border: "1px solid rgba(245,240,232,0.1)",
                borderRadius: "4px",
                color: "#f5f0e8",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background: "#c8952a",
              border: "none",
              borderRadius: "4px",
              color: "#0a0a08",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
              transition: "background 0.25s ease"
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
