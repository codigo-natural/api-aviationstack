export function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full animate-bounce bg-blue-400"></div>
        <div
          className="w-4 h-4 rounded-full animate-bounce bg-blue-400"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-4 h-4 rounded-full animate-bounce bg-blue-400"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}