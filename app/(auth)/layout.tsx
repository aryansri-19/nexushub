"use client";
function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-gray-400 to-slate-900 h-screen">
      {children}
    </div>
  );
}

export default AuthPage;
