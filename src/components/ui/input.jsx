export const Input = ({ className, ref, type, ...props }) => {
  return (
    <input
      type={type}
      className="flex h-10 w-[752px] rounded-full bg-white border border-input px-3 py-2 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      ref={ref}
      {...props}
    />
  )
}
