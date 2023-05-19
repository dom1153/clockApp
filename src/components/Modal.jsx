export default function Modal({children}) {
  return (
    <div className="flex place-content-center items-center min-h-screen w-screen fixed z-20">
        <div className="p-5 rounded-md bg-white ">{children}</div>
    </div>
  )
}
