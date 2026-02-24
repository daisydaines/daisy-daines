export function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple blob */}
      <div
        className="absolute rounded-full opacity-[0.18]"
        style={{
          width: "650px",
          height: "650px",
          background:
            "radial-gradient(circle, #7c3aed 0%, #4c1d95 40%, transparent 70%)",
          filter: "blur(72px)",
          top: "-120px",
          left: "-80px",
          animation: "aurora1 9s ease-in-out infinite",
        }}
      />
      {/* Teal blob */}
      <div
        className="absolute rounded-full opacity-[0.15]"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, #0d9488 0%, #064e3b 40%, transparent 70%)",
          filter: "blur(72px)",
          top: "60px",
          right: "-60px",
          animation: "aurora2 12s ease-in-out infinite",
        }}
      />
      {/* Indigo blob */}
      <div
        className="absolute rounded-full opacity-[0.12]"
        style={{
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, #3730a3 0%, #1e1b4b 40%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "20px",
          left: "35%",
          animation: "aurora3 15s ease-in-out infinite",
        }}
      />
    </div>
  );
}
