
interface AvatarProps {
    user: string|undefined|null
}


function Avatar({user}: AvatarProps) {
  return (
      <div className="avatar online placeholder">
          <div className="w-12 h-12 rounded-full bg-neutral">
              <span className="text-2xl uppercase text-white font-bold">{user}</span>
          </div>
    </div>
  )
}

export default Avatar