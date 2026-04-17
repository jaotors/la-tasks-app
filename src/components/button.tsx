type Props = {
  type?: 'button' | 'submit'
  label?: string
}

const Button = ({ type = 'button', label = 'Button' }: Props) => {
  return (
    <button
      className="px-4 py-2 border-2 shadow-md -hover cursor-pointer"
      type={type}
    >
      {label}
    </button>
  )
}

export default Button
