type Props = {
  type?: 'button' | 'submit'
  label?: string
  disabled?: boolean
}

const Button = ({
  type = 'button',
  label = 'Button',
  disabled = false,
}: Props) => {
  return (
    <button
      className="px-4 py-2 border-2 shadow-md -hover font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
